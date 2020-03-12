import util from '../../../../utils/util.js'

const app = getApp();

Component({
  options: {
    styleIsolation: 'shared'
  },
  data: {
    latitude: 37.8721771900,
    longitude: 112.4840569500,

    //签到位置中心
    latCenter: 40.10550,
    longCenter: 113.33675,

    difference:'',

    //签到范围
    range:500,

    msg:'正在定位中...',
    sign: ''
  },
  lifetimes: {
    attached: function () {
      // 页面被展示
      this.geta();
      this.setData({
        sign:app.globalData.sign
      })
    },
  },

  methods: {
    geta: function () {
      var that = this
      wx.getLocation({//调用API得到经纬度
        type: 'gcj02',
        success: function (res) {
          console.log(res.latitude);
          console.log(res.longitude);
          that.setData({
            latitude: res.latitude,
            longitude: res.longitude,
          })

          let radLat1 = (res.latitude)*Math.PI/180;
　　　　   let radLat2 = (that.data.latCenter)*Math.PI/180;

          let difference = radLat1 - radLat2;
          let mdifference = (res.longitude)*Math.PI/180 - (that.data.longCenter)*Math.PI/180;

　　　　   let distance = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(difference / 2), 2)
　　　　　　　　+ Math.cos(radLat1) * Math.cos(radLat2)
　　　　　　　　* Math.pow(Math.sin(mdifference / 2), 2)));
　　　　   distance = distance * 6378.137;
　　　　   distance = Math.round(distance * 10000) / 10;

          console.log(distance)

          if(distance < 500) {
            that.setData({
              msg:'已在考勤范围内'
            })
          }else{
            that.setData({
              msg:'不在考勤范围内'
            })
          }
        }
      })
    },
      
    signIn: function () {
      if (this.data.sign == '签到') {
        this.setData({
          sign: '签退'
        })
        app.globalData.sign = '签退'
        
        //发送请求记录签到时间

      } else {
        this.setData({
          sign: '签到'
        })
        app.globalData.sign = '签到'

        //发送请求记录签退时间
      }
      
    },

    //视野发生变化时触发
    regionchange(e) {
      // console.log(e.type)
    }
  }
})