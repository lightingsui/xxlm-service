const app = getApp();
Component({
  options: {
    styleIsolation: 'shared'
  },
  data: {
    avatar:'',

    gender:'',

    name: '',  
  },
  created: function() {
    this.getUSernameAndHead();
  },
    
  methods: {
    // 获取用户头像与姓名
    getUSernameAndHead: function () {
      let _this = this;
      wx.request({
        url: 'https://api.lightingsui.com/user/select-admin-message',
        header: app.globalData.header,
        success: function (res) {
          console.log(res);
          if (res.data.data != null) {
            _this.setData({
              avatar: res.data.data.umHeadUrl,
              name: res.data.data.umName,
              gender: res.data.data == '0' ? "female" : "male"
            })
          }
        },
        fail: function (res) {
          console.log(res)
        }
      })
    },
    showModal(e) {
      this.setData({
        modalName: e.currentTarget.dataset.target
      })
    },
    hideModal(e) {
      this.setData({
        modalName: null
      })
    },

    //上传头像
    upload: function(e) {
      wx.chooseImage({
        count: 1, //默认9
        sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
        sourceType: ['album'], //从相册选择
        success: (res) => {
          this.setData({
            avatar: res.tempFilePaths
          })
          this.hideModal();

          //发送请求上传照片
        }
      });
    },
  
    changePassword:function(e) {
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