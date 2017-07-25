//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    motto: 'Hello ! WelCome to WxApp',
    islogin: false,
    userInfo: {},
    // tab切换  
    currentTab: 0,
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
  bindChange: function (e) {

    var that = this;
    that.setData({ currentTab: e.detail.current });

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
  } 
})
