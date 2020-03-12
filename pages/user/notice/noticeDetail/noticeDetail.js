const app = getApp();

Component({
  options: {
    styleIsolation: 'shared'
  },
  data: {
    items: [],

    isSelf:true,

    id: null
  },
  lifetimes: {
    attached: function () {
      this.checkUserIdentify();
      let id = wx.getStorageSync("DetailItem").id;
      this.setData({
        id: id
      })
      this.loadDetails();
    },
  },

  methods: {
    showModal(e) {
      this.setData({
        modalName: e.currentTarget.dataset.target
      })
    },

    // 查询详情
    loadDetails: function() {
      let _this = this;

      wx.request({
        url: 'https://api.lightingsui.com/notice/select-details-by-id/' + _this.data.id,
        success: function(res) {
          if(res.data.data != null) {
              let arr = [];
              arr.push({
                dTitle: res.data.data.noticeTitle,
                dDate: res.data.data.noticeDate,
                dHits: res.data.data.noticeCount,
                dText: res.data.data.noticeContent
              })

              _this.setData({
                items: arr
              })
          }
        }
      })
    },

    // 判断用户身份
    checkUserIdentify: function () {
      let _this = this;
      //判断用户是管理员或者普通用户
      wx.request({
        url: 'https://api.lightingsui.com/user/select-admin-message',
        header: app.globalData.header,
        success: function (res) {
          console.log(res);
          if (res.data.data != null) {
            _this.setData({
              isSelf: res.data.data.umIdentify == '1' ? true : false
            })
          }
        },
        fail: function (res) {
          console.log(res)
        }
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

      // 发送请求
      let _this = this;
      wx.request({
        url: 'https://api.lightingsui.com/notice/delete-notice/' + _this.data.id,

        success: function(res) {
          if(res.data.data != null && res.data.data == true) {
            wx.navigateBack({
              delta: 1
            })
          }
        } 
      })
    }
  }
})
