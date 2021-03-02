// miniprogram/pages/association_manage/association_manage.js
const app = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    
  },

  onLoad: function (options) {
    const userid = app.globalData.userInfo.userid;
    const name = options.association_name;
    const associations = wx.getStorageSync('associations')
    if (!userid || !name) {
      return;
    }
    if (associations) {
      const asso = associations.find(i => i.name === name)
      
       
    } else {
      app.authApi.$request(
        app.globalData.server_prefix + '/api/association/getOne',
        { userid, name },
        'POST',
        { header: { 'content-type': 'application/json;charset=UTF-8' }, }
      ).then(res => {
        // 判断是否为管理员

        console.log('res',res)
      })
    }
  },

  onShow: function () {

  },

  onPullDownRefresh: function () {

  },
})