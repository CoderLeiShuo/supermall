import Vue from "vue";
import Vuex from "vuex";

import mutations from './mutations'
import actions from "./actions";
import getters from './getters'

// 1.安装插件
Vue.use(Vuex);

const state = {
  cartList: []
}

// 2.创建Store对象
const store = new Vuex.Store({
  // state: {
  //   // 商品列表
  //   cartList: []
  // },

  // mutations: {
  //   addCart(state, payload) {
  //     // payload为添加的商品对象
  //     // let oldProduct = null;
  //     // // 1.查找是否已经添加该商品
  //     // // 方法一：
  //     // for (let item of state.cartList) {
  //     //   if (item.iid === payload.iid) {
  //     //     oldProduct = item;
  //     //   }
  //     // }
  //     // 方法二：
  //     // let oldProduct = state.cartList.find(item => item.iid === payload.iid)

  //     // // 2.判断是否重复添加
  //     // if (oldProduct) {
  //     //   oldProduct.count += 1;
  //     // } else {
  //     //   payload.count = 1;
  //     //   state.cartList.push(payload);
  //     // }
  //   },

  // },
  // actions: {
  //   addCart(context, payload) {
  //     // 1.查找是否已经添加该商品
  //     let oldProduct = context.state.cartList.find(item => item.iid === payload.iid)

  //     // 2.判断是否重复添加
  //     if (oldProduct) {
  //       // oldProduct.count++ ;
  //       context.commit('addCounter', oldProduct)
  //     } else {
  //       payload.count = 1;
  //       context.commit('addToCart', payload)

  //     }
  //   }
  // },
  state,
  mutations,
  actions,
  getters
})

// 3. 挂载到Vue实例上
export default store
