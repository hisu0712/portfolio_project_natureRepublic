// header
const TopMenuSlide1 = new Swiper("#header .main-menu", {
    slidesPerView: 'auto', 
    spaceBetween: 10
})

$("#header .lang button").click(function(){
    $(this).addClass("active").siblings().removeClass("active"); 
    var tabId = $(this).data("tab");
    $("#header .main-menu #" + tabId).css("display", "inline-block").siblings().css("display", "none");
})

let lastScrollTop = 0;
const topNav = $("#header .top-nav");
const bottomNav = $("#header .bottom-nav");

$(window).scroll(function(){
    let scrollTop = $(this).scrollTop();
    let windowHeight = $(this).height(); // 현재 창(또는 브라우저의 높이)
    let documentHeight = $(document).height();
    let scrollBottom = documentHeight - (scrollTop + windowHeight) //현재 스크롤된 위치에서 현재 보이는 창의 높이를 더한 값
   
    if (scrollTop >= 82.12 && scrollBottom > 10) {
        if (scrollTop > lastScrollTop) {
            topNav.addClass("hidden");
            bottomNav.addClass("hidden");
        } else {
            topNav.removeClass("hidden");
            bottomNav.removeClass("hidden");
        }
        lastScrollTop = scrollTop;
    } else {
        topNav.removeClass("hidden");
        bottomNav.removeClass("hidden");
    }
});

$("#header .ad-area .btn-close").on("click", function(){
    $("#header .ad-area").addClass("hidden");
    $("body").addClass("no-ad"); 
})

// popup-search
$("#header .top-area .search").on("click", function(){
    $(".popup-view-search").addClass("on");
    $("body").addClass("hidden");
})
$(".popup-view-search .btn-back, .popup-view-search .btn-close").on("click", function(){
    $(".popup-view-search").removeClass("on");
    $("body").removeClass("hidden");
})

// sc-visual
const ScVisualSlide = new Swiper(".visual-slide", {
    loop: true,
    pagination: {
        el:".pagination",
        type: "custom",
        renderCustom: function (swiper, current, total) {
            current = (current<10)?'0'+current:current;
            total = (total<10)?'0'+total:total;
            return `<span>${current}</span><span>${total}</span>`;
        }
    }
})

// sc-keyword
const ScKeywordTablist = new Swiper(".sc-keyword .tablist", {
    slidesPerView: 'auto', 
})
const ScKeywordTab = new Swiper(".sc-keyword .cont-area", {
    slidesPerView: 'auto',
    spaceBetween: 10
})

$(".sc-keyword .tab").on("click", function(){
    var tabCate = $(this).data("tab");
    keywordList(tabCate);
    $(this).addClass("active").siblings().removeClass("active");
});

keywordList("keyword-all");

function keywordList(tabCate){
    fetch("./assets/js/data.json")
        .then(res=>res.json())
        .then(json=>{
            data = json.item; 

            sortData = data.filter(function(item){
                return item.cate.includes(tabCate);
            })

            let html = ``;

            sortData.forEach(el => {
                
                newEl = (el.new)?`<span class="new_m">NEW</span>`:'';

                let badgeListEl = ``;
                if(el.badge){
                    badgeList = el.badge;
                    badgeList.forEach(img => {
                        badgeListEl+= `<li><img src="${img}" alt></li>`;
                    });
                }

                html += 
                `<div class="swiper-slide prd-item">
                    <div class="inner">
                        <div class="thumb-area">
                            <a href="">
                                <img src="${el.thumb}" alt="${el.name}">
                                <ul class="badge-list type_bg">
                                    ${badgeListEl}
                                </ul>
                            </a>
                        </div>
                        <div class="text-area">
                            <a href="">
                                <div class="prd-mark">
                                    <span class="sale_m">${el.price.sale}%</span>
                                    ${newEl}
                                </div>
                                <div class="prd-name">${el.name}</div>
                                <div class="prd-price">
                                    <strong class="curr"><b>${el.price.curr.toLocaleString()}</b>원</strong>
                                    <span class="ori"><b>${el.price.ori.toLocaleString()}</b>원</span>
                                </div>
                            </a>
                        </div>
                        <div class="icon-area">
                            <a href="" aria-label="좋아요"><span class="icon-heart"></span></a>
                            <a href="" aria-label="장바구니"><span class="icon-basket"></span></a>
                        </div>
                    </div>
                </div>`

                $(".sc-keyword .cont-area .prd-list").html(html);
            });
        })
};

// sc-new_item
const ScNewSlide = new Swiper(".sc-new_item .swiper", {
    slidesPerView: 'auto', 
    spaceBetween: 10
})


// sc-membership
const ScMembershipSlide = new Swiper(".membership-slide", {
    slidesPerView: 'auto',
    navigation: {
        nextEl: ".btn-next"
    },
    pagination: {
        el:".pagination",
        type: "custom",
        renderCustom: function (swiper, current, total) {
            current = (current<10)?'0'+current:current;
            total = (total<10)?'0'+total:total;
            return `<span>${current}</span><span>${total}</span>`;
        }
    },
    effect: "coverflow",
    grabCursor: true,
    centeredSlides: true,
    coverflowEffect: {
        rotate: 0,
        stretch: -72,
        depth: 1200,
        modifier: 1,
        slideShadows: false,
    },
    on: {
        "slideChange": function(){
            ScMembershiptxtSlide.slideTo(this.realIndex)
        }
    }
})

