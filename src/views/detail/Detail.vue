<template>
  <div id="detail">
    <detail-nav-bar class="detail-nav" @titleClick="titleClick" ref="detailnavbar" />
    <scroll class="content" ref="scroll" :probe-type="3" @scroll="contentScroll">
      <!-- 组件和props都有大小写转换，需要使用'-'写法,事件名没有 -->
      <detail-swiper :top-images="topImages"></detail-swiper>
      <detail-base-info :goods="goods" />
      <detail-shop-info :shop="shop" />
      <detail-goods-info :detail-info="detailInfo" @imageLoad="imageLoad" />
      <detail-param-info ref="param" :param-info="paramInfo"></detail-param-info>
      <detail-comment-info ref="comment" :comment-info="commentInfo"></detail-comment-info>
      <goods-list ref="recommend" :goods="recommentInfo" />
    </scroll>
    <detail-bottom-bar />
    <back-top @click.native="backClick" v-show="isShowBackTop" />
  </div>
</template>

<script>
import DetailNavBar from "./childComps/DetailNavBar";
import DetailSwiper from "./childComps/DetailSwiper";
import DetailBaseInfo from "./childComps/DetailBaseInfo";
import DetailShopInfo from "./childComps/DetailShopInfo";
import DetailGoodsInfo from "./childComps/DetailGoodsInfo";
import DetailParamInfo from "./childComps/DetailParamInfo";
import DetailCommentInfo from "./childComps/DetailCommentInfo";
import DetailBottomBar from "./childComps/DetailBottomBar";

import Scroll from "components/common/scroll/Scroll";
// import BackTop from "components/content/backTop/BackTop";
import GoodsList from "components/content/goods/GoodsList";

import { debounce } from "common/utils";
import { itemListenerMixin, backTopMixin } from "common/mixin";
import {
  getDetail,
  getRecomment,
  Goods,
  Shop,
  GoodsParam
} from "network/detail";

export default {
  name: "Detail",
  components: {
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    DetailGoodsInfo,
    DetailParamInfo,
    DetailCommentInfo,
    DetailBottomBar,
    Scroll,
    // BackTop,
    GoodsList
  },
  data() {
    return {
      iid: null,
      topImages: [],
      goods: {},
      shop: {},
      detailInfo: {},
      paramInfo: {},
      commentInfo: {},
      // isShowBackTop: false,
      recommentInfo: [],
      // 使用混入技术将变量保存到mixin中
      // itemImgListener: null
      themeTopYs: [],
      getThemeTopY: null
    };
  },
  // 混入
  mixins: [itemListenerMixin, backTopMixin],
  methods: {
    imageLoad() {
      // 图片加载后刷新滚动高度
      this.$refs.scroll.refresh();
      // 调用防抖处理后的的函数获取位置
      this.getThemeTopY();
    },
    // 点击标题滚动到相应位置
    titleClick(index) {
      this.$refs.scroll.scrollTo(0, -this.themeTopYs[index], 200);
    },
    // 判断BackTop是否显示
    contentScroll(position) {
      // this.isShowBackTop = -position.y > 0;
      this.listenShowBackTop(position);
      // 1.获取y值
      const positionY = -position.y;

      // 2.将y值与范围值进行对比
      const length = this.themeTopYs.length;
      for (let i in this.themeTopYs) {
        //使用in遍历时，i为字符串，要将字符串转换为数字
        i *= 1;
        // 第一种思路
        // i = parseInt(i);
        // if (
        //   this.currentIndex !== i &&
        //   ((i < length - 1 &&
        //     positionY >= this.themeTopYs[i] &&
        //     positionY < this.themeTopYs[i + 1]) ||
        //     (i === length - 1 && positionY >= this.themeTopYs[i]))
        // ) {
        //   this.currentIndex = i;
        //   this.$refs.detailnavbar.currentIndex = i;
        // }
        // 第二种思路
        // if (positionY > this.themeTopYs[i]) {
        //   this.$refs.detailnavbar.currentIndex = i;
        // }
        // 第三种思路:推入一个最大值
        if (
          this.currentIndex !== i &&
          positionY >= this.themeTopYs[i] &&
          positionY < this.themeTopYs[i + 1]
        ) {
          this.currentIndex = i;
          this.$refs.detailnavbar.currentIndex = i;
        }
      }
    },
    listenShowBackTop(position) {
      this.isShowBackTop = -position.y > 0;
    }

  },
  created() {
    // 1.保存传入的id
    this.iid = this.$route.params.iid;
    // 2.根据iid请求详情数据
    getDetail(this.iid).then(res => {
      // 1.获取顶部的图片轮播数据
      // console.log(res);
      const data = res.result;
      // console.log(data);
      this.topImages = data.itemInfo.topImages;

      // 2.获取商品信息
      this.goods = new Goods(
        data.itemInfo,
        data.columns,
        data.shopInfo.services
      );

      // 3.获取店铺信息
      this.shop = new Shop(data.shopInfo);

      // 4.保存商品的详情数据
      this.detailInfo = data.detailInfo;

      // 5.获取参数的信息
      this.paramInfo = new GoodsParam(
        data.itemParams.info,
        data.itemParams.rule
      );
      // 6.获取评论信息
      if (data.rate.CRate !== 0) {
        this.commentInfo = data.rate.list[0];
      }
    });
    // 3.请求推荐数据
    getRecomment().then(res => {
      // console.log(res);
      this.recommentInfo = res.data.list;
    });
    // 4.使用防抖处理获取滚动位置的函数
    this.getThemeTopY = debounce(() => {
      this.themeTopYs = [];
      this.themeTopYs.push(0);
      this.themeTopYs.push(this.$refs.param.$el.offsetTop);
      this.themeTopYs.push(this.$refs.comment.$el.offsetTop);
      this.themeTopYs.push(this.$refs.recommend.$el.offsetTop);
      // 推入一个最大值
      this.themeTopYs.push(Number.MAX_VALUE);
    }, 100);

    // 在$$nextTick中，根据最新的数据，对应的DOM已经被渲染出来了
    // this.$nextTick(()=>{
    // // 但是图片还没有加载完，高度不确定
    // this.themeTopYs= [];
    // this.themeTopYs.push(0);
    // this.themeTopYs.push(this.$refs.param.$el.offsetTop);
    // this.themeTopYs.push(this.$refs.comment.$el.offsetTop);
    // this.themeTopYs.push(this.$refs.recommend.$el.offsetTop);
    // })
  }
};
</script>

<style scoped>
#detail {
  position: relative;
  z-index: 10;
  /* background-color: #fff; */
  height: 100vh;
}

.detail-nav {
  position: relative;
  z-index: 11;
  background-color: #fff;
}

.content {
  position: absolute;
  top: 44px;
  right: 0px;
  left: 0px;
  bottom: 49px;
  /* height: calc(100%-44px); */
}
</style>