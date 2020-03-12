import uCharts from '../../../../utils/u-charts.js';
import util from '../../../../utils/util.js';

var _self;
var canvaLineA = null;

Page({
  data: {
    startDate: '2018-12-25',
    endDate: '2018-12-25',

    currentDate: '',

    cWidth: '',
    cHeight: '',
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
  onLoad() {
    _self = this;
    this.cWidth = 400;
    this.cHeight = 300;
    this.getServerData();
  },
  look: function() {
    //根据起始截止日期查询
  },
  startDateChange(e) {
    this.setData({
      startDate: e.detail.value
    })
  },
  endDateChange(e) {
    this.setData({
      endDate: e.detail.value
    })
  },
  getServerData() {
    //获取当前系统时间
    // 调用函数时，传入new Date()参数，返回值是日期和时间
    var time = util.formatTime(new Date());
    console.log(time)
    // 再通过setData更改Page()里面的data，动态更新页面的数据
    this.setData({
      currentDate: time
    });

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