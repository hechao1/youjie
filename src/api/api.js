import { Promise } from 'es6-promise'
import { convertParams, convertRequestURL, localInfo, getQueryString, Storage } from '../utils/utils'
import  store  from '../vuex/store'
import  { showLoading, hideLoading, setMsgTip, setUserId, setCity, setNeedLogin }  from '../vuex/actions'


// errorCodeHandle
const errorCodeHandle = (resp,reject,nullTip)=>{
    if(resp.code){
        if(resp.code == 204){
            setMsgTip(store,{
                text:resp.msg,
                type:'error'
            })
            reject(new Error(resp.msg))
            return true
        }
        else if(resp.code == 401 || resp.code == 23003 ){
            setMsgTip(store,{
                text:resp.msg,
                type:'error'
            })
            setNeedLogin(store, true)
            reject(new Error(resp.msg))
            return true
        }
        setMsgTip(store, {
            text:resp.msg,
            type:'warn'
        })
        reject(new Error(resp.msg))
        return true
    }
    if(nullTip){
        if(!resp.data){
            setMsgTip(store, {
                text:resp.msg,
                type:'warn'
            })
            reject(new Error(resp.msg))
            return
        }
    }
    return false
}

// errorRequestHandle
const errorRequestHandle = (text,reject)=>{
    setMsgTip(store,{
        text:text,
        type:'error'
    })
    reject(new Error(text));
}

