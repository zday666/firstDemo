import request from "@utils/request";

export function login(data) {
  return request.post("/role/login", data, { login: false });
}

//查询题目
export function findItem(data) {
  return request.post("/ScoringItem/findItembyCondition", data, {
    login: false,
  });
  // return request.post("/ScoringItem/findItem", data, { login: false });
}

//查询所有题目
export function findItemData(data) {
  return request.post("/ScoringItem/findItem", data, { login: false });
}

//查询修改时间
export function findSavedTime(data) {
  return request.post("/role/findSavedTime", data, { login: false });
}

//查询截止时间
export function findendTime(data) {
  return request.post("/role/findendTime", data, { login: false });
}

//查询所有题目和评分状态
export function finds(data) {
  return request.post("/Scoring/finds", data, { login: false });
}

//查询评分对象
export function findItems(data) {
  return request.post("/Scoring/findItems", data, { login: false });
}

//查询已完成未完成状态
export function findState(data) {
  return request.post("/Scoring/findevaluationStatus", data, { login: false });
}

//完全评分
export function beSave(data) {
  return request.post("/Scoring/beSave", data, { login: false });
}

//暂存评分内容
export function saved(data) {
  return request.post("/Scoring/saved", data, { login: false });
}

//查询被评分对象
export function findScoringObject(data) {
  return request.post("/ScoringObject/findScoringObject", data, {
    login: false,
  });
}

/* 管理员 */

//查询所有被评分对象
export function findAlltScor(data) {
  return request.post("/ScoringObject/findAlltScor", data, {
    login: false,
  });
}
//条件查询被评分对象
export function findScoringObjectScor(data) {
  return request.post("/ScoringObject/findScoringObjectScor", data, {
    login: false,
  });
}
//分类查询被评分对象
export function findName(data) {
  return request.post("/ScoringObject/findName", data, {
    login: false,
  });
}

//进度条
//角色进度条
export function progressBar(data) {
  return request.post("/role/progressBar", data, {
    login: false,
  });
}

//管理员进度条
export function adminstrip(data) {
  return request.post("/role/adminstrip", data, {
    login: false,
  });
}

//导出接口
export function exportExcel(data) {
  return request.post("/role/export", data, {
    login: false,
  });
}

//查询未评分
export function findRated(data) {
  return request.post("/Scoring/findRated", data, {
    login: false,
  });
}
