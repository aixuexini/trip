<template>
    <div>
        <mt-header fixed title="详情">
            <router-link to="/" slot="left">
                <mt-button icon="back">返回</mt-button>
            </router-link>
        </mt-header>
        <div class="swiper">
            <Swiper :swiper = 'swiper'  />
        </div>
        <div class="intro">
            <!-- {{data.intro}} -->
            <div class="addr"><strong>地址：</strong>{{data.address}}</div>
            <div class="otime"><strong> 开放时间:</strong>{{data.opentime}}</div>             
            <div class="apart" v-if="showMore">
                <strong>景点简介:</strong>
                <span v-html="data.intro.substring(0,60)"></span>
                <span class="showMore" @click="showIntro()">显示更多</span>
            </div>
            <div v-else>
              <strong>景点简介:</strong>
              <span v-html="data.intro"></span>
              <span class="showMore" @click="showIntro()">收起</span>
            </div> 
        </div>
        <div>
          <p style="background:#eee;margin:5px;">路线</p>
          <div id="allmap" ref="allmap"></div>
        </div>
        <div class="commentList">
                <div class="listItemDetail" v-for="(item,i) in commentArr" :key="i">
                     <div class="leftImgDetail">
                        <img src= "../assets/user2.png" style="border-radius:100%">    
                     </div>
                     <div class="rightContentDetail">
                        <div class="name">
                          {{ item.nickname == null ? '用户'+ item.username : item.nickname }}
                        </div>
                         <div class="descDetail">
                            {{ item.content}} 
                         </div>   
                     </div>
                 </div> 
                 <div class="comment">
                     <textarea style="width:90%;text-align:left;padding:3px;margin:3%;border-radius:10px;" rows=4 
                        placeholder="发表您的评论" v-model="comment"
                     />
                     <mt-button size="normal" type="primary" style="width:80%;margin-left:10%" @click="publish()">发表</mt-button>

                 </div>
        </div>
    </div>
</template>
  
<script>
import Swiper from "./Swiper";
export default {
  name: "detail",
  data() {
    return {
      data: [],
      comment: "",
      swiper: [],
      commentArr: [],
      jd:'',
      wd:'',
      city:'',
      showMore:false,

    };
  },
  components: {
    Swiper
  },
  created() {
    this.getDetail();
    this.getComment();
  },
  mounted(){
    this.getBaiduApi();
  },
  methods: {
    showIntro(){
      this.showMore = !this.showMore;
    },
    // 获取评论列表
    getComment() {
     // console.log(this.$route);
      var id = this.$route.query.rid;
      this.axios.get("/selectComment?rid="+id).then(res=>{
        //console.log(res.data);
         if (res.data.length != 0) { 
           this.commentArr = res.data;
           console.log(this.commentArr)
         }
      })
    },
    // 获取景点详情
    getBaiduApi(){
      if (this.$route.query.rid == "") {
        this.$router.push("/");
      }
      var id = this.$route.query.rid;
      this.axios.get("/getTourDetail?rid="+id).then(res=>{ 
        if (res.data.length != 0) {
          this.data = res.data[0];
        // console.log(res.data);
          this.swiper=res.data[0].images.split(",");
          //console.log(this.swiper);
          this.jd = res.data[0].line.split(',')[0];
          this.wd = res.data[0].line.split(',')[1];
          console.log(this.jd,this.wd);
          this.city = res.data[0].name;
          var map = new BMap.Map(this.$refs.allmap);
          var point = new BMap.Point(this.jd,this.wd);
          map.centerAndZoom(point,11);
          // 设置定位marker
          var marker = new BMap.Marker(new BMap.Point(this.jd,this.wd));
          map.addOverlay(marker);

          var opts = {
            position : point,    // 指定文本标注所在的地理位置
            offset   : new BMap.Size(-20, -65)    //设置文本偏移量
          }
          var label = new BMap.Label(this.city, opts);  // 创建文本标注对象
          label.setStyle({
            color : "#fff",
            fontSize : "14px",
            height : "20px",
            lineHeight : "20px",
            fontFamily:"微软雅黑",
            padding:"8px",
            background:"green",
            borderColor:"#F8f8f8",
          });
          map.addOverlay(label);
        } else {
          this.$router.push("/");
        }
      })
    },
    getDetail() {
      //console.log(2);
      if (this.$route.query.rid == "") {
        this.$router.push("/");
      }
      var id = this.$route.query.rid;
      // this.axios.get("/getTourDetail?id="+id).then(res=>{
      //   if (res.data.length != 0) {
      //     this.data=res.data[0];
      //     var reg=/[\u4e00-\u9fa5]/g;
      //     var strlength = this.data.intro.match(reg).length;
      //     if(strlength > 5){
      //       this.showMore = true;
      //     }
      //     this.handleSwiper(JSON.parse(res[0].img));
      //   } else {
      //   this.$router.push("/");
      //   }   
      // })
    },
    publish() {
      var comment = this.comment;
      if (comment == "") {
        this.$toast({ message: "请输入评论" });
        return;
      }
      console.log(localStorage.getItem("user"));
      if (!localStorage.getItem("user")) {
        this.$router.push("/login");
        this.$toast({ message: "请先登录" });
        return;
      }
      this.axios.post("/addComment","uid="+localStorage.getItem("user")+"&rid="+this.$route.query.rid+"&content="+comment+"&createtime="+Date.parse(new Date())).then(res=>{
        if (res.data.res_code == 0) {
          this.$toast({ message: "发表成功" });
          this.comment = "";
          this.getComment();
        }
      });
    }
  }
};
</script>
<style>
* {
  padding: 0 auto;
  margin: 0 auto;
}
.swiperDetail {
  height: 160px;
}
.swiperDetail img {
  width: 100%;
  /* height: 160px; */
}
.intro {
  padding: 10px;
  text-align: left;
  overflow: hidden;
}
#allmap{
  height:200px;
  width: 100%;
}

.list {
  height: auto;
}
.sellWell {
  width: 100%;
  height: 30px;
  background: #eee;
  color: #808080;
  text-align: left;
  line-height: 30px;
}
.listBlock {
  width: 100%;
}
.listItemDetail {
  margin-top: 5px;
  line-height: 80px;
  clear: both;
}
.leftImgDetail {
  height: 100%;
  width: 20%;
  float: left;
  line-height: 80px;
}
.leftImgDetail img {
  margin-left: 10px;
  width: 60px;
  height: 60px;
}
.rightContentDetail {
  height: 100%;
  width: 65%;
  padding-left: 20px;
  float: left;
  text-align: left;
  line-height: 35px;
}
.name {
  font-size: 16px;
  color: #909090;
  display: block;
}
.descDetail {
  font-size: 14px;
  color: #ccc;
  display: block;
  overflow: hidden;
}
.showMore{
  color:red;
  display: inline-block;
  padding: 5px 10px;
  border: 1px solid rgb(167, 189, 204);
  background-color: rgb(167, 189, 204);
  border-radius: 4px;
  float: right;
}
</style>


