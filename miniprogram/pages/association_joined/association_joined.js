const { default: Toast } = require("../../dist/toast/toast")

// miniprogram/pages/association_joined/association_joined.js
const app = getApp()
Page({
  data: {
    userInfo: null,
    array: [],
  },

  onLoad: function (options) {
    const userInfo = wx.getStorageSync('userInfo')
    const associations = wx.getStorageSync('associations')
    this.setData({ userInfo })
    if (associations) {
      this.setData({ array: associations })
      return;
    }
    app.fetchAssociations(
      userInfo.userid,
      (data) => {
        console.log('data',data)
        this.setData({ array: data.associations })
        wx.setStorageSync('associations', [...data.associations])
      }
    )
  },

  onShow: function() {
    
  },

  view_club(e) {
    const associationName = e.currentTarget.dataset.associationName
    
    wx.navigateTo({
      url: `/pages/association_manage/association_manage?association_name=${associationName}`,
    })
  }
})