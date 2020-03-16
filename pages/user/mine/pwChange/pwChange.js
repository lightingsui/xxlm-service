Component({
  options: {
    styleIsolation: 'shared'
  },
  data: {
    identity:[],  
    
    oldPassword:'',

    newPassword:'',

    tnewPassword:'',

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
        oldPassword: e.detail.value,
        oldCheck:''
      })
    },
  
    newPassword: function (e) {
      this.setData({
        newPassword: e.detail.value,
        newCheck:''
      })
    },
  
    //确认修改
    confirm: function () {

      if(this.data.oldPassword == '') {
        this.setData({
          oldCheck:'请输入原密码'
        })
      }else {
        if((this.data.newPassword== '')||(this.data.tnewPassword == '')) {
          this.setData({
            newCheck:'请输入新密码'
          })
        }else {
          //请求得到用户密码，校验旧密码是否正确
          let old ='';

          if(old != this.data.oldPassword) {
            //如果旧密码不正确则
            this.setData({
              oldCheck:'原密码输入错误'
            })
          }else {
            //发送请求修改密码

          }
        }
      }
    }
  }
})
