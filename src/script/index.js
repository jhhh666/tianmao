!function($){
    // 轮播图
    const $lunbo = $('.lunbo');
    const $pics = $('.lunbo ul li');
    const $btns = $('.lunbo ol li');
    let $index = 0;
    let $timer=null;
    $btns.on('mouseover',function(){
        $(this).addClass('active').siblings('li').removeClass('active');
        $pics.css({
            opacity:0
        })
        $pics.eq($(this).index()).css({
            opacity: 1
        })
        $index=$(this).index();
        // console.log($index);
    })
     $timer = setInterval(() => {
        $index++;
        if($index>$btns.length-1){
           $index=0;
        }
        $btns.eq($index).addClass('active').siblings('li').removeClass('active');
        $pics.css({
            opacity:0
        })
        $pics.eq($index).css({
            opacity: 1
        })
    }, 2000);
    $lunbo.on('mouseover',function(){
       clearInterval($timer)
    })
    $lunbo.on('mouseout',function(){
        $timer = setInterval(() => {
            $index++;
            if($index>$btns.length-1){
               $index=0;
            }
            $btns.eq($index).addClass('active').siblings('li').removeClass('active');
            $pics.css({
                opacity:0
            })
            $pics.eq($index).css({
                opacity: 1
            })
        }, 2000);
    })
    // 二级侧边栏
    let $side = $('.side li');
    let $cartlist = $('.cartlist');
    let $item = $('.cartlist .item');
    $side.on('mouseover',function(){
        $cartlist.show();
        $item.eq($(this).index()).show().siblings('.item').hide();
    })
    $side.on('mouseout',function(){
        $cartlist.hide();
    })
    $cartlist.on('mouseover',function(){
        $(this).show();
    })
    $cartlist.on('mouseout',function(){
        $(this).hide();
    })
    // 渲染数据
    const $likes = $('.like');
    $.ajax({
        url:'http://localhost/tianmao/php/alldata.php',
        dataType:'json'
    }).done(function(data){
        console.log(data);
        let $strhtml = '<ul>';
        $.each(data, function (index, value) {
            $strhtml += `
                <li>
                <img class="lazy" data-original="${value.url}" width="185" height="185"/>
                        <p>${value.sid}${value.title}</p>
                        <span class="price">￥${value.price}</span>
                        <span>销量：${value.xiaoliang}</span>
                    </a>
                </li>
            `;
        });
        $strhtml += '</ul>';
        $likes.html($strhtml);
        // 懒加载
        let array_default = [];
        let array = [];
        let prev = null;
        let next = null;
        $(function () {
            $("img.lazy").lazyload({ effect: "fadeIn" });
        });
        array_default = [];
        array = [];
        prev = null;
        next = null;
        $('.like li').each(function (index, element) {
            array[index] = $(this);
            array_default[index] = $(this);
        });
    });
}(jQuery)