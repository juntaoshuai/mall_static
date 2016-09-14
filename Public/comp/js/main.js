/**
 * 
 * @shuaijuntao (you@example.org)
 * @date    2016-09-01 09:58:30
 * @version $Id$
 */
$(function() {
    //下拉列表整体操作
    var pulldown = function() {

        $(".pulldown").click(function() {
            $(".pulldown-box").css("z-index",1);
            $(this).parent().css("z-index",999);

            $(".pulldown-list").hide();

            $(this).next().show().css({
                    'width':$(this).width(),
                    'top':$(this).height()
            });

            return false;
        });

        $(".pulldown-list li").click(function() {
            alert("选 中的");
            var id = $(this).data("id");
            $(this).closest(".pulldown-box").find(".select-txt").html($(this).html());
            $(this).parent().hide();
            if (id) {
                $(this).parent().next(":hidden").val(id);
            }
        });

        $(document).click(function() {
            $(".pulldown-list").hide();
        });

    }

    pulldown();

    //新增规格
    $("#add-standard").click(function(){
    	var $standard=$(".standard-box:first").clone(true);
    	$standard.insertBefore($(this));
    });

  //商品管理编辑器切换
  $.tabs(".editor-tabs",'.editor-tabs-con');
  $.tabs(".tabs",'.tabs-con');
   
 //发货时间选择
 $(".delivery-time a").click(function(){
    $("input[name=sendtime]").val($(this).html());
 });










});
