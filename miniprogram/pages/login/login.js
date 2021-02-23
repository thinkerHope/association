// miniprogram/pages/login/login.js
const app = getApp();
import Toast from '../../dist/toast/toast';

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

  getUserInfo: function(e) {
    const that = this;
    // 获取用户信息
    wx.getSetting({
      success(res) {
        if (res.authSetting['scope.userInfo']) {
          console.log("已授权=====")
          wx.showToast({ // 提示加载,提高用户体验
            title: '登录中',
            icon: 'loading',
            mask: true,
            duration: 5000,
          })
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称
          // 若未授权调用getUserInfo会fail
          wx.getUserInfo({
            success(res) {
              console.log("获取用户信息成功", res)
              app.authApi.$login()
              .then(loginRes => {
                // 登录成功之后如果用户已经完善了信息则直接返回
                const { exists, skey } = loginRes
                if (loginRes) {
                  Toast.success('登录成功')
                  if (exists) {
                    wx.setStorageSync('userInfo', {
                      ...exists,
                      skey,
                    })
                    app.setUserInfo({
                      ...exists,
                      skey,
                    })
                  } else {
                    wx.setStorageSync('userInfo', {
                      ...res.userInfo,
                      skey,
                    })
                    app.setUserInfo({
                      ...res.userInfo,
                      skey,
                    })
                  }
                  wx.navigateBack()
                }
                wx.hideToast();
              })
            },
            fail(res) {
              wx.hideToast();
              console.log("获取用户信息失败", res)
            },
            complete() {
              wx.hideToast();
            }
          })
        } else {
          console.log("未授权=====")
        }
      }
    })
  },
})