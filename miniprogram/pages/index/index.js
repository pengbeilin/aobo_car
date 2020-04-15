// pages/index/index.js
const app = getApp()
let loadingMore = false
let lastScollTop = 0;
let lastRequestTime = 0;
Page({
  data: {
    list: [],
    hasMore: true, //列表是否有数据未加载
    page: 0,
    size: 10, //每页10条数据
    scrollYHeight: 0, //scroll-view高度
    tabTxt: ['品牌', '价格', '地区'], //分类
    tab: ['none', 'none', 'none'],
    brandList: [{
      'id': '0',
      'title': '不限'
    }, {
      'id': '1',
      'title': '本田'
    }, {
      'id': '2',
      'title': '奥迪'
      }, {
        'id': '3',
        'title': '日产'
      }],
    priceList: [{
      'id': '0',
      'title': '从低到高'
    }, {
      'id': '1',
      'title': '从高到低'
    }],
    locationList: [{
      'id': '0',
      'title': '不限'
    }, {
      'id': '1',
      'title': '哈尔滨'
    }
    // , {
    //   'id': '2',
    //   'title': '哈尔滨'
    // }
   // , {
     // 'id': '3',
      //'title': '武汉'
    //}
    ],
    brand_id: 0, //品牌
    brand_txt: '',
    price_id: 0, //价格
    price_txt: '',
    location_id: 0, //地区
    location_txt: '',
    noneData: 'none', //是否显示无数据
  },
  //滑动监听
  bindscroll: function(e) {
    const {
      scrollHeight,
      scrollTop
    } = e.detail;
    const {
      scrollYHeight,
      hasMore
    } = this.data;
    //如果当前没有加载中且列表还有数据未加载，且页面滚动到距离底部40px内
    if (!loadingMore && hasMore && (scrollHeight - scrollYHeight - scrollTop < 40) && lastScollTop <= scrollTop) {
      this.loadMore()
    }
    let dif = scrollTop - lastScollTop
    if (Math.abs(dif) > 5) {
      this.hideTab()
    }
    lastScollTop = scrollTop
  },
  // 加载更多
  loadMore: function() {
    const that = this
    const {
      page,
      hasMore
    } = this.data;
    if (!hasMore || loadingMore) return;
    loadingMore = true
    setTimeout(
      () => {
        this.getDataList(that.data.brand_txt, that.data.price_txt, page + 1, () => {
          loadingMore = false;
        })
      }, 333
    )
  },
  //初次渲染成功
  onReady: function() {
    wx.getSystemInfo({
      success: ({
        windowHeight
      }) => {
        this.setData({
          scrollYHeight: windowHeight
        }) //设置scrill-view组件的高度为屏幕高度
      }
    })
  },
  //初始化加载
  onLoad: function() {
    this.getDataList("", "", 0) //加载第一页数据
  },
  /**
   * 加载数据
   * @brand 品牌
   * @location 地区
   * @page 第几页(从0开始)
   * @cb 回调函数
   */
  getDataList: function(brand, location, page, cb) {
    console.info("brand:" + brand + " location:" + location)
    var that = this
    //调用数据接口，获取数据
    wx.cloud.callFunction({
      name: "getcar",
      data: {
        car_brand: brand,
        car_location: location,
        
     
        skip: page,
        limit: this.data.size,
      },
     
      success: function(res) {
        console.info(res.result.data)
        if (res.result && res.result.data) {
          let list = res.result.data || [];
          if (list.length == 0) {
            that.setData({
              hasMore: false,
              page,
            })
          } else {
            that.setData({
              noneData: 'none'
            })
            that.setData({
              list: that.data.list.concat(list),
              hasMore: list.length == that.data.size,
              page,
            })
          }
          //没有任何数据时显示空
          if (that.data.list.length == 0) {
            that.setData({
              noneData: 'flex'
            })
          }
        } else {
          wx.showToast({
            title: res.data ? res.data.message : "列表加载失败",
            icon: 'none',
            duration: 1000
          })
        }
        if (cb) {
          cb()
        }
      },
      fail: function() {
        wx.showToast({
          title: "列表加载失败",
          icon: 'none',
          duration: 1000
        })
        if (cb) {
          cb()
        }
      }
    })
  },

  // 选项卡
  filterTab: function(e) {
    var data = ['none', 'none', 'none'];
    var index = e.currentTarget.dataset.index;
    if (this.data.tab[index] != 'block') {
      data[index] = 'block';
    }
    this.setData({
      tab: data
    })
  },

  //筛选项点击操作
  filter: function(e) {
    var that = this,
      id = e.currentTarget.dataset.id,
      txt = e.currentTarget.dataset.txt;
    if (txt == '不限') {
      txt = ''
    }
    switch (e.currentTarget.dataset.index) {
      case '0':
        that.setData({
          tab: ['none', 'none', 'none'],
          brand_id: id,
          brand_txt: txt
        });
        break;
      case '1':
        that.setData({
          tab: ['none', 'none', 'none'],
          price_id: id,
          price_txt: txt
        });
        break;
      case '2':
        that.setData({
          tab: ['none', 'none', 'none'],
          location_id: id,
          location_txt: txt
        });
        break;
      case '3':
        that.setData({
          tab: ['none', 'none', 'none'],
          price_id: id,
          price_txt: txt
        });
        break;
      case '4':
        that.setData({
          tab: ['none', 'none', 'none'],
          price_id: id,
          price_txt: txt
        });
        break;
      case '5':
        that.setData({
          tab: ['none', 'none', 'none'],
          price_id: id,
          price_txt: txt
        });
        break;
    }
    //清除数据
    this.setData({
      list: [],
    })
    //数据筛选
    that.getDataList(this.data.brand_txt, this.data.location_txt, 0);
  },
  //跳转详情页
  toDesc: function(event) {
    this.hideTab()
    let index = event.currentTarget.dataset.index
    let data = JSON.stringify(this.data.list[index])
    wx.navigateTo({
      url: "../cardesc/cardesc?descdata=" + data,
    })
  },
  onPullDownRefresh: function () {
    console.info("onPullDownRefresh")
    this.clicRefresh()
  },
  //点击刷新
  clicRefresh() {
    this.clearData()
    wx.showNavigationBarLoading()
    this.getDataList('', '', 0);
    setTimeout(
      () => {
        wx.hideNavigationBarLoading()
        wx.stopPullDownRefresh();
      }, 600
    )
    // this.animate('#refresh', [{
    //     rotate: 0
    //   },
    //   {
    //     rotate: 720
    //   },
    // ], 600, function() {
    //   this.clearAnimation('#refresh', {
    //     opacity: true,
    //     rotate: true
    //   }, function() {
    //     wx.hideNavigationBarLoading()
    //   })
    // }.bind(this))
    this.hideTab()
  },
  //点击分享
  clickShare() {
    var that = this;　　 // 设置菜单中的转发按钮触发转发事件时的转发内容
    var shareObj = {
      title: "转发的标题", // 默认是小程序的名称(可以写slogan等)
      path: '/pages/share/share', // 默认是当前页面，必须是以‘/’开头的完整路径
      imgUrl: '', //自定义图片路径，可以是本地文件路径、代码包文件路径或者网络图片路径，支持PNG及JPG，不传入 imageUrl 则使用默认截图。显示图片长宽比是 5:4
      // 转发成功之后的回调
      success: function (res) {
        if (res.errMsg == 'shareAppMessage:ok') { }
      },
      // 转发失败之后的回调
      fail: function () {
        // 用户取消转发
        if (res.errMsg == 'shareAppMessage:fail cancel') { } else if (res.errMsg == 'shareAppMessage:fail') {
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
  //隐藏tab
  hideTab() {
    this.setData({
      tab: ['none', 'none', 'none']
    })
  },
  //重置数据
  clearData() {
    this.setData({
      list: [],
      brand_id: 0, //品牌
      brand_txt: '',
      price_id: 0, //价格
      price_txt: '',
      location_id: 0, //地区
      location_txt: '',
    })
  }
})