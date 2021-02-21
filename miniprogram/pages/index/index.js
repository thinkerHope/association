"use strict";
var app = getApp();
Page({
	data: {
		swiperList: [{
			id: 0,
			type: 'image',
			url: '../../assets/images/swiper_01.jpeg'
		}, {
			id: 1,
			type: 'image',
			url: '../../assets/images/swiper_02.jpeg'
		}, {
			id: 2,
			type: 'image',
			url: '../../assets/images/swiper_03.jpeg'
		}, {
			id: 3,
			type: 'image',
			url: '../../assets/images/swiper_04.jpeg'
		}, {
			id: 4,
			type: 'image',
			url: '../../assets/images/swiper_05.jpeg'
		}, {
			id: 5,
			type: 'image',
			url: '../../assets/images/swiper_06.jpeg'
		}],
		act_array: [
			{
				activityId: 1,
				activityCover: '',
				clubId: 1,
				activityName: '敬老院活动',
				userAvatar: '',
				userName: 'noaher',
				time: '2020-12-12',
				hot: true,
				activityPeople: 30,
			}
		],
	},

    /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {
    console.log("用户下拉刷新")
    wx.showToast({
      title:"刷新中",
      icon: 'loading',
    })
    wx.request({
      url: app.globalData.myserver_prefix + '/get/activity/byPage',
      method: 'GET',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      data: {
        page: 0 //那么再次获取首页信息,页码数肯定为0
      },
      success: (res) => {
        console.log(res)
        if (res.data.status == "success") {
          var list = res.data.data
          this.setData({
            act_array: list,
            page:1,
            isselect:true//开启上拉刷新
          })
        }
        else {
          Toast.fail('刷新失败');
        }
      }, fail: (res) => {
        Toast.fail('刷新失败');
      }, complete: (res) => {
        wx.hideToast();
        wx.stopPullDownRefresh()
      }
    })
	},
	
	jumpSearch() {
		wx.navigateTo({
			url: '/pages/search/search',
		})
	},

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {
    if (this.data.isselect){
      console.log("用户上拉加载")
      wx.showToast({
        icon: 'loading',
      })
      var pagedata = this.data.page + 1//获取最新页码数
      wx.request({
        url: app.globalData.myserver_prefix + '/get/activity/byPage',
        method: 'GET',
        header: {
          'content-type': 'application/x-www-form-urlencoded'
        },
        data: {
          page: pagedata //上拉加载需要查询页数可变,每次+1,并且需要写回数组中(以拼接方式),页面大于查询页面会返回空数组需要判断
        },
        success: (res) => {
          console.log(res)
          if (res.data.status == "success") {
            var list = res.data.data//传回来的数组对象
            if (list.length != 0) { //传回来的数组为空意味着没数据了
              //拼接现有数组
              var oldData = this.data.act_array;
              console.log("拼接后的数组", oldData.concat(list))
              this.setData({
                act_array: oldData.concat(list),
                page: pagedata
              })
            } else { //若是传回来的数组为空,那就给用户一个提示
              Toast('已经到底了哦~');
            }
          }
          else {
            Toast.fail(res.data.data.errorMsg);
          }
        }, fail: (res) => {
          Toast.fail('刷新失败');
        }, complete: (res) => {
          wx.hideToast();
        }
      })
    }
  },
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQ0EsSUFBSSxHQUFHLEdBQUcsTUFBTSxFQUFFLENBQUM7QUFFbkIsSUFBSSxDQUFDO0lBQ0gsSUFBSSxFQUFFO1FBQ0osVUFBVSxFQUFFLENBQUM7Z0JBQ1gsRUFBRSxFQUFFLENBQUM7Z0JBQ0wsSUFBSSxFQUFFLE9BQU87Z0JBQ2IsR0FBRyxFQUFFLG9DQUFvQzthQUMxQyxFQUFFO2dCQUNELEVBQUUsRUFBRSxDQUFDO2dCQUNMLElBQUksRUFBRSxPQUFPO2dCQUNiLEdBQUcsRUFBRSxvQ0FBb0M7YUFDMUMsRUFBRTtnQkFDRCxFQUFFLEVBQUUsQ0FBQztnQkFDTCxJQUFJLEVBQUUsT0FBTztnQkFDYixHQUFHLEVBQUUsb0NBQW9DO2FBQzFDLEVBQUU7Z0JBQ0QsRUFBRSxFQUFFLENBQUM7Z0JBQ0wsSUFBSSxFQUFFLE9BQU87Z0JBQ2IsR0FBRyxFQUFFLG9DQUFvQzthQUMxQyxFQUFFO2dCQUNELEVBQUUsRUFBRSxDQUFDO2dCQUNMLElBQUksRUFBRSxPQUFPO2dCQUNiLEdBQUcsRUFBRSxvQ0FBb0M7YUFDMUMsRUFBRTtnQkFDRCxFQUFFLEVBQUUsQ0FBQztnQkFDTCxJQUFJLEVBQUUsT0FBTztnQkFDYixHQUFHLEVBQUUsb0NBQW9DO2FBQzFDLENBQUM7UUFFRixTQUFTLEVBQUM7WUFDUjtnQkFDRSxVQUFVLEVBQUUsQ0FBQztnQkFDYixhQUFhLEVBQUUsRUFBRTtnQkFDakIsTUFBTSxFQUFFLENBQUM7Z0JBQ1QsWUFBWSxFQUFFLE9BQU87Z0JBQ3JCLFVBQVUsRUFBRSxFQUFFO2dCQUNkLFFBQVEsRUFBRSxRQUFRO2dCQUNsQixJQUFJLEVBQUUsWUFBWTtnQkFDbEIsR0FBRyxFQUFFLElBQUk7Z0JBQ1QsY0FBYyxFQUFFLEVBQUU7YUFDbkI7U0FDRjtLQUNGO0NBR0YsQ0FBQyxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLy8gcGFnZXMvbWFpbi9tYWluLmpzXG52YXIgYXBwID0gZ2V0QXBwKCk7XG5cblBhZ2Uoe1xuICBkYXRhOiB7XG4gICAgc3dpcGVyTGlzdDogW3tcbiAgICAgIGlkOiAwLFxuICAgICAgdHlwZTogJ2ltYWdlJyxcbiAgICAgIHVybDogJy4uLy4uL2Fzc2V0cy9pbWFnZXMvc3dpcGVyXzAxLmpwZWcnXG4gICAgfSwge1xuICAgICAgaWQ6IDEsXG4gICAgICB0eXBlOiAnaW1hZ2UnLFxuICAgICAgdXJsOiAnLi4vLi4vYXNzZXRzL2ltYWdlcy9zd2lwZXJfMDIuanBlZydcbiAgICB9LCB7XG4gICAgICBpZDogMixcbiAgICAgIHR5cGU6ICdpbWFnZScsXG4gICAgICB1cmw6ICcuLi8uLi9hc3NldHMvaW1hZ2VzL3N3aXBlcl8wMy5qcGVnJ1xuICAgIH0sIHtcbiAgICAgIGlkOiAzLFxuICAgICAgdHlwZTogJ2ltYWdlJyxcbiAgICAgIHVybDogJy4uLy4uL2Fzc2V0cy9pbWFnZXMvc3dpcGVyXzA0LmpwZWcnXG4gICAgfSwge1xuICAgICAgaWQ6IDQsXG4gICAgICB0eXBlOiAnaW1hZ2UnLFxuICAgICAgdXJsOiAnLi4vLi4vYXNzZXRzL2ltYWdlcy9zd2lwZXJfMDUuanBlZydcbiAgICB9LCB7XG4gICAgICBpZDogNSxcbiAgICAgIHR5cGU6ICdpbWFnZScsXG4gICAgICB1cmw6ICcuLi8uLi9hc3NldHMvaW1hZ2VzL3N3aXBlcl8wNi5qcGVnJ1xuICAgIH1dLFxuICBcbiAgICBhY3RfYXJyYXk6W1xuICAgICAge1xuICAgICAgICBhY3Rpdml0eUlkOiAxLFxuICAgICAgICBhY3Rpdml0eUNvdmVyOiAnJyxcbiAgICAgICAgY2x1YklkOiAxLFxuICAgICAgICBhY3Rpdml0eU5hbWU6ICfmlazogIHpmaLmtLvliqgnLFxuICAgICAgICB1c2VyQXZhdGFyOiAnJyxcbiAgICAgICAgdXNlck5hbWU6ICdub2FoZXInLFxuICAgICAgICB0aW1lOiAnMjAyMC0xMi0xMicsXG4gICAgICAgIGhvdDogdHJ1ZSxcbiAgICAgICAgYWN0aXZpdHlQZW9wbGU6IDMwLFxuICAgICAgfSBcbiAgICBdLCAvL2xpc3TmlbDmja5cbiAgfSxcblxuICBcbn0pOyJdfQ==