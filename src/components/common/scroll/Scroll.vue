<template>
  <!-- div上也可以绑定ref -->
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import BSscroll from "better-scroll";
export default {
  name: "Scroll",
  props: {
    probeType: {
      type: Number,
      default: 0
    },
    pullUpLoad: {
      type: Boolean,
      default: false
    },
    pullDownRefresh: {
      type: Boolean,
      default: false,
      // stop: 20
    }
  },
  data() {
    return {
      scroll: null
    };
  },
  mounted() {
    // 1. 创建BScroll对象
    this.scroll = new BSscroll(this.$refs.wrapper, {
      click: true,
      probeType: this.probeType,
      pullUpLoad: this.pullUpLoad,
      pullDownRefresh: this.pullDownRefresh
      //
      // preventDefault: false
    });
    // 2. 监听滚动的位置
    if (this.probeType === 2 || this.probeType === 3) {
      this.scroll.on("scroll", position => {
        this.$emit("scroll", position);
      });
    }
    // 3.监听上拉事件
    if (this.pullUpLoad) {
      this.scroll.on("pullingUp", () => {
        // console.log("上拉加载更多");
        this.$emit("pullingUp");
      });
    }
    // 4.监听下拉事件
    if (this.pullDownRefresh) {
      this.scroll.on("pullingDown",()=>{
        this.$emit("pullingDown");
      })
    }
  },
  methods: {
    scrollTo(x, y, time = 700) {
      this.scroll && this.scroll.scrollTo(x, y, time);
    },
    finishPullUp() {
      this.scroll.finishPullUp();
    },
    finishPullDown(){
      this.scroll && this.scroll.finishPullDown();
    },
    refresh() {
      this.scroll && this.scroll.refresh();
    },
    getScrollY() {
      return this.scroll ? this.scroll.y : 0;
    }
  }
};
</script>

<style scoped>
</style>