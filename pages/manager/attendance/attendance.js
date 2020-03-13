import uCharts from '../../../utils/u-charts.js';
import util from '../../../utils/util.js';

var _self;
var canvaColumn=null;

Component({
  options: {
    styleIsolation: 'shared'
  },
  data: {
    startDate: '',
    endDate: '',

    cWidth:'',
    cHeight:'',
    pixelRatio:1,
    serverData:'',
    data: {
      "categories": ["赵如冰", "赵如冰", "赵如冰", "D", "E", "F","G","H","I","J","L","M"],
      "series": [{
      "name": "日均工作时长",
      "data": [8, 7, 6, 5, 4, 3, 2, 1, 1, 1, 1, 1]
      }]
    }
  },
  lifetimes: {
    attached: function () {

      this.getDate();

      _self = this;
      this.cWidth=400;
      this.cHeight=300;

      this.getServerData();
    },
  },

  methods: {
    look:function() {
      //根据起始截止日期查询
      console.log(this.data.endDate)
      console.log(this.data.startDate)
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
    
    getServerData:function(){
      //查询最近一周内的数据(data 中的 endDate startDate 为当前日期，一周前日期)
      console.log(this.data.endDate);
      console.log(this.data.startDate);


      //下面这个根据需要保存后台数据，我是为了模拟更新柱状图，所以存下来了
      _self.serverData=this.data.data;
      let Column={categories:[],series:[]};
      //这里我后台返回的是数组，所以用等于，如果您后台返回的是单条数据，需要push进去
      Column.categories=this.data.data.categories;
      Column.series=this.data.data.series;
      _self.showColumn("canvasColumn",Column);
    },
    showColumn(canvasId,chartData){
      canvaColumn=new uCharts({
        $this:_self,
        canvasId: canvasId,
        type: 'column',
        legend:{show:true},
        fontSize:11,
        background:'#FFFFFF',
        pixelRatio:_self.pixelRatio,
        animation: true,
        categories: chartData.categories,
        series: chartData.series,
        enableScroll: true,//开启图表拖拽功能
        xAxis: {
          disableGrid:false,
          type:'grid',
          gridType:'dash',
          itemCount:8,
          scrollShow:true,
          scrollAlign:'left',
          scrollBackgroundColor:'#F7F7FF',
          scrollColor:'#DEE7F7',
        },
        yAxis: {
          //disabled:true
          gridType:'dash',
          splitNumber:10,
          min:0,
          max:10,
          format:(val)=>{return val.toFixed(0)},
        },
        dataLabel: true,
        width: _self.cWidth,
        height: _self.cHeight,
        extra: {
          column: {
            type:'group',
            width: _self.cWidth*_self.pixelRatio*0.45/chartData.categories.length
          }
          }
      });
      
    },
    touchColumn(e){
      canvaColumn.scrollStart(e)
    },
    moveColumn(e) {
      canvaColumn.scroll(e);
    },
    touchEndColumn(e) {
      canvaColumn.scrollEnd(e);
      //下面是toolTip事件，如果滚动后不需要显示，可不填写
      canvaColumn.showToolTip(e, {
        format: function (item, category) {
          return category + ' ' + item.name + ':' + item.data 
        }
      });
    },
  }
})
