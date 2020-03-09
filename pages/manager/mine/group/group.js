const app = getApp();

Component({
  options: {
    styleIsolation: 'shared'
  },
  data: {
    StatusBar: app.globalData.StatusBar,
    CustomBar: app.globalData.CustomBar,
    hidden: true,

    list:['A','B','C','D','F','G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'],

    cityList : [
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
  lifetimes: {
    attached: function () {
      this.setData({
        // list: list,
        listCur: this.data.list[0]
      })
  
      //请求cityList数组
    },
    ready: function() {
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
    }
  },

  methods: {
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
    member:function(e) {

      //父id
      let fid = e.currentTarget.dataset.index;

      //子id
      let sid = e.currentTarget.dataset.sid;


      var identity = {
        avatar: this.data.cityList[fid].lists[sid].avatar,
        gender:this.data.cityList[fid].lists[sid].gender,
        name:this.data.cityList[fid].lists[sid].name
      };

      wx.setStorageSync("identity", identity);

      // console.log(identity)

      wx.navigateTo({
        url: '/pages/manager/mine/member/member',
      })
    }
  }
})
