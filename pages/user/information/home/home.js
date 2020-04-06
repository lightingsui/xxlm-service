const app = getApp();
Component({
  options: {
    styleIsolation: 'shared'
  },
  data: {
    TabCur: 0,

    tabCurValue: null,
    scrollLeft:0,

    

    //tab
    tabArray: [],

    //数组
    information: [],

    // 待删除记录ID
    delId: null
  },
  pageLifetimes: {
    show: function () {
      //发送请求加载 tabArray, information 数组
      if (app.globalData.isBackContinue) {
        this.getAllCategory();
        this.getAllDetails();
        app.globalData.isBackContinue = false;
      }
      
    },
  },

  created: function() {
    this.getAllCategory();
    this.getAllDetails();
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
    // 查询所有详细信息
    getAllDetails:function() {
      let _this = this;
      wx.request({
        url: 'https://api.lightingsui.com/assets/select-assets-by-category-search',
        header: app.globalData.header,
        data: {
          cId: _this.data.tabCurValue,
        },
        success: function(res) {
          _this.setData({
            information: []
          })

          if(res.data.data != null && res.data.data.length != 0) {
            console.log(res.data.data);
            let arrTemp = [];
              for(let i = 0; i < res.data.data.length; i++) {
                let obj = res.data.data[i];
                arrTemp.push({
                  id: obj.acId,
                  title: obj.acTitle,
                  text: obj.acContent,
                  link: obj.acLink == null || obj.acLink == '' ? "无" : obj.acLink,
                  author: obj.assetsName,
                  date: obj.acDate,
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
        url: 'https://api.lightingsui.com/assets/get-all-category',
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
        tabCurValue: e.currentTarget.dataset.mId,
        scrollLeft: (e.currentTarget.dataset.id-1)*60
      })
  
      console.log(this.data.TabCur)
      console.log(this.data.tabCurValue)
      //发送请求加载 information
      this.getAllDetails();
      
    },
  
    share:function() {
      wx.navigateTo({
        url: '/pages/user/information/dataPublish/dataPublish',
      })
    },

    search:function() {
      wx.navigateTo({
        url: '/pages/user/information/dataSearch/dataSearch',
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
        success: function(res) {
          if(res.data.data != null && res.data.data != false) {
            _this.getAllDetails();
          }
        } 
      })
    }
  }
})