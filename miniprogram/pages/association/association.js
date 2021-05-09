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

  onLoad: function (options) {
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
              children: [
                { text: '羽毛球协会', id: 1 },
                { text: '轮滑协会', id: 2 },
                { text: '乒乓球协会', id: 3 },
                { text: '篮球协会', id: 4 },
                { text: '斯诺克协会', id: 5 },
                { text: '网球协会', id: 6 },
              ]
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

  onClickNav({ detail = {} }) {
    this.setData({
      mainActiveIndex: detail.index || 0,
    });
  },

  onClickItem({ detail = {} }) {
    const { name } = detail
    
    
    this.setData({ activeId });
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },
})