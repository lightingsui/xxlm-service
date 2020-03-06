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