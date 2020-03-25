Component({
  options: {
    styleIsolation: 'shared'
  },
  data: {
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
        url: 'https://api.lightingsui.com/assets/search-assets-by-filed',
        data: {
          searchFiled: this.data.inputSearch
        },
        success: function(res) {
          let arrTemp = [];
          _this.setData({
            information: []
          });

          if (res.data.data != null && res.data.data.length != 0) {
            
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