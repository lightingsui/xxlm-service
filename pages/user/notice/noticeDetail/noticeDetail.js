Component({
  options: {
    styleIsolation: 'shared'
  },
  data: {
    items: [],

    isSelf:true,
  },
  lifetimes: {
    attached: function () {
      this.data.items.push(wx.getStorageSync("DetailItem"));
      this.setData({ items: this.data.items });
    },
  },

  methods: {
    showModal(e) {
      this.setData({
        modalName: e.currentTarget.dataset.target
      })
    },
    hideModal(e) {
      this.setData({
        modalName: null
      })
    },
  
    infoConfirm:function() {
      this.setData({
        modalName: null
      })
    }
  }
})
