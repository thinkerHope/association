const { default: Toast } = require("../../dist/toast/toast")

// miniprogram/pages/association_joined/association_joined.js
const app = getApp()
Page({
  data: {
    userInfo: null,
    array: [],
    loadModal: true
  },

  onLoad: function (options) {
    const userid = app.globalData.userInfo.userid
    if (userid) {
      app.fetchJoinedAssociations(
        userid,
        (data) => {
          const _associations = data.associations.map(item => {
            item.joinning = Array.isArray(item.joinning) ? item.joinning : [item.joinning]
            item.identity = item.joinning.find(i => i.userId === userid).identity
            return item;
          })
          app.globalData.my_associations = _associations;
          this.setData({ 
            loadModal: false,
            array: _associations
          })
        }
      )
    }
  },

  view_club(e) {
    const associationName = e.currentTarget.dataset.associationName
    const association = this.data.array.find(i => i.name === associationName)
    const identity = association.identity;
    if (identity === 0) {
      wx.navigateTo({
        url: `/pages/association_manage/association_manage?association_name=${associationName}`,
      })
    } else if (identity === 1) {
      wx.navigateTo({
        // url: `/pages/association_manage/association_manage?association_name=${associationName}`,
      })
    }
  }
})