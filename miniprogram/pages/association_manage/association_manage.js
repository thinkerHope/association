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
    members: [
      { userClass: '信管1701', userName: '张三岁', userInstitute: '管理学院', userPhone: '1312312411', userAvatar: '../../assets/images/defaultAvatar_woman.png' },
      { userClass: '信管1702', userName: '嘉琪', userInstitute: '管理学院', userPhone: '1235423453', userAvatar: '../../assets/images/defaultAvatar_man.jpg' },
      { userClass: '信管1701', userName: '李四岁', userInstitute: '管理学院', userPhone: '2143545232', userAvatar: '../../assets/images/defaultAvatar_woman.png'  },
      { userClass: '信管1703', userName: '王五岁', userInstitute: '管理学院', userPhone: '5123513442', userAvatar: '../../assets/images/defaultAvatar_woman.png'  },
      { userClass: '信管1702', userName: '刘三岁', userInstitute: '管理学院', userPhone: '2342342345', userAvatar: '../../assets/images/defaultAvatar_man.jpg'  },
      { userClass: '信管1701', userName: '李磊', userInstitute: '管理学院', userPhone: '13713421342', userAvatar: '../../assets/images/defaultAvatar_woman.png'  },
    ],
    act_array: [
      { activityId: 1, activityEndtime: '2020-10-05', activityDescribe: '草滩敬老院，陪老爷爷老奶奶聊天', activityName: '敬老院活动', activityCover: '../../assets/images/haibao_01.jpeg' },
      { activityId: 2, activityEndtime: '2020-10-06', activityDescribe: '在全市最著名的河道畅游', activityName: '小汤河游泳比赛', activityCover: '../../assets/images/haibao_02.jpeg' },
      { activityId: 3, activityEndtime: '2020-10-07', activityDescribe: '咚咚咚咚咚咚', activityName: '阅读会', activityCover: '../../assets/images/haibao_03.jpeg' },
    ]
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

  jumpToActDetail(e) {
    wx.navigateTo({
      url: `/pages/act_detail/act_detail`,
    })
  },

  onTabChange(event) {
    this.setData({ tab: event.detail.name })
  },

  onPullDownRefresh: function () {

  },
})