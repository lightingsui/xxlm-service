var app = getApp()

Page({
  data: {
    latitude:23.10229,
    longitude:113.3245211,

    sign:'',

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

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    // this.setData({
    //   sign:app.globalData.sign
    // })
    // console.log(this.data.sign);
    this.get();
  },

  // 生命周期函数--监听页面显示
  onShow: function () {
    this.setData({
      sign: app.globalData.sign
    })
    console.log(app.globalData.sign)
    this.get();
   
  },

  get:function() {
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
    
    console.log(app.globalData.sign)
  },

  signIn:function() {
    if(this.data.sign == '签到'){
      this.setData({
        sign:'签退'
      })
      app.globalData.sign = '签退'
    }else {
      this.setData({
        sign:'签到'
      })
      app.globalData.sign = '签到'
    }
    console.log(app.globalData.sign)
  },



  //视野发生变化时触发
  regionchange(e) {
    // console.log(e.type)
  },

  //点击标记点时触发
  // markertap(e) {
  //   console.log(e.markerId)
  // },

  //点击控件时触发
  // controltap(e) {
  //   console.log(e.controlId)
  // }
})