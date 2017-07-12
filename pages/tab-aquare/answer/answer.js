// pages/answer/answer.js
var Api = require('../../../utils/api.js');
var util = require('../../../utils/util.js');
Page({
  /**
   * 页面的初始数据
   */
  data: {
    id: "",
    modalHidden: true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options.id);
    this.setData({ id: options.id });
  },
  bindFormSubmit: function (e) {
    var content = e.detail.value.textarea;
    var that = this;
    var id = this.data.id;
    console.log(id);
    var accesstoken = wx.getStorageSync('CuserInfo').accesstoken;
    var index = e.currentTarget.dataset.index;
    var ApiUrl = Api.answer(id);
    // if (!id) return;
    // if (!accesstoken) {
    //   that.setData({ modalHidden: false });
    //   return;
    // }
    console.log(ApiUrl)
    Api.fetchPost(ApiUrl, { accesstoken: accesstoken, content: content }, (err, res) => {
      console.log(res);
      console.log(e.detail.value.textarea);
      if (res.success) {
        // var detail = that.data.detail;
        // var replies = detail.replies[index];

        // if (res.action === "up") {
        //   replies.zanNum = replies.zanNum + 1;
        // } else {
        //   replies.zanNum = replies.zanNum - 1;
        // }
        console.log(res.success);
        // that.setData({ detail: detail });
        console.log(id);
        wx.navigateTo({
          url: '/pages/tab-aquare/detail/detail?id=' + id,
        })
      }
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

  },
  // 关闭--模态弹窗
  cancelChange: function () {
    this.setData({ modalHidden: true });
  },
  // 确认--模态弹窗
  confirmChange: function () {
    this.setData({ modalHidden: true });
    wx.navigateTo({
      url: 'pages/tab-mine/login/login'
    });
  }
})