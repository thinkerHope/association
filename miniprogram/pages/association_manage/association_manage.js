// miniprogram/pages/association_manage/association_manage.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    
  },

  onLoad: function (options) {
    console.log('options', options)
    this.setData({ associationName: options.association_name})
  },

  onShow: function () {

  },

  onPullDownRefresh: function () {

  },
})