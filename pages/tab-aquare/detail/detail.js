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
    // Api.fetchGet(ApiUrl, (err, res) => {
    //   res.data.create_at = util.getDateDiff(new Date(res.data.create_at));
    //   res.data.replies = res.data.replies.map(function (item) {
    //     item.create_at = util.getDateDiff(new Date(item.create_at));
    //     item.zanNum = item.ups.length;
    //     return item;
    //   })
    //   that.setData({ detail: res.data });
    //   setTimeout(function () {
    //     that.setData({ hidden: true });
    //   }, 300);
    // })
    /**
      * 
      *  调用校验码接口
      * requestGetApi(url, params, sourceObj, successFun, failFun, completeFun)
      */
    Api.requestGetApi(ApiUrl, { pageNo: 1, questionID:id}, this, this.sucesstDetail, this.failDetail);
    // Api.fetchGet(ApiUrl, (err, res) => {
    //   console.log(res)
      // res.data.create_at = util.getDateDiff(new Date(res.data.create_at));
      // res.data.replies = res.data.replies.map(function (item) {
      //   item.create_at = util.getDateDiff(new Date(item.create_at));
      //   item.zanNum = item.ups.length;
      //   return item;
      // })
      // that.setData({ detail: res.data });
      // setTimeout(function () {
      //   that.setData({ hidden: true });
      // }, 300);
    // })
  },
  sucesstDetail: function (res, selfObj){
    console.log('sucess',res);
    console.log(selfObj)
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
    console.log(e);
    var that = this;
    var accesstoken = wx.getStorageSync('CuserInfo').accesstoken;
    var id = this.data.topic_id;
    console.log(id);
    var index = e.currentTarget.dataset.index;
    var ApiUrl = Api.reply(id);
    if (!id) return;
    if (!accesstoken) {
      that.setData({ modalHidden: false });
      return;
    }
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
