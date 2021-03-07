// miniprogram/pages/usermore/usermore.js
import Dialog from '../../dist/dialog/dialog';
import Toast from '../../dist/toast/toast';
import regeneratorRuntime from '../../utils/runtime';
const app = getApp()
// miniprogram/pages/association_register/association_register.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: '',

    association_name: '',
    association_desc: '',
    association_type: '',
    association_academy: '',
    association_qq: '',
    avatarUrl: '',
    avatarFile: '',

    is_open_type_pop: '',
    is_open_pop: '',

    columns: ['管理学院', '经济学院', '计算机与通信工程学院', '控制工程学院', '外国语文化学院','数学与统计学院','资源与材料学院'],
    type_columns: ['公益类', '传统类', '音乐类', '舞蹈类', '文学类', '美术类', '科技类', '学术类', '语言类'],
    type_map: {
      '公益类': 'charity',
      '体育类': 'sports',
      '传统类': 'tradition',
      '音乐类': 'music',
      '舞蹈类': 'dance',
      '文学类': 'literature',
      '美术类': 'arts',
      '科技类': 'technology',
      '学术类': 'academic',
      '语言类': 'language'
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const userInfo = wx.getStorageSync('userInfo')
    this.setData({ userInfo })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  afterRead(e) {
    const { file } = e.detail;
    this.setData({
      avatarUrl: file.path,
      avatarFile: file
    })
  },

  onsubmit() {
    const { 
      association_name, 
      association_desc, 
      association_type, 
      association_academy, 
      association_qq, 
      avatarFile 
    } = this.data;
    if (
      !association_name ||
      !association_desc ||
      !association_type ||
      !association_academy ||
      !association_qq ||
      !avatarFile
    ) {
      Dialog.alert({
        title: '完善信息失败',
        message: '请完善信息后再尝试'
      }).then(() => {
        // on close
      })
    } else {
      console.log('注册中...')
      // wx.showToast({
      //   title: '注册中',
      //   icon: 'loading',
      //   duration: 10000,
      //   mask: true
      // })
      const { userid } = this.data.userInfo
      const url = `${app.globalData.server_prefix}/api/association/create`;
      const filePath = avatarFile.path
      const formData = {
        userid,
        association_name, 
        association_desc, 
        association_type: this.data.type_map[association_type], 
        association_academy, 
        association_qq,
      }

      app.authApi.$upload(
        url,
        filePath,
        formData
      )
      .then(res => {
        Toast.success('创建成功')
        wx.navigateTo({
          url: '/pages/association_joined/association_joined',
        })
        wx.hideLoading();
      })
      .catch(err => {
        wx.hideLoading()
        Toast.fail('注册失败')
      })
    }
  },

  /** 分割====================================================================线 */
  onConfirmPicker(event) {
    this.setData({
      association_academy: event.detail.value,
      is_open_pop: false
    });
  },
  onCanclePicker() {
    this.setData({
      is_open_pop: false
    });
  },
  // 控制是否弹出社团选项
  showPopup() {
    this.setData({ is_open_pop: true });
  },
  onClosePop() {
    this.setData({ is_open_pop: false });
  },

  // 控制选择社团类型确认与取消
  onConfirmPicker_type(event) {
    this.setData({
      association_type: event.detail.value,
      is_open_type_pop: false
    });
  },
  onCanclePicker_type() {
    this.setData({
      is_open_type_pop: false
    });
  },
  //控制是否弹出类型选项
  show_type_Popup() {
    this.setData({ is_open_type_pop: true });
  },
  onClose_type_Pop() {
    this.setData({ is_open_type_pop: false });
  },

  // 输入值绑定
  input_club_name(event) {
    this.setData({ association_name: event.detail });
  },
  input_club_detail(event) {
    this.setData({ association_desc: event.detail });
  },
  input_club_qqnum(event) {
    this.setData({ association_qq: event.detail });
  },


})