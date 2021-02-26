// miniprogram/pages/user/user.js
const app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    condition: true, // true-未登录
    userInfo: null,
  },

  onLoad: function() {

  },

  onShow: function() {
    // 判断登录态
    app.authApi.$check()
    .then(res => {
      if (res.retcode === 0) {
        const userInfo = app.globalData.userInfo
        this.setData({
          condition: false,
          userInfo: userInfo
        })
      } else {
        this.setData({
          condition: true,
          userInfo: null
        })
      }
    })
    .catch(err => {
      console.log('err', err)
      this.setData({
        condition: true,
        userInfo: null
      })
    })
  },

  jumpUserMore() {
    this.checkStatus()
    wx.navigateTo({
      url: '/pages/usermore/usermore',
    })
  },
  jumpAssociationJoined() {
    this.checkStatus()
    wx.navigateTo({
      url: '/pages/association_joined/association_joined',
    })
  },
  checkStatus() {
    if (this.condition) {
      wx.navigateTo({
        url: '/pages/login/login',
      });
      return;
    }
  },


  onPullDownRefresh: function () {
    // 校验一次登陆状态
    
  },
})