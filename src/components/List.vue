<template>
    <div>
        <div class="sellWell">&nbsp;&nbsp;热销推荐</div>
             <div class="listBlock">
                 
                 <div class="listItemList" v-for="(item,i) in tourList" :key="i">
                     <div class="leftImgList">
                        <img :src= "item.img">    
                     </div>
                     <div class="rightContentList">
                         <div class="name">
                             {{ item.name}}
                         </div>
                         <div class="desc" v-html="item.intro">
                             <!-- {{ item.intro}} -->
                         </div>
                         <div class="btn">
                            <mt-button type="primary" size="small" @click="details(item.rid)">查看详情</mt-button>
                         </div>
                     </div>
                 </div>
        </div>
        <div style="text-align:center;margin-top:10px;color:#9f9f9f" v-show="isShow">暂时没有此城市的景点信息</div>
    </div>
</template>
<script>
export default {
  name: "List",
  data() {
    return {
      tourList: [],
      isShow: true
    };
  },
  methods: {
    //查看详情
    details(rid){
      this.$router.push("/detail?rid="+rid);
    },
    // 获取列表
    getTourList() {
      var city =
        localStorage.getItem("selectCity") != null
          ? localStorage.getItem("selectCity")
          : "北京";
      console.log(city);
      if(city=="北京"){
        city=1;
      }
      this.axios.get('/getTourList?type_id='+city).then(res=>{
        console.log(res.data);
        if(res.data.length>0){
          this.tourList=res.data;
          this.isShow=false;
        }
        // if (res.length > 0) {
        //     this.isShow = false;
            // for (var i = 0; i < res.length; i++) {
            //   var iff = {
            //     id: res[i].id,
            //     name: res[i].name,
            //     img:
            //       JSON.parse(res[i].img).length > 0
            //         ? JSON.parse(res[i].img)[0].url
            //         : "",
            //     intro: res[i].intro
            //   };
            //   this.tourList.push(iff);
            // }
         // }
      });
    }
  },
  created() {
    this.getTourList();
  }
};
</script>

<style>
.sellWell {
  width: 100%;
  height: 30px;
  background: #eee;
  color: #808080;
  text-align: left;
  line-height: 30px;
}
.listBlock {
  /* background: #eeccee; */
  width: 100%;
  line-height: 100px;
}
.listItemList {
  height: 100px;
  border-bottom: 1px solid #eee;
  margin-top: 5px;
}
.leftImgList {
  height: 100%;
  width: 20%;
  float: left;
  line-height: 100px;
}
.leftImgList img {
  margin-left: 10px;
  width: 75px;
  height: 75px;
  vertical-align: middle;
}
.rightContentList {
  height: 100%;
  width: 65%;
  padding-left: 21px;
  float: left;
  text-align: left;
  line-height: 28px;
}
.name {
  font-size: 16px;
  color: #909090;
  display: block;
  font-weight: bold;
}
.desc {
   font-size: 15px;
  color: rgb(128, 123, 123);
  /*display: block;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis; */
  word-break:keep-all;
  white-space:nowrap;
  overflow:hidden;
  text-overflow:ellipsis;
}
</style>

