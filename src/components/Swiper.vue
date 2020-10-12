<template>
    <div class="swiper">
        <mt-swipe :auto="4000">
            <mt-swipe-item v-for="(item,i) in swiper" :key="i"><img :src="item" /></mt-swipe-item>
        </mt-swipe>
    </div>
</template>
<script>
export default {
    name:'swiper',
    props:['swiper']
}
</script>