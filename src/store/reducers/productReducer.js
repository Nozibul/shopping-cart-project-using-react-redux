const initState = {
  products: [
    {
      id: 1,
      name: 'Asus Vivobook X515MA',
      price: 23423,
      currency: 'BDT',
      qty: 10,
      stock: 10,
    },
    {
      id: 2,
      name: 'Dell E1916HV 18.5 Inch',
      price: 9300,
      currency: 'BDT',
      qty: 5,
      stock: 5,
    },
    {
      id: 3,
      name: 'Canon Eos 4000D 18MP',
      price: 36500,
      currency: 'BDT',
      qty: 20,
      stock: 20,
    },
  ],
}

               //  Action Type
export const FETCH_PRODUCTS = 'products/fetch_products'
export const UPDATE_PRODUCTS = 'products/update_products'

               //  Create Reducer
export const productReducer = (state = initState, action) => {
  switch (action.type) {
    case FETCH_PRODUCTS:
      return {
        ...state,
        products: action.payload.products,
      }
    case UPDATE_PRODUCTS:
      return {
        ...state,
        products: action.payload.products,
      }
    default:
      return state
  }
}
