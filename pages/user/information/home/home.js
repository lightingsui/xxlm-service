Page({
  data: {
    TabCur: 0,
    scrollLeft:0,

    isSelf:true,

    //tab
    tabArray: [
      {tab: '最新'},
      {tab: 'Java'},
      {tab: 'Python'},
      {tab: '前端'},
      {tab: '数据库'},
      {tab: '区块链'},
      {tab: '人工智能'},
      {tab: '移动开发'}
    ],

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

    /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

    //发送请求加载 tabArray, information 数组

  },

  tabSelect(e) {
    this.setData({
      TabCur: e.currentTarget.dataset.id,
      scrollLeft: (e.currentTarget.dataset.id-1)*60
    })

    console.log(this.data.TabCur)
    //发送请求加载 information
  },

  share:function() {
    wx.navigateTo({
      url: '/pages/user/information/dataPublish/dataPublish',
    })
  },

  search:function() {
    wx.navigateTo({
      url: '/pages/user/information/dataSearch/dataSearch',
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

  infoConfirm:function(e){
    this.setData({
      modalName: null
    })

    //发送请求删除数据
  }
})