const ScMembershiptxtSlide = new Swiper(".sc-membership .text-slide", {
    effect: "fade",
    allowTouchMove: false
});

const remainTime = $("#remain-time");
const hourFirst = document.querySelector(".sc-membership .hour-f");
const hourSecond = document.querySelector(".sc-membership .hour-s");
const minuteFirst = document.querySelector(".sc-membership .minute-f");
const minuteSecond = document.querySelector(".sc-membership .minute-s");
const secondFirst = document.querySelector(".sc-membership .second-f");
const secondSecond = document.querySelector(".sc-membership .second-s");

function diffDay() {
    const masTime = new Date("2024-06-30");
    const todayTime = new Date();

    const diff = masTime - todayTime;

    const diffHour = Math.floor((diff / (1000*60*60)) % 24);
    const diffMin = Math.floor((diff / (1000*60)) % 60);
    const diffSec = Math.floor(diff / 1000 % 60);

    const FormatHours = padZero(diffHour);
    const FormatMinutes = padZero(diffMin);
    const FormatSeconds = padZero(diffSec);

    hourFirst.textContent = FormatHours[0];
    hourSecond.textContent = FormatHours[1];
    minuteFirst.textContent = FormatMinutes[0];
    minuteSecond.textContent = FormatMinutes[1];
    secondFirst.textContent = FormatSeconds[0];
    secondSecond.textContent = FormatSeconds[1];
}

function padZero(num) {
    return num.toString().padStart(2, '0');
}

diffDay();
setInterval(diffDay, 1000);


// sc-best_item
$(".sc-best_item .tablist .tab").on("click", function(){
    var contIndex = $(this).data("tab");
    bestItemList(contIndex);
    $(this).addClass("active").siblings().removeClass("active");

    $(".sc-best_item .btn-more").removeClass("active");
    $(".sc-best_item .btn-more .more-ori").addClass("active").siblings().removeClass("active");
})

$(".sc-best_item .btn-more").on("click", function(){
    $(".sc-best_item .prd-item:nth-child(n+6)").slideToggle(300);
    $(".sc-best_item .btn-more").toggleClass("active");
    $(".sc-best_item .btn-more span.active").removeClass("active").siblings().addClass("active");
})

bestItemList(0);

function bestItemList(contIndex){
    fetch('./assets/js/best.json')
        .then(res=>res.json())
        .then(json=>{
            
            arr = [json.liveList, json.weeklyList];

            data = arr[contIndex];

            let html =``;

            data.forEach(el => {
                html+= 
                `<li class="prd-item">
                    <a href="" class="inner">
                        <div class="thumb-area">
                            <span class="rank">${el.rank}</span>
                            <img src="${el.thumb}" alt="${el.name}">
                        </div>
                        <div class="text-area">
                            <div class="prd-name">${el.name}</div>
                            <div class="prd-price">
                                <strong class="sale"><b>${el.price.sale}</b>%</strong>
                                <strong class="curr"><b>${el.price.curr.toLocaleString()}</b>원</strong>
                                <span class="ori"><b>${el.price.ori.toLocaleString()}</b>원</span>
                            </div>
                        </div>
                    </a>
                </li>`
    
                $(".sc-best_item .prd-list").html(html);
            });
        });
}

// sc-review
const ScReviewSlide = new Swiper(".review-slide", {
    slidesPerView: 'auto', 
});

for(var i=1; i < 5; i++){
    var swiper = document.querySelector(".popup-view.popup-review .swiper-review-" + i);
    var pagination = swiper.querySelector(".pagination");

    const ScReviewPopup = new Swiper(swiper, {
        pagination: {
            el: pagination
        }
    });
};

$(".sc-review .popup-open").click(function(e){
    e.preventDefault();
    var popupId = $(this).data("popup");
    $(".popup-view.popup-review #" + popupId).css("display", "block").siblings().css("display", "none");
    $(".popup-view.popup-review").css("opacity", "1");
    $(".popup-view.popup-review").css("visibility", "visible");
    $("body").css("overflow", "hidden");
});

// footer 
$("#footer .ad-area .btn-close").click(function(){
    $("#footer .ad-area").css("display", "none");
})
// footer popup
$("#footer .footer-notice .popup-open-notice").click(function(){
    $("#footer .popup-view.popup-notice").css("opacity", "1");
    $("#footer .popup-view.popup-notice").css("visibility", "visible");
    $("body").css("overflow", "hidden");
})  
$("#footer .footer-notice .popup-open-media").click(function(){
    $("#footer .popup-view.popup-media").css("opacity", "1");
    $("#footer .popup-view.popup-media").css("visibility", "visible");
    $("body").css("overflow", "hidden");
})  
$("#footer .popup-view .popup-close").click(function(){
    $("#footer .popup-view").css("opacity", "0");
    $("#footer .popup-view").css("visibility", "hidden");
    $("body").css("overflow", "visible");
})  
