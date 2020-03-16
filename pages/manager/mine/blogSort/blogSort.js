Component({
  options: {
    styleIsolation: 'shared'
  },
  data: {
    sort:'',
    sortCheck:'',
    sortArray: []
  },
  created: function() {
    this.toast = this.selectComponent("#tui-tips-ctx");
    this.getAllCategory();
  },

  methods: {
    // 查询所有分类
    getAllCategory: function () {
      let _this = this;

      wx.request({
        url: 'https://api.lightingsui.com/blog/get-all-category',
        success: function (res) {
          if (res.data.data != null || res.data.data.length != 0) {
            let mutilArr = [];
            for (let i = 0; i < res.data.data.length; i++) {
              let obj = res.data.data[i];
              mutilArr.push({
                sort: obj.blogCName
              });
            }

            _this.setData({
              sortArray: mutilArr
            })
          }
        }
      })
    },
    sort: function (e) {
      console.log(e);
      this.setData({
        sort: e.detail.value,
        sortCheck:''
      })
    },
    //确认
    confirm: function () {
      if(this.data.sort == '') {
        this.setData({
          sortCheck:'请填写分类'
        })
      } else if (this.data.sort.length > 8) {
        this.setData({
          sortCheck: '分类限制为小于9个字符'
        })
      }else {
        //如果分类已存在
        for (let i = 0; i < this.data.sortArray.length; i++) {
          if (this.data.sort.toLowerCase() == this.data.sortArray[i].sort.toLowerCase()) {
            this.setData({
              sortCheck: '分类已存在'
            })
            return;
          }
        }

        let _this = this;
        //发送请求添加分类
        wx.request({
          url: 'https://api.lightingsui.com/blog/add-blog-category',
          data: {
            cName: this.data.sort
          },
          success: function(res) {
            if(res.data.data != null && res.data.data == true) {
              let params = {
                title: "添加成功",
                imgUrl: "/static/images/toast/check-circle.png",
                icon: true
              };
              _this.toast.show(params);
              _this.getAllCategory();

              _this.setData({
                sort: ''
              })
            }
          }
        })
      }
    }
  }
})