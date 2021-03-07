// miniprogram/pages/edit/edit.js
const app = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    title: '',
    value: '',
    type: '',
    showBtn: false,
    originVal: '',

    autosize: { maxHeight: 100, minHeight: 50 },
  },

  onLoad: function (options) {
    const { title, value, type } = options
    wx.setNavigationBarTitle({ title })
    this.setData({ title, value, type, originVal: value })
  },
  onSubmit(e) {
    const value = this.data.value;
    const originVal = this.data.originVal;
    if (value !== originVal) {
      app.authApi.$request(
        
      )
    }
  },
  onChange(e) {
    this.setData({ showBtn: true })
    this.setData({ 
      value: e.detail.value 
    })
  }
})