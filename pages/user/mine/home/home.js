const app = getApp();
const utils = require('../../../../components/utils/utils');
Component({
  options: {
    styleIsolation: 'shared'
  },
  data: {
    avatar: '',

    gender: '',

    name: '',
  },
  created: function() {
    this.getUSernameAndHead();
  },

  methods: {
    // 显示错误提示
    showTips: function (msg) {
      console.log(utils);
      let options = {
        msg: msg,
        duration: 2000,
        type: "danger"
      };
      utils.toast(options);
    },
    // 获取用户头像与姓名
    getUSernameAndHead: function() {
      let _this = this;
      wx.request({
        url: 'https://api.lightingsui.com/user/select-admin-message',
        header: app.globalData.header,
        success: function(res) {
          console.log(res);
          if (res.data.data != null) {
            _this.setData({
              avatar: res.data.data.umHeadUrl,
              name: res.data.data.umName,
              gender: res.data.data == '0' ? "female" : "male"
            })
          }
        },
        fail: function(res) {
          console.log(res)
        }
      })
    },
    showModal(e) {
      this.setData({
        modalName: e.currentTarget.dataset.target
      })
    },
    hideModal: function() {
      this.setData({
        modalName: null
      });
    },
    logOut(e) {
      this.setData({
        modalName: null
      });
      // 请求清除session
      wx.request({
        url: 'https://api.lightingsui.com/user/delete-session',
        header: app.globalData.header,
        success: function(res) {
          // 界面跳转
          wx.reLaunch({
            url: '/pages/index/index'
          })
        }
      })
    },

    //上传头像
    upload: function(e) {
      let _this = this;
      wx.chooseImage({
        count: 1, //默认9
        sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
        sourceType: ['album'], //从相册选择
        success: (res) => {
          wx.uploadFile({
            url: 'https://api.lightingsui.com/user/upload-user-head',
            filePath: res.tempFilePaths[0],
            name: 'file',
            header: {
              'Content-Type': "multipart/form-data"
            },
            success: function (res) {
              // 上传成功
              if(res.data.data != null) {
                // 修改用户头像
                wx.request({
                  url: 'https://api.lightingsui.com/user/change-user-head',
                  method: "POST",
                  data: {
                    userHeadUrl: res.data.data
                  },
                  header: {
                    "Cookie": app.globalData.header.Cookie,
                    "content-type": "application/x-www-form-urlencoded"
                  },
                  success: function(res) {
                    if(res.data.data != null && res.data.data == true) {
                      _this.hideModal();
                      _this.getUSernameAndHead();
                    }
                  }
                })
              }
            },
            fail: function (res) {
              _this.hideModal();
              // 上传失败
              wx.showToast({
                title: '图片仅支持jpg、png格式，且文件大小限制为2MB',
                icon: "none"
              })
            
            }
          })
        }
      });
    },

    changePassword: function(e) {
      wx.navigateTo({
        url: '/pages/user/mine/pwChange/pwChange',
      })

      this.setData({
        modalName: null
      })

      var identity = {
        avatar: this.data.avatar,
        gender: this.gender,
        name: this.data.name,
      };
      wx.setStorageSync("identity", identity);
    }
  }
})