// miniprogram/pages/usermore/usermore.js
import Dialog from '../../dist/dialog/dialog';
import Toast from '../../dist/toast/toast';
import regeneratorRuntime from '../../utils/runtime';
const app = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    columns: ['管理学院', '经济学院', '计算机与通信工程学院', '控制工程学院', '外国语文化学院','数学与统计学院','资源与材料学院'],
    is_open_pop: false,
    userclass:'',
    username: '',
    sno: '',
    academy:'',
    avatarUrl: '',
    avatarFile: ''
  },

  onConfirmPicker(event){
    console.log(event)
    this.setData({ 
      academy: event.detail.value,
      is_open_pop: false
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
      username: e.detail
    })
  },
  input_user_class(e) {
    this.setData({
      userclass: e.detail
    })
  },
  input_user_student_number(e) {
    this.setData({
      sno: e.detail
    })
  },

  afterRead(event) {
    const { file } = event.detail;
    // file.path 是小程序的临时文件，只有在小程序中有用，在浏览器中是展示不了的
    this.setData({
      avatarUrl: file.path,
      avatarFile: file
    })
  },

  onsubmit(e) {
    const that = this
    const { userclass, username, sno, academy } = this.data;
    if (
      !userclass||
      !username ||
      !sno ||
      !academy
    ) {
      Dialog.alert({
        title: '完善信息失败',
        message: '请完善信息后再尝试'
      }).then(() => {
        // on close
      })
    } else {
      const userInfo_ = wx.getStorageSync('userInfo');
      const newUser = {
        userid: userInfo_.userid,
        username,
        userclass,
        sno,
        academy,
       };
      console.log('[newUser]: ', newUser)

      app.authApi.$request(
        app.globalData.server_prefix + '/api/user/update/basic',
        newUser,
        'POST',
        { header: { 'content-type': 'application/json;charset=UTF-8' }, }
      )
      .then(async res => {
        const { retcode } = res
        if (retcode === 3004) {
          Toast.fail('登录过期，请重新登录')
          setTimeout(() => {
            wx.navigateTo({
              url: '/pages/login/login',
            })
          }, 1000)
          return;
        }
        if (retcode === 0) {
          let uploadRes;

          if (this.data.avatarFile) {
            try {
              uploadRes = await app.authApi.$upload(
                app.globalData.server_prefix + '/api/upload/user_avatar',
                this.data.avatarFile.path,
                { userid: newUser.userid }
              );
              console.log('头像上传成功', uploadRes)
            } catch(err) {
              console.log('err', err)
              console.log('头像上传失败')
            }
          }
          // 更新信息到缓存
          const oldUserInfo = wx.getStorageSync('userInfo')
          const newUserInfo = { ...oldUserInfo, ...res.data.userInfo }
          if (uploadRes) {
            newUserInfo.avatarUrl = `${app.globalData.server_prefix}${uploadRes}`
          }
          wx.setStorageSync('userInfo', newUserInfo);
          app.setUserInfo(newUserInfo);
          Dialog.alert({
            message: '修改成功'
          }).then(() => {
            // on close
          })
        }
        else {
          Toast.fail('请求失败');
        }
      })
      .catch(err => {
        console.log('err', JSON.stringify(err))
        Toast.fail('请求出错');
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (app.globalData.userInfo) {
      this.setData({
        avatarUrl: app.globalData.userInfo.avatarUrl,
        userclass: app.globalData.userInfo.userclass,
        username: app.globalData.userInfo.username,
        sno: app.globalData.userInfo.sno,
        academy: app.globalData.userInfo.academy,
      })
    }
  },
 
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    
  },

})