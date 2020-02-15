<template>
  <div id="tab-bar">
    <!-- 定义一个插槽，用于 -->
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "TabBar"
};
</script>

<style>
#tab-bar {
  display: flex;
  /* tab-bar背景 */
  background-color: #f6f6f6;
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  /* 阴影，用于tabbar和界面之间平滑过渡 */
  box-shadow: 0px -1px 1px rgba(100, 100, 100, 0.2);
}
</style>