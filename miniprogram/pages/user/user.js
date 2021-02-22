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

  onShow: function() {
    // 判断登录态
    app.authApi.$check()
    .then(res => {
      if (res.retcode === 0) {
        this.setData({
          condition: false,
          userInfo: app.globalData.userInfo
        })
      } else {
        this.setData({
          condition: true
        })
      }
    })
    .catch(err => {
      console.log('err', err)
      this.setData({
        condition: true
      })
    })
  },

  getUserInfo: function(e) {
    const that = this;
    // console.log(e)
    // 获取用户信息
    wx.getSetting({
      success(res) {
        // console.log("res", res)
        if (res.authSetting['scope.userInfo']) {
          console.log("已授权=====>")
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称
          // 若未授权调用getUserInfo会fail
          wx.getUserInfo({
            success(res) {
              console.log("获取用户信息成功", res)
              
            },
            fail(res) {
              console.log("获取用户信息失败", res)
            }
          })
        } else {
          console.log("未授权=====>")
          
        }
      }
    })
  },

  jumpUserMore() {
    this.checkStatus()
    wx.navigateTo({
      url: '/pages/usermore/usermore',
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