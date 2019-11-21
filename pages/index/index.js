
//获取应用实例
const app = getApp()
let iconList = [
  {
    id: 1,
    text: "乐库",
    imgUrl: "./images/1.png",
    "style": "background:rgb(22, 216, 119)"
  },
  {
    id: 2,
    text: "歌单",
    imgUrl: "./images/2.png",
    "style": "background:#ff00ff"
  },
  {
    id: 3,
    text: "听歌",
    imgUrl: "./images/3.png",
    "style": "background:rgb(14, 121, 192)"
  },
  {
    id: 4,
    text: "猜你喜欢",
    imgUrl: "./images/5.png",
    "style": "background:rgb(76, 14, 192)"
  },
  {
    id: 5,
    text: "推荐",
    imgUrl: "./images/7.png",
    "style": "background:rgb(218, 214, 16)"
  },
  {
    id: 6,  
    text: "更多好歌",
    imgUrl: "./images/6.png",
    "style": "background:rgb(240, 240, 234)"
  },
]
let swiperList = [
  {
    id: 1,
    imgUrl: "//imge.kugou.com/mobilebanner/20190731/20190731234904119937.jpg"
  },
  {
    id: 2,
    imgUrl: "//imge.kugou.com/mobilebanner/20190731/20190731234809940554.jpg"
  },
  {
    id: 3,
    imgUrl: "//imge.kugou.com/mobilebanner/20190731/20190731234643631589.jpg"
  },
  {
    id: 4,
    imgUrl: "//imgessl.kugou.com/commendpic/20191121/20191121111756803848.jpg"
  },
  {
    id: 5,
    imgUrl: "//imge.kugou.com/mobilebanner/20190731/20190731234822280903.jpg"
  }
]  

Page({
  data:{  
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    iconList,
    swiperList,
    videoList:[],
    indicatorDots: true,
    vertical: false,
    autoplay: true,
    interval: 2000,
    duration: 500
  },
  //事件处理函数
  bindViewTap: function () {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    this.onRequest();
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  onRequest:function(){
    let that=this;
    wx.request({
      url: 'https://api.apiopen.top/musicRankings', //url
      method: 'GET', //请求方式
      header: {
        'Content-Type': 'application/json',
      },
      data: {
        // activityId: options.id,  //参数
      },
      success: function (res) {
        if (res && res.data && res.data.result) {
          that.setData({
            videoList: res.data.result
          })
        }
      },
      fail: function () {
        app.consoleLog("请求数据失败");
      },
      complete: function () {
        // complete 

      }
    })
  },
  getUserInfo: function (e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  onShareAppMessage: function (res) {  //分享功能
    return {
      title: '我喜欢的也许就是你喜欢的',
      path: 'pages/index/index',
      desc:"来，说出你的生活，记录下每一个难忘的瞬间，你的故事也许就是我的故事",
      imageUrl: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1574333533676&di=ba0b7dc979c147a4b0b9e44a4fb9afef&imgtype=0&src=http%3A%2F%2Fpic.90sjimg.com%2Fdesign%2F00%2F59%2F20%2F21%2F594c88d1e5781.png',  //这个是显示的图片，不写就默认当前页面的截图
      success: function (shareTickets) {
        console.info(shareTickets + '成功');
        // 转发成功
      },
      fail: function (res) {
        console.log(res + '失败');
        // 转发失败
      },
      complete: function (res) {
        // 不管成功失败都会执行
      }
    }
  },
  

 

  
})
