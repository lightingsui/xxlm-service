const app = getApp();
Component({
  options: {
    styleIsolation: 'shared'
  },
  data: {
    userId: null,
    inputSearch:'',

    card:true,

    //数组
    information: [],
  },
  lifetimes: {
    attached: function () {

    },
  },
  created: function() {
    this.setData({
      userId: wx.getStorageSync("identity").id
    })
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

    searchQuest: function() {
      let _this = this;

      wx.request({
        url: 'https://api.lightingsui.com/assets/select-assign-user-assets-by-cond',
        data: {
          searchFiled: this.data.inputSearch,
          userId: _this.data.userId
        },
        success: function(res) {
          let arrTemp = [];
          _this.setData({
            information: []
          });

          if(res.data.data != null && res.data.data.length != 0) {
            
            for(let i = 0; i < res.data.data.length; i++) {
              let obj = res.data.data[i];
              arrTemp.push({
                title: obj.acTitle,
                text: obj.acContent,
                link: obj.acLink == null || obj.acLink == '' ? "无" : obj.acLink,
                author: obj.assetsName,
                date: obj.acDate
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