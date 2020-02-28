Page({
  data: {

    TabCur: 0,
    scrollLeft:0,

    //tab
    tabArray: [
      {tab: '公告'},
      {tab: '作业'},
    ],

    //公告数组
    notice: [
      {
        title:'无意者 烈火焚身;以正义的烈火拔出黑暗。我有自己的正义，见证至高的烈火吧。',
        text:' 折磨生出苦难，苦难又会加剧折磨，凡间这无穷的循环，将有我来终结！真正的恩典因不完整而美丽，因情感而真诚，因脆弱而自由！折磨生出苦难，苦难又会加剧折磨，凡间这无穷的循环，将有我来终结！真正的恩典因不完整而美丽，因情感而真诚，因脆弱而自由！',
        author:'发表者',
        date:'2018年12月4日'
      },
      {
        title:'无意者 烈火焚身;以正义的烈火拔出黑暗。我有自己的正义，见证至高的烈火吧。',
        text:' 折磨生出苦难，苦难又会加剧折磨，凡间这无穷的循环，将有我来终结！真正的恩典因不完整而美丽，因情感而真诚，因脆弱而自由！',
        author:'发表者',
        date:'2018年12月4日'
      },
      {
        title:'无意者 烈火焚身;以正义的烈火拔出黑暗。我有自己的正义，见证至高的烈火吧。',
        text:' 折磨生出苦难，苦难又会加剧折磨，凡间这无穷的循环，将有我来终结！真正的恩典因不完整而美丽，因情感而真诚，因脆弱而自由！',
        author:'发表者',
        date:'2018年12月4日'
      },
      {
        title:'无意者 烈火焚身;以正义的烈火拔出黑暗。我有自己的正义，见证至高的烈火吧。',
        text:' 折磨生出苦难，苦难又会加剧折磨，凡间这无穷的循环，将有我来终结！真正的恩典因不完整而美丽，因情感而真诚，因脆弱而自由！',
        author:'发表者',
        date:'2018年12月4日'
      }
    ],

    //作业数组
    homework: [
      {
        title:'无意者 烈火焚身;以正义的烈火拔出黑暗。我有自己的正义，见证至高的烈火吧。',
        text:' 折磨生出苦难，苦难又会加剧折磨，凡间这无穷的循环，将有我来终结！真正的恩典因不完整而美丽，因情感而真诚，因脆弱而自由！',
        author:'发表者',
        date:'2018年12月4日'
      }
    ],
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

    //发送请求加载 notice 数组

  },


  isCard(e) {
    this.setData({
      isCard: e.detail.value
    })
  },
  tabSelect(e) {
    this.setData({
      TabCur: e.currentTarget.dataset.id,
      scrollLeft: (e.currentTarget.dataset.id-1)*60
    })

    //发送请求加载 homework 数组
  },

  //公告详情
  noticeDetial: function(e) {

    console.log(e.currentTarget.dataset.index);
    let i = e.currentTarget.dataset.index;
  
    var item = {
      dTitle: this.data.notice[i].title,
      dText: this.data.notice[i].text,
      dAuthor: this.data.notice[i].author,
      dDate: this.data.notice[i].date
    };

    console.log(item);

    wx.setStorageSync("DetailItem", item);

    wx.navigateTo({
      url: '/pages/notice/noticeDetial/noticeDetial'
    })
  },

  //作业详情
  homeworkDetial: function(e) {
    let i = e.currentTarget.dataset.index;
  
    var item = {
      dTitle: this.data.homework[i].title,
      dText: this.data.homework[i].text,
      dAuthor: this.data.homework[i].author,
      dDate: this.data.homework[i].date
    };

    console.log(item);

    wx.setStorageSync("DetailItem", item);

    wx.navigateTo({
      url: '/pages/notice/noticeDetial/noticeDetial'
    })
  },

  //发表
  publish:function() {
    wx.navigateTo({
      url: '/pages/notice/noticePublish/noticePublish'
    })
  }
})


