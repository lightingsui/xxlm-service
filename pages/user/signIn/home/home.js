import util from '../../../../utils/util.js'

const app = getApp();
Component({
  options: {
    styleIsolation: 'shared'
  },
  data: {
    disabled: true,
    latitude: 39.9088230000,
    longitude: 116.3974700000,
    //签到位置中心
    latCenter: null,
    longCenter: null,

    difference: '',

    //签到范围
    range: null,

    msg: '正在定位中...',
    sign: null,

    singFlag: null,

    lastSignDate: null
  },

  created: function() {
    
    // 获取精度、签到经纬度
    this.getDetails();
    // 判断签到是否过期
    this.judgeOutOfDate();
   
  },

  methods: {

    getLocation: function() {
      var that = this
      wx.getLocation({ //调用API得到经纬度
        type: 'gcj02',
        success: function(res) {
          let locationResult = that.authorization();
          if(locationResult == false) {
            return;
          }

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
              disabled: false,
              msg: '已在考勤范围内'
            })
          } else {
            that.setData({
              disabled: true,
              msg: '不在考勤范围内'
            })
          }
        },
        fail: function(res) {
          that.authorization();
        }
      })
    },
    //定位权限开启提示
    authorization: function () {
      var that = this;
      let sInfo = wx.getSystemInfoSync();
      // console.log(sInfo);
      that.setData({
        locationAuthorized: sInfo.locationAuthorized,
        locationEnabled: sInfo.locationEnabled
      })

      //允许微信使用定位的开关
      if (this.data.locationAuthorized == false) {
        wx.showToast({
          title: '请开启微信使用定位权限',
          icon: 'none',
          duration: 2000
        })
        this.setData({
          disabled: true
        })
        return false;
      } else {
        //地理位置的系统开关(系统GPS是否打开)
        if (this.data.locationEnabled == false) {
          wx.showToast({
            title: '请开启手机位置信息',
            icon: 'none',
            duration: 2000
          })
          this.setData({
            disabled: true
          })
          return false;
        }
      }
      return true;
    },

    signIn: function() {
      if(!this.data.disabled) {
        if (parseInt(new Date().getTime() / 1000) - parseInt(this.data.lastSignDate / 1000) < 5) {
          wx.showToast({
            title: '为了防止您恶意刷签到，请五秒后再试',
            icon: 'none',
            duration: 1000
          })
          return;
        }
        let _this = this;
        if (this.data.sign == "签到") {

          //发送请求记录签到时间
          wx.request({
            url: 'https://api.lightingsui.com/sign-in/in-out-resolve',
            data: {
              signType: 0
            },
            header: app.globalData.header,
            success: function (res) {
              if (res.data.data != null && res.data.data == true) {
                wx.showToast({
                  title: '签到成功',
                  icon: 'none',
                  duration: 1000
                })
                _this.setData({
                  sign: '签退'
                })
              }
            }
          })


        } else {

          //发送请求记录签退时间
          wx.request({
            url: 'https://api.lightingsui.com/sign-in/in-out-resolve',
            data: {
              signType: 1
            },
            header: app.globalData.header,
            success: function (res) {
              if (res.data.data != null && res.data.data == true) {
                _this.setData({
                  sign: '签到'
                })
                wx.showToast({
                  title: '签退成功',
                  icon: 'none',
                  duration: 1000,
                })
              }
            }
          })
        }
        this.setData({
          lastSignDate: new Date().getTime()
        })
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

              // 初始请求位置信息
              _this.getLocation();
            }
          }
        })
    },

    //视野发生变化时触发
    regionchange(e) {
      // console.log(e.type)
    },

    // 获得当前用户签到\签退状态
    getUserStatus: function() {
      let _this = this;

      wx.request({
        url: 'https://api.lightingsui.com/sign-in/select-user-status',
        header: app.globalData.header,
        success: function(res) {
          if(res.data.data != null) {
            console.log("获取状态");
            console.log(res.data.data);
            _this.setData({
              signFlag: res.data.data
            })

            if(res.data.data == 0) {
              _this.setData({
                sign: "签到"
              })
            } else {
              _this.setData({
                sign: "签退"
              })
            }
          }
        }
      })
    },

    // 判断签到过期
    judgeOutOfDate: function() {
      let _this = this;
      wx.request({
        url: 'https://api.lightingsui.com/sign-in/judge-out-of-date',
        header: app.globalData.header,
        success: function(res) {
          if(res.data.data != null && res.data.data == true) {
            // 获得当前用户签到\签退状态
            _this.getUserStatus();
          }
        }
      })

    }
  }
})