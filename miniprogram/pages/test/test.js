// pages/test/test.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    openid: ''

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //var let const 定义变量
    // for(let i=0;i<5;i++){

    // }
    // console.log(i)

    // 变量的定义
    // const a=3
    // a=4

    // const obj = {} 定义对象
    // const arr = [] 定义数组
    // const str = '' 定义字符串
    // 属性简写
    // const name = 'mychen'
    // const person = {
    //   name,
    //   age: 30,
    // }
    // 调用一个名字为login的云函数
    // let _this = this
    wx.cloud.callFunction({
      name: 'login'
    }).then((res) => {
      this.setData({
        openid : res.result.openid
      })
      console.log(JSON.stringify(res.result))
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})