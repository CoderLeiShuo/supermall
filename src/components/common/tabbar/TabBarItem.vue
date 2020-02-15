<template>
  <div class="tab-bar-item" @click="itemClick">
    <slot v-if="!isActive" name="item-icon"></slot>
    <slot v-else name="item-icon-active"></slot>
    <!-- 在插槽外包裹一层div，设置属性，可以保证属性不被替换掉 -->
    <!-- <div :class="{active:isActive}"> -->
    <div :style="activeStyle">
      <slot name="item-text"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "TabBarItem",
  props: {
    path: String,
    activeColor: {
      type: String,
      default: "red"
    }
  },
  data() {
    return {
      //   isActive: false
    };
  },
  computed: {
    isActive() {
      // indexOf()结果为-1，表示没有找到
      // return this.$route.path.indexOf(this.path) !== -1
      // this.path：当前组件的路径
      return this.$route.path === this.path;
    },
    activeStyle() {
      return this.isActive ? { color: this.activeColor } : {};
    }
  },
  methods: {
    itemClick() {
      // 当前活跃的path
      // console.log(this.$route.path);
      // 单击的组件的path
      // 这个this是在单击事件中的this，仅指当前对象
      // console.log(this.path);
      if (this.$route.path !== this.path) {
        this.$router.replace(this.path);
      }
    }
  }
};
</script>

<style>
.tab-bar-item {
  /* 均等分 */
  flex: 1;
  /* 水平居中 */
  text-align: center;
  /* tab-bar的高度一般为49px */
  height: 49px;
  font-size: 14px;
}

.tab-bar-item img {
  width: 24px;
  height: 24px;
  margin-top: 3px;
  vertical-align: middle;
  margin-bottom: 2px;
}

/* .active {
  color: red;
} */
</style>