/**
 * 这是show.php页面鼠标移到星星上和离开星星时调用的方法
 * @param id
 * @param type（0，表示鼠标移到星星上，1表示鼠标离开星星）
 * @return
 */
function get_score(id,type){
	
	for(var i = 1; i<6; i++){
		$('#xin_'+i).attr('class','wei');
	}
	
	/*鼠标移到星星上时执行*/
	if(type==0){
		for(var i = 1; i<=id; i++){
			$('#xin_'+i).attr('class','you');
		}
	}
	
	/*鼠标移出星星上时执行*/
	else if(type==1){
		var score = $('#score').val();
		if(score==undefined || score==""){
			score = 0;
		}
		for(var i = 1; i<=score; i++){
			$('#xin_'+i).attr('class','you');
		}
	}
}

/**
 * 这是show.php页面点击星星调用的方法
 * @param id
 * @return
 */
function set_score(id){
	$('#score').val(id);//得分
}

/**
 * 这是show.php页面提交评论的方法
 * @return
 */
function comment(){ 
	var nkname = $('#nkname').val();//昵称
	var content= $('#content').val();//内容
	var verify = $('#verify').val();//验证码
	var score = $('#score').val();//分数
	var pid = $('#pid').val();//文章ID
	var url = $('#url').val();//提交地址
	if(nkname==undefined || nkname=='' || nkname==' ' || nkname=='阁下大名')
	{
		alert('请问阁下大名是？');
		$('#nkname').select();
		return false;
	}else if(content==undefined || content=='' || content==' ' || content=='内容')
	{
		alert('请问阁下想说些什么？');
		$('#content').select();
		return false;
	}else if(verify==undefined || verify.length!=4)
	{
		alert('请阁下输入验证码');
		$('#verify').select();
		return false;
	}else if(score==undefined || score=='')
	{
		alert('请问阁下认为该文章可以获得多少分？');
		return false;
	}else
	{
		//alert('下面开始Ajax提交您的信息');
		$.ajax({
			type: "POST",
			url: url,
			data: "pid="+pid+"&nkname="+nkname+"&content="+content+"&score="+score+"&verify="+verify,
			success: function(data,textStatus){ 
			if(data=="1"||data==1){
					alert('信息已提交');
					//verify(); /*刷新验证码*/
					$('#nkname').val('阁下大名');//昵称
					$('#content').val('内容');//内容
					$('#verify').val('验证码');//验证码
					var index_php = $('#index_php').val(); //alert(index_php);
					document.getElementById("code_img").src = index_php + "/auth/verify?time="+Math.random();
				}else{
					alert(data);
				}
		   	},
		   	error: function(XMLHttpRequest, textStatus, errorThrown){
		   		alert('操作失败');
		   	}
		});
		return false;
	}
}

/**
 * 这是msg.php页面提交留言的方法
 * @return
 */
function msg(){ 
	var nkname = $('#nkname').val();//昵称
	var content= $('#content').val();//内容
	var verify = $('#verify').val();//验证码
	var sex = $('#sex').val();//性别
	var contact = $('#contact').val();//联系方式
	var url = $('#url').val();//提交地址
	//var cip = $('#cip').val();//ip
	if(nkname==undefined || nkname=='' || nkname==' ' || nkname=='阁下大名')
	{
		alert('请问阁下大名是？');
		$('#nkname').select();
		return false;
	}else if(content==undefined || content=='' || content==' ' || content=='内容')
	{
		alert('请问阁下想说些什么？');
		$('#content').select();
		return false;
	}else if(verify==undefined || verify.length!=4)
	{
		alert('请阁下输入正确的验证码');
		$('#verify').select();
		return false;
	}else if(sex==undefined || sex=='')
	{
		alert('请问阁下性别几何？');
		return false;
	}else
	{
		//alert('下面开始Ajax提交您的信息');
		$.ajax({
		   type: "POST",
		   url: url,
		   data: "nkname="+nkname+"&content="+content+"&sex="+sex+"&verify="+verify+"&contact="+contact,
		   success: function(data,textStatus){
				alert(data);
				if(data=='操作成功'){ 
					getImageCode(); /*刷新验证码*/
					$('#nkname').val('阁下大名');//昵称
					$('#content').val('内容');//内容
					$('#verify').val('验证码');//验证码
					$('#contact').val('联系方式');//联系方式
					window.location.href = $('#index_php').val();//进入首页
				}
		   },
		   error: function(XMLHttpRequest, textStatus, errorThrown){
			   alert('操作失败');
		   }
		});
		return false;
	}
}

/*验证码，同一个页面多个地方用到验证码*/
/*function getImageCode() {
	var index_php = $('#index_php').val();
	if(arguments.length==0) {
		$('#VCode').attr('src', index_php+'Public/verify' + '?t=' + Date.parse(new Date()));
	}
	else if(arguments.length==1){
		$('#VCode'+arguments[0]).attr('src', index_php+'Public/verify' + '?t=' + Date.parse(new Date()));
	}
}*/
function verify(){
	var index_php = $('#index_php').val(); //alert(index_php);
	document.getElementById("code_img").src = index_php + "/auth/verify?time="+Math.random();
}

/**
 * 超链接跳转
 * @param url 跳转地址
 * @return
 */
function link(url){
	if(url!=null){
		document.location.href = url;
	}
}

/**
 * 超链接提示跳转
 * @param url 跳转地址
 * @param msg 提示信息
 * @return
 */
function link_confirm(url,msg){
	if(msg!=null){
		if(confirm(msg)){
			document.location.href = url;
		}
	}else{
		document.location.href = url;
	}
}

/**
 * 超链接提交表单
 * @param form
 * @param msg
 * @return
 */
function link_submit(form,msg){
	if(msg!=null){
		if(confirm(msg)){
			document.getElementById(form).submit();
		}
	}else{
		document.getElementById(form).submit();
	}
}
