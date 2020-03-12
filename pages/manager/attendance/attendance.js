import uCharts from '../../../utils/u-charts.js';
import util from '../../../utils/util.js';

var _self;
var canvaColumn=null;

Component({
  options: {
    styleIsolation: 'shared'
  },
  data: {
    startDate: '2018-12-25',
    endDate: '2018-12-25',

    currentDate:'',

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
      _self = this;
      this.cWidth=400;
      this.cHeight=300;

      this.getServerData();
    },
  },

  methods: {
    look:function() {
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
    getServerData(){
      //获取当前系统时间
      // 调用函数时，传入new Date()参数，返回值是日期和时间
      var time = util.formatTime(new Date());
      console.log(time)
      // 再通过setData更改Page()里面的data，动态更新页面的数据
      this.setData({
        currentDate: time
      });      

      //查询最近一周内的数据


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
