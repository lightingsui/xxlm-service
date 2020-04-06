const util = require('../../utils/util.js')
const utils = require('../../components/utils/utils');
let app = getApp()
Page({
  data: {
    loading: false,
    loginInMsg: "登录",
    disabled: false,
    username: "",
    password: "",
    userStatus: 1
  },
  onLoad: function(options) {},
  passwordInput: function(e) {
    this.setData({
      password: e.detail.value
    });
  },
  input: function(e) {
    this.setData({
      username: e.detail.value
    });
  },
  login: function(e) {
    if (this.data.loading == false) {
      // 表单验证
      if (this.data.username == null || this.data.username.length == 0 || this.data.username == '') {
        this.showTips("用户名不能为空");
        return;
      }
      if (this.data.password == null || this.data.password.length == 0 || this.data.password == '') {
        this.showTips("密码不能为空");
        return;
      }

      // 发送请求
      this.setData({
        loading: true,
        loginInMsg: "正在登录"
      });

      let _this = this;
      wx.request({
        url: 'https://api.lightingsui.com/user/login',
        method: "POST",
        data: {
          username: _this.data.username,
          password: _this.data.password
        },
        header: {
          "content-type": "application/x-www-form-urlencoded"
        },
        success: function(res) {
          if (res.data != null && res.data.data != null) {
            // 存储JSSIONID
            console.log("++++++++")
            console.log(res);
            app.globalData.header.Cookie = "JSESSIONID=" + res.data.data["sessionId"];
            console.log(res.data.data.identify)
            if (res.data.data.identify == 0) {
              // 界面跳转
              wx.reLaunch({
                url: '../user/nav/nav'
              })
            } else {
              // 界面跳转
              wx.reLaunch({
                url: '../manager/nav/nav'
              })
            }
          } else {
            _this.setData({
              loading: false,
              loginInMsg: "登录"
            });
            _this.showTips(res.data.responseMessage);
          }
        },
        fail: function(errorMessage) {
          _this.setData({
            loading: false,
            loginInMsg: "登录"
          });
          _this.showTips("服务器繁忙，请重试");

          _this.setData({
            disabled: false
          });
        }
      })
    }


    // this.setData({
    //   modalName: 'Modal'
    // });
    // this.setData({
    //   modelTitle: "提示",
    //   modelText: "用户名或密码错误"
    // })


    // wx.redirectTo({
    //   url: '../user/nav/nav'
    // })

  },
  showTips: function(msg) {
    let options = {
      msg: msg,
      duration: 2000,
      type: "danger"
    };
    utils.toast(options);
  }


})