<?php
/*
This is an upload script for SWFUpload that attempts to properly handle uploaded files
in a secure way.

Notes:
	
	SWFUpload doesn't send a MIME-TYPE. In my opinion this is ok since MIME-TYPE is no better than
	 file extension and is probably worse because it can vary from OS to OS and browser to browser (for the same file).
	 The best thing to do is content sniff the file but this can be resource intensive, is difficult, and can still be fooled or inaccurate.
	 Accepting uploads can never be 100% secure.
	 
	You can't guarantee that SWFUpload is really the source of the upload.  A malicious user
	 will probably be uploading from a tool that sends invalid or false metadata about the file.
	 The script should properly handle this.
	 
	The script should not over-write existing files.
	
	The script should strip away invalid characters from the file name or reject the file.
	
	The script should not allow files to be saved that could then be executed on the webserver (such as .php files).
	 To keep things simple we will use an extension whitelist for allowed file extensions.  Which files should be allowed
	 depends on your server configuration. The extension white-list is _not_ tied your SWFUpload file_types setting
	
	For better security uploaded files should be stored outside the webserver's document root.  Downloaded files
	 should be accessed via a download script that proxies from the file system to the webserver.  This prevents
	 users from executing malicious uploaded files.  It also gives the developer control over the outgoing mime-type,
	 access restrictions, etc.  This, however, is outside the scope of this script.
	
	SWFUpload sends each file as a separate POST rather than several files in a single post. This is a better
	 method in my opinion since it better handles file size limits, e.g., if post_max_size is 100 MB and I post two 60 MB files then
	 the post would fail (2x60MB = 120MB). In SWFupload each 60 MB is posted as separate post and we stay within the limits. This
	 also simplifies the upload script since we only have to handle a single file.
	
	The script should properly handle situations where the post was too large or the posted file is larger than
	 our defined max.  These values are not tied to your SWFUpload file_size_limit setting.
	
	=====================以下内容是谷歌翻译出来的结果=========================
这是一个SWFUpload的，试图妥善处理上传的文件上传脚本
在一个安全的方式。

附注：

SWFUpload的不发送的MIME类型。在我看来，这是确定的MIME类型，因为没有比
文件扩展名，可能是雪上加霜，因为它可以改变从操作系统到浏览器的操作系统和浏览器（为同一个文件） 。
做的是最好的事情，内容嗅探文件，但是这可能是资源密集型的，是困难的，并且仍然可以被愚弄或不准确。
接受上传永远无法做到100％的安全。

你不能保证SWFUpload的是真正的上载源。恶意用户
可能会从发送无效或虚假的文件的元数据的工具，上传。
脚本应妥善处理这个问题。

该脚本不应该过分写现有文件。

脚本应该去掉的无效字符的文件名或拒绝该文件。

脚本不应允许文件被保存，然后可以在Web服务器上（如php文件。 ）执行。
为了简单起见，我们将使用一个的扩展白名单允许的文件扩展名。哪些文件应该被允许
取决于您的服务器配置。扩展白名单是_not_绑您的SWFUpload的file_types的设置

为了获得更好的安全性上传的文件应存放Web服务器的文档根目录之外。下载的文件
应通过下载脚本访问，从文件系统到Web服务器的代理。这可以防止
用户执行恶意上传的文件。这也给了开发者的控制权传出的mime-type ，
访问限制等，这然而，该脚本的范围之外。

SWFUpload的每个文件发送作为一个单独的职位，而不是几个文件在一个单一的职位。这是一个更好
在我看来，法，因为它更好地处理文件大小的限制，例如，如果post_max_size的是100 MB ，我和两个60 MB的文件，然后发布
后会失败（ 2x60MB = 120MB ） 。 SWFUpload的发布每60 MB独立后和我们住的限度内。这
也简化了，因为我们只需要处理一个单一的文件上传脚本。

该脚本应妥善处理后的情况下，过大或发布的文件大于
我们定义的最大。不依赖于这些值您的SWFUpload file_size_limit的设置。
*/

// Code for to workaround the Flash Player Session Cookie bug
	if (isset($_POST["PHPSESSID"])) {
		session_id($_POST["PHPSESSID"]);
	} else if (isset($_GET["PHPSESSID"])) {
		session_id($_GET["PHPSESSID"]);
	}

	session_start();

// Check post_max_size (http://us3.php.net/manual/en/features.file-upload.php#73762)
	$POST_MAX_SIZE = ini_get('post_max_size');
	$unit = strtoupper(substr($POST_MAX_SIZE, -1));
	$multiplier = ($unit == 'M' ? 1048576 : ($unit == 'K' ? 1024 : ($unit == 'G' ? 1073741824 : 1)));

	if ((int)$_SERVER['CONTENT_LENGTH'] > $multiplier*(int)$POST_MAX_SIZE && $POST_MAX_SIZE) {
		header("HTTP/1.1 500 Internal Server Error"); // This will trigger an uploadError event in SWFUpload
		echo "POST exceeded maximum allowed size.";
		exit(0);
	}

// Settings
	$save_path = dirname(__FILENAME__) . "/uploads/";				// The path were we will save the file (getcwd() may not be reliable and should be tested in your environment)
	$upload_name = "Filedata";
	$max_file_size_in_bytes = 2147483647;				// 2GB in bytes
	$extension_whitelist = array("jpg", "gif", "png");	// Allowed file extensions
	$valid_chars_regex = '.A-Z0-9_ !@#$%^&()+={}\[\]\',~`-';				// Characters allowed in the file name (in a Regular Expression format)
	
