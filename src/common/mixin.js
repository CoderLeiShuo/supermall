import {
  debounce
} from "common/utils";
import BackTop from "components/content/backTop/BackTop";

export const itemListenerMixin = {
  data() {
    return {
      itemImgListener: null
    }
  },
  mounted() {
    let Refresh = debounce(this.$refs.scroll.refresh);
    this.itemImgListener = () => {
      Refresh()
    }
    this.$bus.$on("itemImgLoad", this.itemImgListener)
  }
}

export const backTopMixin = {
  components: {
    BackTop
  },
  data() {
    return {
      isShowBackTop: false
    }
  },
  methods: {
    backClick() {
      this.$refs.scroll.scrollTo(0, 0, 300)
    },
    // 判断isShowBackTop的布尔值
    listenShowBackTop(position) {
      const positionY = -position.y;
      this.isShowBackTop = positionY > 0;
      return positionY;
    }
  }
}
