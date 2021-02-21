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

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
  },

  onShow: function() {
    console.log(app.authApi)
  }


  // 一键登陆
  

})