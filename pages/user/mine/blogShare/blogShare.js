const app = getApp();
Component({
  options: {
    styleIsolation: 'shared'
  },
  data: {
    TabCur: 0,
    tabValue: 0,
    scrollLeft:0,

    //tab
    tabArray: [],

    delId: null,

    //数组
    information: [],
  },
  created: function() {
    this.getAllCategory();
    this.loadData();
  },

  methods: {
    // 加载信息
    loadData: function() {
      let _this = this;

      wx.request({
        url: 'https://api.lightingsui.com/blog/select-current-user-blog',
        header: app.globalData.header,
        data: {
          category: _this.data.tabValue
        },
        success: function(res) {
          _this.setData({
            information: []
          })
          if(res.data.data != null && res.data.data.length != 0) {
            let tempArr = [];
            for(let i = 0; i < res.data.data.length; i++) {
              let obj = res.data.data[i];
              tempArr.push({
                id: obj.bdId,
                title: obj.bdTitle,
                text: obj.bdContent,
                link: obj.bdLink,
                author: obj.assetsName,
                date: obj.bdDate
              })

            }

            _this.setData({
              information: tempArr
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
          if (res.data.data != null && res.data.data.length != 0) {
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
      //发送请求加载 information
      this.loadData();
    },
  
    share:function() {
      wx.navigateTo({
        url: '/pages/user/blog/blogPublish/dataPublish',
      })
    },
  
    search:function() {
      wx.navigateTo({
        url: '/pages/user/mine/blogSearch/blogSearch',
      })
    },

    showModal(e) {
      this.setData({
        modalName: e.currentTarget.dataset.target,
        delId: e.currentTarget.dataset.delId
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
      let _this = this;
      wx.request({
        url: 'https://api.lightingsui.com/blog/delete-by-id',
        data: {
          delId: this.data.delId
        },
        success: function (res) {
          if (res.data.data != null && res.data.data != false) {
            _this.loadData();
          }
        }
      })
    }
  }
})
