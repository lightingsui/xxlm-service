Component({
  options: {
    styleIsolation: 'shared'
  },
  data: {
    identity:[],  
    
    oldPassword:'',

    newPassword:'',

    //旧密码校验错误信息
    oldCheck:'',

    //新密码校验错误信息
    newCheck:'',
  },
  lifetimes: {
    attached: function () {
      this.data.identity.push(wx.getStorageSync("identity"));
      this.setData({ 
        identity: this.data.identity 
      });

      console.log(this.data.identity)
    },
  },

  methods: {
    oldPassword: function (e) {
      this.setData({
        oldPassword: e.detail.value
      })
      console.log(this.data.oldPassword);
    },
  
    newPassword: function (e) {
      this.setData({
        newPassword: e.detail.value
      })
      console.log(this.data.newPassword);
    },
  
    //确认修改
    confirm: function () {
      //校验旧密码是否正确
  
      //校验新密码是否符合密码设置规范
  
      //发送请求修改密码
  
    }
  }
})
