// miniprogram/pages/association/association.js
const app = getApp();
import Toast from '../../dist/toast/toast';
Page({
  /**
   * 页面的初始数据
   */
  data: {
    items: [],
    mainActiveIndex: 0,
    activeId: 0,
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
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    wx.showToast({
      icon:'loading',
    })
    wx.request({
      url: app.globalData.server_prefix + '/api/association/getAll',
      method: 'GET',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: (res) => {
        const { retcode, data = {} } = res.data;
        if (retcode === 0) {
          const types = data.types.map(item => {
            const { showName, type, list = [] } = item;
            return {
              text: showName,
              children: list.length ? list.map(item => {
                const { association_id: id, name } = item;
                return {
                  ...item,
                  text: name,
                  id,
                }
              }) : []
            }
          })
          this.setData({ items: types })
        }
      }, 
      fail: (res) => {
        console.log('res', res)
        Toast.fail('发生未知错误')
      }, 
      complete: (res) => {
        wx.hideToast();
      }
    })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})