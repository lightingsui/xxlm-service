Page({
  data: {
    PageCur: 'notice',
  },
  NavChange(e) {
    this.setData({
      PageCur: e.currentTarget.dataset.cur
    })
  },

  onLoad: function(options) {
    this.getUnResolveCount();
  },

  // 获取未读数量
  getUnResolveCount: function() {

  }
})