import {
    ADD_COUNTER,
    ADD_TO_CART
  } from "./mutation-type";

export default {
  addCart(context, payload) {
    // 1.查找是否已经添加该商品
    let oldProduct = context.state.cartList.find(item => item.iid === payload.iid)

    // 2.判断是否重复添加
    if (oldProduct) {
      // oldProduct.count++ ;
      context.commit(ADD_COUNTER, oldProduct)
    } else {
      payload.count = 1;
      context.commit(ADD_TO_CART, payload)

    }
  }
}
