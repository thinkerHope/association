// miniprogram/pages/usermore/usermore.js
const app = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    starttime:'',
    endtime:'',
    
    columns: ['管理学院', '经济学院', '计算机与通信工程学院', '控制工程学院', '外国语文化学院','数学与统计学院','资源与材料学院'],
    is_open_pop:false,
    class:'',
    username: '',
    phone:'',
    sno:'',
    academy:'',
    avatar: '',
  },


  onConfirmPicker(event){
    console.log(event)
    this.setData({ 
      academy: event.detail.value,
      is_open_pop:false
    });
  },
  onCanclePicker(){
    this.setData({
      is_open_pop: false
    });
  },

  showPopup(){
    this.setData({ is_open_pop: true });
  },
  onClosePop() {
    this.setData({ is_open_pop: false });
  },

  onChangePicker(event) {
    console.log(event)
    const { picker, value, index } = event.detail;
  },

  // 绑定输入框
  input_user_name(e){
    this.setData({
      username:e.detail
    })
  },
  input_user_class(e) {
    this.setData({
      class: e.detail
    })
  },
  input_user_phone(e) {
    this.setData({
      phone: e.detail
    })
  },
  input_user_student_number(e) {
    this.setData({
      sno: e.detail
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (app.globalData.userInfo) {
      this.setData({
        avatar: app.globalData.userInfo.avatarUrl 
      })
    }
  },
 
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    
  },

})