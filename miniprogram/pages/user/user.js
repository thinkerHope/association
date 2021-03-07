// miniprogram/pages/user/user.js
const app = getApp();
import Toast from '../../dist/toast/toast';
Page({
  /**
   * 页面的初始数据
   */
  data: {
    condition: true, // true-未登录
    userInfo: null,
  },

  onLoad: function() {

  },

  onShow: function() {
    // 判断登录态
    app.authApi.$check()
    .then(res => {
      if (res.retcode === 0) {
        const userInfo = app.globalData.userInfo
        this.setData({
          condition: false,
          userInfo
        })
      } else {
        this.setData({
          condition: true,
          userInfo: null
        })
      }
    })
    .catch(err => {
      console.log('err', err)
      this.setData({
        condition: true,
        userInfo: null
      })
    })
  },

  jumpUserMore() {
    if (this.checkLoginStatus()) {
      wx.navigateTo({
        url: '/pages/usermore/usermore',
      })
    }
  },
  jumpAssociationJoined() {
    this.checkUserJump('/pages/association_joined/association_joined')
  },
  jumpRegisAsso() {
    this.checkUserJump('/pages/association_register/association_register')
  },
  checkLoginStatus() {
    if (this.data.condition) {
      wx.navigateTo({
        url: '/pages/login/login',
      });
    }
    return !this.data.condition
  },
  checkInfoComplete() {
    if (!this.data.userInfo || this.data.userInfo.isInfoComplete !== 0) {
      Toast.fail('请先完善用户信息')
      return false
    }
    return true
  },
  checkUserJump(url) {
    if (this.checkLoginStatus() && 
        this.checkInfoComplete()
    ) {
      wx.navigateTo({ url })
    }
  },


  onPullDownRefresh: function () {
    // 校验一次登陆状态
    
  },
})