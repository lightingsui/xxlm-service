import uCharts from '../../../../utils/u-charts.js';

var _self;
var canvaLineA = null;

Page({
  data: {
    startDate: '',
    endDate: '',

    currentDate: '',

    cWidth: '',
    cHeight: '',

    mycanvasWidth:'',
    mycanvasHeight:'',

    pixelRatio: 1,
    serverData: '',
    data: {
      "LineA": {
        "categories": ["03/07", "03/08", "03/09", "03/10", "03/11", "03/12"],
        "series": [{
          "name": "工作时长",
          "data": [3, 8, 5, 7, 4, 2]
        }]
      }
    }
  },
  onLoad: function() {

    this.getDate();
    _self = this;
    this.cWidth = 400;
    this.cHeight = 300;
    this.getServerData();
  },

  //起始日期监听
  startDateChange(e) {
    this.setData({
      startDate: e.detail.value
    })
    if(e.detail.value >= this.data.endDate) {
      wx.showToast({
        title: '请选择合理的时间段',
        icon:'none'
      })
    }else {
      //请求数据
    }
  },

  //截止日期监听
  endDateChange(e) {
    this.setData({
      endDate: e.detail.value
    })
    if(e.detail.value <= this.data.startDate) {
      wx.showToast({
        title: '请选择合理的时间段',
        icon:'none'
      })
    }else {
      //请求数据
    }
  },
  getDate:function() {
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
      endDate:Y + "-" + M + "-" + D
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
      startDate:Y_before + "-" + M_before + "-" + D_before
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
    let LineA = {
      categories: [],
      series: []
    };
    //这里我后台返回的是数组，所以用等于，如果您后台返回的是单条数据，需要push进去
    LineA.categories = this.data.data.LineA.categories;
    LineA.series = this.data.data.LineA.series;
    _self.showLineA("canvasLineA", LineA);
  },

  showLineA(canvasId, chartData) {
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
      animation: false,
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
        splitNumber: 10,
        min: 0,
        max: 10,
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