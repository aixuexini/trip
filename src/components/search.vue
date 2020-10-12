<template>
<div class="search">
        <div>   
            <mt-header fixed title="搜索">
                <router-link to="/" slot="left">
                    <mt-button icon="back">返回</mt-button>
                </router-link>
            </mt-header>
        </div>
        <div style="margin-top:40px;height:56px;">
            <mt-search v-model="value" autofocus :result="filterResult"  @keyup.enter.native="search()" >
            </mt-search>
        </div>
        <div class="text" v-for="(item,i) of tourArr" :key="i">{{item}}</div>
        <mt-button type="default" @click="clear()" style="float:right;margin:20px;">清除历史搜索</mt-button>
</div>  
</template>
<script>
export default {
  name: "search",
  data() {
    return {
      value: "",
      result: [],
      tourArr: []
    };
  },
  computed: {
    filterResult() {
      if (this.result != null) {
        return this.result.filter(value =>
          new RegExp(this.value, "i").test(value)
        );
      }
    }
  },
  created() {
    this.getSearch();
  },
  methods: {
    search() {
      var tourname = this.value;
      this.addSearch();
      this.axios.get("/findTour",{params:{name:tourname}}).then(res=>{
        console.log(res.data);
        if(res.data.length>0){
          var rid = res.data[0].rid;
          this.$router.push("/detail?rid="+rid);
        } else {
          this.$toast({ message: "景点不存在" });
        }  
      }) 
    },
    getSearch() {
      this.result = JSON.parse(localStorage.getItem("search"));
    },
    addSearch() {
      this.tourArr.push(this.value);
      localStorage.setItem("search", JSON.stringify(this.tourArr));
    },
    clear() {
      localStorage.removeItem("search");
      this.tourArr=[];
      this.value="";
      this.$toast({ message: "已清除" }); 
    }
  }
};
</script>
<style>
.mint-search-list {
  margin-top: 50px;
}
.text{
  font-size: 14px;
  margin-top: 10px;
  border-bottom: 0.5px dotted #ccc;
  text-align: left;
  padding-left:30px;
}
</style>
