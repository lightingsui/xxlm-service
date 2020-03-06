Component({
  options: {
    styleIsolation: 'shared'
  },
  data: {
    sort:''
  },
  lifetimes: {
    attached: function () {
      
    },
  },

  methods: {
    sort: function (e) {
      console.log(e);
      this.setData({
        sort: e.detail.value
      })
    },
    //确认
    confirm: function () {

    }
  }
})