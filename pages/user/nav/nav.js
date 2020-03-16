const app =getApp()

Page({
  data: {
    PageCur: 'notice',

    noticeNum: 'notice',
    noticeIsShow: true,

    infoNum: '',
    infoIsShow:true,

    blogNum: '',
    blogIsShow:true,
    scrollTop: 0
  },
  NavChange(e) {
    this.setData({
      PageCur: e.currentTarget.dataset.cur
    })
  },

  onLoad: function(options) {
    

    this.getUnResolveCount();

    this.setData({
      noticeNum:app.globalData.noticeNum,
      infoNum:app.globalData.infoNum,
      blogNum:app.globalData.blogNum
    })

    if(this.data.noticeNum == 0) {
      this.setData({
        noticeIsShow:false
      })
    }
    if(this.data.infoNum == 0) {
      this.setData({
        infoIsShow:false
      })
    }
    if(this.data.blogNum == 0) {
      this.setData({
        blogIsShow:false
      })
    }
  },

  // 获取未读数量
  getUnResolveCount: function() {

  },
  //页面滚动执行方式
  onPageScroll(e) {
    this.setData({
      scrollTop: e.scrollTop
    })
  }
})