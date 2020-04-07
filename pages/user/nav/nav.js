const app = getApp()

Page({
  data: {
    PageCur: 'notice',

    noticeNum: 'notice',
    noticeIsShow: false,

    infoNum: null,
    infoIsShow: false,

    blogNum: null,
    blogIsShow: false,
    scrollTop: 0
  },
  NavChange(e) {
    let obj = e.currentTarget.dataset.cur;
    
    if (obj == "information") {
      console.log("进入了")
      if (this.data.blogIsShow) {
        this.setData({
          infoIsShow: false,
          blogIsShow: true
        })
      } else {
        this.setData({
          infoIsShow: false,
          blogIsShow: false
        })
      }
      this.deleteUnreadAssetsCount();
    } else if (obj == "blog") {
      if (this.data.infoIsShow) {
        this.setData({
          infoIsShow: true,
          blogIsShow: false
        })
      } else {
        this.setData({
          infoIsShow: false,
          blogIsShow: false
        })
      }
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
            noticeNum: null,
            infoNum: obj.bcAssetsCount,
            infoIsShow: obj.bcAssetsCount == 0 ? false : true,
            blogNum: obj.bcBlogCount,
            blogIsShow: obj.bcBlogCount == 0 ? false : true

          })
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