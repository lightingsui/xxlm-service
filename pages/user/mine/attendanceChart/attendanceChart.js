import uCharts from '../../../../utils/u-charts.js';
const utils = require('../../../../components/utils/utils');
const app = getApp();
var _self;
var canvaLineA = null;

Page({
  data: {
    startDate: '',
    endDate: '',
    curDate : null,

    currentDate: '',

    cWidth: '',
    cHeight: '',

    mycanvasWidth: '',
    mycanvasHeight: '',

    pixelRatio: 1,
    serverData: '',
    data: {
      LineA: null
    }
  },
  onLoad: function() {
    console.log("加载了")
    this.getDate();
    
    
    _self = this;
    this.cWidth = 400;
    this.cHeight = 300;
    this.judgeOutOfDate();
  },

  // 加载图表数据
  loadChartData: function() {
    let _this = this;

    wx.request({
      url: 'https://api.lightingsui.com/sign-in/select-user-statistics',
      header: app.globalData.header,
      data: {
        startDate: _this.data.startDate,
        endDate: _this.data.endDate
      },
      success: function(res) {
        if (res.data.data != null && res.data.data.length != 0) {
          let category = [];
          let values = [];
          let maxValue = 0;
          for (let i = 0; i < res.data.data.length; i++) {
            let obj = res.data.data[i];
            for (let key in obj) {
              category.push(key);
              values.push(obj[key])
              if(obj[key] > maxValue) {
                maxValue = obj[key];
              }
            }
          }

          _this.setData({
            LineA: {
              "categories": category,
              "series": [{
                "name": "工作时长",
                "data": values
              }]
            }
          })
          _this.showLineA("canvasLineA", _this.data.LineA, maxValue);
        }
      }
    })
  },

  datedifference: function (sDate1, sDate2) {    //sDate1和sDate2是2006-12-18格式 
    var dateSpan,
    tempDate,
    iDays;
    sDate1 = Date.parse(sDate1);
    sDate2 = Date.parse(sDate2);
    console.log(sDate1);
    console.log(sDate2);
    dateSpan = sDate2 - sDate1;
    console.log(dateSpan);
    iDays = Math.floor(dateSpan / (24 * 3600 * 1000));
    return iDays
  },

  // 判断签到过期
  judgeOutOfDate: function () {
    let _this = this;
    wx.request({
      url: 'https://api.lightingsui.com/sign-in/judge-out-of-date',
      header: app.globalData.header,
      success: function (res) {
        if (res.data.data != null && res.data.data == true) {
          // 获得当前用户签到\签退状态
          _this.getServerData();
        }
      }
    })

  },

  // 显示错误提示
  showTips: function(msg) {
    console.log(utils);
    let options = {
      msg: msg,
      duration: 2000,
      type: "danger"
    };
    utils.toast(options);
  },

  //起始日期监听
  startDateChange(e) {
    this.setData({
      startDate: e.detail.value
    })
    console.log("++++++++++++++")
    console.log(this.data.curDate)
    if (e.detail.value >= this.data.endDate) {
      wx.showToast({
        title: '开始时间必须小于结束时间',
        icon: 'none'
      })
      return;
    } else if (this.datedifference(this.data.curDate, this.data.startDate) > 0) {
      wx.showToast({
        title: '起始时间须大于结束时间',
        icon: 'none'
      })
      this.setData({
        startDate: this.data.curDate
      })
      return;
    }else {
      let days = this.datedifference(this.data.startDate, this.data.endDate);

      if(days > 30) {
        wx.showToast({
          title: '仅可显示30天内的签到信息',
          icon: 'none'
        })
        return;
      }
      //请求数据
      console.log(this.data.endDate)
      this.loadChartData();
    }
  },

  //截止日期监听
  endDateChange(e) {
    this.setData({
      endDate: e.detail.value
    })
    if (e.detail.value <= this.data.startDate) {
      wx.showToast({
        title: '开始时间必须小于结束时间',
        icon: 'none'
      })
    } else if (this.datedifference(this.data.curDate, this.data.endDate) > 0) {
      wx.showToast({
        title: '截止日期不可以大于今天',
        icon: 'none'
      })
      this.setData({
        endDate: this.data.curDate
      })
      return;
    } else {
      let days = this.datedifference(this.data.startDate, this.data.endDate);

      if (days > 30) {
        wx.showToast({
          title: '仅可显示30天内的签到信息',
          icon: 'none'
        })
        return;
      }
      //请求数据
      this.loadChartData();
    }
  },

  getDate: function() {
    var timestamp = Date.parse(new Date());
    timestamp = timestamp / 1000;
    var date = new Date(timestamp * 1000);
    //获取年份
    var Y = date.getFullYear();
    //获取月份
    var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1);
    //获取当日日期
    var D = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
    // console.log(Y + "-" + M + "-" + D);
    this.setData({
      endDate: Y + "-" + M + "-" + D,
      curDate: Y + "-" + M + "-" + D
    })
    //减7天的时间戳：
    var before_timetamp = timestamp - 24 * 60 * 60 * 6;
    //减7天的时间：
    var n_to = before_timetamp * 1000;
    var before_timetamp = new Date(n_to);
    var Y_before = before_timetamp.getFullYear();
    //年份
    var Y_before = before_timetamp.getFullYear();
    //月份
    var M_before = (before_timetamp.getMonth() + 1 < 10 ? '0' + (before_timetamp.getMonth() + 1) : before_timetamp.getMonth() + 1);
    //日期
    var D_before = before_timetamp.getDate() < 10 ? '0' + before_timetamp.getDate() : before_timetamp.getDate();
    // console.log(Y_before + "-" + M_before + "-" + D_before)
    this.setData({
      startDate: Y_before + "-" + M_before + "-" + D_before
    })
  },

  getServerData() {
    //查询最近一周内的数据(data 中的 endDate startDate 为当前日期，一周前日期)
    console.log(this.data.endDate);
    console.log(this.data.startDate);

    //查询最近一周内的数据


    console.log(this.data.data);
    //下面这个根据需要保存后台数据，我是为了模拟更新柱状图，所以存下来了
    _self.serverData = this.data.data;

    //这里我后台返回的是数组，所以用等于，如果您后台返回的是单条数据，需要push进去
    this.loadChartData();

  },

  showLineA(canvasId, chartData, max) {
    canvaLineA = new uCharts({
      $this: _self,
      canvasId: canvasId,
      type: 'line',
      fontSize: 11,
      legend: {
        show: true
      },
      dataLabel: true,
      dataPointShape: true,
      background: '#FFFFFF',
      pixelRatio: _self.pixelRatio,
      categories: chartData.categories,
      series: chartData.series,
      animation: true,
      enableScroll: true, //开启图表拖拽功能
      xAxis: {
        disableGrid: false,
        type: 'grid',
        gridType: 'dash',
        itemCount: 5,
        scrollShow: true,
        scrollAlign: 'left',
        scrollBackgroundColor: '#F7F7FF',
        scrollColor: '#DEE7F7',
      },
      yAxis: {
        //disabled:true
        gridType: 'dash',
        splitNumber: max <= 1 ? 1 : parseInt(max) + 1,
        min: 0,
        max: max,
        format: (val) => {
          return val.toFixed(0)
        },
      },
      width: _self.cWidth,
      height: _self.cHeight,
      extra: {
        lineStyle: 'straight'
      },
    });

  },
  touchLineA(e) {
    canvaLineA.scrollStart(e);
  },
  moveLineA(e) {
    canvaLineA.scroll(e);
  },
  touchEndLineA(e) {
    canvaLineA.scrollEnd(e);
    //下面是toolTip事件，如果滚动后不需要显示，可不填写
    canvaLineA.showToolTip(e, {
      format: function(item, category) {
        return category + ' ' + item.name + ':' + item.data
      }
    });
  },
})