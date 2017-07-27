//index.js
//获取应用实例
var Api = require('../../../utils/api.js');
var util = require('../../../utils/util.js');
var app = getApp();
Page({
  data: {
    islogin: false,
    userInfo: {},
    currentTab: 0,
    postsList1: {},
    postsList2: {},
    hidden: false,
    page: 1,
    page2: 1,
    noMore: true,
    noMore2: true
  },
  //事件处理函数
  bindViewTap: function () {
    wx.navigateTo({
      url: '../../logs/logs'
    })
  },
  onLoad: function () {
    
    console.log('onLoad')
    var that = this;
    var CuserInfo = wx.getStorageSync('CuserInfo');
    if (CuserInfo.memberID) {
      that.setData({ islogin: true, userInfo: CuserInfo });
    }
  },
 
  /** 
   * 点击tab切换 
   */
  swichNav: function (e) {

    var that = this;

    if (this.data.currentTab === e.target.dataset.current) {
      return false;
    } else {
      that.setData({
        currentTab: e.target.dataset.current
      })
    }
  } ,
  onShow:function(){
    if (this.data.userInfo){
      this.getData();
      this.getData2();
    }
    var CuserInfo = wx.getStorageSync('CuserInfo');
    if (CuserInfo.memberID) {
      this.setData({ islogin: true, userInfo: CuserInfo });
    }
  },
  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    var that = this;
    switch (this.data.currentTab) {
      case '0':
        that.lower();
        break
      case '1':
        that.lower2();
        break
    }
  },
  //获取我的提问列表数据
  getData: function () {
    var that = this;
    var page = that.data.page;
    var limit = that.data.limit;
    var CuserInfo = wx.getStorageSync('CuserInfo');    
    var ApiUrl1 = Api.t_myQuestion + '?memberID=' + CuserInfo.memberID + '&pageNo=' + page;
    that.setData({ hidden: false });

    if (page == 1) {
      that.setData({ postsList1: [] });
    }
    Api.fetchGet(ApiUrl1, (err, res) => {
      //更新数据

      if (res.returnCode == '000') {
      if (res.data.myQuestionList) {
        that.setData({
          postsList1: that.data.postsList1.concat(res.data.myQuestionList.map(function (item) {
            return item;
          }))
        });
      } else {
        setTimeout(function(){
          wx.hideToast()
        },1000)
        this.setData({
          noMore: false
        })

      }}
      setTimeout(function () {
        that.setData({ hidden: true });
      }, 300);
    })
  },
  //获取我的回答列表数据
  getData2: function () {
    var that = this;
    var page2 = that.data.page2;
    var CuserInfo = wx.getStorageSync('CuserInfo');
    var ApiUrl1 = Api.t_myAnswerQuestion + '?memberID=' + CuserInfo.memberID + '&pageNo=' + page2;
    that.setData({ hidden: false });
    console.log(ApiUrl1)
    if (page2 == 1) {
      that.setData({ postsList2: [] });
    }
    Api.fetchGet(ApiUrl1, (err, res) => {
      //更新数据
     if(res.returnCode == '000'){
       if (res.data.myQuestionList) {
         that.setData({
           postsList2: that.data.postsList2.concat(res.data.myQuestionList.map(function (item) {
             return item;
           }))
         });
       } else {
         setTimeout(function () {
           wx.hideToast()
         }, 1000)
         this.setData({
           noMore2: false
         })

       }
      }
      
      setTimeout(function () {
        that.setData({ hidden: true });
      }, 300);
    })
  },

  // 滑动底部加载
  lower: function () {
    var that = this;
    that.setData({
      page: that.data.page + 1
    });
    this.getData({ page: that.data.page });
  },
  // 滑动底部加载
  lower2: function () {
    var that = this;
    that.setData({
      page2: that.data.page2 + 1
    });
    this.getData2({ page2: that.data.page2 });
  },
})
