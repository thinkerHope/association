"use strict";
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
  
    act_array: [
      {
        activityId: 1,
        activityCover: '../../assets/images/xkong_01.jpg',
        clubId: 1,
        activityName: '敬老院活动',
        userAvatar: '',
        userName: 'noaher',
        time: '2020-12-12',
        hot: true,
        activityPeople: 30,
      } 
    ], 
    isScrollFresh: true, // 开启上拉刷新
  },

  jumpSearch(e) {
    wx.navigateTo({ url: '/pages/search/search' })
  },

  onPullDownRefresh: function() {
    console.log("用户下拉刷新")
    wx.showToast({
      title:"刷新中",
      icon: 'loading',
    })
    wx.request({
      url: app.globalData.server_prefix + '/get/activity/byPage',
      method: 'GET',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      data: {
        page: 0 
      },
      success: (res) => {
        console.log(res)
        if (res.data.status == "success") {
          var list = res.data.data
          this.setData({
            act_array: list,
            page:1,
            isselect:true 
          })
        }
        else {
          Toast.fail('刷新失败');
        }
      }, fail: (res) => {
        Toast.fail('刷新失败');
      }, complete: (res) => {
        wx.hideToast();
        wx.stopPullDownRefresh()
      }
    })
  },

  onReachBottom: function() {
    if (this.data.isScrollFresh){
      console.log("用户上拉加载")
      wx.showToast({
        icon: 'loading',
      })
      const pagedata = this.data.page + 1 // 获取最新页码数
      wx.request({
        url: app.globalData.myserver_prefix + '/get/activity/byPage',
        method: 'GET',
        header: {
          'content-type': 'application/x-www-form-urlencoded'
        },
        data: {
          page: pagedata // 上拉加载需要查询页数可变,每次+1,并且需要写回数组中(以拼接方式),页面大于查询页面会返回空数组需要判断
        },
        success: (res) => {
          console.log(res)
          if (res.data.status == "success") {
            var list = res.data.data
            if (list.length != 0) { 
              var oldData = this.data.act_array;
              console.log("拼接后的数组", oldData.concat(list))
              this.setData({
                act_array: oldData.concat(list),
                page: pagedata
              })
            } else { //若是传回来的数组为空,那就给用户一个提示
              Toast('已经到底了哦~');
            }
          }
          else {
            Toast.fail(res.data.data.errorMsg);
          }
        }, fail: (res) => {
          Toast.fail('刷新失败');
        }, complete: (res) => {
          wx.hideToast();
        }
      })
    }
  },
  
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQ0EsSUFBSSxHQUFHLEdBQUcsTUFBTSxFQUFFLENBQUM7QUFFbkIsSUFBSSxDQUFDLEVBRUosQ0FBQyxDQUFBIiwic291cmNlc0NvbnRlbnQiOlsiLy8gcGFnZXMvbWFpbi9tYWluLmpzXG52YXIgYXBwID0gZ2V0QXBwKCk7XG5cblBhZ2Uoe1xuICBcbn0pIl19