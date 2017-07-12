// ask.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgsList:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    console.log(this.data.imgsList.length)
  },

  /**
   * 上传图片
   */
  chooseImg: function () {//这里是选取图片的方法
    var that = this;
    wx.chooseImage({
      count: 9 - that.data.imgsList.length, // 最多可以选择的图片张数，默认9
      sizeType: ['original', 'compressed'], // original 原图，compressed 压缩图，默认二者都有
      sourceType: ['album', 'camera'], // album 从相册选图，camera 使用相机，默认二者都有
      success: function (res) {
        var imgsrc = res.tempFilePaths;
        that.setData({
          imgsList: imgsrc
        });
      },
      fail: function () {
        // fail
      },
      complete: function () {
        // complete
      }
    })
    },
    // uploadimg: function () {//这里触发图片上传的方法
    //   var pics = this.data.pics;
    //   app.uploadimg({
    //     url: 'https://........',//这里是你图片上传的接口
    //     path: pics//这里是选取的图片的地址数组
    //   });
    // },
    bindFormSubmit: function (e) {
      // var content = e.detail.value.textarea;
    //   var imgsList = this.data.imgsList;
    //  uploadimg({
    //     url: 'https://192.168.0.146/small/application/faq/question',//这里是你图片上传的接口
    //     path: imgsList//这里是选取的图片的地址数组
    //   });
     var that = this;
      // var pics = this.data.imgsList;
     console.log(this.data.imgsList)
     if (this.data.imgsList.length == 0){
      console.log("没有图片")
       wx.request({
         url: 'https://app.toredu.com/small/application/faq/question',
         method: 'POST',
         header: { 'Content-Type': 'application/x-www-form-urlencided' },
         data: { memberID: '23694', question: '没有图片没有图片没有图片啊啊啊啊啊啊啊啊啊', fileList: "", qNum: '' },
         success: function (res) {
           console.log(res);
         }
       })
     }else{
       uploadimg({
         url: 'https://app.toredu.com/small/application/faq/question',//这里是你图片上传的接口
         path: that.data.imgsList//这里是选取的图片的地址数组
       });
       wx.hideLoading();
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
// function uploadimg(data) {
//   var that = this,
//     i = data.i ? data.i : 0,
//     success = data.success ? data.success : 0,
//     fail = data.fail ? data.fail : 0;
//   console.log("that.data.imgsList", that.data.imgsList)
//   wx.uploadFile({
//     url: data.url,
//     filePath: that.data.imgsList,
//     name: 'fileData',
//     formData: { memberID: '23694', question: '提问内容提问内容提问内容提问内容提问内容提问内容提问内容提问内容提问内容提问内容提问内容', fileList: that.data.imgsList},
//     success: (resp) => {
//       success++;
//       console.log(resp)
//       console.log(i);
//       //这里可能有BUG，失败也会执行这里
//     },
//     fail: (res) => {
//       fail++;
//       console.log('fail:' + i + "fail:" + fail);
//     },
//     complete: () => {
//       console.log(i);
//       i++;
//       if (i == data.path.length) {   //当图片传完时，停止调用          
//         console.log('执行完毕');
//         console.log('成功：' + success + " 失败：" + fail);
//       } else {//若图片还没有传完，则继续调用函数
//         console.log(i);
//         data.i = i;
//         data.success = success;
//         data.fail = fail;
//         uploadimg(data);
//       }
//     }
//   });
// }
//多张图片上传

var qNum = '';
function uploadimg(data) {
  var that = this,
    i = data.i ? data.i : 0,
    success = data.success ? data.success : 0,
    fail = data.fail ? data.fail : 0;
    console.log(data.path[i]);
    if(data.path == ''){

    }
 
  // console.log("data.url",data.url);
  // var vid = vid;
  const uploadTask = wx.uploadFile({
    url: data.url,
    filePath: data.path[i],
    name: 'fileList',
    formData: { memberID: '23694', question: '提问内容提问内容提问内容提问内容提问内容提问内容提问内容提问内容提问内容提问内容提问内容', fileList: data.path[i],qNum:qNum},
    success: (res) => {
      success++;
      console.log(res)
      if(res.data){
        var data = JSON.parse(res.data);
        console.log(data.qNum);
        console.log(i);
        console.log("qNum", qNum)
        qNum = data.qNum;
        console.log("qNum2", qNum)
      }
      
      //这里可能有BUG，失败也会执行这里
    },
    fail: (res) => {
      console.log('failres',res)
      fail++;
      console.log('fail:' + i + "fail:" + fail);
    },
    complete: () => {
      console.log(i);
      i++;
      if (i == data.path.length) {   //当图片传完时，停止调用          
        console.log('执行完毕');
        console.log('成功：' + success + " 失败：" + fail);
      } else {//若图片还没有传完，则继续调用函数
        console.log(i);
        data.i = i;
        data.success = success;
        data.fail = fail;
        uploadimg(data);
      }

    }
  });
  uploadTask.onProgressUpdate((res) => {
    
    console.log('上传进度', res.progress)
    console.log('已经上传的数据长度', res.totalBytesSent)
    console.log('预期需要上传的数据总长度', res.totalBytesExpectedToSend)

    console.log('aaa1')
    if (res.progress == '100'){
      wx.hideLoading();
      console.log('aaa')
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