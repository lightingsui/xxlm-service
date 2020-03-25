const app = getApp();
const utils = require('../../../../components/utils/utils');
Component({
  options: {
    styleIsolation: 'shared'
  },
  data: {
    //头像
    avatar: '',

    //姓名
    name: '',

    //标题
    title: '',

    sex: "",

    link: '',

    //单选框
    index: '',

    modalName: '',
    modelContent: '',

    indexValue: '',
    selectName: null,

    picker: [],
    mutilArr: [],

    confirmPush: false,


    //描述
    text: '',
  },

  created: function() {
    //获取用户头像与姓名
    this.getUSernameAndHead();
    this.getAllCategory();
  },

  methods: {
    // 显示错误提示
    showTips: function (msg) {
      console.log(utils);
      let options = {
        msg: msg,
        duration: 2000,
        type: "danger"
      };
      utils.toast(options);
    },
    // 查询所有分类
    getAllCategory: function() {
      let _this = this;

      wx.request({
        url: 'https://api.lightingsui.com/blog/get-all-category',
        success: function(res) {
          if (res.data.data != null && res.data.data.length != 0) {
            let arrTemp = [];
            let mutilArr = [];
            for (let i = 0; i < res.data.data.length; i++) {
              let obj = res.data.data[i];
              arrTemp.push({
                name: obj.blogCName,
                id: obj.blogCId
              })

              mutilArr.push(obj.blogCName);
            }



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
    // 获取用户头像与姓名
    getUSernameAndHead: function() {
      let _this = this;
      wx.request({
        url: 'https://api.lightingsui.com/user/select-admin-message',
        header: app.globalData.header,
        success: function(res) {
          console.log(res);
          if (res.data.data != null) {
            _this.setData({
              avatar: res.data.data.umHeadUrl,
              name: res.data.data.umName,
              sex: res.data.data == '0' ? "female" : "male"
            })
          }
        },
        fail: function(res) {
          console.log(res)
        }
      })
    },
    titleInput: function(e) {
      this.setData({
        title: e.detail.value
      })
      console.log(this.data.title);
    },

    textInput: function(e) {
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
      for (let i = 0; i < this.data.mutilArr.length; i++) {
        if (this.data.picker[e.detail.value] == this.data.mutilArr[i].name) {
          this.setData({
            indexValue: this.data.mutilArr[i].id
          })
          break;
        }
      }
      this.setData({
        index: e.detail.value
      })
      console.log(this.data.index);
      console.log(this.data.indexValue);
    },

    //资料分享
    publish: function(e) {
      console.log(this.data.name);

      console.log(this.data.text);

      // 表单验证
      if (this.data.title == null || this.data.title == '' || this.data.title.length == 0) {
        this.showTips("请填写标题");
        return;
      }
      if (this.data.indexValue == '') {
        this.showTips("请选择类型");
        return;
      }
      if (this.data.text == null || this.data.text == '') {
        this.showTips("请填写描述信息");
        return;
      }
      if (this.data.link == null || this.data.link == '') {
        this.showTips("请填写链接地址");
        return;
      }

      if (this.data.link.length > 255) {
        this.showTips("链接地址长度应小于255");
        return;
      }

      if (this.data.title.length > 100) {
        this.showTips("标题长度应小于100");
        return;
      }

      if (this.data.text.length > 500) {
        this.showTips("文本长度应小于500");
        return;
      }

      this.setData({
        confirmPush: true
      })

      //发送请求
      let _this = this;

      wx.request({
        url: 'https://api.lightingsui.com/blog/upload-blog',
        method: "POST",
        header: {
          "content-type": "application/x-www-form-urlencoded",
          "Cookie": app.globalData.header.Cookie
        },
        data: {
          blogCId: _this.data.indexValue,
          bdTitle: _this.data.title,
          bdLink: _this.data.link,
          bdContent: _this.data.text
        },
        success: function(res) {
          if (res.data.data != null && res.data.data != false) {
            _this.setData({
              confirmPush: false
            })
            app.globalData.isBackContinue = true;
            wx.navigateBack({
              delta: 1
            })
          }
        }
      })


    },

    // 关闭警告模态框
    closeModel: function() {
      this.setData({
        modalName: '',
        modalContent: ''
      })
    }
  },

})