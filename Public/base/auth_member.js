/*!
 * OFweek MALL 会员登录相关信息控制
 * 控制范围：几乎包含所有页面缓存
 * 作用：采用异步（ajax）方式替换头部登录/注册/个人中心/退出等相关菜单
 * 注意：若要让该功能起作用，第一步要引入一个支持live()函数的jquery核心文件，比如jquery1.4.2.min.js；第二步就是要引入当前文件；
 * 		  第三步要在对应的模板里面放一个隐藏域，定义他的class="null_curr_domain"，他的值就是当前完整域名，比如http://mall.ofweek.com/；
 * 		  第四步要赋值一个auth_member.php到对应域名下面的一个叫api的文件夹里面，没有的话可以自己创建，反正要保证下面的post请求发的出去
 * @author tan
 */
function auth_member(){
	//由于涉及到ajax跨越操作，为简单起见，暂时不去搞这么复杂了，干脆每个域名下面都放一个相同的文件--auth_member.php（这样可以避免ajax跨域操作）
	var domain = window.location.host;
	if(domain==undefined || $.trim(domain)==''){
		domain = document.domain;
	}
	if(domain==undefined || $.trim(domain)==''){
		domain = 'mall.ofweek.com';
	}
	domain = 'http://' + domain + "/";
	
	if(domain==undefined){ return false; }//有些页面的头部是动态判断是否登录，比如个人中心，企业个人中心
	
	$.post(domain + "auth/doGetMember.html?time="+Math.random(), function(res){ //alert(res);
		
		var html = '';//拼接的html代码
		if(res.status==1){
			//alert('已登录');
			//若是已登录
			//var item;//为兼容IE这个SB 只好采用下面的方法来对json数据进行转码，否则IE下会报错JSON未定义http://my.oschina.net/u/232879/blog/141136
			//if(typeof(JSON) == 'undefined'){ item = eval("("+res+")"); }
			//else{ item = JSON.parse(res); }
			var item = res.data;
			
			//我的MALL
			var link_mall = '我的MALL对应的链接地址';
			//我的订单
			var link_order = '我的订单对应的链接地址';
			//我的收藏
			var link_cang = '我的收藏对应的链接地址';
			
			html = '';
			html += '<div class="container">';
			html += '	<div class="fl">';
			html += '		<span class="fl">欢迎来到 OFweek Mall</span>';
			html += '		<a href="javascript:;">'+item.username+'</a> <a href="javascript:void(0);" onclick="return logout();">退出</a>';
			html += '	</div>';
			html += '	<div class="fr">';
			html += '		<a href="'+link_mall+'">我的MALL</a><i>|</i><a href="'+link_order+'">我的订单</a><i>|</i><a href="'+link_cang+'">我的收藏</a>';
			html += '	</div>';
			html += '</div>';
			
			//网站头部登录信息
			var box = $('.header');
			if(box != undefined){
				box.html(html);//替换html代码
			}
		}else{
			//alert('未登录');
			//若是未登录
			
			//登录
			var link_login = 'http://mall.ofweek.com/login.html';
			//注册
			var link_register = 'http://mall.ofweek.com/register.html';
			//我的MALL
			var link_mall = '我的MALL对应的链接地址';
			//我的订单
			var link_order = '我的订单对应的链接地址';
			//我的收藏
			var link_cang = '我的收藏对应的链接地址';
			
			html = '';
			html += '<div class="container">';
			html += '	<div class="fl">';
			html += '		<span class="fl">欢迎来到 OFweek Mall</span>';
			html += '		<a href="'+link_login+'">登录</a><i>|</i><a href="'+link_register+'">注册</a>';
			html += '	</div>';
			html += '	<div class="fr">';
			html += '		<a href="'+link_mall+'">我的MALL</a><i>|</i><a href="'+link_order+'">我的订单</a><i>|</i><a href="'+link_cang+'">我的收藏</a>';
			html += '	</div>';
			html += '</div>';
			
			//网站头部登录信息
			var box = $('.header');
			if(box != undefined){
				box.html(html);//替换html代码
			}
		}
	});
}

/*!
 * OFweek MALL 会员退出登录
 * @author tan
 */
function logout(){
	document.location.href = 'http://mall.ofweek.com/logout.html';
}

$(function(){
	//alert('开始获取登录信息...');
	auth_member();//验证登录
});