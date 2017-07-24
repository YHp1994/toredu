// posts.js
var Api = require('../../../utils/api.js');
var util = require('../../../utils/util.js');

Page({
  data: {
    title: '话题详情',
    detail: {},
    hidden: false,
    modalHidden: true,
    topic_id: "",
    page: 1,
    limit: 8
  },

  onLoad: function (options) {
    this.fetchData(options.id);
    this.setData({ topic_id: options.id });
  },

  // 获取数据
  fetchData: function (id) {
    var that = this;
    var ApiUrl1 = Api.t_questionDetail + '?pageNo=' + this.data.page + '&questionID=' + id;
    console.log(ApiUrl1)
    var ApiUrl = Api.t_questionDetail;
    that.setData({
      hidden: false
    });
    console.log(ApiUrl)
    /**
      * 
      *  调用问题详情接口
      * requestGetApi(url, params, sourceObj, successFun, failFun, completeFun)
      */
    Api.requestGetApi(ApiUrl, { pageNo: 1, questionID:id}, this, this.sucesstDetail, this.failDetail);
  },
  sucesstDetail: function (res, selfObj){
    console.log('sucess', res.data.questionAnswerList.answerList);
    // res.data.questionAnswerList.answerList.forEach((el,index)=>{
      // el.answerTime = util.getDateDiff(el.answerTime)
    // })
    selfObj.setData({ detail: res.data });
  },
  failDetail:function(res, selfObj){
    console.log('fail',res)
  },


  // 点赞
  reply: function (e) {
    console.log(e);
    var that = this;
    var accesstoken = wx.getStorageSync('CuserInfo').accesstoken;
    var id = e.currentTarget.id;
    var index = e.currentTarget.dataset.index;
    var ApiUrl = Api.reply(id);
    if (!id) return;
    if (!accesstoken) {
      that.setData({ modalHidden: false });
      return;
    }
    console.log(id);
    Api.fetchPost(ApiUrl, { accesstoken: accesstoken }, (err, res) => {
      if (res.success) {
        var detail = that.data.detail;
        var replies = detail.replies[index];

        if (res.action === "up") {
          replies.zanNum = replies.zanNum + 1;
        } else {
          replies.zanNum = replies.zanNum - 1;
        }
        that.setData({ detail: detail });
      }
    })

  },
  // 回答
  answer: function (e) {
    if (!wx.getStorageSync('CuserInfo')) {
      this.setData({ modalHidden: false });
      return;
    }
    var CuserInfo = wx.getStorageSync('CuserInfo');
    var memberID = CuserInfo.memberID;
    var that = this;
    var id = this.data.detail.questionAnswerList.questionID;
    var index = e.currentTarget.dataset.index;
    if (!id) return;
    wx.navigateTo({
      url: '/pages/tab-aquare/answer/answer?id=' + id,
    })

  },

  // 关闭--模态弹窗
  cancelChange: function () {
    this.setData({ modalHidden: true });
  },
  // 确认--模态弹窗
  confirmChange: function () {
    this.setData({ modalHidden: true });
    console.log("Aaa")
    wx.navigateTo({
      url: '/pages/tab-mine/login/login'
    });
  }

})
