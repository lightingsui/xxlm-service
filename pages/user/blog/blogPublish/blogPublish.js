Component({
  options: {
    styleIsolation: 'shared'
  },
  data: {
     //头像
     avatar:'',

     //姓名
     name:'',
 
     //标题
     title:'',
 
     //单选框
     index:'',
 
     picker: ['Java', 'Python','前端','数据库','区块链','人工智能'],
     
     //描述
     text:'',
  },
  lifetimes: {
    
    attached: function () {
      //获取用户头像与姓名

    
      this.setData({
        avatar: '',
        name: '冰冰'
      })
    },
  },

  methods: {
    titleInput: function (e) {
      this.setData({
        title: e.detail.value
      })
      console.log(this.data.title);
    },
  
    textInput: function (e) {
      this.setData({
        text: e.detail.value
      })
      console.log(this.data.text);
    },
  
    //单选框
    PickerChange(e) {
      console.log(e);
      this.setData({
        index: e.detail.value
      })
      console.log(this.data.index);
    },

    //资料分享
    publish:function(e) {
      console.log(this.data.name);
  
      console.log(this.data.text);
  
      //发送请求
    },
  }
})