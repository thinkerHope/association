// miniprogram/pages/association_manage/association_manage.js
const app = getApp();
import Dialog from '../../dist/dialog/dialog';
Page({
  /**
   * 页面的初始数据
   */
  data: {
    associationInfo: '',
    members: [],
    showPopup: false,
    tab: 'intruc',
    showName2Key: {
      name: '社团名称',
      type: '社团类型',
      academy: '所属学院',
      qq: '官方qq',
      desc: '社团描述',
    },
    keys: ['name', 'type', 'academy', 'qq', 'desc'],
    columns: ['管理学院', '经济学院', '计算机与通信工程学院', '控制工程学院', '外国语文化学院','数学与统计学院','资源与材料学院'],
    type_columns: ['公益类', '传统类', '音乐类', '舞蹈类', '文学类', '美术类', '科技类', '学术类', '语言类'],
  },

  onLoad: function (options) {
    const userid = app.globalData.userInfo.userid;
    const name = options.association_name;
    if (!userid || !name) {
      return;
    }
    wx.setNavigationBarTitle({ title: name })
    const association = app.globalData.my_associations.find(i => i.name === name);
    this.setData({ associationInfo: association })
  },
  
  editAssoInfo(e) {
    const { title, value, type } = e.currentTarget.dataset
    wx.navigateTo({
      url: `/pages/edit/edit?title=${title}&value=${value}&type=${type}`,
    })
  },

  onTabChange(event) {
    this.setData({ tab: event.detail.name })
  },

  onPullDownRefresh: function () {

  },
})