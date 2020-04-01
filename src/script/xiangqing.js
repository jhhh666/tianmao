!function($){
    let $sid = location.search.substring(1).split('=')[1];
    console.log($sid);
    const $small = $('#smallpic');
    const $big = $('#bpic');
    const $title = $('.loadtitle');
    const $price = $('.loadpcp');

    // 如果sid为空则默认为1
    if(!$sid){
        $sid = 1;
    }

    //传输数据给后端
    $.ajax({
        url:'http://localhost/tianmao/php/getsid.php',
        data:{
            sid:$sid
        },
        dataType:'json'
    }).done(function(data){
        console.log(data);
        $small.attr('src',data.url);
        $big.attr('src',data.url);
        $small.attr('sid', data.sid);
        $title.html(data.title);
        $price.html(data.price);
        console.log(data.xiaotu);
        //渲染小图
        let $listpic = data.xiaotu.split(',');
        let $str = '';
        $.each($listpic,function(index,value){
            $str +='<li><img src="' + value + '"/>></li>';
        });
        $('#list ul').html($str);
    });

    //放大镜效果
    const $spic = $('#spic');//小盒子
    const $sf = $('#sf');
    const $bf = $('#bf');
    const $left = $('#left');
    const $right = $('#right');
    const $list = $('#list');

    $sf.width($spic.width()*$bf.width()/$big.width());
    $sf.height($spic.height()*$bf.height()/$big.height());
    let $bili = $big.width()/$spic.width();

    $spic.hover(function(){
        $sf.css('visibility', 'visible');
        $bf.css('visibility', 'visible');
        $(this).on('mousemove',function(ev){
            let $leftvalue = ev.pageX - $('.goodsinfo').offset().left - $sf.width() / 2;
            let $topvalue = ev.pageY - $('.goodsinfo').offset().top - $sf.height() / 2;
            //限制在小图内
            if($leftvalue<0){
                $leftvalue=0;
            }else if ($leftvalue>=$spic.width()-$sf.width()){
                $leftvalue = $spic.width()-$sf.width();
            }
            if($topvalue<0){
                $topvalue= 0 ;
            }else if ($topvalue>=$spic.height()-$sf.height()){
                $topvalue = $spic.height()-$sf.height();
            }

            $sf.css({
                left: $leftvalue,
                top: $topvalue
            });

            $big.css({
                left: -$leftvalue * $bili,
                top: -$topvalue * $bili
            });
        })
    }, function () {
        $sf.css('visibility', 'hidden');
        $bf.css('visibility', 'hidden');
    });

    //小图切换
    //事件委托
    $('#list ul').on('click','li',function(){
        let $imgurl = $(this).find('img').attr('src');
        $small.attr('src',$imgurl);
        $big.attr('src',$imgurl);
    });

    //左右箭头
    let $num = 6;
    $right.on('click', function () {
        let $lists = $('#list ul li');
        if ($lists.size() > $num) {
            $num++;
            $left.css('color', '#333');
            if ($lists.size() == $num) {
                $right.css('color', '#fff');
            }
            $('#list ul').animate({
                left: -($num - 6) * $lists.eq(0).outerWidth(true)
            });
        }
    });

    $left.on('click', function () {
        let $lists = $('#list ul li');
        if ($num > 6) {
            $num--;
            $right.css('color', '#333');
            if ($num <= 6) {
                $left.css('color', '#fff');
            }
            $('#list ul').animate({
                left: -($num - 6) * $lists.eq(0).outerWidth(true)
            });
        }
    });


    //存储
    let arrsid = [];
    let arrnum = [];
    function cookietoarray() {
        if (jscookie.get('cookiesid') && jscookie.get('cookienum')) {
            arrsid = jscookie.get('cookiesid').split(',');//获取cookie 同时转换成数组。[1,2,3,4]
            arrnum = jscookie.get('cookienum').split(',');//获取cookie 同时转换成数组。[12,13,14,15]
        } else {
            arrsid = [];
            arrnum = [];
        }
    }
    $('.p-btn a').on('click', function () {
        let $sid = $(this).parents('.goodsinfo').find('#smallpic').attr('sid');
        cookietoarray();
        if ($.inArray($sid, arrsid) != -1) {
            let $num = parseInt(arrnum[$.inArray($sid, arrsid)]) + parseInt($('#count').val());//取值
            arrnum[$.inArray($sid, arrsid)] = $num;
            jscookie.add('cookienum', arrnum, 10);
        } else {
            arrsid.push($sid);
            jscookie.add('cookiesid', arrsid, 10);
            arrnum.push($('#count').val());
            jscookie.add('cookienum', arrnum, 10);
        }
    });
}(jQuery);