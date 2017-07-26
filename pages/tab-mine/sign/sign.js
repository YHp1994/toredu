// pages/tab-mine/sign/sign.js
var util = require("../../../utils/util.js");
var Api = require('../../../utils/api.js');
var app = getApp();

Page({
  data: {
    registBtnTxt: "注册",
    getSmsCodeBtnTxt: "",
    // getSmsCodeBtnTime:60,
    btnLoading: false,
    registDisabled: false,
    smsCodeDisabled: false,
    inputUserName: '',
    inputPassword: '',
    logIcon: "../../../images/icon/login.png",
    pwdIcon: "../../../images/icon/password.png",
    verifiIcon: "../../../images/icon/verification.png",
    codeMsgUrl: '',
    codeMSg: '',
    memberID: ''

  },
  onLoad: function (options) {   
    /**
      * 
      *  调用校验码接口
      * requestGetApi(url, params, sourceObj, successFun, failFun, completeFun)
      */
    var ApiUrl = Api.t_kaptcha;
    Api.requestGetApi(ApiUrl, {}, this, this.sucessKaptcha, this.failKaptcha);
  },
  sucessKaptcha:(res,selfObj) =>{
    console.log("sucessres",res);
    selfObj.setData({ codeMsgUrl: 'https://app.toredu.com/' + res.verifyCodeUrl, codeMSg: res.verifyCode })
  },
  failKaptcha: (res, selfObj) => {
    console.log("failKaptcha", res);
  },
  /*
 *  手机号获取焦点
 */
  phoneFocus: function () {
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
  /*
 * 验证码获取焦点
 */
 codeFocus: function () {
    this.setData({
      verifiIcon: "../../../images/icon/verification_sel.png"
    })
  },
  /*
 *  验证码失去焦点
 */
    codeBlur: function () {
    this.setData({
      verifiIcon: "../../../images/icon/verification.png"
    })
  },
  onReady: function () {
    // // 页面渲染完成

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
  mysubmit: function (param) {
    var flag = this.checkUserName(param) && this.checkPassword(param) && this.checkSmsCode(param)
    var that = this;
    console.log(param.username, param.password, param.smsCode)
    var phoneNo = param.username;
    var password = param.password;
    var verifyCode = param.smsCode;
    if (flag) {
      this.setregistData1(this);
      var params = json2Form({ phoneNo: phoneNo, password: password, verifyCode: verifyCode });
      /**
      * 
      *  调用注册接口
      * requestPostApi(url, params, sourceObj, successFun, failFun, completeFun)
      */
      Api.requestPostApi(Api.t_sign, params, this, this.sucessSign, this.failSign, this.completeSign);

    }

  },
  /**
  * 
  *注册接口调用成功
  * 
  */
  sucessSign: (res, selfObj) => {
    console.log('sucessLogin', res);
    // console.log('selfObj', selfObj);
    var returnCode = res.returnCode;
    if (returnCode === "402") {
      wx.showModal({
        title: '提示',
        showCancel: false,
        content: '手机号码已经被注册!'
      });

      selfObj.setregistData2(selfObj);
    } else {
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
          title: '成功',
          icon: 'success',
          duration: 1500
        });
        selfObj.setregistData2(selfObj);
        wx.switchTab({
          url: '/pages/tab-mine/mine/mine',
          success: function (e) {
            var page = getCurrentPages().pop();
            console.log(page)
            if (page == undefined || page == null) return;
            page.onShow();
          }
        })
      }, 2000);
    }

   
  },
  /**
   * 
   *注册接口调用失败
   * 
   */
  failSign: (res, selfObj) => {
    selfObj.setLoginData2(selfObj);
  },
  /**
   * 
   *注册接口调用完成
   * 
   */
  completeSign: (res, selfObj) => {
    // console.log('completeLogin', res);
    // selfObj.setLoginData2(selfObj);

  },
  setregistData1: function (selfObj) {
    selfObj.setData({
      registBtnTxt: "注册中",
      registDisabled: !selfObj.data.registDisabled,
      registBtnBgBgColor: "#999",
      btnLoading: !selfObj.data.btnLoading
    });
  },
  setregistData2: function (selfObj) {
    selfObj.setData({
      registBtnTxt: "注册",
      registDisabled: !selfObj.data.registDisabled,
      registBtnBgBgColor: "#0099FF",
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
        content: '请设置密码'
      });
      return false;
    } else if (password.length < 6 || password.length > 20) {
      wx.showModal({
        title: '提示',
        showCancel: false,
        content: '密码长度为6-20位字符'
      });
      return false;
    } else {
      return true;
    }
  },
  getSmsCode: function () {
    var that = this;
    var ApiUrl = Api.t_kaptcha;
    Api.requestGetApi(ApiUrl, {}, this, this.sucessKaptcha, this.failgetKaptcha);
  },
  checkSmsCode: function (param) {
    var smsCode = param.smsCode.trim();
    var tempSmsCode = this.data.codeMSg;//演示效果临时变量，正式开发需要通过wx.request获取
    if (smsCode != tempSmsCode) {
      wx.showModal({
        title: '提示',
        showCancel: false,
        content: '请输入正确的短信验证码'
      });
      return false;
    } else {
      return true;
    }
  },
  redirectTo: function (param) {
    //需要将param转换为字符串
    param = JSON.stringify(param);
    wx.redirectTo({
      url: '../main/index?param=' + param//参数只能是字符串形式，不能为json对象
    })
  }

})
function json2Form(json) {
  var str = [];
  for (var p in json) {
    str.push(encodeURIComponent(p) + "=" + encodeURIComponent(json[p]));
  }
  return str.join("&");
} 