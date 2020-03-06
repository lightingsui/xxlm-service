Component({
  options: {
    styleIsolation: 'shared'
  },
  data: {
    identity:[]
  },
  lifetimes: {
    attached: function () {
      this.data.identity.push(wx.getStorageSync("identity"));
      this.setData({ 
        identity: this.data.identity 
      });
    },
  },

  methods: {
    
  }
})
