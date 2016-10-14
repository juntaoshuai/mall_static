/*******************************************************************************
* KindEditor - WYSIWYG HTML Editor for Internet
* Copyright (C) 2006-2011 kindsoft.net
*
* @author Roddy <luolonghao@gmail.com>
* @site http://www.kindsoft.net/
* @licence http://www.kindsoft.net/license.php
*******************************************************************************/

// google code prettify: http://google-code-prettify.googlecode.com/
// http://google-code-prettify.googlecode.com/

KindEditor.plugin('code', function(K) {
	var self = this, name = 'code';
	self.clickToolbar(name, function() {
		var guid = guidGenerator(); //生成一个全球唯一数字
        var href = "javascript:show_hide_code('" + guid + "');";
		var lang = self.lang(name + '.'),
			html = ['<div style="padding:10px 20px;">',
		        '<div class="ke-dialog-row" style="line-height:25px;">',
                '语言',
				'<select class="ke-code-type">',
                '<option value="csharp">C#</option>',
                '<option value="sql">SQL</option>',
                '<option value="php">PHP</option>',
				'<option value="html">HTML</option>',
				'<option value="css">CSS</option>',
				'<option value="js">JavaScript</option>',
                '<option value="vb">VB</option>',
                '<option value="java">JAVA</option>',
                '<option value="cpp">C++</option>',
                '<option value="xml">XML</option>',
                '<option value="xhtml">XHTML</option>',
                '<option value="as3">ActionScript3</option>',
				'</select>',
                '　　折叠',
				'<select class="ke-code-type2">',
				'<option value="code_init_none">折叠代码</option>',
				'<option value="code_init_block">不折叠代码</option>',
				'</select><br/>',
                '注释',
				'<input class="ke-code-type3" style="width:250px;" maxlength="50" />',
                '<font color="red">代码提示文字,可留空</font>',
				'</div>',
				'<textarea class="ke-textarea" style="width:808px;height:360px;"></textarea>',
				'</div>'].join(''),
			dialog = self.createDialog({
				name : name,
				width : 850,
				title : self.lang(name),
				body : html,
				yesBtn : {
					name : self.lang('yes'),
					click : function(e) {
						var type = K('.ke-code-type', dialog.div).val(),
		                type2 = K('.ke-code-type2', dialog.div).val(),
		                type3 = K('.ke-code-type3', dialog.div).val(),
		                fh = type2 == 'code_init_block' ? '-' : '+',
						code = textarea.val(),
						html = '<div class="toolbar"><span title="点击查看或收起代码"><a href="' + href + '" title="点击查看或收起代码"><font class="font_info" id="font_' + guid + '">' + fh + '</font>代码视图&nbsp;' + type3 + '</a></span><div class="' + type2 + '" id="code_' + guid + '"><pre class="brush:' + type + ';">\n' + K.escape(code) + '</pre></div></div><br/>';
			            //alert(type3);
			            //alert(type2+fh);
			            self.insertHtml(html).hideDialog().focus();
					}
				}
			}),
			textarea = K('textarea', dialog.div);
		textarea[0].focus();
	});
});

//生成全球唯一数字
function guidGenerator() {
    var S4 = function () {
        return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    };
    return (S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4());
}