import { createStore, combineReducers, applyMiddleware }  from "redux"
import thunk from "redux-thunk"
import { composeWithDevTools } from "redux-devtools-extension" 
import { productReducers, productDetailsReducer, newReviewReducer, newProductReducer , delUpdateProductReducer, productReviewsReducer, reviewReducer } from "./reducers/productReducers"
import { authReducer, userReducer, forgotPasswordReducer, allUsersReducer, userDetailsReducer } from "./reducers/userReducer"
import  { cartReducers } from "./reducers/CartReducers"
import { newOrderReducer , myOrderReducer ,orderDetailsReducer, allOrdersReducer, delUpdateOrderReducer} from "./reducers/orderReducer"


const reducer = combineReducers({
    products : productReducers,
    productDetails : productDetailsReducer,
    delUpdateProduct : delUpdateProductReducer,
    auth : authReducer,
    user : userReducer,
    forgotPassword : forgotPasswordReducer,
    cart : cartReducers,
    newOrder : newOrderReducer,
    myOrders : myOrderReducer,
    orderDetails : orderDetailsReducer,
    newReview : newReviewReducer,
    newProduct : newProductReducer,
    allOrders : allOrdersReducer,
    delUpdateOrder : delUpdateOrderReducer,
    userDetails : userDetailsReducer,
    allUsers : allUsersReducer,
    productReviews : productReviewsReducer,
    review : reviewReducer
})

let initialState = {
    cart : {
        cartItems : localStorage.getItem("cartItems") ? JSON.parse(localStorage.getItem("cartItems")) : [],
        shippingInfo : localStorage.getItem("shippingInfo") ? JSON.parse(localStorage.getItem("cartItems")) : {}
    }
}


const middlWare = [thunk];
const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middlWare)));

export default store;