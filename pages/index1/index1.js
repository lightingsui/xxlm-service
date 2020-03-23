const util = require('../../utils/util.js')
let app = getApp()
Page({
  data: {
    disabled: false,
    username: "",
    password: "",
    userStatus: 1
  },
  onLoad: function (options) { },
  getRandom: function (u) {
    let rnd = "";
    u = u || 6;
    for (var i = 0; i < u; i++) {
      rnd += Math.floor(Math.random() * 10);
    }
    return Number(rnd);
  },
  input: function (e) {
    this.setData({
      username: e.detail.value
    });
  },
  passwordInput: function (e) {
    this.setData({
      password: e.detail.value
    });
  },
  btnSend: function () {
    if (util.isNullOrEmpty(this.data.mobile)) {
      util.toast('请输入手机号码');
      return
    } else if (!util.isMobile(this.data.mobile)) {
      util.toast('请输入正确的手机号码');
      return
    }
    this.setData({
      disabled: true,
      btnText: "请稍候...",
      type: "gray"
    });

    setTimeout(() => {
      this.doLoop(60)
    }, 500)
  },
  login: function (e) {
    let loginCode = e.detail.value.smsCode;
    let mobile = e.detail.value.mobile;
    if (util.isNullOrEmpty(mobile)) {
      util.toast('请输入手机号码');
      return
    } else if (!util.isMobile(mobile)) {
      util.toast('请输入正确的手机号码');
      return
    } else if (util.isNullOrEmpty(loginCode)) {
      util.toast('请输入验证码');
      return
    } else if (loginCode != this.data.code) {
      util.toast('验证码不正确');
      return
    }
   
    wx.setStorageSync("thorui_mobile", mobile);
    util.toast("登录成功", 2000, true);
    setTimeout(() => {
      wx.reLaunch({
        url: '../my/my'
      })
    }, 200);
  },

  userChange: function (e) {
    console.log(e.detail.value)
    this.setData({
      userStatus: e.detail.value
    })
  },
})