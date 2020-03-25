const app = getApp();
Component({
  options: {
    styleIsolation: 'shared'
  },
  data: {
    userId: null,
    inputSearch:'',

    card:false,

    //数组
    information: [],
  },
  created: function() {
    this.setData({
      userId: wx.getStorageSync("identity").id
    });
  },

  methods: {
    search:function() {

      console.log(this.data.inputSearch);
  
      //发送请求查询
      this.searchQuest();
  
      this.setData({
        card:true,
      })
    },
  
    inputSearch:function(e){
      // console.log(e)
      this.setData({
        inputSearch:e.detail.value
      })
    },

    searchQuest: function () {
      let _this = this;

      wx.request({
        url: 'https://api.lightingsui.com/blog/select-assign-user-blog-by-cond',
        data: {
          userId: _this.data.userId,
          searchFiled: this.data.inputSearch
        },
        header: app.globalData.header,
        success: function (res) {
          let arrTemp = [];
          _this.setData({
            information: []
          });

          if (res.data.data != null && res.data.data.length != 0) {

            for (let i = 0; i < res.data.data.length; i++) {
              let obj = res.data.data[i];
              arrTemp.push({
                title: obj.bdTitle,
                text: obj.bdContent,
                link: obj.bdLink,
                author: obj.assetsName,
                date: obj.bdDate
              });
            }

            _this.setData({
              information: arrTemp
            })
          }
        }
      })
    }
  }
})
