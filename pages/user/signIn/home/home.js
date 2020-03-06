Component({
  options: {
    styleIsolation: 'shared'
  },
  pageLifetimes: {
    created: function() {
      
    },
    show: function () {
      // 页面被展示
      this.geta();
      wx.request({
        url: 'https://www.baidu.com',
        success:function(res) {
            console.log(res)
        }
      })
    },
    hide: function () {
      // 页面被隐藏
    },
    resize: function (size) {
      // 页面尺寸变化
    }
  },
  data: {
    latitude: 37.5,
    longitude: 112.3245211,

    sign: '',

    // markers: [{
    //   iconPath: "/icon/position.png",
    //   id: 0,
    //   latitude: '',
    //   longitude: '',
    //   width: 32,
    //   height: 32
    // }],
    // polyline: [{
    //   points: [{
    //     longitude: 113.3245211,
    //     latitude: 23.10229
    //   }, {
    //     longitude: 113.324520,
    //     latitude: 23.21229
    //   }],
    //   color:"#FF0000DD",
    //   width: 2,
    //   dottedLine: true
    // }],
    // controls: [{
    //   id: 1,
    //   iconPath: '/resources/location.png',
    //   position: {
    //     left: 0,
    //     top: 300 - 50,
    //     width: 50,
    //     height: 50
    //   },
    //   clickable: true
    // }]
  },

  methods: {
    geta: function () {
      var that = this
      wx.getLocation({//调用API得到经纬度
        type: 'gcj02',
        success: function (res) {
          that.setData({
            latitude: res.latitude,
            longitude: res.longitude
          }),

            console.log(that.data.latitude);
          console.log(that.data.longitude);
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