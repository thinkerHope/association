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
				activityCover: '../../assets/images/haibao_01.jpeg',
				clubId: 1,
				activityName: '敬老院活动',
				userAvatar: '../../assets/images/defaultAvatar_man.jpg',
				userName: '张三岁',
				time: '2020-12-12',
				hot: true,
				activityPeople: 30,
			},
			{
				activityId: 2,
				activityCover: '../../assets/images/haibao_02.jpeg',
				clubId: 1,
				activityName: '小汤河游泳比赛',
				userAvatar: '../../assets/images/defaultAvatar_woman.png',
				userName: '越佳佳',
				time: '2020-12-12',
				hot: true,
				activityPeople: 30,
			}
		],
	},
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQ0EsSUFBSSxHQUFHLEdBQUcsTUFBTSxFQUFFLENBQUM7QUFFbkIsSUFBSSxDQUFDO0lBQ0gsSUFBSSxFQUFFO1FBQ0osVUFBVSxFQUFFLENBQUM7Z0JBQ1gsRUFBRSxFQUFFLENBQUM7Z0JBQ0wsSUFBSSxFQUFFLE9BQU87Z0JBQ2IsR0FBRyxFQUFFLG9DQUFvQzthQUMxQyxFQUFFO2dCQUNELEVBQUUsRUFBRSxDQUFDO2dCQUNMLElBQUksRUFBRSxPQUFPO2dCQUNiLEdBQUcsRUFBRSxvQ0FBb0M7YUFDMUMsRUFBRTtnQkFDRCxFQUFFLEVBQUUsQ0FBQztnQkFDTCxJQUFJLEVBQUUsT0FBTztnQkFDYixHQUFHLEVBQUUsb0NBQW9DO2FBQzFDLEVBQUU7Z0JBQ0QsRUFBRSxFQUFFLENBQUM7Z0JBQ0wsSUFBSSxFQUFFLE9BQU87Z0JBQ2IsR0FBRyxFQUFFLG9DQUFvQzthQUMxQyxFQUFFO2dCQUNELEVBQUUsRUFBRSxDQUFDO2dCQUNMLElBQUksRUFBRSxPQUFPO2dCQUNiLEdBQUcsRUFBRSxvQ0FBb0M7YUFDMUMsRUFBRTtnQkFDRCxFQUFFLEVBQUUsQ0FBQztnQkFDTCxJQUFJLEVBQUUsT0FBTztnQkFDYixHQUFHLEVBQUUsb0NBQW9DO2FBQzFDLENBQUM7UUFFRixTQUFTLEVBQUM7WUFDUjtnQkFDRSxVQUFVLEVBQUUsQ0FBQztnQkFDYixhQUFhLEVBQUUsRUFBRTtnQkFDakIsTUFBTSxFQUFFLENBQUM7Z0JBQ1QsWUFBWSxFQUFFLE9BQU87Z0JBQ3JCLFVBQVUsRUFBRSxFQUFFO2dCQUNkLFFBQVEsRUFBRSxRQUFRO2dCQUNsQixJQUFJLEVBQUUsWUFBWTtnQkFDbEIsR0FBRyxFQUFFLElBQUk7Z0JBQ1QsY0FBYyxFQUFFLEVBQUU7YUFDbkI7U0FDRjtLQUNGO0NBR0YsQ0FBQyxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLy8gcGFnZXMvbWFpbi9tYWluLmpzXG52YXIgYXBwID0gZ2V0QXBwKCk7XG5cblBhZ2Uoe1xuICBkYXRhOiB7XG4gICAgc3dpcGVyTGlzdDogW3tcbiAgICAgIGlkOiAwLFxuICAgICAgdHlwZTogJ2ltYWdlJyxcbiAgICAgIHVybDogJy4uLy4uL2Fzc2V0cy9pbWFnZXMvc3dpcGVyXzAxLmpwZWcnXG4gICAgfSwge1xuICAgICAgaWQ6IDEsXG4gICAgICB0eXBlOiAnaW1hZ2UnLFxuICAgICAgdXJsOiAnLi4vLi4vYXNzZXRzL2ltYWdlcy9zd2lwZXJfMDIuanBlZydcbiAgICB9LCB7XG4gICAgICBpZDogMixcbiAgICAgIHR5cGU6ICdpbWFnZScsXG4gICAgICB1cmw6ICcuLi8uLi9hc3NldHMvaW1hZ2VzL3N3aXBlcl8wMy5qcGVnJ1xuICAgIH0sIHtcbiAgICAgIGlkOiAzLFxuICAgICAgdHlwZTogJ2ltYWdlJyxcbiAgICAgIHVybDogJy4uLy4uL2Fzc2V0cy9pbWFnZXMvc3dpcGVyXzA0LmpwZWcnXG4gICAgfSwge1xuICAgICAgaWQ6IDQsXG4gICAgICB0eXBlOiAnaW1hZ2UnLFxuICAgICAgdXJsOiAnLi4vLi4vYXNzZXRzL2ltYWdlcy9zd2lwZXJfMDUuanBlZydcbiAgICB9LCB7XG4gICAgICBpZDogNSxcbiAgICAgIHR5cGU6ICdpbWFnZScsXG4gICAgICB1cmw6ICcuLi8uLi9hc3NldHMvaW1hZ2VzL3N3aXBlcl8wNi5qcGVnJ1xuICAgIH1dLFxuICBcbiAgICBhY3RfYXJyYXk6W1xuICAgICAge1xuICAgICAgICBhY3Rpdml0eUlkOiAxLFxuICAgICAgICBhY3Rpdml0eUNvdmVyOiAnJyxcbiAgICAgICAgY2x1YklkOiAxLFxuICAgICAgICBhY3Rpdml0eU5hbWU6ICfmlazogIHpmaLmtLvliqgnLFxuICAgICAgICB1c2VyQXZhdGFyOiAnJyxcbiAgICAgICAgdXNlck5hbWU6ICdub2FoZXInLFxuICAgICAgICB0aW1lOiAnMjAyMC0xMi0xMicsXG4gICAgICAgIGhvdDogdHJ1ZSxcbiAgICAgICAgYWN0aXZpdHlQZW9wbGU6IDMwLFxuICAgICAgfSBcbiAgICBdLCAvL2xpc3TmlbDmja5cbiAgfSxcblxuICBcbn0pOyJdfQ==