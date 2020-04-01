!function($){
    let	strhtml = '';
	function xuanran(sid,num) {
		$.ajax ({
			url:'http://localhost/tianmao/php/alldata.php',
			dataType: 'json',
			async:false,
		}).done ( function (d) {
			$.each(d, function (index,value) {
				if (sid == value.sid) {
						strhtml = `
							<div class="list">
								<input class="check" type="checkbox"/>
								<div class ="list_img"><img src = "${value.url}" sid=${sid}></div>
								<p class ="list_title">${value.title}</p>
								<p class ="list_dianpu">${value.dianpu}</p>
								<p class ="list_price">￥${value.price}</p>
								<p class ="number"><span>${num}</span>件</p>
								<p class ="xiaoji"><span>${value.price * num}</span>元</p>
								<p class ="del">删除</p>
							</div>
						`;
					$('.main').append(strhtml);
					allprice();
				}
			})
		});
		
	}
	
	if(jscookie.get('cookiesid') && jscookie.get('cookienum')) {
		let s = jscookie.get('cookiesid').split(',');
		let n = jscookie.get('cookienum').split(',');
		
		$.each(s,function (index, value) {
			xuanran(s[index],n[index]); 
		});
	}
	
	
	//计算商品总价的函数
	function allprice() {
		//商品的单价和数量;
		let $sum = 0;
		let $count = 0;
		$('.list').each(function (index,ele) {
			if($(ele).find('.check').prop('checked')) {
				$sum += parseInt($(ele).find('.number span').html());
				$count += parseInt($(ele).find('.xiaoji span').html());
			}
			$('.sumnum').html($sum);
			$('.allprice').html($count);
		});
	};
	
	
	//复选框的效果
	$('.quanxuan').on('change',function () {
		$('.list').find('.check').prop('checked',$(this).prop('checked'));
		$('.quanxuan').prop('checked',$(this).prop('checked'))
		allprice();
	});
	
	$('.main').on('change',$('.check'),function () {
		if($('.list').find('.check:checked').size() == $('.list').find('.check').size()){
			$('.quanxuan').prop('checked','checked');
		}else {
			$('.quanxuan').prop('checked',false);
		}
		allprice();
	})
	
	//定义一个把cookie转成数组的函数
	let arrsid = [];
	let arrnum = [];
	function cookietoarray() {
		if(jscookie.get('cookiesid') && jscookie.get('cookienum')) {
			arrsid = jscookie.get('cookiesid').split(',');
			arrnum = jscookie.get('cookienum').split(',');
		}else {
			arrsid = [];
			arrnum = [];
		}
	}
		
	//删除cookie的函数
	function delcookie(sid,arrsid) {
		let $index = -1;
		$.each(arrsid,function (index,value) {
			if(sid === value) {
				$index = index;
			}
		});
		arrsid.splice($index,1);
		arrnum.splice($index,1);
		
		jscookie.add('cookiesid',arrsid,15);
		jscookie.add('cookienum',arrnum,15);
	}
	
	//删除效果
	let $del = $('.list .del');
	$del.on('click',function () {
		if(window.confirm('确定要删除吗？')) {
			$(this).parent('.list').remove()
			console.log($(this).parent('.list').find('img').attr('sid'));
			cookietoarray();
			delcookie($(this).parent('.list').find('img').attr('sid'),arrsid);
			allprice();
		}
	});
}(jQuery);