const loginApi = {
    userLogin(params){
        return new Promise(function(resolve, reject){
            $.ajax({
                type:"post",
                url: convertRequestURL("backstage/login"),
                data:params,
                dataType:"json",
                success: (resp) => {
                    let isError = errorCodeHandle(resp,reject)
                    if(isError) return

                    let data = resp.data
                    setMsgTip(store, {
                        text:'登录成功',
                        type:'success'
                    })
                    resolve(data)
                },
                error(){
                    errorRequestHandle('登录失败',reject)
                }
            });
        })
    }
}
const allApi = {
    dealOrder(params){
        return new Promise( (resolve, reject) => {
            $.ajax({
                type:"get",
                url: convertRequestURL("backstage/dealOrder"),
                data:params,
                dataType:"json",
                success: (resp) => {
                    let isError = errorCodeHandle(resp,reject)
                    if(isError) return

                    let data = resp.data
                    resolve(data)
                },
                error(){
                    errorRequestHandle('请求成交订单失败！', reject)
                }
            });
        })
    },
    dataList(params){
        return new Promise( (resolve, reject) => {
            $.ajax({
                type:"get",
                url: convertRequestURL("backstage/dataList"),
                data:params,
                dataType:"json",
                success: (resp) => {
                    let isError = errorCodeHandle(resp,reject)
                    if(isError) return

                    let data = resp.data
                    resolve(data)
                },
                error(){
                    errorRequestHandle('请求每日数据失败！', reject)
                }
            });
        })
    },
    creditReport(params){
        return new Promise( (resolve, reject) => {
            $.ajax({
                type:"get",
                url: convertRequestURL("backstage/creditReport"),
                data:params,
                dataType:"json",
                success: (resp) => {
                    let isError = errorCodeHandle(resp,reject)
                    if(isError) return

                    let data = resp.data
                    resolve(data)
                },
                error(){
                    errorRequestHandle('请求信用认证情况失败！', reject)
                }
            });
        })
    },
    chargeOrCashOut(index){
        return new Promise( (resolve, reject) => {
            $.ajax({
                type:"get",
                url: convertRequestURL("backstage/chargeOrCashOut"),
                dataType:"json",
                success: (resp) => {
                    let isError = errorCodeHandle(resp,reject)
                    if(isError) return

                    let data = resp.data
                    resolve(data)
                },
                error(){
                    errorRequestHandle('请求提现申请人数失败！', reject)
                }
            });
        })
    },
    cashOutDetail(params){
        return new Promise( (resolve, reject) => {
            $.ajax({
                type:"get",
                url: convertRequestURL("backstage/cashOutDetail"),
                data:params,
                dataType:"json",
                success: (resp) => {
                    let isError = errorCodeHandle(resp,reject)
                    if(isError) return

                    let data = resp.data
                    resolve(data)
                },
                error(){
                    errorRequestHandle('请求提现列表失败！', reject)
                }
            });
        })
    },
    chargeDetail(params){
        return new Promise( (resolve, reject) => {
            $.ajax({
                type:"get",
                url: convertRequestURL("backstage/chargeDetail"),
                data:params,
                dataType:"json",
                success: (resp) => {
                    let isError = errorCodeHandle(resp,reject)
                    if(isError) return

                    let data = resp.data
                    resolve(data)
                },
                error(){
                    errorRequestHandle('请求充值列表失败！', reject)
                }
            });
        })
    },
    userCount(index){
        return new Promise( (resolve, reject) => {
            $.ajax({
                type:"post",
                url: convertRequestURL("user/count"),
                dataType:"json",
                success: (resp) => {
                    let isError = errorCodeHandle(resp,reject)
                    if(isError) return

                    let data = resp.data
                    resolve(data)
                },
                error(){
                    errorRequestHandle('获取用户统计失败！', reject)
                }
            });
        })
    },
    userList(params){
        return new Promise( (resolve, reject) => {
            $.ajax({
                type:"get",
                url: convertRequestURL(`backstage/userList`),
                data:params,
                dataType:"json",
                success: (resp) => {
                    let isError = errorCodeHandle(resp,reject)
                    if(isError) return

                    let data = resp.data
                    resolve(data)
                },
                error(){
                    errorRequestHandle('获取用户列表失败！', reject)
                }
            });
        })
    },
    userRecommend(params){
        return new Promise( (resolve, reject) => {
            $.ajax({
                type:"get",
                url: convertRequestURL(`backstage/setUserRecommend`),
                data:params,
                dataType:"json",
                success: (resp) => {
                    let isError = errorCodeHandle(resp,reject)
                    if(isError) return

                    let data = resp.data
                    resolve(data)
                },
                error(){
                    errorRequestHandle('请求设置用户推荐失败！', reject)
                }
            });
        })
    },
    delRecommend(params){
        return new Promise( (resolve, reject) => {
            $.ajax({
                type:"get",
                url: convertRequestURL(`backstage/delUserRecommend`),
                data:params,
                dataType:"json",
                success: (resp) => {
                    let isError = errorCodeHandle(resp,reject)
                    if(isError) return

                    let data = resp.data
                    resolve(data)
                },
                error(){
                    errorRequestHandle('请求取消用户推荐失败！', reject)
                }
            });
        })
    },
    orderListByUser(params){
        return new Promise( (resolve, reject) => {
            $.ajax({
                type:"post",
                url: convertRequestURL("order/listByUser"),
                data:params,
                dataType:"json",
                success: (resp) => {
                    let isError = errorCodeHandle(resp,reject)
                    if(isError) return

                    let data = resp.data
                    resolve(data)
                },
                error(){
                    errorRequestHandle('获取用户订单列表失败！', reject)
                }
            });
        })
    },
    orderCount(params){
        return new Promise( (resolve, reject) => {
            $.ajax({
                type:"post",
                url: convertRequestURL("order/count"),
                data:params,
                dataType:"json",
                success: (resp) => {
                    let isError = errorCodeHandle(resp,reject)
                    if(isError) return

                    let data = resp.data
                    resolve(data)
                },
                error(){
                    errorRequestHandle('获取用户订单列表失败！', reject)
                }
            });
        })
    },
    orderList(params){
        return new Promise( (resolve, reject) => {
            $.ajax({
                type:"post",
                url: convertRequestURL("order/list"),
                data:params,
                dataType:"json",
                success: (resp) => {
                    let isError = errorCodeHandle(resp,reject)
                    if(isError) return

                    let data = resp.data
                    resolve(data)
                },
                error(){
                    errorRequestHandle('获取订单列表失败！', reject)
                }
            });
        })
    },
    orderDetail(id){
        return new Promise( (resolve, reject) => {
            $.ajax({
                type:"post",
                url: convertRequestURL("order/getOrderInfo"),
                data:{orderId:id},
                dataType:"json",
                success: (resp) => {
                    let isError = errorCodeHandle(resp,reject)
                    if(isError) return

                    let data = resp.data
                    resolve(data)
                },
                error(){
                    errorRequestHandle('获取订单列表失败！', reject)
                }
            });
        })
    },
    transactionAnalysisDetail(id){
        return new Promise( (resolve, reject) => {
            $.ajax({
                type:"post",
                url: convertRequestURL("user/statisticsDetail"),
                data:{id:id},
                dataType:"json",
                success: (resp) => {
                    let isError = errorCodeHandle(resp,reject)
                    if(isError) return

                    let data = resp.data
                    resolve(data)
                },
                error(){
                    errorRequestHandle('获取统计详情失败！', reject)
                }
            });
        })
    },
    transactionAnalysisHistory(params){
        return new Promise( (resolve, reject) => {
            $.ajax({
                type:"post",
                url: convertRequestURL("user/statisticsPage"),
                data:params,
                dataType:"json",
                success: (resp) => {
                    let isError = errorCodeHandle(resp,reject)
                    if(isError) return

                    let data = resp.data
                    resolve(data)
                },
                error(){
                    errorRequestHandle('获取每日数据失败！', reject)
                }
            });
        })
    },
    transactionAnalysisToday(){
        return new Promise( (resolve, reject) => {
            $.ajax({
                type:"post",
                url: convertRequestURL("user/statisticsToday"),
                data:{},
                dataType:"json",
                success: (resp) => {
                    let isError = errorCodeHandle(resp,reject)
                    if(isError) return

                    let data = resp.data
                    resolve(data)
                },
                error(){
                    errorRequestHandle('获取今日数据失败！', reject)
                }
            });
        })
    },
    transactionAnalysisAll(){
        return new Promise( (resolve, reject) => {
            $.ajax({
                type:"post",
                url: convertRequestURL("user/statisticsList"),
                data:{},
                dataType:"json",
                success: (resp) => {
                    let isError = errorCodeHandle(resp,reject)
                    if(isError) return

                    let data = resp.data
                    resolve(data)
                },
                error(){
                    errorRequestHandle('获取历史统计失败！', reject)
                }
            });
        })
    },
    lengdingList(params){
        return new Promise( (resolve, reject) => {
            $.ajax({
                type:"post",
                url: convertRequestURL("getLendingList_admin"),
                data:params,
                dataType:"json",
                success: (resp) => {
                    let isError = errorCodeHandle(resp,reject)
                    if(isError) return

                    let data = resp.data
                    resolve(data)
                },
                error(){
                    errorRequestHandle('获取贷款产品列表失败！', reject)
                }
            });
        })
    },
    downLengding(id){
        return new Promise( (resolve, reject) => {
            $.ajax({
                type:"post",
                url: convertRequestURL("downLending_admin"),
                data:{
                    id:id
                },
                dataType:"json",
                success: (resp) => {
                    let isError = errorCodeHandle(resp,reject)
                    if(isError) return

                    let data = resp.data
                    resolve(data)
                },
                error(){
                    errorRequestHandle('下架贷款产品失败！', reject)
                }
            });
        })
    },
    upLengding(id){
        return new Promise( (resolve, reject) => {
            $.ajax({
                type:"post",
                url: convertRequestURL("upLending_admin"),
                data:{
                    id:id
                },
                dataType:"json",
                success: (resp) => {
                    let isError = errorCodeHandle(resp,reject)
                    if(isError) return

                    let data = resp.data
                    resolve(data)
                },
                error(){
                    errorRequestHandle('上架贷款产品失败！', reject)
                }
            });
        })
    },
    appList(params){
        return new Promise( (resolve, reject) => {
            $.ajax({
                type:"post",
                url: convertRequestURL("pageLendingConfig_admin"),
                data:params,
                dataType:"json",
                success: (resp) => {
                    let isError = errorCodeHandle(resp,reject)
                    if(isError) return

                    let data = resp.data
                    resolve(data)
                },
                error(){
                    errorRequestHandle('获取贷款应用列表失败！', reject)
                }
            });
        })
    },
    saveAppInfo(params){
        return new Promise( (resolve, reject) => {
            $.ajax({
                type:"post",
                url: convertRequestURL("saveLendingConfig_admin"),
                data:params,
                dataType:"json",
                success: (resp) => {
                    let isError = errorCodeHandle(resp,reject)
                    if(isError) return

                    let data = resp.data
                    resolve(data)
                },
                error(){
                    errorRequestHandle('保存贷款应用失败！', reject)
                }
            });
        })
    },
    saveProductInfo(params){
        return new Promise( (resolve, reject) => {
            $.ajax({
                type:"post",
                url: convertRequestURL("saveLending_admin"),
                data:params,
                dataType:"json",
                success: (resp) => {
                    let isError = errorCodeHandle(resp,reject)
                    if(isError) return

                    let data = resp
                    resolve(data)
                },
                error(){
                    errorRequestHandle('保存产品失败！', reject)
                }
            });
        })
    },
    getProductInfo(id){
        return new Promise( (resolve, reject) => {
            $.ajax({
                type:"post",
                url: convertRequestURL("lendingDetail_admin"),
                data:{
                    id:id
                },
                dataType:"json",
                success: (resp) => {
                    let isError = errorCodeHandle(resp,reject)
                    if(isError) return

                    let data = resp.data
                    resolve(data)
                },
                error(){
                    errorRequestHandle('获取产品失败！', reject)
                }
            });
        })
    },
    sortProduct(params){
        return new Promise( (resolve, reject) => {
            $.ajax({
                type:"post",
                url: convertRequestURL("lendingSort_admin"),
                data:params,
                dataType:"json",
                success: (resp) => {
                    let isError = errorCodeHandle(resp,reject)
                    if(isError) return

                    let data = resp.data
                    resolve(data)
                },
                error(){
                    errorRequestHandle('产品排序失败！', reject)
                }
            });
        })
    },
    tagList(){
        return new Promise( (resolve, reject) => {
            $.ajax({
                type:"post",
                url: convertRequestURL("lendTagList"),
                dataType:"json",
                success: (resp) => {
                    let isError = errorCodeHandle(resp,reject)
                    if(isError) return

                    let data = resp.data
                    resolve(data)
                },
                error(){
                    errorRequestHandle('获取标签列表失败！', reject)
                }
            });
        })
    },
    borrowCount(){
        return new Promise( (resolve, reject) => {
            $.ajax({
                type:"get",
                url: convertRequestURL("backstage/findBorrowCountRecommend"),
                dataType:"json",
                success: (resp) => {
                    let isError = errorCodeHandle(resp,reject)
                    if(isError) return

                    let data = resp.data
                    resolve(data)
                },
                error(){
                    errorRequestHandle('获取借款推荐个数失败！', reject)
                }
            });
        })
    },
    lendCount(){
        return new Promise( (resolve, reject) => {
            $.ajax({
                type:"get",
                url: convertRequestURL("backstage/findLendCountRecommend"),
                dataType:"json",
                success: (resp) => {
                    let isError = errorCodeHandle(resp,reject)
                    if(isError) return

                    let data = resp.data
                    resolve(data)
                },
                error(){
                    errorRequestHandle('获取出借推荐个数失败！', reject)
                }
            });
        })
    },
    setBorrowRecommend(params){
        return new Promise( (resolve, reject) => {
            $.ajax({
                type:"get",
                url: convertRequestURL("backstage/setUserBorrowRecommend"),
                data:params,
                dataType:"json",
                success: (resp) => {
                    let isError = errorCodeHandle(resp,reject)
                    if(isError) return

                    let data = resp.data
                    resolve(data)
                },
                error(){
                    errorRequestHandle('请求设置借款推荐失败！', reject)
                }
            });
        })
    },
    setLendRecommend(params){
        return new Promise( (resolve, reject) => {
            $.ajax({
                type:"get",
                url: convertRequestURL("backstage/setUserLendRecommend"),
                data:params,
                dataType:"json",
                success: (resp) => {
                    let isError = errorCodeHandle(resp,reject)
                    if(isError) return

                    let data = resp.data
                    resolve(data)
                },
                error(){
                    errorRequestHandle('请求设置出借推荐失败！', reject)
                }
            });
        })
    },
    delBorrowRecommend(params){
        return new Promise( (resolve, reject) => {
            $.ajax({
                type:"get",
                url: convertRequestURL("backstage/delUserBorrowRecommend"),
                data:params,
                dataType:"json",
                success: (resp) => {
                    let isError = errorCodeHandle(resp,reject)
                    if(isError) return

                    let data = resp.data
                    resolve(data)
                },
                error(){
                    errorRequestHandle('请求取消借款推荐失败！', reject)
                }
            });
        })
    },
    delLendRecommend(params){
        return new Promise( (resolve, reject) => {
            $.ajax({
                type:"get",
                url: convertRequestURL("backstage/delUserLendRecommend"),
                data:params,
                dataType:"json",
                success: (resp) => {
                    let isError = errorCodeHandle(resp,reject)
                    if(isError) return

                    let data = resp.data
                    resolve(data)
                },
                error(){
                    errorRequestHandle('请求取消出借推荐失败！', reject)
                }
            });
        })
    },
    publishMessage(params){
        return new Promise( (resolve, reject) => {
            $.ajax({
                type:"post",
                url: convertRequestURL("backstage/publishMessage"),
                data:params,
                dataType:"json",
                success: (resp) => {
                    let isError = errorCodeHandle(resp,reject)
                    if(isError) return

                    let data = resp.data
                    resolve(data)
                },
                error(){
                    errorRequestHandle('请求发布消息失败！', reject)
                }
            });
        })
    },
    publishSms(params){
        return new Promise( (resolve, reject) => {
            $.ajax({
                type:"post",
                url: convertRequestURL("backstage/publishSms"),
                data:params,
                dataType:"json",
                success: (resp) => {
                    let isError = errorCodeHandle(resp,reject)
                    if(isError) return

                    let data = resp.data
                    resolve(data)
                },
                error(){
                    errorRequestHandle('请求发布短信失败！', reject)
                }
            });
        })
    },
    showNotice(params){
        return new Promise( (resolve, reject) => {
            $.ajax({
                type:"post",
                url: convertRequestURL("backstage/showNotice"),
                data:params,
                dataType:"json",
                success: (resp) => {
                    let isError = errorCodeHandle(resp,reject)
                    if(isError) return

                    let data = resp.data
                    resolve(data)
                },
                error(){
                    errorRequestHandle('请求显示公告失败！', reject)
                }
            });
        })
    },
    publishNotice(params){
        return new Promise( (resolve, reject) => {
            $.ajax({
                type:"post",
                data:params,
                url: convertRequestURL("backstage/publishNotice"),
                dataType:"json",
                success: (resp) => {
                    let isError = errorCodeHandle(resp,reject)
                    if(isError) return

                    let data = resp.data
                    resolve(data)
                },
                error(){
                    errorRequestHandle('请求发布公告失败！', reject)
                }
            });
        })
    },
    weixinQR(params){
        return new Promise( (resolve, reject) => {
            $.ajax({
                type:"post",
                data:params,
                url: convertRequestURL("backstage/getChannelUrl"),
                dataType:"json",
                success: (resp) => {
                    let isError = errorCodeHandle(resp,reject)
                    if(isError) return

                    let data = resp.data
                    resolve(data)
                },
                error(){
                    errorRequestHandle('请求微信渠道失败！', reject)
                }
            });
        })
    },
    receipt(params){
        return new Promise( (resolve, reject) => {
            $.ajax({
                type:"get",
                data:params,
                url: convertRequestURL("backstage/receipt"),
                dataType:"json",
                success: (resp) => {
                    let isError = errorCodeHandle(resp,reject)
                    if(isError) return

                    let data = resp.data
                    resolve(data)
                },
                error(){
                    errorRequestHandle('请求补借条列表失败！', reject)
                }
            });
        })
    },
    test(){
        return new Promise( (resolve, reject) => {
            $.ajax({
                type:"post",
                url: convertRequestURL("user/statisticsOriginData"),
                data:{},
                dataType:"json",
                success: (resp) => {
                    let isError = errorCodeHandle(resp,reject)
                    if(isError) return

                    let data = resp
                    resolve(data)
                },
                error(){
                    errorRequestHandle('获取历史统计失败！', reject)
                }
            });
        })
    },
  freezeType(params){
    return new Promise( (resolve, reject) => {
      $.ajax({
        type:"get",
        url: convertRequestURL("backstage/freezeType"),
        data:params,
        dataType:"json",
        success: (resp) => {
          let isError = errorCodeHandle(resp,reject)
          if(isError) return

          let data = resp
          resolve(data)
        },
        error(){
          errorRequestHandle('获取历史统计失败！', reject)
        }
      });
    })
  },
  freezeUser(params){
  return new Promise( (resolve, reject) => {
    $.ajax({
      type:"post",
      url: convertRequestURL("backstage/freezeUser"),
      data:params,
      dataType:"json",
      success: (resp) => {
        let isError = errorCodeHandle(resp,reject)
        if(isError) return

        let data = resp.data
        resolve(data)
      },
      error(){
        errorRequestHandle('请求冻结用户失败！', reject)
      }
    });
  })
},
  systemCloseDealOrder(params){
    return new Promise( (resolve, reject) => {
      $.ajax({
        type:"get",
        url: convertRequestURL("backstage/systemCloseDealOrder"),
        data:params,
        dataType:"json",
        success: (resp) => {
          let isError = errorCodeHandle(resp,reject)
          if(isError) return

          let data = resp.data
          resolve(data)
        },
        error(){
          errorRequestHandle('请求冻结用户失败！', reject)
        }
      });
    })
  },
    lendingAndBorrowing(params){
     return new Promise( (resolve, reject) => {
      $.ajax({
        type:"get",
        url: convertRequestURL("backstage/lendingAndBorrowing"),
        data:params,
        dataType:"json",
        success: (resp) => {
          let isError = errorCodeHandle(resp,reject)
          if(isError) return

          let data = resp.data
          resolve(data)
        },
        error(){
          errorRequestHandle('请求冻结用户失败11！', reject)
        }
      });
    })
  },
    // 请求用户借款
  freezeUserBorrow(params){
    return new Promise( (resolve, reject) => {
      $.ajax({
        type:"post",
        url: convertRequestURL("backstage/freezeUserBorrow"),
        data:params,
        dataType:"json",
        success: (resp) => {
          let isError = errorCodeHandle(resp,reject)
          if(isError) return

          let data = resp.data
          resolve(data)
        },
        error(){
          errorRequestHandle('请求冻结用户失败11！', reject)
        }
      });
    })
  },
  relieveFreezeUserBorrow(params){
    return new Promise( (resolve, reject) => {
      $.ajax({
        type:"post",
        url: convertRequestURL("backstage/relieveFreezeUserBorrow"),
        data:params,
        dataType:"json",
        success: (resp) => {
          let isError = errorCodeHandle(resp,reject)
          if(isError) return

          let data = resp.data
          resolve(data)
        },
        error(){
          errorRequestHandle('请求冻结用户失败11！', reject)
        }
      });
    })
  },
  // 请求用户出借
  //   backstage/freezeUserlend
  freezeUserlend(params){
    return new Promise( (resolve, reject) => {
      $.ajax({
        type:"post",
        url: convertRequestURL("backstage/freezeUserlend"),
        data:params,
        dataType:"json",
        success: (resp) => {
          let isError = errorCodeHandle(resp,reject)
          if(isError) return

          let data = resp.data
          resolve(data)
        },
        error(){
          errorRequestHandle('请求冻结用户失败11！', reject)
        }
      });
    })
  },
    // backstage/relieveFreezeUserlend
  relieveFreezeUserlend(params){
    return new Promise( (resolve, reject) => {
      $.ajax({
        type:"post",
        url: convertRequestURL("backstage/relieveFreezeUserlend"),
        data:params,
        dataType:"json",
        success: (resp) => {
          let isError = errorCodeHandle(resp,reject)
          if(isError) return

          let data = resp.data
          resolve(data)
        },
        error(){
          errorRequestHandle('请求冻结用户失败11！', reject)
        }
      });
    })
  },
// 冻结成交订单
freezeDealOrder(params){
    return new Promise( (resolve, reject) => {
      $.ajax({
        type:"get",
        url: convertRequestURL("backstage/freezeDealOrder"),
        data:params,
        dataType:"json",
        success: (resp) => {
          let isError = errorCodeHandle(resp,reject)
          if(isError) return

          let data = resp.data
          resolve(data)
        },
        error(){
          errorRequestHandle('请求冻结用户失败11！', reject)
        }
      });
    })
  },
// 解除冻结成交订单
relieveFreezeDealOrder(params){
    return new Promise( (resolve, reject) => {
      $.ajax({
        type:"get",
        url: convertRequestURL("backstage/relieveFreezeDealOrder"),
        data:params,
        dataType:"json",
        success: (resp) => {
          let isError = errorCodeHandle(resp,reject)
          if(isError) return

          let data = resp.data
          resolve(data)
        },
        error(){
          errorRequestHandle('请求冻结用户失败11！', reject)
        }
      });
    })
  },
// 抽取订单金额
orderDebit(params){
    return new Promise( (resolve, reject) => {
      $.ajax({
        type:"get",
        url: convertRequestURL("backstage/orderDebit"),
        data:params,
        dataType:"json",
        success: (resp) => {
          let isError = errorCodeHandle(resp,reject)
          if(isError) return

          let data = resp.data
          resolve(data)
        },
        error(){
          errorRequestHandle('请求冻结用户失败11！', reject)
        }
      });
    })
  },
// 冻结成交补借条
freezeDealReceipt(params){
    return new Promise( (resolve, reject) => {
      $.ajax({
        type:"get",
        url: convertRequestURL("backstage/freezeDealReceipt"),
        data:params,
        dataType:"json",
        success: (resp) => {
          let isError = errorCodeHandle(resp,reject)
          if(isError) return

          let data = resp.data
          resolve(data)
        },
        error(){
          errorRequestHandle('请求冻结用户失败11！', reject)
        }
      });
    })
  },
// 解除冻结成交补借条
relieveFreezeDealReceipt(params){
    return new Promise( (resolve, reject) => {
      $.ajax({
        type:"get",
        url: convertRequestURL("backstage/relieveFreezeDealReceipt"),
        data:params,
        dataType:"json",
        success: (resp) => {
          let isError = errorCodeHandle(resp,reject)
          if(isError) return

          let data = resp.data
          resolve(data)
        },
        error(){
          errorRequestHandle('请求冻结用户失败11！', reject)
        }
      });
    })
  },
// /backstage/lendUserList
    lendUserList(params){
        // return
        return new Promise( (resolve, reject) => {
        $.ajax({
            type:"get",
            url: convertRequestURL("/backstage/lendUserList"),
            data:params,
            dataType:"json",
            success: (resp) => {
            let isError = errorCodeHandle(resp,reject)
            if(isError) return

            let data = resp.data
            resolve(data)
            },
            error(){
            errorRequestHandle('请求冻结用户失败11！', reject)
            }
        });
        })
    },
    // /backstage/borrowUserList
      borrowUserList(params){
        return new Promise( (resolve, reject) => {
        $.ajax({
            type:"get",
            url: convertRequestURL("/backstage/borrowUserList"),
            data:params,
            dataType:"json",
            success: (resp) => {
            let isError = errorCodeHandle(resp,reject)
            if(isError) return

            let data = resp.data
            resolve(data)
            },
            error(){
            errorRequestHandle('请求冻结用户失败11！', reject)
            }
        });
        })
    },
      showImRoute(params){
        return new Promise( (resolve, reject) => {
        $.ajax({
            type:"post",
            url: convertRequestURL("/backstage/showImRoute"),
            data:params,
            dataType:"json",
            success: (resp) => {
            let isError = errorCodeHandle(resp,reject)
            if(isError) return

            let data = resp.data
            resolve(data)
            },
            error(){
            errorRequestHandle('请求冻结用户失败11！', reject)
            }
        });
        })
    },
     showImLoginOrLogout(params){
        return new Promise( (resolve, reject) => {
        $.ajax({
            type:"post",
            url: convertRequestURL("/backstage/showImLoginOrLogout"),
            data:params,
            dataType:"json",
            success: (resp) => {
            let isError = errorCodeHandle(resp,reject)
            if(isError) return

            let data = resp.data
            resolve(data)
            },
            error(){
            errorRequestHandle('请求冻结用户失败11！', reject)
            }
        });
        })
    },
      urgeTools(params){
        return new Promise( (resolve, reject) => {
        $.ajax({
            type:"get",
            url: convertRequestURL("/backstage/urgeTools"),
            data:params,
            dataType:"json",
            success: (resp) => {
            let isError = errorCodeHandle(resp,reject)
            if(isError) return

            let data = resp.data
            resolve(data)
            },
            error(){
            errorRequestHandle('请求冻结用户失败11！', reject)
            }
        });
        })
    },
    addDataList(){
        return new Promise( (resolve, reject) => {
        $.ajax({
            type:"get",
            url: convertRequestURL("/backstage/addDataList"),
            dataType:"json",
            success: (resp) => {
            let isError = errorCodeHandle(resp,reject)
            if(isError) return

            let data = resp.data
            resolve(data)
            },
            error(){
            errorRequestHandle('请求添加每日数据失败！', reject)
            }
        });
        })
    },
    infoToExcel(){
        return new Promise( (resolve, reject) => {
            $.ajax({
                type:"get",
                url: convertRequestURL("/backstage/infoToExcel"),
                dataType:"json",
                success: (resp) => {
                let isError = errorCodeHandle(resp,reject)
                if(isError) return

                let data = resp.data
                    resolve(data)
                },
                error(){
                    errorRequestHandle('请求导出信息到excel失败！', reject)
                }
            });
        })
    },
    creditReportToExcel(){
        return new Promise( (resolve, reject) => {
            $.ajax({
                type:"get",
                url: convertRequestURL("/backstage/creditReportToExcel"),
                dataType:"json",
                success: (resp) => {
                let isError = errorCodeHandle(resp,reject)
                if(isError) return

                let data = resp.data
                    resolve(data)
                },
                error(){
                    errorRequestHandle('请求导出信息到excel失败！', reject)
                }
            });
        })
    },
       
    // 分配
      lendUserExpand(params){
        return new Promise( (resolve, reject) => {
            $.ajax({
                type:"post",
                url: convertRequestURL("/backstage/lendUserExpand"),
                dataType:"json",
                data:params,
                success: (resp) => {
                let isError = errorCodeHandle(resp,reject)
                if(isError) return

                let data = resp.data
                    resolve(data)
                },
                error(){
                    errorRequestHandle('请求导出信息到excel失败！', reject)
                }
            })
        })
    },
     setBizRoleAgain(params){
        return new Promise( (resolve, reject) => {
        $.ajax({
            type:"post",
            url: convertRequestURL("/backstage/setBizRoleAgain"),
            dataType:"json",
            data:params,
            success: (resp) => {
            let isError = errorCodeHandle(resp,reject)
            if(isError) return

            let data = resp.data
            resolve(data)
            },
            error(){
            errorRequestHandle('请求添加每日数据失败！', reject)
            }
        });
        })
    },
    cashOutConfirm(params){
        return new Promise( (resolve, reject) => {
        $.ajax({
            type:"post",
            url: convertRequestURL("/backstage/cashOutConfirm"),
            dataType:"json",
            data:params,
            success: (resp) => {
            let isError = errorCodeHandle(resp,reject)
            if(isError) return

            let data = resp.data
            resolve(data)
            },
            error(){
            errorRequestHandle('请求添加每日数据失败！', reject)
            }
        });
        })
    },
    expandUserList(params){
        return new Promise( (resolve, reject) => {
        $.ajax({
            type:"get",
            url: convertRequestURL("/backstage/expandUserList"),
            dataType:"json",
            data:params,
            success: (resp) => {
            let isError = errorCodeHandle(resp,reject)
            if(isError) return

            let data = resp.data
            resolve(data)
            },
            error(){
            errorRequestHandle('请求失败！', reject)
            }
        });
        })
    },
    expandUserExpand(params){
        return new Promise( (resolve, reject) => {
        $.ajax({
            type:"post",
            url: convertRequestURL("/backstage/expandUserExpand"),
            dataType:"json",
            data:params,
            success: (resp) => {
            let isError = errorCodeHandle(resp,reject)
            if(isError) return

            let data = resp.data
            resolve(data)
            },
            error(){
            errorRequestHandle('请求失败！', reject)
            }
        });
        })
    },
    blacklistList(params){
        return new Promise( (resolve, reject) => {
        $.ajax({
            type:"get",
            url: convertRequestURL("/backstage/blacklistList"),
            dataType:"json",
            data:params,
            success: (resp) => {
            let isError = errorCodeHandle(resp,reject)
            if(isError) return

            let data = resp.data
            resolve(data)
            },
            error(){
            errorRequestHandle('请求失败！', reject)
            }
        });
        })
    },
    blacklistDetail(params){
        return new Promise( (resolve, reject) => {
        $.ajax({
            type:"get",
            url: convertRequestURL("/backstage/blacklistDetail"),
            dataType:"json",
            data:params,
            success: (resp) => {
            let isError = errorCodeHandle(resp,reject)
            if(isError) return

            let data = resp.data
            resolve(data)
            },
            error(){
            errorRequestHandle('请求失败！', reject)
            }
        });
        })
    },
    blacklistdel(params){
        return new Promise( (resolve, reject) => {
        $.ajax({
            type:"get",
            url: convertRequestURL("/backstage/blacklistdel"),
            dataType:"json",
            data:params,
            success: (resp) => {
            let isError = errorCodeHandle(resp,reject)
            if(isError) return

            let data = resp.data
            resolve(data)
            },
            error(){
            errorRequestHandle('请求失败！', reject)
            }
        });
        })
    },
    //新的冻结
    blacklistFreeze(params){
        return new Promise( (resolve, reject) => {
        $.ajax({
            type:"get",
            url: convertRequestURL("/backstage/blacklistFreeze"),
            dataType:"json",
            data:params,
            success: (resp) => {
            let isError = errorCodeHandle(resp,reject)
            if(isError) return

            let data = resp.data
            resolve(data)
            },
            error(){
            errorRequestHandle('请求失败！', reject)
            }
        });
        })
    },
    blacklistUpload(params){
        return new Promise( (resolve, reject) => {
        $.ajax({
            type:"POST",
            url: convertRequestURL("/backstage/blacklistUpload"),
            dataType:"json",
            data:params,
            success: (resp) => {
            let isError = errorCodeHandle(resp,reject)
            if(isError) return

            let data = resp.data
            resolve(data)
            },
            error(){
            errorRequestHandle('请求失败！', reject)
            }
        });
        })
    },
    //新增用户点击
    scoreUseDetail(params){
        return new Promise( (resolve, reject) => {
        $.ajax({
            type:"GET",
            url: convertRequestURL("/backstage/scoreUseDetail"),
            dataType:"json",
            data:params,
            success: (resp) => {
            let isError = errorCodeHandle(resp,reject)
            if(isError) return

            let data = resp.data
            resolve(data)
            },
            error(){
            errorRequestHandle('请求失败！', reject)
            }
        });
        })
    },
    // 图片转换接口
    imgintoExcel(typeYou,file){
        let formData = new FormData();
        formData.append('file', file);
        return new Promise( (resolve, reject) => {
        $.ajax({
            type:"post",
            url: convertRequestURL(`backstage/upload/?type=${typeYou}`,"devision"),
            global:false,
            cache: false,
            contentType: false,   
            processData: false,
            data:formData,
            success: (resp) => {
            let isError = errorCodeHandle(resp,reject)
            if(isError) return
    
            let data = resp.data
            resolve(data)
            },
            error(){
            errorRequestHandle('请求失败！', reject)
            }
        });
        })
    },
    // logout/LoginPassword
    logoutLoginPassword(params){
        return new Promise( (resolve, reject) => {
        $.ajax({
            type:"POST",
            url: convertRequestURL("logout/LoginPassword"),
            dataType:"json",
            data:params,
            success: (resp) => {
            let isError = errorCodeHandle(resp,reject)
            if(isError) return

            let data = resp.data
            resolve(data)
            },
            error(){
            errorRequestHandle('请求失败！', reject)
            }
        });
        })
    },
    // logout/findUser
    logoutfindUser(params){
        return new Promise( (resolve, reject) => {
        $.ajax({
            type:"POST",
            url: convertRequestURL("logout/findUser"),
            dataType:"json",
            data:params,
            success: (resp) => {
            let isError = errorCodeHandle(resp,reject)
            if(isError) return

            let data = resp.data
            resolve(data)
            },
            error(){
            errorRequestHandle('请求失败！', reject)
            }
        });
        })
    },
    // logout/logoutUser
    logoutlogoutUser(params){
        return new Promise( (resolve, reject) => {
        $.ajax({
            type:"POST",
            url: convertRequestURL("logout/logoutUser"),
            dataType:"json",
            data:params,
            success: (resp) => {
            let isError = errorCodeHandle(resp,reject)
            if(isError) return

            let data = resp.data
            resolve(data)
            },
            error(){
            errorRequestHandle('请求失败！', reject)
            }
        });
        })
    },
}

export {
    allApi,
    loginApi
 }
