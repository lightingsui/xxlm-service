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

    // 性别
    sex: '',

    //单选框
    index: '',

    picker: ['普通公告', '作业公告'],

    //内容
    text: '',

    modelName: null,

    confirmPush: false,
  },
  created: function() {
    let _this = this;
    //获取用户头像与姓名
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

    titleInput: function(e) {
      this.setData({
        title: e.detail.value
      })
      console.log(this.data.title);
    },

    closeModel: function () {
      this.setData({
        modelName: null
      })
    },

    textInput: function(e) {
      this.setData({
        text: e.detail.value
      })
      console.log(this.data.text);
    },

    //单选框
    PickerChange(e) {
      console.log(e);
      this.setData({
        index: e.detail.value
      })
      console.log(this.data.index);
    },

    //发表公告
    publish: function(e) {
      console.log(this.data.title)
      if (this.data.title == null || this.data.tltle == '' || this.data.title.length == 0) {
          this.showTips("请填写标题");
          return;
      }
      if (this.data.index == null || this.data.index == '') {
        this.showTips("请选择公告类型");
        return;
      }
      if (this.data.text == null || this.data.text == '') {
        this.showTips("请填写内容");
        return;
      }

      this.setData({
        confirmPush: true
      })
      //发送请求
      let _this = this;
      wx.request({
        url: 'https://api.lightingsui.com/notice/push-notice',
        method: "POST",
        data: {
          noticeTitle: this.data.title,
          noticeType: this.data.index,
          noticeContent: this.data.text
        }, 
        header: {
          "content-type": "application/x-www-form-urlencoded"
        },
        success: function() {
          _this.setData({
            confirmPush: false
          })
          app.globalData.isBackContinue = true;
          wx.navigateBack({
            delta: 1
          })
        }
      })
      
    },
  }
})