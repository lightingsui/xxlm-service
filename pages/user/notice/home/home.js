const app = getApp();
Component({
  options: {
    styleIsolation: 'shared'
  },
  data: {
    TabCur: 0,
    scrollLeft:0,

    //tab
    tabArray: [
      {tab: '公告'},
      {tab: '作业'},
    ],

    manager: false,
    scrollTop: 0,

    //公告数组
    notice: [],
  },
  created: function() {
    this.checkUserIdentify();
    this.loadFormData();
  },

  pageLifetimes: {
    show: function() {
      this.checkUserIdentify();
      this.loadFormData();
      
    }
  },

  methods: {
    
    isCard(e) {
      this.setData({
        isCard: e.detail.value
      })
    },
    // 载入数据
    loadFormData: function() {
        let _this = this;

        wx.request({
          url: 'https://api.lightingsui.com/notice/select-all-message',
          data: {
            typeId: _this.data.TabCur
          },
          success: function(res) {
            if(res.data.data != null || res.data.data.length > 0) {
              _this.setData({
                notice: []
              })
                for(let i = 0; i < res.data.data.length; i++) {
                  let obj = res.data.data[i];

                  let noticeArrayTemp = _this.data.notice;
                  noticeArrayTemp.push({
                    id: obj.noticeId,
                    title: obj.noticeTitle,
                    text: obj.noticeContent,
                    date: obj.noticeDate
                  })

                  _this.setData({
                    notice: noticeArrayTemp
                  })
                }
            }
          }
        })
    },

    // 判断用户身份
    checkUserIdentify: function() {
      let _this = this;
      //判断用户是管理员或者普通用户
      wx.request({
        url: 'https://api.lightingsui.com/user/select-admin-message',
        header: app.globalData.header,
        success: function (res) {
          console.log(res);
          if (res.data.data != null) {
            _this.setData({
              manager: res.data.data.umIdentify == '1' ? true : false
            })
          }
        },
        fail: function (res) {
          console.log(res)
        }
      })
    },
    tabSelect(e) {
      this.setData({
        TabCur: e.currentTarget.dataset.id,
        scrollLeft: (e.currentTarget.dataset.id-1)*60
      })
  
      //发送请求加载 notice 数组
      this.loadFormData();
  
    },
    //发表
    publish:function() {
      wx.navigateTo({
        url: '/pages/user/notice/noticePublish/noticePublish'
      })
    },

    noticeDetail:function(e) {
      let i = e.currentTarget.dataset.index;
  
      var item = {
        id: this.data.notice[i].id,
      };

      // console.log(item);

      wx.setStorageSync("DetailItem", item);

      wx.navigateTo({
        url: '/pages/user/notice/noticeDetail/noticeDetail',
      })
    }
  }
})

