<template>
  <div id="home">
    <nav-bar class="home-nav">
      <div slot="center">购物街</div>
    </nav-bar>
    <tab-control
      class="tab-control"
      :titles="['流行','新款','精选']"
      @tabClick="tabClick"
      ref="tabControl1"
      v-show="isTabFixed"
    />
    <scroll
      class="content"
      ref="scroll"
      :probe-type="3"
      @scroll="contentScroll"
      :pull-up-load="true"
      @pullingUp="loadmore"
    >
      <home-swiper :banners="banners" @swiperImageLoad="swiperImageLoad"></home-swiper>
      <recommend-view :recommends="recommends"></recommend-view>
      <feature-view />
      <tab-control :titles="['流行','新款','精选']" @tabClick="tabClick" ref="tabControl2" />
      <goods-list :goods="showGoods"></goods-list>
    </scroll>
    <back-top @click.native="backClick" v-show="isShowBackTop" />
  </div>
</template>

<script>
import HomeSwiper from "./childComps/HomeSwiper";
import RecommendView from "./childComps/RecommendView";
import FeatureView from "./childComps/FeatureView";

import NavBar from "components/common/navbar/NavBar";
import TabControl from "components/content/tabControl/TabControl";
import GoodsList from "components/content/goods/GoodsList";
import Scroll from "components/common/scroll/Scroll";
import BackTop from "components/content/backTop/BackTop";

import { getHomeMultidata, getHomeGoods } from "network/home";
import { debounce } from "common/utils";

export default {
  name: "Home",
  components: {
    HomeSwiper,
    RecommendView,
    FeatureView,
    NavBar,
    TabControl,
    GoodsList,
    Scroll,
    BackTop
  },
  data() {
    return {
      // results: null,
      banners: [],
      recommends: [],
      goods: {
        pop: { page: 0, list: [] },
        new: { page: 0, list: [] },
        sell: { page: 0, list: [] }
      },
      currentType: "pop",
      isShowBackTop: false,
      tabOffsetTop: 0,
      isTabFixed: false,
      saveY: 0
    };
  },
  computed: {
    showGoods() {
      return this.goods[this.currentType].list;
    }
  },
  created() {
    //   1.请求多个数据
    // getHomeMultidata().then(res => {
    //   // 注意此处的this为该组件
    //   // this.results = res;
    //   // console.log(this.results);
    //   this.banners = res.data.banner.list;
    //   this.recommends = res.data.recommend.list;
    // });

    // 使用this调用封装后的数据请求方法
    // 1.请求多个数据
    this.getHomeMultidata();
    // 2. 请求商品数据
    this.getHomeGoods("pop");
    this.getHomeGoods("new");
    this.getHomeGoods("sell");
  },
  mounted() {
    // 3.监听item中图片加载完成
    // const refresh = this.debounce(this.$refs.scroll.refresh);
    const refresh = debounce(this.$refs.scroll.refresh);
    this.$bus.$on("itemImageLoad", () => {
      // this.$refs.scroll.refresh();
      refresh();
    });
  },
  beforeDestroy() {
    // 加上该代码时，切换路由不报错
    this.$bus.$off();
  },
  activated() {
    this.$refs.scroll.scrollTo(0, this.saveY, 0);
    // 解决在上拉加载后，切换路由会跳转到顶部的bug
    // this.$refs.scroll.refresh();
  },
  deactivated() {
    // 保存滚动的值

    this.saveY = this.$refs.scroll.getScrollY();
  },
  methods: {
    /**
     * 事件监听相关的方法
     */
    tabClick(index) {
      switch (index) {
        case 0:
          this.currentType = "pop";
          break;
        case 1:
          this.currentType = "new";
          break;
        case 2:
          this.currentType = "sell";
          break;
      }
      // 两个TabControl保持一致
      // 错误写法:
      // this.$refs.TabControl1.currentIndex = index;
      // 正确写法:
      this.$refs.tabControl1.currentIndex = index;
      this.$refs.tabControl2.currentIndex = index;
    },
    backClick() {
      // 封装一个backtop方法
      this.$refs.scroll.scrollTo(0, 0);
    },
    contentScroll(position) {
      // 1.判断BackTop是否显示
      this.isShowBackTop = -position.y > 0;
      // 2.决定tabControl是否吸顶{position:fixed}
      this.isTabFixed = -position.y > this.tabOffsetTop;
    },
    loadmore() {
      this.getHomeGoods(this.currentType);
    },
    swiperImageLoad() {
      this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop;
    },

    /**
     * 网络请求相关的方法
     */
    // 封装created中的函数
    getHomeMultidata() {
      getHomeMultidata().then(res => {
        // 注意此处的this为该组件
        // this.results = res
        this.banners = res.data.banner.list;
        this.recommends = res.data.recommend.list;
      });
    },
    getHomeGoods(type) {
      const page = this.goods[type].page + 1;
      getHomeGoods(type, page).then(res => {
        this.goods[type].list.push(...res.data.list);
        this.goods[type].page += 1;

        this.$refs.scroll.finishPullUp();
      });
    }
  }
};
</script>

<style scoped>
#home {
  /* 使用原生滚动时需要此属性 */
  /* padding-top: 44px; */
  height: 100vh;
  position: relative;
}

.home-nav {
  background-color: var(--color-tint);
  color: #fff;

  /* position: fixed;
  left: 0;
  right: 0;
  top: 0px;
  z-index: 9; */
}

.tab-control {
  /* stick必须与top结合使用 */
  /* position: sticky;
  top: 44px; */
  position: relative;
  z-index: 9;
}

/* 此方法有bug */
/* .fixed {
  position: fixed;
  left: 0;
  right: 0;
  top: 44px;
} */

.content {
  overflow: hidden;
  /* 使用定位定位内容区位置 */
  position: absolute;
  top: 44px;
  bottom: 49px;
  left: 0;
  right: 0;
}
</style>