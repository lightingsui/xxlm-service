Page({
  /**
   * 页面的初始数据
   */
  data: {
    items: [],

    isSelf:true,

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.data.items.push(wx.getStorageSync("DetailItem"));
    this.setData({ items: this.data.items });

    // console.log(this.data.items)
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

  infoConfirm:function() {
    this.setData({
      modalName: null
    })
  }
})