// miniprogram/pages/search/search.js
const app = new getApp();
import Toast from '../../dist/toast/toast';
Page({
  /**
   * 页面的初始数据
   */
  data: {
    value: '',
    historyList: [],
    searchList: [{
      activityId: 1,
      activityCover: '../../assets/images/xkong_01.jpg',
      clubId: 1,
      activityName: '敬老院活动',
      userAvatar: '',
      userName: 'noaher',
      time: '2020-12-12',
      hot: true,
      activityPeople: 30,
    }],
    showHistoryList: true,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    wx.getStorage({
      key: 'historyList',
      success: (res) => {
        this.setData({
          historyList: res.data
        })
      }
    })
  },

  onSearch() {
    if (this.data.showHistoryList) {
      this.setData({
        showHistoryList: false,
      })
    }
    const val = this.data.value;
    if (!val) {
      return wx.showToast({
        title: "搜索内容不能为空",
        icon: 'none',
        duration: 1000,
      });
    }
    wx.showToast({
      icon: 'loading',
      duration: 3000,
    });
    wx.request({
      url: app.globalData.server_prefix + '/search/activity',
      method: 'GET',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      data: {
       name: val
      },
      success: (res) => {
        console.log(res)
        if (res.data.status == "success") {
          var list = res.data.data 
          if (!list.length) { 
            this.setData({
              searchList: list,
              page: 3, 
            })
          } else { // 若是传回来的数组为空,那就给用户一个提示
            Toast('查询为空');
          }
        }
        else {
          Toast.fail('');
        }
      }, fail: (res) => {
        Toast.fail('刷新失败');
      }, complete: (res) => {
        wx.hideToast();
      }
    })
  },
  onCancel() {
    wx.navigateBack();
  },
  onClear() {
    this.setData({
      showHistoryList: true,
    })
  },
  onChange(e) {
    this.setData({
      value: e.detail
    });
  },

  deleteHistoryItem(e) {
    const { index } = e.currentTarget.dataset;
    this.data.historyList.splice(index, 1)
    this.setData({
      historyList: this.data.historyList
    })
    wx.setStorage('historyList', this.data.historyList)
  },

  deleteAll() {
    this.setData({
      historyList: []
    })
    wx.setStorage('historyList', this.data.historyList)
  }

})