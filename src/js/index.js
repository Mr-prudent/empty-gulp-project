$(function () {

  let indexPage = GetQueryString("tabs");

  let initialSlideNum = 0;

  if (indexPage == 'free') {
    initialSlideNum = 0;
  } else if (indexPage == 'month') {
    initialSlideNum = 1;
  } else if (indexPage == 'quarter') {
    initialSlideNum = 2;
  } else if (indexPage == 'year') {
    initialSlideNum = 3;
  } else if (indexPage == 'year-s') {
    initialSlideNum = 4;
  }

  const mySwiper = new Swiper('.swiper-container', {
    loop: true,
    slidesPerView: 3,
    initialSlide: initialSlideNum,
    slideToClickedSlide: true,
    centeredSlides: true,
    spaceBetween: -20,
    on: {
      slideChangeTransitionEnd: getActiveType
    },
  })
})


function getActiveType() {
  let activeType = ''
  let activeClass = $('.swiper-slide-active').attr('class');
  if (activeClass.indexOf('year-s') > 0) {
    activeType = 'year-s'
  } else if (activeClass.indexOf('month') > 0) {
    activeType = 'month'
  } else if (activeClass.indexOf('quarter') > 0) {
    activeType = 'quarter'
  } else if (activeClass.indexOf('year') > 0) {
    activeType = 'year'
  } else if (activeClass.indexOf('free') > 0) {
    activeType = 'free'
  }
  setTableData(activeType)
}

function setTableData(type) {
  const tableData = {
    'free': {
      'name': '免费VIP',
      'data-ex-times': '10',
      'data-ex-nums': '500',
      'data-has-phone': '每天限10次',
      'data-tools': '累计3个文档',
      'data-equity-inquiry': '20次/天',
      'data-sign': '无',
      'data-top': '无',
      'data-price': '0元/月'
    },
    'month': {
      'name': '包月VIP',
      'data-ex-times': '20',
      'data-ex-nums': '5000',
      'data-has-phone': '有电话',
      'data-tools': '累计20个文档',
      'data-equity-inquiry': '不限',
      'data-sign': 'VIP标志',
      'data-top': '置顶',
      'data-price': '50元/月'
    },
    'quarter': {
      'name': '包季VIP',
      'data-ex-times': '20',
      'data-ex-nums': '5000',
      'data-has-phone': '有电话',
      'data-tools': '累计20个文档',
      'data-equity-inquiry': '不限',
      'data-sign': 'VIP标志',
      'data-top': '置顶',
      'data-price': '128元/季'
    },
    'year': {
      'name': '包年VIP',
      'data-ex-times': '20',
      'data-ex-nums': '5000',
      'data-has-phone': '有电话',
      'data-tools': '累计20个文档',
      'data-equity-inquiry': '不限',
      'data-sign': 'VIP标志',
      'data-top': '置顶',
      'data-price': '398元/年'
    },
    'year-s': {
      'name': '包年SVIP',
      'data-ex-times': '50',
      'data-ex-nums': '10000',
      'data-has-phone': '有电话',
      'data-tools': '不限',
      'data-equity-inquiry': '不限',
      'data-sign': 'VIP标志',
      'data-top': '置顶',
      'data-price': '998元/年'
    },
  }
  for (let i in tableData[type]) {
    $(`.${i}`).text(tableData[type][`${i}`]);
  }
  $('.pj-name').text(tableData[type]['name']);
}


function GetQueryString(name) { 
  var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i"); 
  var r = window.location.search.substr(1).match(reg);
  var context = ""; 
  if (r != null) 
       context = r[2]; 
  reg = null; 
  r = null; 
  return context == null || context == "" || context == "undefined" ? "" : context; 
}
