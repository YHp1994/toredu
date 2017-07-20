var util = require("../../../utils/util.js"); 
var Api = require('../../../utils/api.js');
var app = getApp();
Page({
  data: {
    loginBtnTxt: "登录",
    btnLoading: false,
    disabled: false,
    error: "",
    avatarUrl: "../../../images/timg.png",
    logIcon: "../../../images/icon/login.png",
    pwdIcon: "../../../images/icon/password.png"
  },
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
    var that = this
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function (userInfo) {
      //更新数据
      that.setData({
        userInfo: userInfo
      })
    })
  },
  /*
  *  手机号获取焦点
  */
  phoneFocus:function(){
    this.setData({
      logIcon: "../../../images/icon/login_sel.png"
    })
  },
  /*
 *  手机号失去焦点
 */
  phoneBlur: function () {
    this.setData({
      logIcon: "../../../images/icon/login.png"
    })
  },
  /*
  *  密码获取焦点
  */
  pwdFocus: function () {
    this.setData({
      pwdIcon: "../../../images/icon/password_sel.png"
    })
  },
  /*
 *  密码失去焦点
 */
  pwdBlur: function () {
    this.setData({
      pwdIcon: "../../../images/icon/password.png"
    })
  },
  onReady: function () {
    // 页面渲染完成

  },
  onShow: function () {
    // 页面显示

  },
  onHide: function () {
    // 页面隐藏

  },
  onUnload: function () {
    // 页面关闭

  },
  formSubmit: function (e) {
    var param = e.detail.value;
    this.mysubmit(param);
  },
  mysubmit: function (param,e) {
    var ApiUrl = Api.t_login;
    var flag = this.checkUserName(param) && this.checkPassword(param);
    var phoneNo = param.username;
    var password = param.password;
    var that = this;
    if (flag) {
      this.setLoginData1(this);
      var params = json2Form({ phoneNo: phoneNo, password: password });
       /**
       * 
       *  调用登录接口
       * requestPostApi(url, params, sourceObj, successFun, failFun, completeFun)
       */
      Api.requestPostApi(ApiUrl, params, this, this.sucessLogin, this.failLogin, this.completeLogin);
    }
  },
  /**
   * 
   *登录接口调用成功
   * 
   */
  sucessLogin: (res, selfObj) =>{
    console.log('sucessLogin', res);
    // console.log('selfObj', selfObj);


    if (res.returnCode === '402'){
      
      wx.showModal({
        title: '提示',
        showCancel: false,
        content: '用户信息不存在'
      });
      selfObj.setLoginData2(selfObj);
    } else if (res.returnCode === '403'){
      wx.showModal({
        title: '提示',
        showCancel: false,
        content: '密码错误'
      });
      selfObj.setLoginData2(selfObj);
    }else{
      var CuserInfo = {
          memberID: res.data[0].userInfo.memberID,
          memberName: res.data[0].userInfo.memberName,
          phone: res.data[0].userInfo.phone,
          face: res.data[0].userInfo.face
        };
          console.log(CuserInfo)
          wx.setStorageSync('CuserInfo', CuserInfo);
          setTimeout(function () {
            wx.showToast({
              title: '登录成功',
              icon: 'clear',
              duration: 1500
            });
            selfObj.setLoginData2(selfObj);
            wx.switchTab({
              url: '/pages/tab-mine/mine/mine',
            })
          }, 2000);
    }
  },
  /**
   * 
   *登录接口调用失败
   * 
   */
  failLogin:(res,selfObj) =>{
    // console.log('failLogin', res);
    // console.log('selfObj', selfObj);
    
    selfObj.setLoginData2(selfObj);     
  },
  /**
   * 
   *登录接口调用完成
   * 
   */
  completeLogin: (res, selfObj) => {
    // console.log('completeLogin', res);
    // selfObj.setLoginData2(selfObj);
  
  },
  setLoginData1: function (selfObj) {
    selfObj.setData({
      loginBtnTxt: "登录中",
      disabled: !selfObj.data.disabled,
      loginBtnBgBgColor: "#999",
      btnLoading: !selfObj.data.btnLoading
    });
  },
  setLoginData2: function (selfObj) {
    selfObj.setData({
      loginBtnTxt: "登录",
      disabled: !selfObj.data.disabled,
      loginBtnBgBgColor: "#0099FF",
      btnLoading: !selfObj.data.btnLoading
    });
  },
  checkUserName: function (param) {
    var phone = util.regexConfig().phone;
    var inputUserName = param.username.trim();
    if (phone.test(inputUserName)) {
      return true;
    } else {
      wx.showModal({
        title: '提示',
        showCancel: false,
        content: '请输入正确的手机号码'
      });
      return false;
    }
  },
  checkPassword: function (param) {
    var userName = param.username.trim();
    var password = param.password.trim();
    if (password.length <= 0) {
      wx.showModal({
        title: '提示',
        showCancel: false,
        content: '请输入密码'
      });
      return false;
    } else {
      return true;
    }
  },
})
function json2Form(json) {
  var str = [];
  for (var p in json) {
    str.push(encodeURIComponent(p) + "=" + encodeURIComponent(json[p]));
  }
  return str.join("&");
} 