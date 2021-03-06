"use strict";

const formatTime = function (date) {
	const year = date.getFullYear();
	const month = date.getMonth() + 1;
	const day = date.getDate();
	const hour = date.getHours();
	const minute = date.getMinutes();
	const second = date.getSeconds();
	return ([year, month, day].map(formatNumber).join('/') +
		' ' +
		[hour, minute, second].map(formatNumber).join(':'));
};
const formatNumber = function (n) {
    const s = n.toString();
    return s[1] ? s : '0' + s;
};

const $login = () => {
  const url = 'http://127.0.0.1:3001/api/login';
  return new Promise((resolve, reject) => {
    wx.login({
      success: function (ret) {
        wx.request({
          url,
          method: 'POST',
          data: {
            code: ret.code,
          },
          success: function (res) {
            console.log(res)
            if (
              res &&
              res.data && 
              res.data.data && 
              res.data.data.skey
            ) {
              resolve(res.data.data)
            }
          }
        })
      }
    })
  })
}

const checkSession = () => {
  return new Promise((resolve, reject) => {
    wx.checkSession({
      success: () => {
        resolve(true)
      },
      fail: () => {
        resolve(false)
      }
    })
  })
}

const $checkLoginStatus = () => {
  // 3004: 表示用户未登录号或者登录失效
	const skey = wx.getStorageSync('userInfo').skey
	if (!skey) {
    return Promise.reject({ retcode: 3004, message: '未登录' })
	} else {
		return new Promise((resolve, reject) => {
      checkSession().then(res => {
        if (res) {
          resolve({ retcode: 0, message: '用户已登录' })
        } else {
          reject({ retcode: 3004, message: '登录失效, 重新登录' })
        }
      })
    })
	}
}

const $request = (url, data, method = 'GET', config = {}) => {
  const skey = wx.getStorageSync('userInfo').skey
  if (!skey) {
    return Promise.reject({ retcode: 3004, message: '未登录' })
  } else {
    return new Promise((resolve, reject) => {
      checkSession().then(res => {
        if (res) {
          wx.request({
            url,
            method: method.toLocaleUpperCase(),
            data: JSON.stringify({
							skey,
							...data,
            }),
            ...config,
            success: (ret) => {
              resolve(ret.data)
            },
          })
        } else {
          // $login()
          reject({ retcode: 3004, message: '登录失效, 重新登录' })
        }
      })
    })
  }
}

const $upload = (url, filePath, formData) => {
  return new Promise((resolve, reject) => {
    // 当设置 mutiple 为 true 时, file 为数组格式，否则为对象格式
    wx.uploadFile({
      url: url,
      filePath: filePath,
      name: 'file',
      formData: formData,
      header: { 'content-type': 'application/json;charset=UTF-8' },
      success(res) {
        if (res.data) {
          const { retcode, data } = JSON.parse(res.data)
          if (retcode === 0 && data) {
            resolve(data)
          } else {
            reject('上传失败')
          }
        }
      },
      fail(err) {
        reject(err)
      }
    });
  })
}

export default {
	formatTime,
	$login,
  $request,
  $checkLoginStatus,
  $upload
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXRpbC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInV0aWwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBYSxRQUFBLFVBQVUsR0FBRyxVQUFDLElBQVU7SUFDbkMsSUFBTSxJQUFJLEdBQUcsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFBO0lBQy9CLElBQU0sS0FBSyxHQUFHLElBQUksQ0FBQyxRQUFRLEVBQUUsR0FBRyxDQUFDLENBQUE7SUFDakMsSUFBTSxHQUFHLEdBQUcsSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFBO0lBQzFCLElBQU0sSUFBSSxHQUFHLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQTtJQUM1QixJQUFNLE1BQU0sR0FBRyxJQUFJLENBQUMsVUFBVSxFQUFFLENBQUE7SUFDaEMsSUFBTSxNQUFNLEdBQUcsSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFBO0lBRWhDLE9BQU8sQ0FDTCxDQUFDLElBQUksRUFBRSxLQUFLLEVBQUUsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLFlBQVksQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUM7UUFDOUMsR0FBRztRQUNILENBQUMsSUFBSSxFQUFFLE1BQU0sRUFBRSxNQUFNLENBQUMsQ0FBQyxHQUFHLENBQUMsWUFBWSxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUNuRCxDQUFBO0FBQ0gsQ0FBQyxDQUFBO0FBRUQsSUFBTSxZQUFZLEdBQUcsVUFBQyxDQUFTO0lBQzdCLElBQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxRQUFRLEVBQUUsQ0FBQTtJQUN0QixPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFBO0FBQzNCLENBQUMsQ0FBQSIsInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBjb25zdCBmb3JtYXRUaW1lID0gKGRhdGU6IERhdGUpID0+IHtcbiAgY29uc3QgeWVhciA9IGRhdGUuZ2V0RnVsbFllYXIoKVxuICBjb25zdCBtb250aCA9IGRhdGUuZ2V0TW9udGgoKSArIDFcbiAgY29uc3QgZGF5ID0gZGF0ZS5nZXREYXRlKClcbiAgY29uc3QgaG91ciA9IGRhdGUuZ2V0SG91cnMoKVxuICBjb25zdCBtaW51dGUgPSBkYXRlLmdldE1pbnV0ZXMoKVxuICBjb25zdCBzZWNvbmQgPSBkYXRlLmdldFNlY29uZHMoKVxuXG4gIHJldHVybiAoXG4gICAgW3llYXIsIG1vbnRoLCBkYXldLm1hcChmb3JtYXROdW1iZXIpLmpvaW4oJy8nKSArXG4gICAgJyAnICtcbiAgICBbaG91ciwgbWludXRlLCBzZWNvbmRdLm1hcChmb3JtYXROdW1iZXIpLmpvaW4oJzonKVxuICApXG59XG5cbmNvbnN0IGZvcm1hdE51bWJlciA9IChuOiBudW1iZXIpID0+IHtcbiAgY29uc3QgcyA9IG4udG9TdHJpbmcoKVxuICByZXR1cm4gc1sxXSA/IHMgOiAnMCcgKyBzXG59XG4iXX0=