/*
 * @Author: mikey.zhang 
 * @Date: 2018-11-04 14:38:25 
 * @Last Modified by: mikey.zhang
 * @Last Modified time: 2018-11-04 20:25:27
 */

//swiper轮播图
var mySwiper = new Swiper('.container', {
    //autoplay: true,
    slidesPerView: 3,
    slidesPerGroup: 3
})

//better-scaroll
var myBScroll = new BScroll('section', {
    probeType: 2,
    click: 2,
    //scrollbar: true
})

//ajax请求数据
var idx = 0;
ajax(0);

function ajax(idx) {
    $.ajax({
        url: '/api/getData?idx=' + idx,
        success: function(res) {
            res = JSON.parse(res);
            if (res.code === 0) {
                render(res.data);
            }
        }
    })
}

//数据渲染
function render(data) {
    var str = '';
    data.map(function(item) {
        str += `
            <dl>
                <dd>
                    <p>${item.tit}</p>
                    <p>${item.con}</p>
                    <p>${item.time}</p>
                </dd>
                <dt><img src="./images/${item.img}" alt=""></dt>
            </dl>
        `;
    })
    $('.content').append(str);
    myBScroll.refresh();
}

//上拉加载
myBScroll.on('scroll', function() {
    if (this.y < this.maxScrollY - 100) {
        $('.box').attr('up', '释放加载');
    } else if (this.y < 0 && this.y > this.maxScrollY - 100) {
        $('.box').attr('up', '上拉加载……');
    } else if (this.y > 0 && this.y < 70) {
        $('.box').attr('down', '下拉刷新……');
    } else if (this.y > 70) {
        $('.box').attr('down', '释放刷新');
    }
});
myBScroll.on('scrollEnd', function() {
    if ($('.box').attr('up') === '释放加载') {
        up();
        $('.box').attr('up', '上拉加载……');
    } else if ($('.box').attr('down') === '释放刷新') {
        down();
        $('.box').attr('down', '下拉刷新……');
    } else if (this.y > 70) {}
});

function up() {
    idx++;
    ajax(idx);
}

function down() {
    idx = 0;
    $.ajax({
        url: '/api/getData?idx=' + idx,
        success: function(res) {
            res = JSON.parse(res);
            if (res.code === 0) {
                render2(res.data);
            }
        }
    })
}

function render2(data) {
    var str = '';
    data.map(function(item) {
        str += `
            <dl>
                <dd>
                    <p>${item.tit}</p>
                    <p>${item.con}</p>
                    <p>${item.time}</p>
                </dd>
                <dt><img src="./images/${item.img}" alt=""></dt>
            </dl>
        `;
    })
    $('.content').html(str);
    myBScroll.refresh();
}