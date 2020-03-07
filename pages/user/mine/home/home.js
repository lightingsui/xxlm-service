Component({
  options: {
    styleIsolation: 'shared'
  },
  data: {
    avatar:'https://ossweb-img.qq.com/images/lol/web201310/skin/big10006.jpg',

    gender:'',

    name: '冰冰',  
  },
  lifetimes: {
    created: function() {
      
    }
  },
    
  methods: {
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