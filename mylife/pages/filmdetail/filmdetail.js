var bmap = require('../../libs/bmap-wx.js');
var wxMarkerData = [];
Page({
  data: {
    markers: [],
    latitude: '',
    longitude: '',
    rgcData: {},
    detail:{},
    movieId:-1
  },
  makertap: function (e) {
    var that = this;
    var id = e.markerId;
    that.showSearchInfo(wxMarkerData, id);
  },
  onLoad: function (options) {
    console.log(options.movieid);
    wx.showLoading({
      title: '正在努力中',
    });
    wx.request({
      url: "https://api.douban.com/v2/movie/subject/26985127",
      data: {

      },
      method: 'GET',
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      success: res => {
        console.log(res);

        wx.hideLoading();
      }
    })
    var that = this;
    // 新建百度地图对象 
    var BMap = new bmap.BMapWX({
      ak: 'UDwDYwfC6SvAman6I1GppZjOb3Ei3Pvi'
    });
    var fail = function (data) {
      console.log(data)
    };
    var success = function (data) {
      wxMarkerData = data.wxMarkerData;
      that.setData({
        markers: wxMarkerData
      });
      that.setData({
        latitude: wxMarkerData[0].latitude
      });
      that.setData({
        longitude: wxMarkerData[0].longitude
      });
    }
    // 发起regeocoding检索请求 
    BMap.regeocoding({
      fail: fail,
      success: success,
      iconPath: '/images/marker_red.png',
      iconTapPath: '/images/marker_red.png'
    });
    
  }
})