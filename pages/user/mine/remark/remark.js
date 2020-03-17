// pages/user/signIn/remark/remark.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    remark:[],
    scrollTop: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.judgeOutOfDate();
  },

  //页面滚动执行方式
  onPageScroll(e) {
    this.setData({
      scrollTop: e.scrollTop
    })
  },

  // 判断签到过期
  judgeOutOfDate: function () {
    let _this = this;
    wx.request({
      url: 'https://api.lightingsui.com/sign-in/judge-out-of-date',
      header: app.globalData.header,
      success: function (res) {
        if(res.data.data != null && res.data.data == true) {
          // 加载数据
          _this.loadData();
        }
      }
    })

  },

  loadData: function() {
    let _this = this;

    wx.request({
      url: 'https://api.lightingsui.com/sign-in/get-sign-details',
      header: app.globalData.header,
      success: function(res) {
        if(res.data.data != null) {
          let tempArr = [];
          let retDate = res.data.data;
          console.log(retDate);

          for (let obj in retDate) {
            let addResultArr = [];
            console.log(retDate[obj]);

            for (let j = 0; j < retDate[obj].length; j++) {
              addResultArr.push({
                time: retDate[obj][j].signTimeStr,
                sign: retDate[obj][j].simType == 1 ? "签退成功" : "签到成功"
              })
            }
            tempArr.push({
              date: obj,
              msg: addResultArr
            })
          }

          _this.setData({
            remark: tempArr
          })
        }
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})