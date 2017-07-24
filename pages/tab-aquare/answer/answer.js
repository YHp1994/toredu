// pages/answer/answer.js
var Api = require('../../../utils/api.js');
var util = require('../../../utils/util.js');
Page({
  /**
   * 页面的初始数据
   */
  data: {
    questionDetail:{},
    detail:{},
    id: "",
    typeNum: 0,
    modalHidden: true,
    submitForm: true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options.id);
    this.setData({ id: options.id });

    var ApiUrlq = Api.t_questionDetail;
    Api.requestGetApi(ApiUrlq, { pageNo: 1, questionID: options.id }, this, this.sucesstDetail, this.failDetail);
  }, 
  valueChange: function (e) {
    this.setData({
      typeNum: e.detail.value.length
    })
    if (e.detail.value.length > 10) {
      this.setData({
        submitForm: false
      })
    }
  },
  sucesstDetail: function (res, selfObj) {
    console.log('sucess', res);
    selfObj.setData({ detail: res.data });
  },
  bindFormSubmit: function (e) {
    var answer = e.detail.value.textarea;
    var that = this;
    var id = this.data.id;
    console.log(id);

    var CuserInfo = wx.getStorageSync('CuserInfo');
    var memberID = CuserInfo.memberID;
    var that = this;
    var params = json2Form({memberID: memberID, answer: answer, questionID: id});
    console.log(params);
    var ApiUrl = Api.t_answer;
    /**
     * 
     *  调用问题详情接口
     * requestGetApi(url, params, sourceObj, successFun, failFun, completeFun)
     */
    Api.requestPostApi(ApiUrl, params, this, this.sucesstAnswer, this.failAnswer);

    // Api.fetchPost(ApiUrl, { accesstoken: accesstoken, content: content }, (err, res) => {
    //   console.log(res);
    //   console.log(e.detail.value.textarea);
    //   if (res.success) {
    //     // var detail = that.data.detail;
    //     // var replies = detail.replies[index];

    //     // if (res.action === "up") {
    //     //   replies.zanNum = replies.zanNum + 1;
    //     // } else {
    //     //   replies.zanNum = replies.zanNum - 1;
    //     // }
    //     console.log(res.success);
    //     // that.setData({ detail: detail });
    //     console.log(id);
    //     wx.navigateTo({
    //       url: '/pages/tab-aquare/detail/detail?id=' + id,
    //     })
    //   }
    // })
  },
  sucesstAnswer:function(res,selfObj){
    console.log('提交成功',res)
    if (res.returnCode == "401"){
        wx.showToast({
          title: '不能自问自答',
          icon: 'success',
          duration: 2000
        })
        setTimeout(function(){
          wx.navigateBack({
            delta: 1
          })
        },2000)
       
    } else if (res.returnCode == "402"){
      wx.showToast({
        title: '每个问题只能回答一次',
        icon: 'success',
        duration: 2000
      })
      setTimeout(function () {
        wx.navigateBack({
          delta: 1
        })
      }, 2000)
    }else{
      wx.navigateTo({
        url: '/pages/tab-aquare/detail/detail?id=' + selfObj.data.id,
      })
    }
    
  },
  failAnswer:function(){
    console.log(fail);
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
function json2Form(json) {
  var str = [];
  for (var p in json) {
    str.push(encodeURIComponent(p) + "=" + encodeURIComponent(json[p]));
  }
  return str.join("&");
} 