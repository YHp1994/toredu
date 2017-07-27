// posts.js
var Api = require('../../../utils/api.js');
var util = require('../../../utils/util.js');
var index = ''
Page({
  data: {
    detail: {},
    answerLists:[],
    fileUrl:[],
    page: 1,
    limit: 8,
    hidden: false,
    modalHidden: true,
    topic_id: "",
    answer_id:'',
    isZan:false
  },

  onLoad: function (options) {
    // this.fetchData(options.id);
    this.setData({ topic_id: options.id });
    // this.getData();
  },
  onShow:function(){
    this.setData({
      detail: {},
      answerLists: [],
      fileUrl: [],
      page: 1,
      limit: 8,
      isZan: false
    })
    this.getData();
  },
  //获取回答列表数据
  getData: function () {
    var that = this;
    var page = that.data.page;
    var limit = that.data.limit;
    var id = this.data.topic_id;
    var ApiUrl = Api.t_questionDetail + '?pageNo=' + page + '&questionID=' + id;
    console.log(ApiUrl)
    that.setData({ hidden: false });

    if (page == 1) {
      that.setData({ detail: [] });
    }
    Api.fetchGet(ApiUrl, (err, res) => {
      //更新数据
      console.log(res);
      if (res.data.questionAnswerList.answerList){
        that.setData({
          answerLists: that.data.answerLists.concat(res.data.questionAnswerList.answerList.map(function (item) {
            return item;
          })),
          detail: res.data,
          })
        console.log(that.data.fileUrl)
      } else {
        this.setData({
          noMore: false
        })

      } 
      if (res.data.questionAnswerList.questionExtList){
        that.setData({
          fileUrl: that.data.fileUrl.concat(res.data.questionAnswerList.questionExtList.map(function (item) {
            return "https://app.toredu.com/" + item.fileUrl;
          }))
        })
      }
      console.log(this.data.detail)
      setTimeout(function () {
        that.setData({ hidden: true });
      }, 300);
    })
  },
  /**
 * 页面上拉触底事件的处理函数
 */
  onReachBottom: function () {
    this.lower();
    console.log('上拉刷新', new Date());
  },
  // 滑动底部加载
  lower: function () {
    console.log('滑动底部加载', new Date());
    var that = this;
    that.setData({
      page: that.data.page + 1
    });
    // if (that.data.tab !== 'all') {
    //   this.getData({ tab: that.data.tab, page: that.data.page });
    // } else {
    this.getData({ page: that.data.page });
    // }
  },
  clickImage: function (e) {
    var current = e.target.dataset.src;
    console.log(current);
    console.log(this.data.fileUrl);
    var fileUrls = this.data.fileUrl;
    wx.previewImage({
      current: current,
      urls: fileUrls,
      success:function(){
        console.log('展示图片了')
      },
      fail: function () {
        console.log('fail')
      },
      complete: function () {
        console.info("点击图片了");
      },
    })
  },





  // 点赞
  reply: function (e) {
    if (!wx.getStorageSync('CuserInfo')) {
      this.setData({ modalHidden: false });
      return;
    }
    var CuserInfo = wx.getStorageSync('CuserInfo');
    var memberID = CuserInfo.memberID;
    var answerID = e.currentTarget.id;
    index = e.currentTarget.dataset.index;
    var ApiUrl = Api.t_updateThumbsUp;
    var params = json2Form({ memberID: memberID, answerID: answerID });
    /**
      * 
      *  调用点赞接口
      * requestGetApi(url, params, sourceObj, successFun, failFun, completeFun)
      */
    Api.requestGetApi(ApiUrl, { memberID: memberID, answerID: answerID }, this, this.sucesstThumbsUp, this.failThumbsUp);
  },
  sucesstThumbsUp: function (res, selfObj){
    console.log(res,selfObj);
    if (res.returnCode == "401"){
      console.log("不能自己给自己点赞")
      wx.showToast({
        title: '不能自己给自己点赞',
        icon: 'success',
        duration: 2000
      })
      setTimeout(function () {
        wx.hideToast()
      }, 2000)
    } else if (res.returnCode == "000"){
      // 点赞成功
      console.log("点赞成功")


      // if (res.success) {
      //   var detail = that.data.detail;
      //   var replies = detail.replies[index];

      //   if (res.action === "up") {
      //     replies.zanNum = replies.zanNum + 1;
      //   } else {
      //     replies.zanNum = replies.zanNum - 1;
      //   }

      //   that.setData({ detail: detail });

      // }

      var answerLists = selfObj.data.answerLists;
      var rnum = answerLists[index];
      rnum.upTimes = rnum.upTimes+1;
      selfObj.setData({
        answerLists: answerLists
      })

    }
  },
  // 关闭--模态弹窗
  cancelChange: function () {
    this.setData({ modalHidden: true });
  },
  // 确认--模态弹窗
  confirmChange: function () {
    this.setData({ modalHidden: true });
    wx.navigateTo({
      url: '/pages/tab-mine/login/login'
    });
  },
  failThumbsUp:function(){

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
function json2Form(json) {
  var str = [];
  for (var p in json) {
    str.push(encodeURIComponent(p) + "=" + encodeURIComponent(json[p]));
  }
  return str.join("&");
} 