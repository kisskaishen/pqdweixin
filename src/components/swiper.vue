<template>
	<div class="swiper">
		<swiper :options="swiperOption" ref="mySwiper">
			<swiper-slide>I'm Slide 1</swiper-slide>
		    <swiper-slide>I'm Slide 2</swiper-slide>
		    <swiper-slide>I'm Slide 3</swiper-slide>
		    <!-- Optional controls -->
		    <div class="swiper-pagination" slot="pagination"></div>
		</swiper>
	</div>
</template>
<script>
	import { swiper, swiperSlide } from 'vue-awesome-swiper'
	export default {
		data() {
			return {
				swiperOption:{
					pagination : '.swiper-pagination',
					paginationClickable:true,
					notNextTick: true,
					autoplay: 2000,
					autoplayDisableOnInteraction:false,
					loop: true,
          			
				}
			}
		},
		components:{ swiper, swiperSlide },
		computed:{
			swiper() {
		        return this.$refs.mySwiper.swiper
		    }
		},
		mounted() {
			console.log(this.$refs.mySwiper.swiper)
			console.log(999)
			// this.swiper.slideTo(3, 1000, false)
		},
		methods:{

		}
	}
</script>

<style>

	.swiper {
		width:100%;
		overflow:scroll;
	}
	.swiper-slide {
		display:inline-block;
		height:200px;
		border:1px solid red;
	}
</style>