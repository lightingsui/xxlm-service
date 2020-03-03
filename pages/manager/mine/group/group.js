const app = getApp();
Page({
  data: {
    StatusBar: app.globalData.StatusBar,
    CustomBar: app.globalData.CustomBar,
    hidden: true,

    cityList : [	 
      {
          "title":"A",
          "lists":[
            {
              "avatar":'',
              "gender":'',
              "name":'阿坝'
            },
            {
              "avatar":'',
              "gender":'',
              "name":'阿拉善'
            },
            {
              "avatar":'',
              "gender":'',
              "name":'阿里'
            },
            {
              "avatar":'',
              "gender":'',
              "name":'安康'
            },
          ]
      },
      {
          "title":"B",
          "lists":[
            {
              "avatar":'',
              "gender":'',
              "name":'保定'
            },
            {
              "avatar":'',
              "gender":'',
              "name":'北京'
            },
            {
              "avatar":'',
              "gender":'',
              "name":'白银'
            },
          ]
      },
      {
          "title":"C",
          "lists":[
            {
              "avatar":'',
              "gender":'',
              "name":'重庆'
            },
            {
              "avatar":'',
              "gender":'',
              "name":'成都'
            },
            {
              "avatar":'',
              "gender":'',
              "name":'长沙'
            },
          ]
      },
      {
        "title":"D",
        "lists":[
          {
            "avatar":'',
            "gender":'',
            "name":'重庆'
          },
          {
            "avatar":'',
            "gender":'',
            "name":'成都'
          },
          {
            "avatar":'',
            "gender":'',
            "name":'长沙'
          },
        ]
      },
      {
        "title":"E",
        "lists":[
          {
            "avatar":'',
            "gender":'',
            "name":'重庆'
          },
          {
            "avatar":'',
            "gender":'',
            "name":'成都'
          },
          {
            "avatar":'',
            "gender":'',
            "name":'长沙'
          },
        ]
      },
      {
        "title":"F",
        "lists":[
          {
            "avatar":'',
            "gender":'',
            "name":'重庆'
          },
          {
            "avatar":'',
            "gender":'',
            "name":'成都'
          },
          {
            "avatar":'',
            "gender":'',
            "name":'长沙'
          },
        ]
      },
      {
        "title":"G",
        "lists":[
          {
            "avatar":'',
            "gender":'',
            "name":'重庆'
          },
          {
            "avatar":'',
            "gender":'',
            "name":'成都'
          },
          {
            "avatar":'',
            "gender":'',
            "name":'长沙'
          },
        ]
      },
      {
        "title":"H",
        "lists":[
          {
            "avatar":'',
            "gender":'',
            "name":'重庆'
          },
          {
            "avatar":'',
            "gender":'',
            "name":'成都'
          },
          {
            "avatar":'',
            "gender":'',
            "name":'长沙'
          },
        ]
      },
      {
        "title":"I",
        "lists":[
          {
            "avatar":'',
            "gender":'',
            "name":'重庆'
          },
          {
            "avatar":'',
            "gender":'',
            "name":'成都'
          },
          {
            "avatar":'',
            "gender":'',
            "name":'长沙'
          },
        ]
      },
      {
        "title":"J",
        "lists":[
          {
            "avatar":'',
            "gender":'',
            "name":'重庆'
          },
          {
            "avatar":'',
            "gender":'',
            "name":'成都'
          },
          {
            "avatar":'',
            "gender":'',
            "name":'长沙'
          },
        ]
      },
      {
        "title":"K",
        "lists":[
          {
            "avatar":'',
            "gender":'',
            "name":'重庆'
          },
          {
            "avatar":'',
            "gender":'',
            "name":'成都'
          },
          {
            "avatar":'',
            "gender":'',
            "name":'长沙'
          },
        ]
      },
      {
        "title":"L",
        "lists":[
          {
            "avatar":'',
            "gender":'',
            "name":'重庆'
          },
          {
            "avatar":'',
            "gender":'',
            "name":'成都'
          },
          {
            "avatar":'',
            "gender":'',
            "name":'长沙'
          },
        ]
      },
      {
        "title":"M",
        "lists":[
          {
            "avatar":'',
            "gender":'',
            "name":'重庆'
          },
          {
            "avatar":'',
            "gender":'',
            "name":'成都'
          },
          {
            "avatar":'',
            "gender":'',
            "name":'长沙'
          },
        ]
      },
    ]
   
  },
  onLoad() {
    // let list = [];
    // for (let i = 0; i < 26; i++) {
    //   list[i] = String.fromCharCode(65 + i)
    // }
    // this.setData({
    //   list: list,
    //   listCur: list[0]
    // })
  },
  onReady() {
    let that = this;
    wx.createSelectorQuery().select('.indexBar-box').boundingClientRect(function(res) {
      that.setData({
        boxTop: res.top
      })
    }).exec();
    wx.createSelectorQuery().select('.indexes').boundingClientRect(function(res) {
      that.setData({
        barTop: res.top
      })
    }).exec()
  },
  //获取文字信息
  getCur(e) {
    this.setData({
      hidden: false,
      listCur: this.data.list[e.target.id],
    })
  },

  setCur(e) {
    this.setData({
      hidden: true,
      listCur: this.data.listCur
    })
  },
  //滑动选择Item
  tMove(e) {
    let y = e.touches[0].clientY,
      offsettop = this.data.boxTop,
      that = this;
    //判断选择区域,只有在选择区才会生效
    if (y > offsettop) {
      let num = parseInt((y - offsettop) / 20);
      this.setData({
        listCur: that.data.list[num]
      })
    };
  },

  //触发全部开始选择
  tStart() {
    this.setData({
      hidden: false
    })
  },

  //触发结束选择
  tEnd() {
    this.setData({
      hidden: true,
      listCurID: this.data.listCur
    })
  },
  indexSelect(e) {
    let that = this;
    let barHeight = this.data.barHeight;
    let list = this.data.list;
    let scrollY = Math.ceil(list.length * e.detail.y / barHeight);
    for (let i = 0; i < list.length; i++) {
      if (scrollY < i + 1) {
        that.setData({
          listCur: list[i],
          movableY: i * 20
        })
        return false
      }
    }
  },
  member:function() {
    wx.navigateTo({
      url: '/pages/manager/mine/member/member',
    })
  }
});