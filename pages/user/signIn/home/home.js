import util from '../../../../utils/util.js'

const app = getApp();
Component({
  options: {
    styleIsolation: 'shared'
  },
  data: {
    latitude: null,
    longitude: null,
    //签到位置中心
    latCenter: null,
    longCenter: null,

    difference: '',

    //签到范围
    range: null,

    msg: '正在定位中...',
    sign: '签退',
  },
  lifetimes: {
    attached: function() {
      // 页面被展示
      this.geta();
      this.setData({
        sign: app.globalData.sign
      })
    }
  },

  created: function() {
    // 获取精度、签到经纬度
    this.getDetails();
  },

  methods: {
    geta: function() {
      var that = this
      wx.getLocation({ //调用API得到经纬度
        type: 'gcj02',
        success: function(res) {
          console.log(res.latitude);
          console.log(res.longitude);
          that.setData({
            latitude: res.latitude,
            longitude: res.longitude,
          })

          let radLat1 = (res.latitude) * Math.PI / 180;　　　　
          let radLat2 = (that.data.latCenter) * Math.PI / 180;

          let difference = radLat1 - radLat2;
          let mdifference = (res.longitude) * Math.PI / 180 - (that.data.longCenter) * Math.PI / 180;

          　　　　
          let distance = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(difference / 2), 2)　　　　　　　　 + Math.cos(radLat1) * Math.cos(radLat2)　　　　　　　　 * Math.pow(Math.sin(mdifference / 2), 2)));　　　　
          distance = distance * 6378.137;　　　　
          distance = Math.round(distance * 10000) / 10;

          console.log(distance)

          if (distance < that.data.range) {
            that.setData({
              msg: '已在考勤范围内'
            })
          } else {
            that.setData({
              msg: '不在考勤范围内'
            })
          }
        }
      })
    },

    signIn: function() {
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

    // 获取精度、签到经纬度
    getDetails: function() {
        let _this = this;

        wx.request({
          url: 'https://api.lightingsui.com/sign-in/select-control-message',
          success: function(res) {
            if(res.data.data != null) {
              _this.setData({
                longCenter: res.data.data.centerLongitude,
                latCenter: res.data.data.centerLatitude,
                range: res.data.data.centerRange
              })
            }
          }
        })
    },

    //视野发生变化时触发
    regionchange(e) {
      // console.log(e.type)
    }
  }
})