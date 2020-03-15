Component({
  options: {
    styleIsolation: 'shared'
  },
  data: {
    sort:'',
    sortCheck:'',
    sortArray: [
      {
        sort: 'Java'
      },
      {
        sort: 'Python'
      },
      {
        sort: '前端'
      },
      {
        sort: '数据库'
      },
      {
        sort: '区块链'
      },
      {
        sort: '人工智能'
      },
      {
        sort: '移动开发'
      },
    ]
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
        //如果分类已存在
        this.setData({
          sortCheck:'分类已存在'
        })

        //发送请求添加分类
      }
    }
  }
})
