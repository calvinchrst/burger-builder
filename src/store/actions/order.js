import * as actionTypes from "./actionTypes";
import axios from "../../axios-orders";

const purchaseBurgerSuccess = (id, orderData) => {
  return {
    type: actionTypes.PURCHASE_BURGER_SUCCESS,
    orderId: id,
    orderData: orderData,
  };
};

const purchaseBurgerFail = (error) => {
  return {
    type: actionTypes.PURCHASE_BURGER_FAIL,
    error: error,
  };
};

export const purchaseBurger = (orderData, token) => {
  return (dispatch) => {
    dispatch(purchaseBurgerStart());
    axios
      .post("/orders.json?auth=" + token, orderData)
      .then((response) => {
        dispatch(purchaseBurgerSuccess(response.data.name, orderData));
      })
      .catch((err) => {
        dispatch(purchaseBurgerFail(err));
      });
  };
};

const purchaseBurgerStart = () => {
  return {
    type: actionTypes.PURCHASE_BURGER_START,
  };
};

export const purchaseBurgerInit = () => {
  return {
    type: actionTypes.PURCHASE_BURGER_INIT,
  };
};

const fetchOrdersStart = () => {
  return {
    type: actionTypes.FETCH_ORDERS_START,
  };
};

const fetchOrdersSuccess = (orders) => {
  return {
    type: actionTypes.FETCH_ORDERS_SUCCESS,
    orders: orders,
  };
};

const fetchOrdersFail = (error) => {
  return {
    type: actionTypes.FETCH_ORDERS_FAIL,
    error: error,
  };
};

export const fetchOrders = (token, userID) => {
  return (dispatch) => {
    dispatch(fetchOrdersStart());
    const queryParams =
      "?auth=" + token + '&orderBy="userID"&equalTo="' + userID + '"';
    axios
      .get("orders.json" + queryParams)
      .then((res) => {
        const fetchedOrders = [];
        for (let key in res.data) {
          fetchedOrders.push({ ...res.data[key], id: key });
        }
        dispatch(fetchOrdersSuccess(fetchedOrders));
      })
      .catch((err) => {
        dispatch(fetchOrdersFail(err));
      });
  };
};
