// pages/index/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
<<<<<<< HEAD
    phone: '',
    password: '',
    background: ["../../images/back-1.jpg", "../../images/back-2.jpg", "../../images/back-3.jpg"],
    modelName: null,
    modelTitle: "",
    modelText: "",
    userStatus: 0
  },

  /**
   * 获取输入账号
   */
  phoneInput: function (e) {

    this.setData({

      phone: e.detail.value

    })

  },

  /**
   * 获取输入密码
   */
  passwordInput: function (e) {

    this.setData({

      password: e.detail.value

    })

  },

  closeModel: function () {
    this.setData({
      modalName: null
    });
    this.setData({
      modelTitle: "",
      modelText: ""
    })
  },

  userChange: function(e) {
    console.log(e.detail.value)
    this.setData({
      userStatus: e.detail.value
    })
  },

  /**
   * 登录
   */
  login: function () {

    if (this.data.phone.length == 0 || this.data.password.length == 0) {


      // this.setData({
      //   modalName: 'Modal'
      // });
      // this.setData({
      //   modelTitle: "提示",
      //   modelText: "用户名或密码不能为空"
      // })

      wx.reLaunch({
        url: '../main/main'
      })

    } else {
      // 登录逻辑

      // this.setData({
      //   modalName: 'Modal'
      // });
      // this.setData({
      //   modelTitle: "提示",
      //   modelText: "用户名或密码错误"
      // })


      wx.redirectTo({
        url: '../main/main'
      })

    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})
=======
    PageCur: 'notice'
  },
  NavChange(e) {
    this.setData({
      PageCur: e.currentTarget.dataset.cur
    })
  }
  // data: {
  //   motto: 'Hello World',
  //   userInfo: {},
  //   hasUserInfo: false,
  //   canIUse: wx.canIUse('button.open-type.getUserInfo')
  // },
  // //事件处理函数
  // bindViewTap: function() {
  //   wx.navigateTo({
  //     url: '../logs/logs'
  //   })
  // },
  // onLoad: function () {
  //   if (app.globalData.userInfo) {
  //     this.setData({
  //       userInfo: app.globalData.userInfo,
  //       hasUserInfo: true
  //     })
  //   } else if (this.data.canIUse){
  //     // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
  //     // 所以此处加入 callback 以防止这种情况
  //     app.userInfoReadyCallback = res => {
  //       this.setData({
  //         userInfo: res.userInfo,
  //         hasUserInfo: true
  //       })
  //     }
  //   } else {
  //     // 在没有 open-type=getUserInfo 版本的兼容处理
  //     wx.getUserInfo({
  //       success: res => {
  //         app.globalData.userInfo = res.userInfo
  //         this.setData({
  //           userInfo: res.userInfo,
  //           hasUserInfo: true
  //         })
  //       }
  //     })
  //   }
  // },
  // getUserInfo: function(e) {
  //   console.log(e)
  //   app.globalData.userInfo = e.detail.userInfo
  //   this.setData({
  //     userInfo: e.detail.userInfo,
  //     hasUserInfo: true
  //   })
  // }
})
>>>>>>> 5f36c8c0968e05d3d0559e1551ea7de179c74363