// Other variables	
	$MAX_FILENAME_LENGTH = 260;
	$file_name = "";
	$file_extension = "";
	$uploadErrors = array(
        0=>"There is no error, the file uploaded successfully",
        1=>"The uploaded file exceeds the upload_max_filesize directive in php.ini",
        2=>"The uploaded file exceeds the MAX_FILE_SIZE directive that was specified in the HTML form",
        3=>"The uploaded file was only partially uploaded",
        4=>"No file was uploaded",
        6=>"Missing a temporary folder"
	);

//	$ uploadErrors=阵列（
//        0=>“没有任何错误，文件上传成功”，
//        1 =>“上传的文件超过了php.ini中的upload_max_filesize指令”，
//        2=>“上传的文件超过在HTML表单中指定的的MAX_FILE_SIZE指令，”
//        3 =>“上传的文件只有部分被上传”，
//        4 =>“没有文件被上传”，
//        6 =>“缺少临时文件夹”
//）;

// Validate the upload
	if (!isset($_FILES[$upload_name])) {
		HandleError("No upload found in \$_FILES for " . $upload_name);
		exit(0);
	} else if (isset($_FILES[$upload_name]["error"]) && $_FILES[$upload_name]["error"] != 0) {
		HandleError($uploadErrors[$_FILES[$upload_name]["error"]]);
		exit(0);
	} else if (!isset($_FILES[$upload_name]["tmp_name"]) || !@is_uploaded_file($_FILES[$upload_name]["tmp_name"])) {
		HandleError("Upload failed is_uploaded_file test.");
		exit(0);
	} else if (!isset($_FILES[$upload_name]['name'])) {
		HandleError("File has no name.");
		exit(0);
	}
	
// Validate the file size (Warning: the largest files supported by this code is 2GB)
	$file_size = @filesize($_FILES[$upload_name]["tmp_name"]);
	if (!$file_size || $file_size > $max_file_size_in_bytes) {
		HandleError("File exceeds the maximum allowed size");//文件超过允许的最大大小
		exit(0);
	}
	
	if ($file_size <= 0) {
		HandleError("File size outside allowed lower bound");//文件大小外下界
		exit(0);
	}


// Validate file name (for our purposes we'll just remove invalid characters)
	$file_name = preg_replace('/[^'.$valid_chars_regex.']|\.+$/i', "", basename($_FILES[$upload_name]['name']));
	if (strlen($file_name) == 0 || strlen($file_name) > $MAX_FILENAME_LENGTH) {
		HandleError("Invalid file name");//无效的文件名
		exit(0);
	}


// Validate that we won't over-write an existing file
	if (file_exists($save_path . $file_name)) {
		HandleError("File with this name already exists");//与此名称的文件已经存在
		exit(0);
	}

// Validate file extension
	$path_info = pathinfo($_FILES[$upload_name]['name']);
	$file_extension = $path_info["extension"];
	$is_valid_extension = false;
	foreach ($extension_whitelist as $extension) {
		if (strcasecmp($file_extension, $extension) == 0) {
			$is_valid_extension = true;
			break;
		}
	}
	if (!$is_valid_extension) {
		HandleError("Invalid file extension");//无效的文件扩展名
		exit(0);
	}

// Validate file contents (extension and mime-type can't be trusted)验证文件内容（扩展名和mime类型不能被信任）
	/*
		Validating the file contents is OS and web server configuration dependant.  Also, it may not be reliable.
		See the comments on this page: http://us2.php.net/fileinfo
		验证文件内容是操作系统和Web服务器的配置相关的。此外，它可能是不可靠的。
		此页面上看到的评论：http://us2.php.net/fileinfo

		Also see http://72.14.253.104/search?q=cache:3YGZfcnKDrYJ:www.scanit.be/uploads/php-file-upload.pdf+php+file+command&hl=en&ct=clnk&cd=8&gl=us&client=firefox-a
		 which describes how a PHP script can be embedded within a GIF image file.
		另请参阅http://72.14.253.104/search?q=cache:3YGZfcnKDrYJ:www.scanit.be/uploads/php-file-upload.pdf+php+file+command&hl=en&ct=clnk&cd=8&gl=us&client=firefox-a
		其中介绍了如何在PHP脚本可以嵌入在一个GIF图像文件。

		Therefore, no sample code will be provided here.  Research the issue, decide how much security is
		 needed, and implement a solution that meets the need.
		 因此，没有示例代码将提供在这里。研究这个问题，决定安全性是多少
		需要，并实现一个解决方案，以满足需要。
	*/


// Process the file处理文件
	/*
		At this point we are ready to process the valid file. This sample code shows how to save the file. Other tasks
		 could be done such as creating an entry in a database or generating a thumbnail.
		 
		Depending on your server OS and needs you may need to set the Security Permissions on the file after it has
		been saved.
		在这一点上，我们已经准备好处理的有效文件。此示例代码显示了如何将文件保存。其他任务
		可以做，如在数据库中创建一个条目，或生成一个缩略图。
		
		根据您的服务器操作系统和需求后，您可能需要此文件的权限设置安全
		已保存。
	*/
	if (!@move_uploaded_file($_FILES[$upload_name]["tmp_name"], $save_path.$file_name)) {
		HandleError("File could not be saved.");//不能保存文件
		exit(0);
	}

	exit(0);


/* Handles the error output. This error message will be sent to the uploadSuccess event handler.  The event handler
will have to check for any error messages and react as needed.
处理错误输出。此错误消息将被发送到的uploadSuccess事件处理程序。该事件处理程序
将检查任何错误消息，并根据需要进行反应。 */
function HandleError($message) {
	echo $message;
}
?>