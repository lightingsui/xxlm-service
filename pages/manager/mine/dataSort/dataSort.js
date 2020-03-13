Component({
  options: {
    styleIsolation: 'shared'
  },
  data: {
    sort:'',
    sortCheck:''

  },
  lifetimes: {
    attached: function () {
      
    },
  },

  methods: {
    sort: function (e) {
      console.log(e);
      this.setData({
        sort: e.detail.value,
        sortCheck:''
      })
    },
  
    //确认
    confirm: function () {
      if(this.data.sort == '') {
        this.setData({
          sortCheck:'请填写分类'
        })
      }else {
        //发送请求添加分类
      }
    }
  }
})
