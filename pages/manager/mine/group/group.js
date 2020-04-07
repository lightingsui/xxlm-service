const app = getApp();

Component({
  options: {
    styleIsolation: 'shared'
  },
  data: {
    StatusBar: app.globalData.StatusBar,
    CustomBar: app.globalData.CustomBar,
    hidden: true,

    list: [],

    cityList : []
  },
  lifetimes: {
    attached: function () {
      this.setData({
        // list: list,
        listCur: this.data.list[0]
      })
  
      //请求cityList数组
      this.loadAllUsersMessage();
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
    // 请求人员信息
    loadAllUsersMessage: function() {
      let _this = this;

      wx.request({
        url: 'https://api.lightingsui.com/user/select-all-normal-users',
        success: function(res) {
          if(res.data.data != null) {
            console.log(res.data.data);
            _this.setData({
              cityList: []
            })
            let obj = res.data.data;
            let arrTemp = [];
            let letterArray = [];

            for(let userObj in obj) {
              let userMessage = [];
              for(let i = 0; i < obj[userObj].length; i++) {
                userMessage.push({
                  "id": obj[userObj][i].userId,
                  "avatar": obj[userObj][i].userHead,
                  "gender": obj[userObj][i].userSex == 0 ? 'female': 'male',
                  "name": obj[userObj][i].name
                })
                let flag = false;
                for(let j = 0; j < letterArray.length; j++) {
                  if(letterArray[j] == userObj) {
                    flag = true;
                    break;
                  }
                }

                if(!flag) {
                  letterArray.push(userObj);
                }
              }
              arrTemp.push({
                "title": userObj,
                "lists": userMessage
              });
            }

            _this.setData({
              list: letterArray,
              cityList: arrTemp
            })
          }
        }
      })
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
    member:function(e) {

      //父id
      let fid = e.currentTarget.dataset.index;

      //子id
      let sid = e.currentTarget.dataset.sid;


      var identity = {
        id: this.data.cityList[fid].lists[sid].id,
        avatar: this.data.cityList[fid].lists[sid].avatar,
        gender:this.data.cityList[fid].lists[sid].gender,
        name:this.data.cityList[fid].lists[sid].name
      };

      wx.setStorageSync("identity", identity);

      console.log(identity)

      wx.navigateTo({
        url: '../member/home/home',
      })
    }
  }
})
