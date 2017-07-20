// pages/answer/answer.js
var Api = require('../../../utils/api.js');
var util = require('../../../utils/util.js');
Page({
  /**
   * 页面的初始数据
   */
  data: {
    textareaValue:"",
    contentValue:"",
    modalHidden: true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  },
  bindFormSubmit: function (e) {
    var content = e.detail.value.textarea;
    var that = this;
    var id = this.data.id;
    console.log(id);
    var accesstoken = wx.getStorageSync('CuserInfo').accesstoken;
    var index = e.currentTarget.dataset.index;
    var ApiUrl = Api.new_topic;
    // if (!id) return;
    // if (!accesstoken) {
    //   that.setData({ modalHidden: false });
    //   return;
    // }
    console.log(ApiUrl);
    // accesstoken String 用户的 accessToken
    // title String 标题
    // tab String 目前有 ask share job dev。开发新客户端的同学，请务必将你们的测试帖发在 dev 专区，以免污染日常的版面，否则会进行封号一周处理。
    // content String 主体内容
    var title = e.detail.value.asktitle;
    var content = e.detail.value.content;
    Api.fetchPost(ApiUrl, { accesstoken: accesstoken,title:title,tab:'dev',content: content }, (err, res) => {
      if (res.success) {
        // var detail = that.data.detail;
        // var replies = detail.replies[index];

        // if (res.action === "up") {
        //   replies.zanNum = replies.zanNum + 1;
        // } else {
        //   replies.zanNum = replies.zanNum - 1;
        // }
        
        var id = res.topic_id;
        // that.setData({ detail: detail });
        wx.navigateTo({
          url: '/pages/tab-aquare/detail/detail?id=' + id,
        })
      }
    });
    
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