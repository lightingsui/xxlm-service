Component({
  options: {
    styleIsolation: 'shared'
  },
  data: {
    TabCur: 0,
    scrollLeft:0,

    //tab
    tabArray: [
      {tab: '公告'},
      {tab: '作业'},
    ],

    manager:true,

    //公告数组
    notice: [
      {
        title:'无意者 烈火焚身;以正义的烈火拔出黑暗。我有自己的正义，见证至高的烈火吧。',
        text:' 折磨生出苦难，苦难又会加剧折磨，凡间这无穷的循环，将有我来终结！真正的恩典因不完整而美丽，因情感而真诚，因脆弱而自由！折磨生出苦难，苦难又会加剧折磨，凡间这无穷的循环，将有我来终结！真正的恩典因不完整而美丽，因情感而真诚，因脆弱而自由！折磨生出苦难，苦难又会加剧折磨，凡间这无穷的循环，将有我来终结！真正的恩典因不完整而美丽，因情感而真诚，因脆弱而自由！折磨生出苦难，苦难又会加剧折磨，凡间这无穷的循环，将有我来终结！真正的恩典因不完整而美丽，因情感而真诚，因脆弱而自由！折磨生出苦难，苦难又会加剧折磨，凡间这无穷的循环，将有我来终结！真正的恩典因不完整而美丽，因情感而真诚，因脆弱而自由！折磨生出苦难，苦难又会加剧折磨，凡间这无穷的循环，将有我来终结！真正的恩典因不完整而美丽，因情感而真诚，因脆弱而自由！',
        hits:'10',
        date:'2018年12月4日'
      },
      {
        title:'无意者 烈火焚身;以正义的烈火拔出黑暗。我有自己的正义，见证至高的烈火吧。',
        text:' 折磨生出苦难，苦难又会加剧折磨，凡间这无穷的循环，将有我来终结！真正的恩典因不完整而美丽，因情感而真诚，因脆弱而自由！',
        hits:'10',
        date:'2018年12月5日'
      },
      {
        title:'无意者 烈火焚身;以正义的烈火拔出黑暗。我有自己的正义，见证至高的烈火吧。',
        text:' 折磨生出苦难，苦难又会加剧折磨，凡间这无穷的循环，将有我来终结！真正的恩典因不完整而美丽，因情感而真诚，因脆弱而自由！',
        hits:'10',
        date:'2018年12月6日'
      },
      {
        title:'无意者 烈火焚身;以正义的烈火拔出黑暗。我有自己的正义，见证至高的烈火吧。',
        text:' 折磨生出苦难，苦难又会加剧折磨，凡间这无穷的循环，将有我来终结！真正的恩典因不完整而美丽，因情感而真诚，因脆弱而自由！',
        hits:'10',
        date:'2018年12月7日'
      }
    ],
  },
  lifetimes: {
    attached: function () {
      //判断用户是管理员或者普通用户

      //发送请求加载 notice 数组
    },
  },

  methods: {
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
  
      //发送请求加载 notice 数组
      console.log(this.data.TabCur)
  
    },
    //发表
    publish:function() {
      wx.navigateTo({
        url: '/pages/user/notice/noticePublish/noticePublish'
      })
    },

    noticeDetail:function(e) {
      let i = e.currentTarget.dataset.index;
  
      var item = {
        dTitle: this.data.notice[i].title,
        dText: this.data.notice[i].text,
        dHits: this.data.notice[i].hits,
        dDate: this.data.notice[i].date
      };

      // console.log(item);

      wx.setStorageSync("DetailItem", item);

      wx.navigateTo({
        url: '/pages/user/notice/noticeDetail/noticeDetail',
      })
    }
  }
})

