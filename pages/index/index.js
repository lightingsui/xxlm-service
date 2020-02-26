// pages/index/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
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

  userChange: function (e) {
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
        url: '../nav/nav'
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
        url: '../nav/nav'
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