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
    hidden: false,
    page: 1,
    limit: 8,
    noMore: true,
  },
  //事件处理函数
  bindViewTap: function () {
    wx.navigateTo({
      url: '../../logs/logs'
    })
  },
  onLoad: function () {
    this.getData();
    console.log('onLoad')
    var that = this;
    var CuserInfo = wx.getStorageSync('CuserInfo');
    if (CuserInfo.memberID) {
      that.setData({ islogin: true });
    }
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function (userInfo) {
      //更新数据
      that.setData({
        userInfo: userInfo
      })
      
    })
  },
  /** 
   * 滑动切换tab 
   */
  // bindChange: function (e) {

  //   var that = this;
  //   that.setData({ currentTab: e.detail.current });

  // },
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
    this.onLoad()
  },
  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    this.lower();
    console.log('上拉刷新', new Date());
  },
  //获取文章列表数据
  getData: function () {
    var that = this;
    var page = that.data.page;
    var limit = that.data.limit;
    var CuserInfo = wx.getStorageSync('CuserInfo');    
    var ApiUrl1 = Api.t_myQuestion + '?memberID=' + CuserInfo.memberID + '&pageNo=' + 1 + '&ini=' + 8;
    console.log(ApiUrl1)
    that.setData({ hidden: false });

    if (page == 1) {
      that.setData({ postsList1: [] });
    }
    Api.fetchGet(ApiUrl1, (err, res) => {
      //更新数据
      // console.log(res)
      // if (res.data.faqList.length !== 0) {
      //   that.setData({
      //     postsList1: that.data.postsList1.concat(res.data.faqList.map(function (item) {
      //       // item.last_reply_at = util.getDateDiff(new Date(item.last_reply_at));
      //       return item;
      //     }))
      //   });
      // } else {
      //   // wx.showToast({
      //   //   title: '到底了',
      //   // })
      //   // setTimeout(function(){
      //   //   wx.hideToast()
      //   // },1000)
      //   this.setData({
      //     noMore: false
      //   })

      // }
      // setTimeout(function () {
      //   that.setData({ hidden: true });
      // }, 300);
    })
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
})
