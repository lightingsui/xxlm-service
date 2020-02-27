Page({
  /**
   * 页面的初始数据
   */
  data: {
    items: []

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.data.items.push(wx.getStorageSync("DetailItem"));
    this.setData({ items: this.data.items });

    console.log(this.data.items)
  },
})