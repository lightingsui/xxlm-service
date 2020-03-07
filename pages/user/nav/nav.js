Page({
  data: {
    PageCur: 'mine',
  },
  NavChange(e) {
    this.setData({
      PageCur: e.currentTarget.dataset.cur
    })
  },

  onLoad: function(options) {
  },
})