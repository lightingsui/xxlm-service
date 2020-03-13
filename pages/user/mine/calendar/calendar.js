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
      {
        year: 2020,
        month: 3,
        day: 1,
      },
      {
        year: 2018,
        month: 5,
        day: 15
      }
    ]
  },

  onLoad:function (options) {
    //发送请求获取markdates数组值
    
  },

  onReady:function () {
    this.doSomeThing()
  },

  doSomeThing() {
    this.calendar.setTodoLabels({
      // 待办点标记设置
      // pos: 'bottom', // 待办点标记位置 ['top', 'bottom']
      dotColor: '#fff', // 待办点标记颜色
      circle: true, // 待办圆圈标记设置（如圆圈标记已签到日期），该设置与点标记设置互斥
      // showLabelAlways: true, // 点击时是否显示待办事项（圆点/文字），在 circle 为 true 及当日历配置 showLunar 为 true 时，此配置失效
      days: this.data.markDates
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