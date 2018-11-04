/*
 * @Author: mikey.zhang 
 * @Date: 2018-11-04 14:38:25 
 * @Last Modified by: mikey.zhang
 * @Last Modified time: 2018-11-04 15:48:16
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
    scrollbar: true
})

//ajax请求数据
ajax();

function ajax() {
    $.ajax({
        url: '/api/getData',
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
    $('.content').html(str);
}