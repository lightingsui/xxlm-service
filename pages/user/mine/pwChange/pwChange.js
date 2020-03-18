const utils = require('../../../../components/utils/utils');
const app = getApp();
Component({
  options: {
    styleIsolation: 'shared'
  },
  data: {
    disabled: false,
    identity: [],

    oldPassword: '',

    newPassword: '',

    tnewPassword: '',

    //旧密码校验错误信息
    oldCheck: '',

    //新密码校验错误信息
    newCheck: '',
  },
  lifetimes: {
    attached: function() {

      this.data.identity.push(wx.getStorageSync("identity"));
      this.setData({
        identity: this.data.identity
      });

      console.log(this.data.identity)
    },
  },
  created: function() {
    this.toast = this.selectComponent("#tui-tips-ctx");
    console.log(this.toast.show);
  },

  methods: {
    // 显示错误提示
    showTips: function(msg) {
      console.log(utils);
      let options = {
        msg: msg,
        duration: 2000,
        type: "danger"
      };
      utils.toast(options);
    },
    oldPassword: function(e) {
      this.setData({
        oldPassword: e.detail.value,
        oldCheck: ''
      })
    },

    newPassword: function(e) {
      this.setData({
        newPassword: e.detail.value,
        newCheck: ''
      })
    },

    tnewPassword: function(e) {
      this.setData({
        tnewPassword: e.detail.value,
        newCheck: ''
      })
    },

    //确认修改
    confirm: function() {

      if (this.data.oldPassword == '') {
        // wx.showToast({
        //   title: '请输入原密码',
        //   icon:'none'
        // })
        this.showTips("请输入原密码");
        // this.setData({
        //   oldCheck:'请输入原密码'
        // })
      } else {
        if ((this.data.newPassword == '')) {
          this.showTips("请输入新密码");
          // this.setData({
          //   newCheck:'请输入新密码'
          // })
        } else if ((this.data.tnewPassword == '')) {
          this.showTips("请输入二次确认密码");
        } else if (this.data.newPassword != this.data.tnewPassword) {
          this.showTips("两次输入密码不一致");
        } else if (this.data.newPassword == this.data.oldPassword) {
          this.showTips("新旧密码不允许相同");
        } else {
          //请求得到用户密码，校验旧密码是否正确
          let _this = this;

          wx.request({
            url: 'https://api.lightingsui.com/user/change-normal-user-password',
            data: {
              oldPassword: _this.data.oldPassword,
              newPassword: _this.data.newPassword
            },
            method: "POST",
            header: {
              "Cookie": app.globalData.header.Cookie,
              "content-type": "application/x-www-form-urlencoded"
            },
            success: function(res) {
              if (res.data.data != null) {
                if (res.data.data == 0) {
                  _this.showTips("原始密码错误");
                } else {
                  _this.setData({
                    disabled: true
                  })

                  let params = {
                    title: "密码修改成功，2秒后重新登录",
                    imgUrl: "/static/images/toast/check-circle.png",
                    icon: true
                  };
                  _this.toast.show(params);

                  setTimeout(function() {
                    // 请求清除session
                    wx.request({
                      url: 'https://api.lightingsui.com/user/delete-session',
                      header: app.globalData.header,
                      success: function(res) {
                        // 界面跳转
                        wx.reLaunch({
                          url: '../../../index/index'
                        })
                      }
                    })
                  }, 2000);
                }
              }
            }
          })
        }
      }
    }
  }
})