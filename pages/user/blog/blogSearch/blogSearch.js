Component({
  options: {
    styleIsolation: 'shared'
  },
  data: {
    inputSearch:'',

    card:false,

    //数组
    information: [
      {
        title:'无意者 烈火焚身;以正义的烈火拔出黑暗',
        text:'真正的恩典因不完整而美丽，因情感而真诚，因脆弱而自由！',
        link:'https://www.baidu.com',
        author:'发表者',
        date:'2018年12月4日'
      },
      {
        title:'无意者 烈火焚身;以正义的烈火拔出黑暗',
        text:'真正的恩典因不完整而美丽，因情感而真诚，因脆弱而自由！',
        link:'https://www.baidu.com',
        author:'发表者',
        date:'2018年12月4日'
      },
      {
        title:'无意者 烈火焚身;以正义的烈火拔出黑暗',
        text:'真正的恩典因不完整而美丽，因情感而真诚，因脆弱而自由！',
        link:'https://www.baidu.com',
        author:'发表者',
        date:'2018年12月4日'
      },
    ],
  },
  lifetimes: {
    attached: function () {
      
    },
  },

  methods: {
    search:function() {

      console.log(this.data.inputSearch);
  
      //发送请求查询
  
      this.setData({
        card:true,
      })
    },
  
    inputSearch:function(e){
      // console.log(e)
      this.setData({
        inputSearch:e.detail.value
      })
    }
  }
})
