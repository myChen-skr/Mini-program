// const {
//   get
// } = require("lodash")

// components/musiclist/musiclist.js
const app = getApp()
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    musiclist: Array
  },
  /**
   * 组件的初始数据
   */
  data: {
    playingId: -1
  },
  /**
   * 组件的方法列表
   */
  methods: {
    onSelect(event) {
      const ds = event.currentTarget.dataset
      console.log(ds)
      this.setData({
        playingId: ds.musicid
      })
      // 页面跳转到pages/player/player
      wx.navigateTo({
        url: `../../pages/player/player?musicId=${ds.musicid}&index=${ds.index}`,
      })
    }
  }
})