// pages/tab-aquare/searchlist/searchlist.js
var Api = require('../../../utils/api.js');
var util = require('../../../utils/util.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    keyword:'',
    postsList1: {},
    hidden: false,
    page:1,
    noMore: true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({ keyword: options.keyword });
    this.getData();
  },
  /**
  * 页面相关事件处理函数--监听用户下拉动作
  */
  onPullDownRefresh: function () {

    this.setData({ page: 1 });
    this.getData();
    console.log('下拉加载更多', new Date());
    wx.stopPullDownRefresh()
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
    var keyword = that.data.keyword;
    var ApiUrl1 = Api.t_search + '?queryCondition=' + keyword + '&pageNo=' + page;
    console.log(ApiUrl1)
    that.setData({ hidden: false });

    if (page == 1) {
      that.setData({ postsList1: [] });
    }
    Api.fetchGet(ApiUrl1, (err, res) => {
      if (res) {
        //更新数据
        if (res.data.faqList.length !== 0) {
          that.setData({
            postsList1: that.data.postsList1.concat(res.data.faqList.map(function (item) {
              // item.last_reply_at = util.getDateDiff(new Date(item.last_reply_at));
              return item;
            }))
          });
        } else {
          // wx.showToast({
          //   title: '到底了',
          // })
          // setTimeout(function(){
          //   wx.hideToast()
          // },1000)
          this.setData({
            noMore: false
          })
        }
      } else {
        wx.showToast({
          title: '错误',
          image: '/images/icon/tishi.png',
          duration: 2000
        })
      }

      setTimeout(function () {
        that.setData({ hidden: true });
      }, 300);
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
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})