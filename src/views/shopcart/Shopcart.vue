<template>
  <div class="cart">
    <!-- 导航 -->
    <nav-bar class="nav-bar">
      <div slot="center">购物车{{cartCount}}</div>
    </nav-bar>
    <!-- 商品列表 -->
    <shop-cart-list />

    <!-- 底部汇总 -->
    <!-- <cart-bottom-bar class="car-bottom-bar"></cart-bottom-bar> -->
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar";

import ShopCartList from "./childComps/ShopCartList";
import CartBottomBar from "./childComps/CartBottomBar";

import { mapGetters } from "vuex";

export default {
  name: "Shopcart",
  components: {
    NavBar,
    ShopCartList,
    CartBottomBar
  },
  computed: {
    ...mapGetters(["cartCount"])
  }
};
</script>

<style scoped>
.cart{
  height: 100vh;
}

.nav-bar {
  background-color: var(--color-tint);
  color: #fff;
  position: fixed;
  top: 0px;
  right: 0px;
  left: 0px;
}

.car-bottom-bar{
  position: fixed;
  bottom:49px;
  right:0px;
  left:0px;
}
</style>