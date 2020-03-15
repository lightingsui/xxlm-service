const app = getApp();
Component({
  options: {
    styleIsolation: 'shared'
  },
  data: {
    //头像
    avatar:'',

    //姓名
    name:'',

    // 性别
    sex: "",

    //标题
    title:'',

    link: '',

    //单选框
    index: -1,

    selectName: null,

    picker: [],
    mutilArr: [],
    
    //描述
    text:'',

    modelName: null,
    modalContent: '',

    confirmPush: false
  },
  lifetimes: {
    attached: function () {
      //获取用户头像与姓名
      this.getUSernameAndHead();
      this.getAllCategory();
    },
  },

  methods: {
    // 获取用户头像与姓名
    getUSernameAndHead: function() {
      let _this = this;
      wx.request({
        url: 'https://api.lightingsui.com/user/select-admin-message',
        header: app.globalData.header,
        success: function (res) {
          console.log(res);
          if (res.data.data != null) {
            _this.setData({
              avatar: res.data.data.umHeadUrl,
              name: res.data.data.umName,
              sex: res.data.data == '0' ? "female" : "male"
            })
          }
        },
        fail: function (res) {
          console.log(res)
        }
      })
    },
    // 查询所有分类
    getAllCategory: function() {
        let _this = this;

        wx.request({
          url: 'https://api.lightingsui.com/assets/get-all-category',
          success: function(res) {
              if(res.data.data != null || res.data.data.length != 0) {
                let arrTemp = [];
                let mutilArr = [];
                for(let i = 0; i < res.data.data.length; i++) {
                    let obj = res.data.data[i];
                    arrTemp.push({
                      name: obj.assetsName,
                      id: obj.assetsId
                    })

                    mutilArr.push(obj.assetsName);
                }

                console.log(arrTemp);

                _this.setData({
                  mutilArr: arrTemp
                })

                _this.setData({
                  picker: mutilArr
                })
              }
          }
        })
    },


    titleInput: function (e) {
      this.setData({
        title: e.detail.value
      })
      console.log(this.data.title);
    },
  
    textInput: function (e) {
      this.setData({
        text: e.detail.value
      })
      console.log(this.data.text);
    },

    linkInput: function(e) {
      this.setData({
        link: e.detail.value
      })
      console.log(this.data.link);
    },
  
    //单选框
    PickerChange(e) {
      console.log(e);
      this.setData({
        index: this.data.mutilArr[e.detail.value].id
      })

      for (let i = 0; i < this.data.mutilArr.length; i++) {
          if(this.data.mutilArr[i].id == this.data.index) {
            this.setData({
              selectName: this.data.mutilArr[i].name
            })
          }
      }
      console.log(this.data.index);
    },

    //资料分享
    publish:function(e) {
      console.log(this.data.name);
  
      console.log(this.data.text);

      // 表单验证
      let paramsCheck = this.data.index == -1 || this.data.text == null || this.data.text == '' || this.data.title == null || this.data.title == '' || this.data.link == null || this.data.link == '';

      if (paramsCheck) {
        this.setData({
          modalName: "Modal",
          modalContent: "请填写必填项"
        })
        return;
      }

      if (this.data.link.length > 255) {
        this.setData({
          modalName: "Modal",
          modalContent: "链接地址长度应小于255"
        })
        return;
      }

      if (this.data.title.length > 100) {
        this.setData({
          modalName: "Modal",
          modalContent: "标题长度应小于100"
        })
        return;
      }

      if (this.data.text.length > 500) {
        this.setData({
          modalName: "Modal",
          modalContent: "文本长度应小于500"
        })
        return;
      }

      this.setData({
        confirmPush: true
      })
  
      //发送请求
      let _this = this;

      wx.request({
        url: 'https://api.lightingsui.com/assets/upload-assets',
        method: "POST",
        header: {
          "content-type": "application/x-www-form-urlencoded",
          "Cookie": app.globalData.header.Cookie
        },
        data: {
          assetsId: _this.data.index,
          acTitle: _this.data.title,
          acLink: _this.data.link,
          acContent: _this.data.text
        },
        success: function(res) {
          if(res.data.data != null && res.data.data != false) {
            _this.setData({
              confirmPush: false
            })

            wx.navigateBack({
              delta: 1
            })
          }
        }
      })
    },

    // 关闭警告模态框
    closeModel: function () {
      this.setData({
        modelName: null
      })
    }
  }
})
