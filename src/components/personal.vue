<template>
<div>
    <mt-header fixed title="个人中心">
         <router-link to="/personInfo" slot="left">
            <mt-button icon="back">返回</mt-button>
        </router-link>
    </mt-header>
    <div style="margin-top:55px;">
        
        <mt-field label="用户名" placeholder="请输入用户名" v-model="username" class="border"></mt-field>
        <mt-field label="手机号"  v-model="phone" class="border"></mt-field>
        <mt-field label="昵称"  v-model="nickname" class="border"></mt-field>
        <mt-radio 
            title="性别"
            v-model="gender"
            :options="['男', '女']">
        </mt-radio>
        <mt-button type="primary" style="width:100%" @click="update()">修改</mt-button><br>
    </div>
    </div>
</template>

    
<script>
export default {
    name:'personal',
    data(){
        return{
             username:'',
             gender:'女',
             phone:'',
             nickname:''

        }
    },
    created(){
        this.getInfo()
    },
    methods:{
      //获取个人信息
      getInfo(){
        var user = localStorage.getItem('user');
        if(!user){
          this.$router.replace('/login');
          return;
        }
        this.axios.get("/getInfo?uid="+user).then(res=>{
          //console.log(res.data);
          if(res.data.length > 0){
            this.username = res.data[0].uname;
						this.nickname = res.data[0].nickname ?   res.data[0].nickname : '用户' + res.data[0].uname;
            this.gender = res.data[0].gender == 1 ? '男' : '女' ;
            this.phone = res.data[0].phone;
            //console.log(res.data);
          } else {
            this.$toast({message:'超时请登录'});
            this.$router.push('/login');
          }
        });
      },
      // 修改个人信息
      update(){
        if(this.uname == '' || this.nickname == '' || this.gender == '' || this.phone == ''){
          this.$toast({message:'请完善信息'});
          return
        }
				var user = localStorage.getItem('user');
				this.axios.post("/edit","uid="+user+"&uname="+this.username+"&nickname="+this.nickname+"&gender="+this.sex+"&phone="+this.phone).then(res=>{
					console.log(res.data);
					if(res.data.code == 1){
            this.$toast({message:'修改成功'});
            this.$router.push('/');
          }
				});
      },
      logout(){
        localStorage.removeItem('user');
        this.$router.push('/login');
      }
    }
}
</script>
<style>
.border{
    border-bottom:1px solid #ccc;
}
</style>

