import {
  cartTotalItemSum,
  cartTotalPriceSum,
  existsReplaceWithDecrementProduct,
  existsReplaceWithIncrementProduct,
  quantityDecrementByProduct,
  quantityStockIncrementByProduct,
 } from '../../utils/func'
import { CART_ADD_PRODUCT } from '../reducers/cartReducer'
import { UPDATE_PRODUCTS } from '../reducers/productReducer'
import { SELECTED_PRODUCT_CART } from '../reducers/selectedCartReducer'
import store from '../store'


export const addProductCartIncrementAction = async (newCartProduct) => {
  const newAddedProduct = {
    id: newCartProduct.id,
    name: newCartProduct.name,
    price: newCartProduct.price,
    stock: newCartProduct.stock,
    orderQty: newCartProduct.orderQty || 1,
  }
  await store.dispatch({
    type: SELECTED_PRODUCT_CART,
    payload: {
      product: newCartProduct,
    },
  })

                 // get current state 
  const curProducts = store.getState()?.products.products
  const carts = store.getState()?.carts

  const updateProducts = await quantityStockIncrementByProduct(curProducts, newCartProduct)
  store.dispatch({
    type: UPDATE_PRODUCTS,
    payload: {
      products: updateProducts,
    },
  })
  

  if (!carts?.products.find((cart) => cart?.id?.toString() === newCartProduct?.id?.toString()) ){
    const updateCarts = [...carts.products, newAddedProduct]
    const totalQty = await cartTotalItemSum(updateCarts) // id, name ,stock,  , orderQty
    const totalPrice = await cartTotalPriceSum(updateCarts)
    store.dispatch({
      type: CART_ADD_PRODUCT,
      payload: {
        products: updateCarts,
        totalQty: totalQty,
        totalPrice: totalPrice,
      },
    })
  } else {
    const updateCart = await existsReplaceWithIncrementProduct(carts.products, newAddedProduct)
    const totalQty = await cartTotalItemSum(carts.products)
    const totalPrice = await cartTotalPriceSum(carts.products)
    store.dispatch({
      type: CART_ADD_PRODUCT,
      payload: {
        products: updateCart,
        totalQty: totalQty,
        totalPrice: totalPrice,
      },
    })
  } 
}


 export const addProductCartDecrementAction = async (newCartProduct) => {
  store.dispatch({
    type: SELECTED_PRODUCT_CART,
    payload: {
      product: newCartProduct,
    },
  })

          // get new current state
  const products = store.getState()?.products.products
  const carts = store.getState()?.carts 

  const updateProducts = await quantityDecrementByProduct(products, newCartProduct)
  store.dispatch({
    type: UPDATE_PRODUCTS,
    payload: {
      products: updateProducts,
    },
  })
  const updateCart = await existsReplaceWithDecrementProduct(carts.products, newCartProduct)
  const totalQty = await cartTotalItemSum(carts.products)
  const totalPrice = await cartTotalPriceSum(carts.products)
  store.dispatch({
    type: CART_ADD_PRODUCT,
    payload: {
      products: updateCart,
      totalQty: totalQty,
      totalPrice: totalPrice,
    },
  })
} 
