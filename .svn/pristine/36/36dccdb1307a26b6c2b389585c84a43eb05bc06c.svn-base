
//商家后台新增和编辑商品页面，选择商品分类
$(function(){
	//下拉选项点击事件
	$('.null_cate').click(function(){
		//隐藏所有下拉选项
		$('.null_cate_list').hide();
		//当前下拉选项需要显示出来
		$(this).next('.null_cate_list').show();
	});
	
	//鼠标离开下拉选项触发的事件
	$('.null_cate_list').mouseleave(function(){
		//隐藏所有下拉选项
		$('.null_cate_list').hide();
	});
	
	//一级下拉框子选项点击事件
	$('.null_category_1 .null_cate_list li').live('click',function(){
		var id = $(this).attr('data-id');
		var name = $(this).html();
		$(this).parent().parent().find('.category').val(id);
		$(this).parent().parent().find('.select-txt').html(name);
		//隐藏所有下拉选项
		$('.null_cate_list').hide();
		init_category_2(".null_category_1",".null_category_2",".null_category_3","");
	});
	
	//二级下拉框子选项点击事件
	$('.null_category_2 .null_cate_list li').live('click',function(){
		var id = $(this).attr('data-id');
		var name = $(this).html();
		$(this).parent().parent().find('.category').val(id);
		$(this).parent().parent().find('.select-txt').html(name);
		//隐藏所有下拉选项
		$('.null_cate_list').hide();
		init_category_3(".null_category_1",".null_category_2",".null_category_3","");
	});
	
	//三级下拉框子选项点击事件
	$('.null_category_3 .null_cate_list li').live('click',function(){
		var id = $(this).attr('data-id');
		var name = $(this).html();
		$(this).parent().parent().find('.category').val(id);
		$(this).parent().parent().find('.select-txt').html(name);
		//隐藏所有下拉选项
		$('.null_cate_list').hide();
		//init_category_4(".null_category_1",".null_category_2",".null_category_3","");
	});
	
	//初始化下拉框选项
	init_category_1(".null_category_1",".null_category_2",".null_category_3","");
	
	//初始化当前选择的分类提示信息(这里采用计时器的方式，将计算压力转移到客户端)
	setInterval('init_cate_txt(".null_category_1",".null_category_2",".null_category_3","")',2000); //每个2秒调用一次函数
});

//-------------------------
//--动态加载下拉选项--begin
//-------------------------

//声明几个全局变量，分别是：默认的分类ID；默认的分类名称(显示的文字)；默认选项完整代码；是否调试
var category_init_val = 0;
var category_init_txt = '请选择分类';
var category_init_html = '<li data-id="'+category_init_val+'">'+category_init_txt+'</li>';
var isdebug = false;

//初始化当前选择的分类提示信息
function init_cate_txt(cate1,cate2,cate3,cate4){
	var txt1 = $(cate1).find('.select-txt').html();
	var txt2 = $(cate2).find('.select-txt').html();
	var txt3 = $(cate3).find('.select-txt').html();
	if(txt1==undefined || txt1==null || txt1=='' || txt1==category_init_txt){ txt1=''; }
	if(txt2==undefined || txt2==null || txt2=='' || txt2==category_init_txt){ txt2=''; }
	if(txt3==undefined || txt3==null || txt3=='' || txt3==category_init_txt){ txt3=''; }
	var txt = '';
	if(txt1!=''){ txt += txt1; }
	if(txt2!=''){ txt += "/" + txt2; }
	if(txt3!=''){ txt += "/" + txt3; }
	if(txt==''){ txt = '您当前的选择是：暂无'; }
	else{ txt = '您当前的选择是：'+txt; }
	$('.current-category').html(txt);
}

//初始化下拉框(下拉选项对象；分类ID；分类名称；默认选项代码)
function init_cate(ele,category_init_val,category_init_txt,category_init_html){
	$(ele).find('.category').val(category_init_val);
	$(ele).find('.select-txt').html(category_init_txt);
	$(ele).find('.null_cate_list').html(category_init_html);
}

//第一级下拉框--动态加载下拉选项
function init_category_1(cate1,cate2,cate3,cate4){
	
	//默认选中的值；父类ID
	//var id = $(cate1).find('.null_cate_list').attr('data-id');
	var id = $(cate1).find('.category').val();
	var pid = $(cate1).find('.null_cate_list').attr('data-init-pid'); if(isdebug==true){ alert("init_category_1:pid【"+pid+"】，id【"+id+"】"); }
	if(id==undefined || pid==undefined){
		//初始化
		init_cate(cate1,category_init_val,category_init_txt,category_init_html);
		//初始化下级菜单
		init_category_2(cate1,cate2,cate3,cate4); return false;
	} if(isdebug==true){ alert("init_category_2:通过了"); }
	
	//调用接口，根据Pid获取商品类别
	var action = 'http://mall.ofweek.com/api.php?m=category&a=doGetCategorysByPid';
	var sdata = {pid:pid,order:1,limit:0,all:0};
	$.post(action,sdata,function(res){
		var have = false;
		var list = res.data; //if(isdebug==true){ alert("init_category_1:list.length【"+list.length+"】"); }
		if(res.status==1){
			//单个类别对象;完整的类别html代码
			var item = html = category_init_html;
			if(list!=null){
				for(var i=0;i<list.length;i++){
					item = list[i];
					if(item.id==id){
						//赋值，分类ID，分类名称(显示)
						$(cate1).find('.category').val(item.id);
						$(cate1).find('.select-txt').html(item.name);
						have = true;
					}
					//拼接代码，所有获取到的分类
					html += '<li data-id="'+item.id+'">'+item.name+'</li>';
				}
			}
			if(have==false){
				//初始化
				init_cate(cate1,category_init_val,category_init_txt,category_init_html);
			}
			
			//填充子菜单代码
			$(cate1).find('.null_cate_list').html(html);
			
			//完善第二级下拉框
			init_category_2(cate1,cate2,cate3,cate4);
		}
	},'json');
}

