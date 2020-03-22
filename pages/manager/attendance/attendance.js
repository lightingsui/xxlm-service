import uCharts from '../../../utils/u-charts.js';
const app = getApp();

var _self;
var canvaColumn=null;

Component({
  options: {
    styleIsolation: 'shared'
  },
  data: {
    startDate: '',
    endDate: '',
    curDate: '',

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
    // 加载数据
    loadDate: function() {
      let _this = this;

      wx.request({
        url: 'https://api.lightingsui.com/sign-in/select-all-user-statistics',
        data: {
          startDate: _this.data.startDate,
          endDate: _this.data.endDate
        },
        success: function(res) {
          if(res.data.data != null) {
            let users = [];
            let count = [];
            let max = 0;
            for(let i = 0; i < res.data.data.length; i++) {
              let obj = res.data.data[i];
              users.push(obj.username);
              count.push(obj.singInDateCount);

              if (obj.singInDateCount > max) {
                
                max = obj.singInDateCount;
                console.log("dayule" + max);
              }
            }

            let userJson = {
              "categories": users,
              "series": [{
                "name": "日均工作时长",
                "data": count
              }]
            }

            _self.showColumn("canvasColumn", userJson, max);
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
      dateSpan = sDate2 - sDate1;
      dateSpan = Math.abs(dateSpan);
      iDays = Math.floor(dateSpan / (24 * 3600 * 1000));
      return iDays
    },
    look:function() {
      //根据起始截止日期查询
      console.log(this.data.endDate)
      console.log(this.data.startDate)
    },

    //起始日期监听
    startDateChange(e) {
      this.setData({
        startDate: e.detail.value
      })
      if(e.detail.value >= this.data.endDate) {
        wx.showToast({
          title: '起始日期应大于截止时间',
          icon: 'none'
        })
      }else {
        let days = this.datedifference(this.data.startDate, this.data.endDate);

        if (days > 30) {
          wx.showToast({
            title: '仅可显示最近30天内的签到统计信息',
            icon: 'none'
          })
          return;
        }

        if (this.datedifference(this.data.curDate, this.data.startDate) > 0) {
          wx.showToast({
            title: '起始日期不可以大于今天',
            icon: 'none'
          })
          this.setData({
            startDate: this.data.curDate
          })
          return;
        }

        //请求数据
        this.loadDate();
        
      }
    },

    //截止日期监听
    endDateChange(e) {
      this.setData({
        endDate: e.detail.value
      })

      if (e.detail.value < this.data.startDate) {
        wx.showToast({
          title: '起始日期应大于截止时间',
          icon: 'none'
        })
      } else {
        let days = this.datedifference(this.data.startDate, this.data.endDate);

        if (days > 30) {
          wx.showToast({
            title: '仅可显示30天内的签到信息',
            icon: 'none'
          })
          return;
        }

        if (this.datedifference(this.data.curDate, this.data.endDate) > 0) {
          wx.showToast({
            title: '截止日期不可以大于今天',
            icon: 'none'
          })
          this.setData({
            endDate: this.data.curDate
          })
          return;
        }

        //请求数据
        this.loadDate();
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
        endDate:Y + "-" + M + "-" + D,
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
        startDate:Y_before + "-" + M_before + "-" + D_before
      })
    },
    
    getServerData:function(){
      //查询最近一周内的数据(data 中的 endDate startDate 为当前日期，一周前日期)
      console.log(this.data.endDate);
      console.log(this.data.startDate);


      //下面这个根据需要保存后台数据，我是为了模拟更新柱状图，所以存下来了
      this.loadDate();
    },
    showColumn(canvasId,chartData, max){
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
          splitNumber: max <= 1 ? 1 : parseInt(max) + 1,
          min:0,
          max: parseInt(max) + 1,
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
