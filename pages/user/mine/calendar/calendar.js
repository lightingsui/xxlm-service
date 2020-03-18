const app = getApp();
Page({
  data: {
    // 此处为日历自定义配置字段
    calendarConfig: {
      multi: true, // 是否开启多选,
      showLunar: true, // 是否显示农历，此配置会导致 setTodoLabels 中 showLabelAlways 配置失效
      takeoverTap: true,
      onlyShowCurrentMonth: true, // 日历面板是否只显示本月日期
    },


    markDates:[
      // {
      //   year: 2020,
      //   month: 3,
      //   day: 12
      // },
      // {
      //   year: 2020,
      //   month: 3,
      //   day: 23
      // }
    ]
  },

  onLoad:function (options) {
    //清除未签退的记录、发送请求获取markdates数组值
    this.judgeOutOfDate();
  },

  onReady:function () {
    this.doSomeThing(this);
  },

  // 判断签到过期
  judgeOutOfDate: function () {
    let _this = this;
    wx.request({
      url: 'https://api.lightingsui.com/sign-in/judge-out-of-date',
      header: app.globalData.header,
      success: function (res) {
        if (res.data.data != null && res.data.data == true) {
          // 加载数据
          let date = new Date();
          _this.getCalendar(date.getFullYear(), date.getMonth() + 1);
        }
      }
    })

  },

  getCalendar: function(year, month) {
    let _this = this;
    
    wx.request({
      url: 'https://api.lightingsui.com/sign-in/select-user-calendar',
      header: app.globalData.header,
      data: {
        year: year,
        month: month
      },
      success: function(res) {
        _this.setData({
          markDates: []
        })
        if(res.data.data != null && res.data.data.length != 0) {
          let arrTemp = [];

          for(let i = 0 ; i < res.data.data.length; i++) {
            let obj = res.data.data[i];

            arrTemp.push({
              year: year,
              month: month,
              day: parseInt(obj)
            })
          }

          _this.setData({
            markDates: arrTemp
          })
          _this.doSomeThing(_this);

          console.log(_this.data.markDates);
        }
      }
    })
  },

  doSomeThing(_this) {
    _this.calendar.setTodoLabels({
      // 待办点标记设置
      // pos: 'bottom', // 待办点标记位置 ['top', 'bottom']
      dotColor: "#dc0791", // 待办点标记颜色
      circle: true, // 待办圆圈标记设置（如圆圈标记已签到日期），该设置与点标记设置互斥
      // showLabelAlways: true, // 点击时是否显示待办事项（圆点/文字），在 circle 为 true 及当日历配置 showLunar 为 true 时，此配置失效
      days: _this.data.markDates
    });
  },

  
  /**
   * 选择日期后执行的事件
   * currentSelect 当前点击的日期
   * allSelectedDays 选择的所有日期（当mulit为true时，allSelectedDays有值）
   */
  afterTapDay(e) {
    console.log('afterTapDay', e.detail); // => { currentSelect: {}, allSelectedDays: [] }
  },
  /**
   * 当日历滑动时触发(适用于周/月视图)
   * 可在滑动时按需在该方法内获取当前日历的一些数据
   */
  onSwipe(e) {
    console.log('onSwipe', e.detail);
    const dates = this.calendar.getCalendarDates();
  },
  /**
   * 当改变月份时触发
   * => current 当前年月 / next 切换后的年月
   */
  whenChangeMonth(e) {
    console.log('whenChangeMonth', e.detail);
    console.log("---");
    console.log(e.detail.next.year);
    console.log(e.detail.next.month);
    this.getCalendar(e.detail.next.year, e.detail.next.month);
    // => { current: { month: 3, ... }, next: { month: 4, ... }}
  },
  /**
   * 周视图下当改变周时触发
   * => current 当前周信息 / next 切换后周信息
   */
  whenChangeWeek(e) {
    console.log('whenChangeWeek', e.detail);
    // {
    //    current: { currentYM: {year: 2019, month: 1 }, dates: [{}] },
    //    next: { currentYM: {year: 2019, month: 1}, dates: [{}] },
    //    directionType: 'next_week'
    // }
  },
  /**
   * 日期点击事件（此事件会完全接管点击事件），需自定义配置 takeoverTap 值为真才能生效
   * currentSelect 当前点击的日期
   */
  onTapDay(e) {
    console.log('onTapDay', e.detail); // => { year: 2019, month: 12, day: 3, ...}
  },
  /**
   * 日历初次渲染完成后触发事件，如设置事件标记
   */
  afterCalendarRender(e) {
    console.log('afterCalendarRender', e);
  }
})