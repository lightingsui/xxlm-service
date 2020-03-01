Page({
  /**
   * 页面的初始数据
   */
  data: {

    //头像
    avatar:'',

    //姓名
    name:'',

    //标题
    title:'',

    //单选框
    index:'',

    picker: ['普通公告', '作业公告'],
    
    //内容
    text:'',
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

  //单选框
  PickerChange(e) {
    console.log(e);
    this.setData({
      index: e.detail.value
    })
    console.log(this.data.index);
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    
    //获取用户头像与姓名

    
    this.setData({
      avatar: '',
      name: '冰冰'
    })

  },

  //发表公告
  publish:function(e) {
   console.log(this.data.name);

   console.log(this.data.text);

   //发送请求
  },
})