const app = getApp()

Page({
  data: {
    PageCur: 'notice',

    noticeNum: 'notice',
    noticeIsShow: true,

    infoNum: '',
    infoIsShow: true,

    blogNum: '',
    blogIsShow: true,
    scrollTop: 0
  },
  NavChange(e) {
    let obj = e.currentTarget.dataset.cur;
    if (obj == "information") {
      console.log("进入了")
      this.deleteUnreadAssetsCount();
    } else if (obj == "blog") {
      this.deleteUnreadBlogCount();
    }


    this.setData({
      PageCur: obj
    })
  },

  onLoad: function(options) {


    this.getUnResolveCount();


  },

  // 清除未读资源数量
  deleteUnreadAssetsCount: function () {
    let _this = this;
    wx.request({
      url: 'https://api.lightingsui.com/assets/delete-user-unread-assets-count',
      header: app.globalData.header,
      success: function (res) {
        if (res.data.data != null && res.data.data == true) {
          _this.getUnResolveCount();
        }
      },
      fail: function(res) {
        console.log(res)
      }
    })
  },

  // 清除未读博客数量
  deleteUnreadBlogCount: function() {
    let _this = this;
    wx.request({
      url: 'https://api.lightingsui.com/blog/delete-user-unread-blog-count',
      header: app.globalData.header,
      success: function(res) {
        if(res.data.data != null && res.data.data == true) {
          _this.getUnResolveCount();
        }
      }
    })
  },

  // 获取未读数量
  getUnResolveCount: function() {
    let _this = this;

    wx.request({
      url: 'https://api.lightingsui.com/user/select-user-unread-count',
      header: app.globalData.header,
      success: function(res) {
        let obj = res.data.data;
        if (obj != null) {
          _this.setData({
            noticeNum: 0,
            infoNum: obj.bcAssetsCount,
            blogNum: obj.bcBlogCount
          })

          if (_this.data.noticeNum == 0) {
            _this.setData({
              noticeIsShow: false
            })
          }
          if (_this.data.infoNum == 0) {
            _this.setData({
              infoIsShow: false
            })
          }
          if (_this.data.blogNum == 0) {
            _this.setData({
              blogIsShow: false
            })
          }
        }
      }
    })
  },
  //页面滚动执行方式
  onPageScroll(e) {
    this.setData({
      scrollTop: e.scrollTop
    })
  }
})