// pages/main/main.js
var app = getApp();

Page({
  data: {
    swiperList: [{
      id: 0,
      type: 'image',
      url: '../../assets/images/swiper_01.jpeg'
    }, {
      id: 1,
      type: 'image',
      url: '../../assets/images/swiper_02.jpeg'
    }, {
      id: 2,
      type: 'image',
      url: '../../assets/images/swiper_03.jpeg'
    }, {
      id: 3,
      type: 'image',
      url: '../../assets/images/swiper_04.jpeg'
    }, {
      id: 4,
      type: 'image',
      url: '../../assets/images/swiper_05.jpeg'
    }, {
      id: 5,
      type: 'image',
      url: '../../assets/images/swiper_06.jpeg'
    }],
  
    act_array:[
      {
        activityId: 1,
        activityCover: '',
        clubId: 1,
        activityName: '敬老院活动',
        userAvatar: '',
        userName: 'noaher',
        time: '2020-12-12',
        hot: true,
        activityPeople: 30,
      } 
    ], //list数据
  },

  
});