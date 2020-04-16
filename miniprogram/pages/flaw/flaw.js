// miniprogram/pages/flaw.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    name: "",
    car_number: 0,
    flaw_desc: [],
    flaw_img: [],
    location: ""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    console.log(options)
    this.setData({
      name: options.name,
      car_number: options.car_number,
      location: options.location,
      flaw_desc: options.car_report_flaw_desc.split(";")
    })
    var des_imgs = [];
    for (var i = 1; i <= this.data.flaw_desc.length; i++) {
      // var img_url = "cloud://carwarehouse-aobo.6361-carwarehouse-aobo-1300885272/car_img/" + this.location + "/" + this.car_number + "/flaw_" + i + ".jpg";
      var img_url = "cloud://carwarehouse-aobo.6361-carwarehouse-aobo-1300885272/car_img/" + this.data.location + "/" + this.data.car_number + "/center_control_" + i + ".jpg";
      des_imgs.push(img_url)
    }
    this.setData({
      flaw_img: des_imgs
    })
  },
  //查看大图
  previewImg(event) {
    let current = event.target.dataset.src;
    wx.previewImage({
      current: current, // 当前显示图片的http链接  
      urls: this.data.flaw_img // 需要预览的图片http链接 列表  
    })
  },
})