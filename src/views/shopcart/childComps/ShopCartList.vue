<template>
  <div class="cart-list">
    <scroll class="content">
     <shop-cart-list-item v-for="item in cartList" :key="item.iid" :itemInfo="item"></shop-cart-list-item>
    </scroll>
  </div>
</template>

<script>
import Scroll from "components/common/scroll/Scroll";

import ShopCartListItem from './ShopCartListItem'

import { mapGetters } from "vuex";

export default {
  name: "ShopCartList",
  components: {
    Scroll,
    ShopCartListItem,  
  },
  computed: {
    ...mapGetters(["cartList"])
  }
};
</script>

<style scoped>
.content {
  /* position: relative; */
  /* height: calc(100%-44px);
  overflow: hidden; */

  overflow: hidden;
  /* 使用定位定位内容区位置 */
  position: absolute;
  top: 44px;
  bottom: 49px;
  left: 0;
  right: 0;
}
</style>