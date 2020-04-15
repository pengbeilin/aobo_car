// pages/facadedesc/facadedesc.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    number: "",
    //car_img_location:"",//+++++++++
    // face_imgUrls: [],
    // center_control_imgUrls: [],
    // chair_imgUrls: [],
    // trunk_imgUrls: [],
    // engine_room_imgUrls: [],
    // wheel_imgUrls: [],
    car_img_center_control: 0,
    car_img_chair: 0,
    car_img_engine_room: 0,
    car_img_face: 0,
    car_img_trunk: 0,
    car_img_wheel: 0,
    img_names: [
      "center_control",
      "chair",
      "engine_room",
      "face",
      "trunk",
      "wheel"
    ],
    car_img_count: [],
    car_img_url: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    console.log(options)
    wx.setNavigationBarTitle({
      title: options.title,
      number: options.number,
      car_img_location:options.car_img_location,
     // car_img_location: this.data.car_img_location,//+++++
    });
    let counts = [
      parseInt(options.car_img_center_control),
      parseInt(options.car_img_chair),
      parseInt(options.car_img_engine_room),
      parseInt(options.car_img_face),
      parseInt(options.car_img_trunk),
      parseInt(options.car_img_wheel)
    ]
    this.setData({
      car_img_count: counts,
     
    })
    console.info("car_img_count:" + this.data.car_img_count)
    console.info("counts:" + counts)
    this.getCarImg(options.number)
    //this.getCarImg(options.car_img_location)
  },
  /**
   * 获取图片
   */
  getCarImg(number) {
    let all_img = []
   
    console.info("car_img_count:" + this.data.car_img_count)
    for (let [index, value] of this.data.car_img_count.entries()) {
      console.info("value:" + value)
      let imgs = []
      let img_name = this.data.img_names[index]
      for (var i = 1; i <= value; i++) {
        // imgs.push("cloud://carwarehouse-aobo.6361-carwarehouse-aobo-1300885272/car_img/changchun/" + number + "/" + img_name + "_" + i + ".jpg")
        //++++++++++++
        imgs.push("https://6361-carwarehouse-aobo-1300885272.tcb.qcloud.la/car_img/" + this.options.car_img_location+"/" + number + "/" + img_name + "_" + i + ".jpg")
  
       // imgs.push("https://6361-carwarehouse-aobo-1300885272.tcb.qcloud.la/car_img/changchun/" + number + "/" + img_name + "_" + i + ".jpg")
      }
      all_img.push(imgs)
    }
    this.setData({
      car_img_url: all_img
    })
    console.info(all_img)
  },
  //查看大图
  previewImg(event){
    let index = event.currentTarget.dataset.index
    let current = event.target.dataset.src;
    wx.previewImage({
      current: current, // 当前显示图片的http链接  
      urls: this.data.car_img_url[index] // 需要预览的图片http链接列表  
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  }
})