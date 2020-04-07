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

  // 获取未读数量
  getUnResolveCount: function () {
    let _this = this;

    wx.request({
      url: 'https://api.lightingsui.com/user/select-user-unread-count',
      header: app.globalData.header,
      success: function (res) {
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
      fail: function (res) {
        console.log(res)
      }
    })
  },

  // 清除未读博客数量
  deleteUnreadBlogCount: function () {
    let _this = this;
    wx.request({
      url: 'https://api.lightingsui.com/blog/delete-user-unread-blog-count',
      header: app.globalData.header,
      success: function (res) {
        if (res.data.data != null && res.data.data == true) {
          _this.getUnResolveCount();
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

  // data: {
  //   motto: 'Hello World',
  //   userInfo: {},
  //   hasUserInfo: false,
  //   canIUse: wx.canIUse('button.open-type.getUserInfo')
  // },
  // //事件处理函数
  // bindViewTap: function() {
  //   wx.navigateTo({
  //     url: '../logs/logs'
  //   })
  // },
  // onLoad: function () {
  //   if (app.globalData.userInfo) {
  //     this.setData({
  //       userInfo: app.globalData.userInfo,
  //       hasUserInfo: true
  //     })
  //   } else if (this.data.canIUse){
  //     // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
  //     // 所以此处加入 callback 以防止这种情况
  //     app.userInfoReadyCallback = res => {
  //       this.setData({
  //         userInfo: res.userInfo,
  //         hasUserInfo: true
  //       })
  //     }
  //   } else {
  //     // 在没有 open-type=getUserInfo 版本的兼容处理
  //     wx.getUserInfo({
  //       success: res => {
  //         app.globalData.userInfo = res.userInfo
  //         this.setData({
  //           userInfo: res.userInfo,
  //           hasUserInfo: true
  //         })
  //       }
  //     })
  //   }
  // },
  // getUserInfo: function(e) {
  //   console.log(e)
  //   app.globalData.userInfo = e.detail.userInfo
  //   this.setData({
  //     userInfo: e.detail.userInfo,
  //     hasUserInfo: true
  //   })
  // }
})