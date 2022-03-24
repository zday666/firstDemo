import request from "@utils/request";

export function postOrderConfirm(cartId) {
  return request.post("/order/confirm", { cartId });
}

export function postOrderComputed(key, data) {
  return request.post("/order/computed/" + key, data);
}

export function getOrderCoupon(cartId) {
  return request.get("/coupons/order/" + cartId);
}

export function createOrder(key, data) {
  return request.post("/order/create/" + key, data || {});
}

export function getOrderData() {
  return request.get("/order/data");
}

export function getOrderList(data) {
  return request.get("/order/list", data);
}

export function cancelOrder(id) {
  return request.post("/order/cancel", { id });
}

export function orderDetail(id) {
  return request.get("/order/detail/" + id);
}

export function getRefundReason() {
  return request.get("/order/refund/reason");
}

export function postOrderRefund(data) {
  return request.post("/order/refund/verify", data);
}

export function takeOrder(uni) {
  return request.post("/order/take", { uni });
}

export function delOrder(uni) {
  return request.post("/order/del", { uni });
}

export function express(params) {
  return request.post("order/express", params);
}

export function payOrder(uni, paytype, from) {
  return request.post("order/pay", { uni, paytype, from });
}

export function orderVerific(verifyCode, isConfirm) {
  return request.post("order/order_verific", { verifyCode, isConfirm });
}

export function appointmentQuery(orderTime) {
  return request.get("/generalOrderVisitor/queryGeneralOrderByOrderTime",{ orderTime });
}
export function appointmentAdd(data) {
  return request.post("/generalOrderVisitor/add",data);
}
// 获取天气
export function getWeather() {
  return request.get("/weather/getWeather", {cityName: "江北"}, { login: false });
}
// 预约 下拉框数据
export function getDicInfo(data) {
  return request.get("/generalOrderVisitor/getDicInfo", data, { login: false });
}
//新增预约
export function reserveAdd(data) {
  return request.post("/generalOrderVisitor/add",data);
}
//预约详情
export function reserveDetail(orderId) {
  return request.get("/generalOrderVisitor/queryByOrderId",{orderId});
}
//预约列表
export function reserveList(orderState) {
  return request.get("/generalOrderVisitor/queryByState",{orderState});
}
//取消预约
export function reserveCancel(id) {
  return request.get("/generalOrderVisitor/cancelOrder",{id});
}