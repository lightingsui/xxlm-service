const app = getApp();
Component({
  options: {
    styleIsolation: 'shared'
  },
  data: {
    TabCur: 0,
    tabValue: null,
    scrollLeft:0,

    isSelf:true,

    //tab
    tabArray: [],

    //数组
    information: [],

    delId: null
  },
  pageLifetimes: {
    show: function () {
       //发送请求加载 tabArray, information 数组
      this.getAllCategory();
      this.getAllDetails();
    },
  },

  created: function() {
    this.getAllCategory();
    this.getAllDetails();
  },

  methods: {
    // 查询所有详细信息
    getAllDetails: function () {
      let _this = this;
      wx.request({
        url: 'https://api.lightingsui.com/blog/select-blog-by-category-search',
        header: app.globalData.header,
        data: {
          cId: _this.data.tabValue,
        },
        success: function (res) {
          _this.setData({
            information: []
          })
          console.log(res.data.data);
          if (res.data.data != null && res.data.data.length != 0) {
            
            let arrTemp = [];
            for (let i = 0; i < res.data.data.length; i++) {
              let obj = res.data.data[i];
              arrTemp.push({
                id: obj.bdId,
                title: obj.bdTitle,
                text: obj.bdContent,
                link: obj.bdLink,
                author: obj.assetsName,
                date: obj.bdDate,
                isSelf: obj.deleteShow
              });
            }

            _this.setData({
              information: arrTemp
            })
          }
        }
      })
    },
    // 查询所有分类
    getAllCategory: function () {
      let _this = this;

      wx.request({
        url: 'https://api.lightingsui.com/blog/get-all-category',
        success: function (res) {
          if (res.data.data != null || res.data.data.length != 0) {
            _this.setData({
              tabArray: []
            })
            let arrTemp = [];
            arrTemp.push({
              tab: "全部",
              mId: "0"
            })
            for (let i = 0; i < res.data.data.length; i++) {
              let obj = res.data.data[i];
              arrTemp.push({
                tab: obj.blogCName,
                mId: obj.blogCId
              })
            }

            _this.setData({
              tabArray: arrTemp
            })
          }
        }
      })
    },
    tabSelect(e) {
      this.setData({
        TabCur: e.currentTarget.dataset.id,
        tabValue: e.currentTarget.dataset.mId,
        scrollLeft: (e.currentTarget.dataset.id-1)*60
      })

      console.log(this.data.TabCur)
      console.log(this.data.tabValue)
      //发送请求加载 information
      this.getAllDetails();
    },

    share:function() {
      wx.navigateTo({
        url: '/pages/user/blog/blogPublish/blogPublish',
      })
    },

    search:function() {
      wx.navigateTo({
        url: '/pages/user/blog/blogSearch/blogSearch',
      })
    },

    showModal(e) {
      this.setData({
        modalName: e.currentTarget.dataset.target,
        delId: e.currentTarget.dataset.id
      })
    },
    hideModal(e) {
      this.setData({
        modalName: null
      })
    },

    infoConfirm:function(e){
      this.setData({
        modalName: null
      })

      //发送请求删除数据
      console.log(this.data.delId);
      let _this = this;
      wx.request({
        url: 'https://api.lightingsui.com/blog/delete-by-id',
        data: {
          delId: this.data.delId
        },
        success: function (res) {
          if (res.data.data != null && res.data.data != false) {
            _this.getAllDetails();
          }
        }
      })

    }
  }
})
