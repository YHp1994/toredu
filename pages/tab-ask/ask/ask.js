// ask.js
var Api = require('../../../utils/api.js');
var util = require('../../../utils/util.js');
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgsList:[],
    imgLen: 0,
    hidden: false,
    count:6
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // console.log(this.data.imgsList.length)
  },
  /**
   * 上传图片
   */
  chooseImg: function () {//这里是选取图片的方法
    var that = this;
    var countNum = this.data.count;
    if (countNum<=0){
      countNum = 0;
      this.setData({
        count: countNum
      })
    }else{
      
   this.setData({
     count: countNum
   })
    wx.chooseImage({
      count: countNum, // 最多可以选择的图片张数，默认9
      sizeType: ['original', 'compressed'], // original 原图，compressed 压缩图，默认二者都有
      sourceType: ['album', 'camera'], // album 从相册选图，camera 使用相机，默认二者都有
      success: function (res) {
        var imgs = that.data.imgsList;
        var imgsrc = res.tempFilePaths;
        imgsrc.map(function(item){
          imgs.push(item);
        });
        that.setData({
          imgLen: imgs.length
        })
        that.setData({
          imgsList: imgs
        });
        if (that.data.imgsList.length >=6 ){
          that.setData({ hidden: true });
        }
      },
      fail: function () {
        // fail
      },
      complete: function () {
        // complete
      }
    })
    }
    },
    bindFormSubmit: function (e) {
     var that = this;
     var CuserInfo = wx.getStorageSync('CuserInfo');
     var ApiUrl = Api.t_question;
     var memberID = CuserInfo.memberID;
     var question = e.detail.value.content;
     if (this.data.imgsList.length == 0){
      var params = json2Form({ memberID: memberID, question: question });
      /**
      * 
      *  调用登录接口
      * requestPostApi(url, params, sourceObj, successFun, failFun, completeFun)
      */
      Api.requestPostApi(ApiUrl, params, this, this.sucessAsk);
      
     }else{
       uploadimg({
         url:  ApiUrl,//这里是你图片上传的接口
         path: that.data.imgsList//这里是选取的图片的地址数组
       },memberID,question);
       wx.hideLoading();
     }
    },
    sucessAsk: function (res, selfObj){
        console.log(res);
    },
  /**
   * 删除图片
   */
  delImgTap:function(e){
    var index = e.target.dataset.index;
    var imgsList = this.data.imgsList;
    //移除列表中下标为index的项
    imgsList.splice(index, 1);
    //更新列表的状态
    this.setData({
      imgsList: imgsList
    });
    if (this.data.imgsList.length < 6) {
      this.setData({ hidden: false, count:6 - this.data.imgsList.length });
    }
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
  
  }
})
//多张图片上传

var qNum = '';
function uploadimg(data, memberID, question) {
  var that = this,
    i = data.i ? data.i : 0,
    success = data.success ? data.success : 0,
    fail = data.fail ? data.fail : 0;
  const uploadTask = wx.uploadFile({
    url: data.url,
    filePath: data.path[i],
    name: 'fileList',
    formData: { memberID: memberID, question: question, fileList: data.path[i],qNum:qNum},
    success: (res) => {
      success++;
      if(res.data){
        var data = JSON.parse(res.data);
        qNum = data.qNum;
      }
    },
    fail: (res) => {
      fail++;
    },
    complete: () => {
      i++;
      if (i == data.path.length) {   //当图片传完时，停止调用         
        wx.showLoading({
          title: '上传完毕',
        })
        setTimeout(function () {
          wx.hideLoading()
        }, 2000)
      } else {//若图片还没有传完，则继续调用函数
        data.i = i;
        data.success = success;
        data.fail = fail;
        uploadimg(data);
      }
    }
  });
  uploadTask.onProgressUpdate((res) => {
    
    // console.log('上传进度', res.progress)
    // console.log('已经上传的数据长度', res.totalBytesSent)
    // console.log('预期需要上传的数据总长度', res.totalBytesExpectedToSend)

    if (res.progress == '100'){
      wx.hideLoading();
    }else{
      wx.showLoading({
        title: '已上传' + res.progress + '%',
      })
    }
  })
}
function json2Form(json) {
  var str = [];
  for (var p in json) {
    str.push(encodeURIComponent(p) + "=" + encodeURIComponent(json[p]));
  }
  return str.join("&");
} 