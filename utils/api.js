'use strict';
// api 路径
var HOST = 'https://cnodejs.org/api/v1';
// get /topics 主题首页
var topics = HOST + '/topics';
//get /topic/:id 主题详情
var topic = HOST + '/topic';
// post /accesstoken 验证 accessToken 的正确性
var accesstoken = HOST + '/accesstoken';
// post /topic_collect/collect 收藏主题
var collect = HOST + '/topic_collect/collect';
// post /topic_collect/de_collect 取消主题
var de_collect = HOST + '/topic_collect/de_collect';
// post /topics 新建主题
var new_topic = HOST + '/topics';
// post /reply/:reply_id/ups 为评论点赞



// toredu
//api路径
var THOST = 'https://app.toredu.com/small/application/';
//校验码 get /kaptcha
var t_kaptcha = THOST + '/kaptcha';
//注册 post /sys/sign
var t_sign = THOST + '/sys/sign';
//登录 post sys/login
var t_login = THOST + '/sys/login';
//用户提问 post /faq/question
var t_question = THOST + '/faq/question';
//全部问题列表 get /faq/questionList
var t_questionList = THOST + '/faq/questionList';
// https://app.toredu.com/small/application/faq/questionDetail
// 问题详情 get /faq/questionDetail
var t_questionDetail = THOST + 'faq/questionDetail';
//我要回答 post /faq/myAnswerQuestion
var t_myAnswerQuestion = THOST + 'faq/myAnswerQuestion';
//回答问题 post /faq/answer
var t_answer = THOST + 'faq/answer';






function reply (id) {
  return HOST + "/reply/"+ id +"/ups"
}
// post / topic /:topic_id / replies 新建评论
function answer(id) {
  return HOST + "/topic/" + id + "/replies"
}

// get请求方法
function fetchGet(url,  callback) {
  // return callback(null, top250)
  wx.request({
    url: url,
    header: { 'Content-Type': 'application/json' },
    success (res) {
      callback(null, res.data)
    },
    fail (e) {
      console.error(e)
      callback(e)
    }
  })
}

// post请求方法
function fetchPost(url, data, callback) {
  wx.request({
    method: 'POST',
    header: {'Content-Type': 'application/x-www-form-urlencided'},
    url: url,
    data: data,
    success (res) {
      callback(null, res.data)
    },
    fail (e) {
      console.error(e)
      callback(e)
     }
  })
}






/**
 * @desc    API请求接口类封装
 * @author  
 * @date    2017-07-11
 */

/**
 * POST请求API
 * @param  {String}   url         接口地址
 * @param  {Object}   params      请求的参数
 * @param  {Object}   sourceObj   来源对象
 * @param  {Function} successFun  接口调用成功返回的回调函数
 * @param  {Function} failFun     接口调用失败的回调函数
 * @param  {Function} completeFun 接口调用结束的回调函数(调用成功、失败都会执行)
 */
function requestPostApi(url, params, sourceObj, successFun, failFun, completeFun) {
  requestApi(url, params, 'POST', sourceObj, successFun, failFun, completeFun)
}

/**
 * GET请求API
 * @param  {String}   url         接口地址
 * @param  {Object}   params      请求的参数
 * @param  {Object}   sourceObj   来源对象
 * @param  {Function} successFun  接口调用成功返回的回调函数
 * @param  {Function} failFun     接口调用失败的回调函数
 * @param  {Function} completeFun 接口调用结束的回调函数(调用成功、失败都会执行)
 */
function requestGetApi(url, params, sourceObj, successFun, failFun, completeFun) {
  requestApi(url, params, 'GET', sourceObj, successFun, failFun, completeFun)
}

/**
 * 请求API
 * @param  {String}   url         接口地址
 * @param  {Object}   params      请求的参数
 * @param  {String}   method      请求类型
 * @param  {Object}   sourceObj   来源对象
 * @param  {Function} successFun  接口调用成功返回的回调函数
 * @param  {Function} failFun     接口调用失败的回调函数
 * @param  {Function} completeFun 接口调用结束的回调函数(调用成功、失败都会执行)
 */
function requestApi(url, params, method, sourceObj, successFun, failFun, completeFun) {
  if (method == 'POST') {
    var contentType = 'application/x-www-form-urlencoded'
  } else {
    var contentType = 'application/json'
  }
  wx.request({
    url: url,
    method: method,
    data: params,
    header: { 'Content-Type': contentType },
    success: function (res) {
      typeof successFun == 'function' && successFun(res.data, sourceObj)
    },
    fail: function (res) {
      typeof failFun == 'function' && failFun(res.data, sourceObj)
    },
    complete: function (res) {
      typeof completeFun == 'function' && completeFun(res.data, sourceObj)
    }
  })
}

















module.exports = {
  // API
  topics: topics,
  topic: topic,
  accesstoken: accesstoken,
  collect: collect,
  de_collect: de_collect,
  reply: reply,
  answer: answer,
  new_topic: new_topic,
  // METHOD
  fetchGet: fetchGet,
  fetchPost: fetchPost,



  //toredu
  THOST:THOST,
 t_kaptcha: t_kaptcha,
  //注册 post /sys/sign
 t_sign: t_sign,
  //登录 post sys/login
 t_login: t_login,
  //用户提问 post /faq/question
 t_question: t_question,
 //全部问题列表 get /faq/questionList
 t_questionList: t_questionList,
 // 问题详情 get /faq/questionDetail
 t_questionDetail: t_questionDetail,
//我要回答
 t_myAnswerQuestion:t_myAnswerQuestion,
 //回答问题
 t_answer: t_answer,

 requestPostApi: requestPostApi,
 requestGetApi: requestGetApi
}
