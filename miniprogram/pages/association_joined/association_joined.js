const { default: Toast } = require("../../dist/toast/toast")

// miniprogram/pages/association_joined/association_joined.js
const app = getApp()
Page({
  data: {
    userInfo: null,

    array: [],
  },

  onLoad: function (options) {
    console.log('onLoad')
    const userInfo = wx.getStorageSync('userInfo')
    this.setData({ userInfo })
  },

  onShow: function() {
    const { userid } = this.data.userInfo
    app.authApi.$request(
      app.globalData.server_prefix + '/api/association/get',
      { userid },
      'POST',
    ).then(res => {
      const { retcode, data } = res
      if (retcode !== 0) {
        Toast.fail('发生错误')
        return
      }
      this.setData({
        array: data.associations
      })
    })
  }
})