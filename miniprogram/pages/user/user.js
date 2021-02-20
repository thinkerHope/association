// miniprogram/pages/user/user.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 校验鉴权
   */
  userAuthorized() {
    wx.getSetting({
      success: data => {
        if (data.authSetting['scope.userInfo']) {
          var userInfoStorage = wx.getStorageSync("userInfo")
          this.setData({
            userInfo: userInfoStorage,
            condition: false
          })
        } else {
          this.setData({
            condition: true
          })
        }
      }
    })
  },

  /**
   * 校验登录态（验证登录是否过期）
   */
  checkLoginStatus: function() {
    wx.checkSession({
      success: res => {
        console.log(res, '登录未过期')
        this.userAuthorized();
      },
      fail: res => {
        console.log(res, '登录过期了')
        this.setData({
          condition: true
        })
      }
    })
  },

})