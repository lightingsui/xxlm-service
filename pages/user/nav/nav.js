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

  }
})