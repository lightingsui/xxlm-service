const app = getApp();
Component({
  options: {
    styleIsolation: 'shared'
  },
  data: {
    userId: null,
    userName: '',
    TabCur: 0,
    tabValue: 0,
    scrollLeft:0,

    delId: null,

    //tab
    tabArray: [],

    //数组
    information: [],

  },
  lifetimes: {
    attached: function () {
      // 在组件实例进入页面节点树时执行
      this.setData({
        userId: wx.getStorageSync("identity").id,
        userName: wx.getStorageSync("identity").name
      })
      console.log(this.data.userId)
      console.log(this.data.userName)
      this.getAllCategory();
      this.loadData();
    }
  },
  created: function() {
   
  },

  methods: {
    clipboard: function (e) {
      let text = e.currentTarget.dataset.text;
      console.log(text);
      wx.setClipboardData({
        data: text,
        success(res) {
          wx.getClipboardData({
            success(res) {
            }
          })
        }
      })
    },
    // 加载信息
    loadData: function () {
      let _this = this;

      wx.request({
        url: 'https://api.lightingsui.com/assets/select-assign-assets',
        data: {
          userId: _this.data.userId,
          category: _this.data.tabValue
        },
        success: function (res) {
          _this.setData({
            information: []
          })
          if (res.data.data != null && res.data.data.length != 0) {
            let tempArr = [];
            for (let i = 0; i < res.data.data.length; i++) {
              let obj = res.data.data[i];
              tempArr.push({
                id: obj.acId,
                title: obj.acTitle,
                text: obj.acContent,
                link: obj.acLink == null || obj.acLink.length == 0 ? "无" : obj.acLink,
                author: obj.assetsName,
                date: obj.acDate
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
        url: 'https://api.lightingsui.com/assets/get-all-category',
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
                tab: obj.assetsName,
                mId: obj.assetsId
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
  
    search:function() {
      wx.navigateTo({
        url: '/pages/manager/mine/dataSearch/dataSearch',
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
        url: 'https://api.lightingsui.com/assets/delete-by-id',
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
