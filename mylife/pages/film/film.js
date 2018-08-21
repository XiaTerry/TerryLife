// pages/film/film.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    movieList:[],
    nowIndex:-1,
  },
  gotoDetail(e){
    wx.navigateTo({
      url: "../../pages/filmdetail/filmdetail?movieid=" + e.currentTarget.dataset.movieid,
    })
  },
  getData(){
    wx.showLoading({
      title: '正在努力中',
    });
    wx.request({
      url: 'https://bird.ioliu.cn/v1?url=https://api.douban.com/v2/movie/in_theaters',
      data: {
        start:this.data.movieList.length,
        count:5,
      },
      method: 'GET',
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      success: res => {
        this.setData({
          movieList: this.data.movieList.concat(res.data.subjects),
        });
        wx.hideLoading();
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(){
   this.getData();
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
  onReachBottom(){
    this.getData();
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})