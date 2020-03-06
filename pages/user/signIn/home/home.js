const app = getApp();

Component({
  options: {
    styleIsolation: 'shared'
  },
  data: {
    latitude: 37.8721771900,
    longitude: 112.4840569500,

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
          that.setData({
            latitude: res.latitude,
            longitude: res.longitude,
            msg:'已在考勤范围内'
          })
        }
      })

      
    },

    signIn: function () {
      if (this.data.sign == '签到') {
        this.setData({
          sign: '签退'
        })
        app.globalData.sign = '签退'
      } else {
        this.setData({
          sign: '签到'
        })
        app.globalData.sign = '签到'
      }
      
    },

    //视野发生变化时触发
    regionchange(e) {
      // console.log(e.type)
    }
  }
})