//第二级下拉框--动态加载下拉选项
function init_category_2(cate1,cate2,cate3,cate4){
	
	//默认选中的值；父类ID
	//var id = $(cate2).find('.null_cate_list').attr('data-id');
	var id = $(cate2).find('.category').val();
	var pid = $(cate1).find('.category').val(); if(isdebug==true){ alert("init_category_2:pid【"+pid+"】，id【"+id+"】"); }
	if(id==undefined || pid==undefined || pid==0){
		//初始化
		init_cate(cate2,category_init_val,category_init_txt,category_init_html);
		//初始化下级菜单
		init_category_3(cate1,cate2,cate3,cate4); return false;
	} if(isdebug==true){ alert("init_category_2:通过了"); }
	
	//调用接口，根据Pid获取商品类别
	var action = 'http://mall.ofweek.com/api.php?m=category&a=doGetCategorysByPid';
	var sdata = {pid:pid,order:1,limit:0,all:0};
	$.post(action,sdata,function(res){
		var have = false;
		var list = res.data; //if(isdebug==true){ alert("init_category_2:list.length【"+list.length+"】"); }
		if(res.status==1){
			//单个类别对象;完整的类别html代码
			var item = html = category_init_html;
			if(list!=null){
				for(var i=0;i<list.length;i++){
					item = list[i];
					if(item.id==id){
						//赋值，分类ID，分类名称(显示)
						$(cate2).find('.category').val(item.id);
						$(cate2).find('.select-txt').html(item.name);
						have = true;
					}
					//拼接代码，所有获取到的分类
					html += '<li data-id="'+item.id+'">'+item.name+'</li>';
				}
			}
			if(have==false){
				//初始化
				init_cate(cate2,category_init_val,category_init_txt,category_init_html);
			}
			
			//填充子菜单代码
			$(cate2).find('.null_cate_list').html(html);
			
			//完善第三级下拉框
			init_category_3(cate1,cate2,cate3,cate4);
		}
	},'json');
}

//第三级下拉框--动态加载下拉选项
function init_category_3(cate1,cate2,cate3,cate4){
	
	//默认选中的值；父类ID
	//var id = $(cate3).find('.null_cate_list').attr('data-id');
	var id = $(cate3).find('.category').val();
	var pid = $(cate2).find('.category').val(); if(isdebug==true){ alert("init_category_3:pid【"+pid+"】，id【"+id+"】"); }
	if(id==undefined || pid==undefined || pid==0){
		//初始化
		init_cate(cate3,category_init_val,category_init_txt,category_init_html); return false;
		//初始化下级菜单
		//init_category_4(cate1,cate2,cate3,cate4); return false;
	} if(isdebug==true){ alert("init_category_3:通过了"); }
	
	//调用接口，根据Pid获取商品类别
	var action = 'http://mall.ofweek.com/api.php?m=category&a=doGetCategorysByPid';
	var sdata = {pid:pid,order:1,limit:0,all:0};
	$.post(action,sdata,function(res){
		var have = false;
		var list = res.data; //if(isdebug==true){ alert("init_category_3:list.length【"+list.length+"】"); }
		if(res.status==1){
			//单个类别对象;完整的类别html代码
			var item = html = category_init_html;
			if(list!=null){
				for(var i=0;i<list.length;i++){
					item = list[i];
					if(item.id==id){
						//赋值，分类ID，分类名称(显示)
						$(cate3).find('.category').val(item.id);
						$(cate3).find('.select-txt').html(item.name);
						have = true;
					}
					//拼接代码，所有获取到的分类
					html += '<li data-id="'+item.id+'">'+item.name+'</li>';
				}
			}
			if(have==false){
				//初始化
				init_cate(cate3,category_init_val,category_init_txt,category_init_html);
			}
			
			//填充子菜单代码
			$(cate3).find('.null_cate_list').html(html);
			
			//完善第四级下拉框
			//init_category_4(cate1,cate2,cate3,cate4);
		}
	},'json');
}

//-------------------------
//--动态加载下拉选项--end
//-------------------------