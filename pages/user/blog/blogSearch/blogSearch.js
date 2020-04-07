Component({
  options: {
    styleIsolation: 'shared'
  },
  data: {
    inputSearch:'',

    card:false,

    //数组
    information: [],
  },
  lifetimes: {
    attached: function () {
      
    },
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
        url: 'https://api.lightingsui.com/blog/search-blog-by-filed',
        data: {
          searchFiled: this.data.inputSearch
        },
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
