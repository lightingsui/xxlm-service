// pages/index/index.js
const app = getApp();
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
    userStatus: 0,
    loadProgress: 0,
    CustomBar: app.globalData.CustomBar,
    disabled: false
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
    this.setData({
      disabled: true
    });

    if (this.data.phone.length == 0 || this.data.password.length == 0) {


      this.setData({
        modalName: 'Modal'
      });
      this.setData({
        modelTitle: "提示",
        modelText: "用户名或密码不能为空"
      })
      // wx.reLaunch({
      //   url: '../user/nav/nav'
      // })
      this.setData({
        disabled: false
      });

    } else {
      // 发送请求
      this.loadProgress();
      let _this = this;
      wx.request({
        url: 'https://api.lightingsui.com/user/login',
        method: "POST",
        data: {
          username: _this.data.phone,
          password: _this.data.password,
          userStatus: _this.data.userStatus
        },
        header: {
          "content-type": "application/x-www-form-urlencoded"
        },
        success: function(res){
          // 进度条清零
          _this.setData({
            loadProgress: 100
          });
          if(res.data != null && res.data.data != null) {
            // 存储JSSIONID
            console.log(res);
            app.globalData.header.Cookie = "JSESSIONID=" + res.data.data;

            if (_this.data.userStatus == 0) {
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
              modalName: 'Modal'
            });
            _this.setData({
              modelTitle: "提示",
              modelText: res.data.responseMessage
            })
          }
          _this.setData({
            disabled: false
          });
          
        },
        fail:function(errorMessage){
          // 进度条清零
          _this.setData({
            loadProgress: 100
          })

          _this.setData({
            modalName: 'Modal'
          });
          _this.setData({
            modelTitle: "提示",
            modelText: "服务器繁忙，请稍后再试！"
          })

          _this.setData({
            disabled: false
          });
        }
      })

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

  },
  loadProgress() {
    this.setData({
      loadProgress: this.data.loadProgress + 3
    })
    if (this.data.loadProgress < 100) {
      console.log(this.data.loadProgress)
      setTimeout(() => {
        this.loadProgress();
      }, 100)
    } else {
      this.setData({
        loadProgress: 0
      })
    }
  }
})