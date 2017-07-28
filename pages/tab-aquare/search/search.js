// pages/aquare/aquare.js
var Api = require('../../../utils/api.js');
var util = require('../../../utils/util.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    inputValue:"",
    isHidden: true,
    result:[],
    page:1
  },
  valueChange: function (e) {
    if (e.detail.value.length > 0) {
      this.setData({
        isHidden: false
      })
    } else {
      this.setData({
        isHidden: true
      })
    }
    this.setData({
      inputValue: e.detail.value
    })
    this.getData()
   
  },
  tapSearch:function(){
    var inputValue = this.data.inputValue;
    if (this.data.inputValue){
      wx.redirectTo({
        url: '../searchlist/searchlist?keyword=' + inputValue,
      })
    }else{
      wx.showToast({
        title: '搜索内容不能为空',
        image: '/images/icon/tishi.png',
        duration: 2000
      })
    }
      
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  },
  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  },
  //获取文章列表数据
  getData: function () {
    var that = this;
    var page = that.data.page;
    var inputValue = that.data.inputValue;
    var ApiUrl1 = Api.t_search + '?queryCondition=' + inputValue + '&pageNo=' + page;
    console.log(ApiUrl1)

    if (page == 1) {
      that.setData({ result: [] });
    }
    Api.fetchGet(ApiUrl1, (err, res) => {
      if (res) {
        //更新数据
        if (res.data.faqList.length !== 0) {
          that.setData({
            result: that.data.result.concat(res.data.faqList.map(function (item) {
              return item;
            }))
          });
        }
      }
    })
  },
  // 滑动底部加载
  lower: function () {
    console.log('滑动底部加载', new Date());
    var that = this;
    that.setData({
      page: that.data.page + 1
    });
    this.getData({ page: that.data.page });
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
  onReachBottom: function () {
    this.lower();
    console.log('上拉刷新', new Date());
  },


  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})