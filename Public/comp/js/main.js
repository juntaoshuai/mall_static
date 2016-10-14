/**
 * 
 * @shuaijuntao (you@example.org)
 * @date    2016-09-01 09:58:30
 * @version $Id$
 */
$(function() {
	//新增规格
	$("#add-standard").click(function(){
		var html = '';
		html += '<div class="standard-box mb20 clearfix">';
		html += '	<input type="text" class="txt txt198 mr10 null_product_format_name" name="product_format_name[]" placeholder="如：一件20个" maxlength="50">';
		html += '	<select name="product_format_type[]" class="mr10 null_product_format_type" style="width:100px;padding:5px;height:30px;float:left;">';
		html += '		<option value="1">一口价</option>';
		html += '		<option value="2">待议价</option>';
		html += '	</select>';
		html += '	<input type="text" class="txt txt98 mr10 null_product_format_price" name="product_format_price[]" placeholder="价格" value="" maxlength="12">';
		html += '	<input type="text" class="txt txt88 mr10 null_product_format_stock" name="product_format_stock[]" placeholder="库存" value="0" maxlength="11">';
		html += '	<input type="button" value=" X " onclick="$(this).parent().remove();" />';
		html += '</div>';
		$("#add-standard").before(html);
	});
	
/*
 tab选项卡
 tabs:选项卡标题
 tabscon:选项卡内容
 tabs tabscon同级,tabs不限于ul>li结构
*/
 jQuery.tabs=function(tabs,tabcon,options){
 	var defaults={
 		event:"click"
 	};
 	var setting=$.extend({},defaults,options);

 	$(tabcon).first().show();
   $(tabs).children().on(setting.event,function(){
   	  var index=$(this).index();
   	  $(this).addClass("active").siblings().removeClass("active");
   	  $(tabcon).hide().eq(index).show();
   })
}
	//商品管理编辑器切换
	$.tabs(".editor-tabs",'.editor-tabs-con');
	$.tabs(".tabs",'.tabs-con');


});
