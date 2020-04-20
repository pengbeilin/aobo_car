// pages/home/home.js
Page({
  data: {
    scrollTop: 0,
    cardata: {},
    isLike: true,
    // banner
    imgUrls: [],
    indicatorDots: true, //是否显示面板指示点
    autoplay: true, //是否自动切换
    interval: 3000, //自动切换时间间隔,3s
    duration: 700, //  滑动动画时长1s
    // 商品详情介绍
    luoshiName: [
      "里程曲线",
      "维保记录",
      "附件清单",
      "功能配置单",
      "耗材清单",
      "整修清单",
      "瑕疵报告",
    ],
  },
  // 拨打电话
  phone() {
    wx.makePhoneCall({
      phoneNumber: this.data.cardata.car_salesman_phonenumber,
    })
  },
  // 分享给好友
  share() {
    var that = this;　　 // 设置菜单中的转发按钮触发转发事件时的转发内容
    var shareObj = {
      title: "转发的标题", // 默认是小程序的名称(可以写slogan等)
      path: '/pages/share/share', // 默认是当前页面，必须是以‘/’开头的完整路径
      imgUrl: '', //自定义图片路径，可以是本地文件路径、代码包文件路径或者网络图片路径，支持PNG及JPG，不传入 imageUrl 则使用默认截图。显示图片长宽比是 5:4
      // 转发成功之后的回调
      success: function(res) {
        if (res.errMsg == 'shareAppMessage:ok') {}
      },
      // 转发失败之后的回调
      fail: function() {　　　　　　
        // 用户取消转发
        if (res.errMsg == 'shareAppMessage:fail cancel') {} else if (res.errMsg == 'shareAppMessage:fail') {
          // 转发失败，其中 detail message 为详细失败信息
        }
      }
    }
    // 来自页面内的按钮的转发
    if (options.from == 'button') {
      var eData = options.target.dataset;
      console.log(eData.name); // shareBtn
      // 此处可以修改 shareObj 中的内容
      shareObj.path = '/pages/btnname/btnname?btn_name=' + eData.name;
    }　　 // 返回shareObj

    return shareObj;
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let descdata = JSON.parse(options.descdata)
    console.info(descdata)
    wx.setNavigationBarTitle({
      title: descdata.car_name,
    });
    this.setData({
      cardata: descdata
    })
    let face_img = []
    for (var i = 1; i <= 5; i++) {
      face_img.push("cloud://carwarehouse-aobo.6361-carwarehouse-aobo-1300885272/car_img/" + this.data.cardata.car_img_location + "/" + this.data.cardata.car_number + "/face_" + i + ".jpg")
    }
    this.setData({
      imgUrls: face_img
    })
  },
  //预览图片
  previewImage: function(event) {
    // var current = e.target.dataset.src;
    // wx.previewImage({
    //   current: current, // 当前显示图片的http链接  
    //   urls: this.data.imgUrls // 需要预览的图片http链接列表  
    // })
    wx.navigateTo({
      url: "../facadedesc/facadedesc?number=" + this.data.cardata.car_number +
        "&title=" + this.data.cardata.car_name +
        "&car_img_center_control=" + this.data.cardata.car_img_center_control +
        "&car_img_chair=" + this.data.cardata.car_img_chair +
        "&car_img_engine_room=" + this.data.cardata.car_img_engine_room +
        "&car_img_face=" + this.data.cardata.car_img_face +
        "&car_img_trunk=" + this.data.cardata.car_img_trunk +
        "&car_img_wheel=" + this.data.cardata.car_img_wheel +
        "&car_img_location=" + this.data.cardata.car_img_location,

    })
  },
  /**
   * 凯式报告
   */
  luoshi_action(event) {
    var luoshi_index = parseInt(event.currentTarget.dataset.index) + 1;
    console.info(luoshi_index)
    console.info("car_report_flaw_desc:"+this.data.cardata.car_report_flaw_desc)
    if (luoshi_index == 7) {
      wx.navigateTo({
        url: "../flaw/flaw?name=" + this.data.luoshiName[luoshi_index - 1] +
          "&car_number=" + this.data.cardata.car_number + "&car_report_flaw_desc=" + this.data.cardata.car_report_flaw_desc + "&location=" + this.data.cardata.car_img_location,
      })
    } else {
      wx.navigateTo({
        url: "../luoshi/luoshi?name=" + this.data.luoshiName[luoshi_index - 1] +
          "&url=" + "cloud://carwarehouse-aobo.6361-carwarehouse-aobo-1300885272/car_img/" + this.data.cardata.car_img_location + "/" + this.data.cardata.car_number + "/luoshi_" + luoshi_index + ".jpg",
      })
    }
  },
  //监听屏幕滚动 判断上下滚动
  onPageScroll: function (ev) {
    var _this = this;
    //当滚动的top值最大或最小时，为什么要做这一步是因为在手机实测小程序的时候会发生滚动条回弹，所以为了处理回弹，设置默认最大最小值
    if (ev.scrollTop <= 0) {
      ev.scrollTop = 0;
    } else if (ev.scrollTop > wx.getSystemInfoSync().windowHeight) {
      ev.scrollTop = wx.getSystemInfoSync().windowHeight;
    }
    //判断浏览器滚动条上下滚动
    if (ev.scrollTop > this.data.scrollTop || ev.scrollTop == wx.getSystemInfoSync().windowHeight) {
      //向下滚动
      console.info("向下滚动");
    } else {
      //向上滚动
      console.info("向上滚动");
    }
    //给scrollTop重新赋值
    setTimeout(function () {
      _this.setData({
        scrollTop: ev.scrollTop
      })
    }, 0)
  }

})