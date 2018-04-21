<template>
  <div id='user-index'>
    <h1 class="card-title">
      <span>用户</span>
    </h1>
    <!-- <div class="user-data loading-min-height">
        <loading v-if='loading_count' mode='full'></loading>
        <transition name='fade'>
            <ul class="user-data__list" v-if='hasUserCount'>
                <li class="user-data__item">
                    <span> {{ userCount.newCount }} </span>
                    <p>今日新增用户</p>
                </li>
                <li class="user-data__item">
                    <span> {{ userCount.totalCount }} </span>
                    <p>总用户数</p>
                </li>
            </ul>
        </transition>
    </div> -->

    <tab-box>
      <tab name='全部用户'>
        <div class="order-form form-table">
          <div class="form-content">
            <div class="form-item">
              <div class="form-item__key">手机号</div>
              <div class="form-item__value">
                <input type="tel" placeholder="请输入手机号码" v-model='mobile'>
              </div>
            </div>
            <div class="form-item">
              <div class="form-item__key">姓名</div>
              <div class="form-item__value">
                <input type="tel" placeholder="请输入姓名" v-model='name'>
              </div>
            </div>
            <div class="form-item">
              <div class="form-item__key">渠道</div>
              <div class="form-item__value">
                <input type="tel" placeholder="请输入渠道" v-model='channel'>
              </div>
            </div>
            <div class="form-item">
              <div class="form-item__key">排序规则</div>
              <span class="form-item__value">
                                <select-group v-model='sort'>
                                    <select-option value='' text='默认'></select-option>
                                    <select-option value='0' text='正在发布的求借款次数'></select-option>
                                    <select-option value='1' text='借款成功率'></select-option>
                                    <select-option value='2' text='借款申请次数'></select-option>
                                    <select-option value='3' text='正在发布的出借次数'></select-option>
                                    <select-option value='4' text='出借通过率'></select-option>
                                    <select-option value='5' text='出借被申请次数'></select-option>
                                </select-group>
                            </span>
            </div>
            <div class="form-item">
              <div class="form-item__key">排序顺序</div>
              <span class="form-item__value">
                                <select-group v-model='sequence'>
                                    <select-option value='0' text='正序'></select-option>
                                    <select-option value='1' text='倒序'></select-option>
                                </select-group>
                            </span>
            </div>
            <div class="form-item">
              <div class="form-item__key">开始日期</div>
              <div class="form-item__value">
                <date-picker
                  v-model="dateFrom"
                  color='#757575'
                  :placeholder='`选择日期`'></date-picker>
              </div>
            </div>
            <div class="form-item">
              <div class="form-item__key">结束日期</div>
              <div class="form-item__value">
                <date-picker
                  v-model="dateTo"
                  color='#757575'
                  :placeholder='`选择日期`'></date-picker>
              </div>
            </div>
          </div>
          <div @click='getList(1)' class="form-button"><span class="form-button__item button">搜索</span></div>
        </div>
        <div class="loading-min-height">
          <loading v-if='loading' mode='full'></loading>
          <transition name='fade'>
            <p class='no-data' v-if='!loading && !records.length'>暂无数据</p>
            <div class="table-list" v-if='records.length'>
              <table>
                <thead class="table-list__head">
                <tr>
                  <th>手机号</th>
                  <th>姓名</th>
                  <th>正在发布求借款次数</th>
                  <th>申请率</th>
                  <th>申请人数</th>
                  <th>正在发布出借次数</th>
                  <th>通过率</th>
                  <th>被申请次数</th>
                  <th>当前信用报告状态</th>
                  <th>渠道</th>
                  <th>推荐位置</th>
                  <th>操作</th>
                </tr>
                </thead>
                <tbody class='table-list__body have-border'>
                <tr v-for='item in records'>
                  <td>{{ item.mobile || placeholder }}</td>
                  <td>{{ item.realName || placeholder }}</td>
                  <td>
                    {{ item.countBorrowing || placeholder }}
                    <span v-if='item.ispublic === false'> (未公开) </span>
                  </td>
                  <td>{{ Math.round(item.borrowSuccessRate * 100).toFixed(2) }}%</td>
                  <td>{{ item.countApplyBorrow || placeholder }}</td>
                  <td>{{ item.countLending || placeholder }}</td>
                  <td>{{ Math.round(item.lendPassRate * 100).toFixed(2) }}%</td>
                  <td>{{ item.lendApplyCount || placeholder }}</td>
                  <td>{{ item.creditReportStatusStr || placeholder }}</td>
                  <td>{{ item.channel || placeholder }}</td>
                  <td>
                    <div>小b：{{ item.lendRecommendPosition || placeholder }} </div>
                    <div>小c：{{ item.borrowRecommendPosition || placeholder }} </div>
                  </td>
                  <td>
                    <div class='option-box'>
                                                <span class='option-button'
                                                      v-if='item.isRecommend'
                                                      @click='showModalCancleRecommend(item)'>取消推荐</span>
                      <span class='option-button'
                            v-else
                            @click='showModalRecommend(item)'>推荐</span>
                      <span class='option-button'
                            :class="{'event-disabled disabled' : !item.isRecommend}"
                            @click='showModalRecommend(item)'>推荐设置</span>
                      <span class='option-button'
                            @click='showModalFreeze(item)'>冻结</span>
                      <span class='option-button' @click='showModalDetail(item)'>详细</span>
                      <span class='option-button' @click='cfo(item)'>发布的借款信息</span>
                    </div>
                  </td>
                </tr>
                </tbody>
              </table>
              <pagination
                :current-page='listInfo.pageNum'
                :total-page='listInfo.totalPage'
                @pageChange='getList'></pagination>
            </div>
          </transition>
        </div>
      </tab>
      <tab name='小b推荐'>
        <div class="order-form form-table">
          <div class="form-content">
            <div class="form-item">
              <div class="form-item__key">手机号</div>
              <div class="form-item__value">
                <input type="tel" placeholder="请输入手机号码" v-model='mobile1'>
              </div>
            </div>
            <div class="form-item">
              <div class="form-item__key">姓名</div>
              <div class="form-item__value">
                <input type="tel" placeholder="请输入姓名" v-model='name1'>
              </div>
            </div>
            <div class="form-item">
              <div class="form-item__key">渠道</div>
              <div class="form-item__value">
                <input type="tel" placeholder="请输入渠道" v-model='channel1'>
              </div>
            </div>
            <div class="form-item">
              <div class="form-item__key">开始日期</div>
              <div class="form-item__value">
                <date-picker
                  v-model="dateFrom1"
                  color='#757575'
                  :placeholder='`选择日期`'></date-picker>
              </div>
            </div>
            <div class="form-item">
              <div class="form-item__key">结束日期</div>
              <div class="form-item__value">
                <date-picker
                  v-model="dateTo1"
                  color='#757575'
                  :placeholder='`选择日期`'></date-picker>
              </div>
            </div>
          </div>
          <div @click='getList1(1)' class="form-button"><span class="form-button__item button">搜索</span></div>
        </div>
        <div class="loading-min-height">
          <loading v-if='loading1' mode='full'></loading>
          <transition name='fade'>
            <p class='no-data' v-if='!loading1 && !records1.length'>暂无数据</p>
            <div class="table-list" v-if='records1.length'>
              <table>
                <thead class="table-list__head">
                <tr>
                  <th>推荐位置</th>
                  <th>手机号</th>
                  <th>姓名</th>
                  <th>正在发布求借款次数</th>
                  <th>正在发布出借次数</th>
                  <th>当前信用报告状态</th>
                  <th>渠道</th>
                  <th>操作</th>
                </tr>
                </thead>
                <tbody class='table-list__body have-border'>
                <tr v-for='item in records1'>
                  <td>{{ item.lendRecommendPosition || placeholder }}</td>
                  <td>{{ item.mobile || placeholder }}</td>
                  <td>{{ item.realName || placeholder }}</td>
                  <td>{{ item.countBorrowing || placeholder }}</td>
                  <td>{{ item.countLending || placeholder }}</td>
                  <td>{{ item.creditReportStatusStr || placeholder }}</td>
                  <td>{{ item.channel || placeholder }}</td>
                  <td>
                    <div class='option-box'>
                                                <span class='option-button'
                                                      v-if='item.isRecommend'
                                                      @click='showModalCancleRecommend(item)'>取消推荐</span>
                      <span class='option-button'
                            v-else
                            @click='showModalRecommend(item)'>推荐</span>
                      <span class='option-button'
                            :class="{'event-disabled disabled' : !item.isRecommend}"
                            @click='showModalRecommend(item)'>推荐设置</span>
                      <span class='option-button' @click='showModalDetail(item)'>详细</span>
                    </div>
                  </td>
                </tr>
                </tbody>
              </table>
              <pagination
                :current-page='listInfo1.pageNum'
                :total-page='listInfo1.totalPage'
                @pageChange='getList1'></pagination>
            </div>
          </transition>
        </div>
      </tab>
      <tab name='小c推荐'>
        <div class="order-form form-table">
          <div class="form-content">

            <div class="form-item">
              <div class="form-item__key">手机号</div>
              <div class="form-item__value">
                <input type="tel" placeholder="请输入手机号码" v-model='mobile2'>
              </div>
            </div>

            <div class="form-item">
              <div class="form-item__key">姓名</div>
              <div class="form-item__value">
                <input type="tel" placeholder="请输入姓名" v-model='name2'>
              </div>
            </div>

            <div class="form-item">
              <div class="form-item__key">渠道</div>
              <div class="form-item__value">
                <input type="tel" placeholder="请输入渠道" v-model='channel2'>
              </div>
            </div>

            <div class="form-item">
              <div class="form-item__key">开始日期</div>
              <div class="form-item__value">
                <date-picker
                  v-model="dateFrom2"
                  color='#757575'
                  :placeholder='`选择日期`'></date-picker>
              </div>
            </div>

            <div class="form-item">
              <div class="form-item__key">结束日期</div>
              <div class="form-item__value">
                <date-picker
                  v-model="dateTo2"
                  color='#757575'
                  :placeholder='`选择日期`'></date-picker>
              </div>
            </div>

          </div>
          <div @click='getList2(1)' class="form-button"><span class="form-button__item button">搜索</span></div>
        </div>
        <div class="loading-min-height">
          <loading v-if='loading2' mode='full'></loading>
          <transition name='fade'>
            <p class='no-data' v-if='!loading2 && !records2.length'>暂无数据</p>
            <div class="table-list" v-if='records2.length'>
              <table>
                <thead class="table-list__head">
                <tr>
                  <th>推荐位置</th>
                  <th>手机号</th>
                  <th>姓名</th>
                  <th>正在发布求借款次数</th>
                  <th>正在发布出借次数</th>
                  <th>当前信用报告状态</th>
                  <th>渠道</th>
                  <th>操作</th>
                </tr>
                </thead>
                <tbody class='table-list__body have-border'>
                <tr v-for='item in records2'>
                  <td>{{ item.borrowRecommendPosition || placeholder }}</td>
                  <td>{{ item.mobile || placeholder }}</td>
                  <td>{{ item.realName || placeholder }}</td>
                  <td>{{ item.countBorrowing || placeholder }}</td>
                  <td>{{ item.countLending || placeholder }}</td>
                  <td>{{ item.creditReportStatusStr || placeholder }}</td>
                  <td>{{ item.channel || placeholder }}</td>
                  <td>
                    <div class='option-box'>
                                                <span class='option-button'
                                                      v-if='item.isRecommend'
                                                      @click='showModalCancleRecommend(item)'>取消推荐</span>
                      <span class='option-button'
                            v-else
                            @click='showModalRecommend(item)'>推荐</span>
                      <span class='option-button'
                            :class="{'event-disabled disabled' : !item.isRecommend}"
                            @click='showModalRecommend(item)'>推荐设置</span>
                      <span class='option-button' @click='showModalDetail(item)'>详细</span>
                    </div>
                  </td>
                </tr>
                </tbody>
              </table>
              <pagination
                :current-page='listInfo2.pageNum'
                :total-page='listInfo2.totalPage'
                @pageChange='getList2'></pagination>
            </div>
          </transition>
        </div>
      </tab>
      <tab name='小b用户'>
          <!--小b用户  -->
          <div class="order-form form-table">
          <div class="form-content">

            <div class="form-item">
              <div class="form-item__key">手机号</div>
              <div class="form-item__value">
                <input type="tel" placeholder="请输入手机号码" v-model='mobile3'>
              </div>
            </div>

            <div class="form-item">
              <div class="form-item__key">姓名</div>
              <div class="form-item__value">
                <input type="tel" placeholder="请输入姓名" v-model='name3'>
              </div>
            </div>

            <div class="form-item">
              <div class="form-item__key">渠道</div>
              <div class="form-item__value">
                <input type="tel" placeholder="请输入渠道" v-model='channel3'>
              </div>
            </div>

            <div class="form-item">
              <div class="form-item__key">开始日期</div>
              <div class="form-item__value">
                <date-picker
                  v-model="dateFrom3"
                  color='#757575'
                  :placeholder='`选择日期`'></date-picker>
              </div>
            </div>

            <div class="form-item">
              <div class="form-item__key">结束日期</div>
              <div class="form-item__value">
                <date-picker
                  v-model="dateTo3"
                  color='#757575'
                  :placeholder='`选择日期`'></date-picker>
              </div>
            </div>

            <div class="form-item">
              <div class="form-item__key">排序顺序</div>
              <div class="form-item__value">
                <select v-model="sort1">
                  <option value="">不选</option>
                  <option value="1">充值金额排序</option>
                  <option value="2">充值次数排序</option>
                  <option value="3">累计消耗排序</option>
                  <option value="4">充值时间排序</option>
                </select>
              </div>
            </div>
            
            <div class="form-item">
              <div class="form-item__key">拓展经理</div>
              <div class="form-item__value">
                <select v-model="sort3">
                  <option value="">全部</option>
                  <option value="未分配">未分配</option>
                  <option value="陈晓启">陈晓启</option>
                  <option value="韩亮">韩亮</option>
                  <option value="解红权">解红权</option>
                  <option value="王安">王安</option>
                  <option value="雷宏">雷宏</option>
                  <option value="异常">异常</option>
                  <option value="异常-已处理">异常-已处理</option>
                </select>
              </div>
            </div>
          </div>
          <div @click='getList3(1)' class="form-button"><span class="form-button__item button">搜索</span></div>
        </div>
        <div class="total-count">
                        <div class="total-count__item">
                             <p>{{listInfo3.countBrowseTimes ||placeholder}}</p> 
                            <span>累计浏览</span>
                        </div>
                        <div class="total-count__item">
                             <p>{{listInfo3.countScoreChargeTimes ||placeholder}}</p> 
                            <span>充值次数</span>
                        </div>
                        <div class="total-count__item">
                             <p>{{listInfo3.countUseScoreTimes ||placeholder}}</p> 
                            <span>累计消耗</span>
                        </div>
                         <div class="total-count__item">
                             <p>{{listInfo3.scoreChargeAmountAll |toYuan}}</p> 
                            <span>充值金额</span>
                        </div>
                        <div class="total-count__item">
                             <p>{{listInfo3.scoreChargeUserCountAll ||placeholder}}</p> 
                            <span>充值人数</span>
                        </div>
          </div>
           <div class="loading-min-height">
             <loading v-if='loading2' mode='full'></loading>
                 <transition name='fade'>
                    <p class='no-data' v-if='!loading2 && !records3.length'>暂无数据</p>
                    <div class="table-list" v-if='records3.length'>
                      <table  width="100%">
                            <thead class="table-list__head">
                            <tr>
                              <th>推荐位置</th>
                              <th>手机号</th>
                              <th>姓名</th>
                              <th>累计充值金额</th>
                              <th>充值次数</th>
                              <th>浏览次数</th>
                              <th>累计消耗</th>
                              <th>最近充值时间</th>
                              <th>渠道号</th>
                              <th>是否推荐</th>
                              <th>拓展经理</th>
                              <th>操作</th>
                            </tr>
                            </thead>
                            <tbody class='table-list__body have-border'>
                                  <tr v-for='(item,index) in records3'>
                                      <td>{{item.priorityForLend ||placeholder}}</td>
                                      <td>{{item.mobile ||placeholder}}</td>
                                      <td>{{item.realName ||placeholder}}</td>
                                      <td>{{item.scoreChargeAmount |toYuan}}元</td>
                                      <td>{{item.scoreChargeTimes ||placeholder}}</td>
                                      <td>{{item.browseTimes ||placeholder}}</td>
                                      <td>{{item.useScoreTimes ||placeholder}}</td>
                                      <td>{{timestampToDate(item.lastChargeTime) ||placeholder}}</td>
                                      <td>{{item.channel ||placeholder}}</td>
                                      <td>{{insure(item.isRecommend) ||placeholder}}</td>
                                      <td>{{item.expandManager ||placeholder}}</td>
                                      <td>
                                        <div class="option-box">
                                          <span class='option-button' style="color:#00b1b3!important;cursor:pointer;" @click='detail_no(item)'>详细</span>
                                          <span class='option-button' style="color:#00b1b3!important;cursor:pointer;" @click='allocation(item,index)'>分配</span>
                                          <span class='option-button' style="color:#00b1b3!important;cursor:pointer;" @click='toggle(item,index)'>切换角色</span>
                                        </div>
                                      </td>
                                  </tr>
                            </tbody>
                          </table>
                              </div>
                        </transition>
                      </div>
                <pagination v-if='listInfo3.pageInfo'
                :current-page='listInfo3.pageInfo.pageNum'
                :total-page='listInfo3.pageInfo.totalPage'
                @pageChange='getList3'></pagination>
      </tab>
      <tab name='小c用户'>
             <div class="order-form form-table">
          <div class="form-content">

            <div class="form-item">
              <div class="form-item__key">手机号</div>
              <div class="form-item__value">
                <input type="tel" placeholder="请输入手机号码" v-model='mobile5'>
              </div>
            </div>

            <div class="form-item">
              <div class="form-item__key">姓名</div>
              <div class="form-item__value">
                <input type="tel" placeholder="请输入姓名" v-model='name5'>
              </div>
            </div>

            <div class="form-item">
              <div class="form-item__key">渠道</div>
              <div class="form-item__value">
                <input type="tel" placeholder="请输入渠道" v-model='channel5'>
              </div>
            </div>

            <div class="form-item">
              <div class="form-item__key">开始日期</div>
              <div class="form-item__value">
                <date-picker
                  v-model="dateFrom5"
                  color='#757575'
                  :placeholder='`选择日期`'></date-picker>
              </div>
            </div>

            <div class="form-item">
              <div class="form-item__key">结束日期</div>
              <div class="form-item__value">
                <date-picker
                  v-model="dateTo5"
                  color='#757575'
                  :placeholder='`选择日期`'></date-picker>
              </div>
            </div>

            <div class="form-item">
              <div class="form-item__key">排序顺序</div>
              <div class="form-item__value">
                <select v-model="sort2">
                  <option value=""></option>
                  <option value="5">累计被付费</option>
                </select>
              </div>
            </div>
            
          </div>
          <div  class="form-button" @click='getList5(1)'><span class="form-button__item button">搜索</span></div>
        </div>
        <!-- 表格部分 -->
         <div class="loading-min-height">
             <loading v-if='loading2' mode='full'></loading>
               <transition name='fade'>
                 <p class='no-data' v-if='!loading2 && !records3.length'>暂无数据</p>
                  <div class="table-list" v-if='records3.length'>
                      <table  width="100%">
                          <thead class="table-list__head">
                          <tr>
                            <th>推荐位置</th>
                            <th>手机号</th>
                            <th>姓名</th>
                            <th>累计被付费次数</th>
                            <th>发布求借次数</th>
                            <th>渠道号</th>
                            <th>是否推荐</th>
                            <th>操作</th>
                          </tr>
                          </thead>
                          <tbody class='table-list__body have-border'>
                              <tr v-for='(item,index) in records5'>
                                    <td>{{item.priorityForBorrow ||placeholder}}</td> 
                                    <td>{{item.mobile ||placeholder}}</td> 
                                    <td>{{item.realName ||placeholder}}</td> 
                                    <td>{{item.bePaidTimes ||placeholder}}</td> 
                                    <td>{{item.allCountBorrow ||placeholder}}</td> 
                                    <td>{{item.channel ||placeholder}}</td> 
                                    <td>{{insure(item.isRecommend) ||placeholder}}</td> 
                                      <td>
                                      <div class="option-box">
                                        <span class='option-button' style="color:#00b1b3!important;cursor:pointer;"  @click='detail_no2(item)'>详细</span>
                                         <span class='option-button' style="color:#00b1b3!important;cursor:pointer;" @click='toggle1(item,index)'>切换角色</span>
                                      </div>
                                    </td>
                                </tr>
                          </tbody>
                  </table>
                  </div>
                </transition>
              </div>
        <pagination v-if='listInfo5.pageInfo'
                :current-page='listInfo5.pageInfo.pageNum'
                :total-page='listInfo5.pageInfo.totalPage'
                @pageChange='getList5'></pagination>
      </tab>
      <tab name='催 收'>
        <div class="order-form form-table">
          <div class="form-content">

            <div class="form-item">
              <div class="form-item__key">手机号</div>
              <div class="form-item__value">
                <input type="tel" placeholder="请输入手机号码" v-model='php'>
              </div>
            </div>
         
          </div>
          <div  class="form-button" @click="urgeTools()"><span class="form-button__item button">催收查询</span></div>
        </div>
        </tab>
        <tab name='放款人黑名单'> 
          <loading mode="full" v-if="blackLoading"></loading>   
          <div class="order-form form-table">
              <div class="form-content">
                 <div class="form-item">
                      <div class="form-item__key">手机号</div>
                      <div class="form-item__value">
                        <input type="tel" placeholder="请输入手机号码" v-model='blackListPhone'>
                      </div>
                  </div>
                  <div class="form-item">
                      <div class="form-item__key">姓名</div>
                      <div class="form-item__value">
                        <input type="tel" placeholder="请输入手机号码" v-model='blackListName'>
                      </div>
                  </div>
                <!-- <div class="form-item">
                      <div class="form-item__key">倒序筛选</div>
                      <div class="form-item__value">
                          <select v-model="paixu" class="sort">
                              <option value="">全部</option>
                              <option value="2">按照冻结时间倒序筛选</option>
                              <option value="1">按照录入时间倒序筛选</option>
                          </select>
                      </div>
                  </div> -->
                  <div class="form-item">
                      <div class="form-item__key">状态筛选</div>
                      <div class="form-item__value">
                          <select v-model="paixu1" class="sort">
                              <option value="">全部</option>
                              <option value="待审核">待审核</option>
                              <option value="已冻结并公开">已冻结并公开</option>
                              <option value="解除冻结未公开">解除冻结未公开</option>
                              <option value="已移除">已移除</option>
                          </select>
                      </div>
                  </div>
                  <div class="form-item">
                      <div class="form-item__key"></div>
                      <div class="form-item__value">
                        <router-link class="button" to='/blacklist-upload'>上传黑名单</router-link>  
                      </div>
                  </div>
              </div>
          <div  class="form-button" @click='blacklistList(1)'><span class="form-button__item button">搜索</span></div>
        </div>
        <table  width="100%">
                <thead class="table-list__head">
                <tr>
                  <th>手机号</th>
                  <th>姓名</th>
                  <th>其他名称</th>
                  <th>微信号</th>
                  <th>微信名称</th>
                  <th>支付宝</th>
                  <th>状态</th>
                  <th>操作</th>
                </tr>
                </thead>
                <tbody class='table-list__body have-border'>
                  <tr v-for='item in blackGroud'>
                      <td>
                        <span v-if='item.beReportedUsermobile'>{{String(item.beReportedUsermobile)}}</span>
                        <span v-else>--</span>
                      </td>
                      <td>
                        <span v-if='item.beReportedUserName'>{{item.beReportedUserName}}</span>
                        <span v-else>--</span>
                      </td>
                      <td>
                        <span v-if='item.otherName'>{{item.otherName}}</span>
                        <span v-else>--</span>
                      </td>
                      <td>
                        <span v-if='item.weixin'>{{String(item.weixin)}}</span>
                        <span v-else>--</span>
                      </td>
                      <td>
                        <span v-if='item.nick'>{{String(item.nick)}}</span>
                        <span v-else>--</span>
                      </td>
                      <td>
                        <span v-if='item.zhifubao'>{{String(item.zhifubao)}}</span>
                        <span v-else>--</span>
                      </td>
                      <td>
                        <span v-if='item.state'>{{stateChange(item.state)}}</span>
                        <span v-else>--</span>
                      </td>
                      <td>
                        <div class='option-box'>
                           <span class='option-button' style='color:#00B1B3;cursor:pointer;' @click='detailBlackList(item)'>详情</span>
                           <span class='option-button' style='color:#00B1B3;cursor:pointer;' @click='freezColden(item)'>冻结</span>
                           <span class='option-button' style='color:#00B1B3;cursor:pointer;' @click='deleteBlackLender(item)'>移除</span>
                        </div>
                      </td>
                  </tr>                     
                </tbody>
              </table>
              <pagination
                :current-page='payYouNo.pageNum'
                :total-page='payYouNo.totalPage'
                @pageChange='blacklistList'></pagination> 
        </tab>
    </tab-box>
    <modal
      :show='deleteB'
      title='是否确定'
      @close='deleteB=false'
      @confirm='blacklistdel'
      >
      
      </modal>
      <modal
      :show='blackDetail'
      title='放款人黑名单详情'
      cancle-text=''
      confirm-text=''
      @close='blackDetail=false'
      >
         <h1 style='text-align:center;border:1px solid #ddd;background-color:#ddd;'>
              <span style="font-size:15px;font-weight:normal;line-height:32px;color:black;">
                被举报者信息
              </span>
         </h1> 
         <ul v-if="backBoneBlackList">
           <li class="result-info__item">
              <div class="result-info__key">被举报者姓名</div>
               <div class="result-info__value">{{String(backBoneBlackList.beReportedUserName) ||placeholder}}</div> 
           </li>
           <li class="result-info__item">
              <div class="result-info__key">被举报者手机号</div>
               <div class="result-info__value">{{String(backBoneBlackList.beReportedUsermobile) ||placeholder}}</div> 
           </li>
           <li class="result-info__item">
              <div class="result-info__key">其他名称</div>
               <div class="result-info__value">{{String(backBoneBlackList.otherName) ||placeholder}}</div> 
           </li>
           <li class="result-info__item">
              <div class="result-info__key">微信号</div>
               <div class="result-info__value">{{String(backBoneBlackList.weixin) ||placeholder}}</div> 
           </li>
           <li class="result-info__item">
              <div class="result-info__key">微信名称</div>
               <div class="result-info__value">{{String(backBoneBlackList.nick) ||placeholder}}</div> 
           </li>
           <li class="result-info__item">
              <div class="result-info__key">支付宝号</div>
               <div class="result-info__value">{{String(backBoneBlackList.zhifubao) ||placeholder}}</div> 
           </li>
         </ul>
         <h1 style='text-align:center;border:1px solid #ddd;background-color:#ddd;'>
              <span style="font-size:15px;font-weight:normal;line-height:32px;color:black;">
                举报者信息
              </span>
         </h1> 
         <ul v-if="backBoneBlackList">
           <li class="result-info__item">
               <div class="result-info__key">举报者姓名</div>
               <div class="result-info__value">{{String(backBoneBlackList.reportedUserName) ||placeholder}}</div> 
           </li>
           <li class="result-info__item">
               <div class="result-info__key">举报者手机号</div>
               <div class="result-info__value">{{String(backBoneBlackList.reportedUsermobile) ||placeholder}}</div> 
           </li>
           <li class="result-info__item">
               <div class="result-info__key">发生时间</div>
               <div class="result-info__value">{{timestampToDate(backBoneBlackList.happenTime) ||placeholder}}</div> 
           </li>
           <li class="result-info__item">
               <div class="result-info__key">事情描述</div>
               <div class="result-info__value">{{backBoneBlackList.describeStr ||placeholder}}</div> 
           </li>
         </ul>
         <h1 style='text-align:center;border:1px solid #ddd;background-color:#ddd;'>
              <span style="font-size:15px;font-weight:normal;line-height:32px;color:black;">
                操作内容及时间点
              </span>
          </h1> 
          <ul v-if="backBoneBlackList">
              <li class="result-info__item">
                  <div class="result-info__key">冻结时间</div>
                  <div class="result-info__value">{{timestampToDate(backBoneBlackList.freezeTime) ||placeholder}}</div> 
              </li>
              <li class="result-info__item">
                  <div class="result-info__key">解除并移除时间</div>
                  <div class="result-info__value">{{timestampToDate(backBoneBlackList.delTime)||placeholder}}</div> 
              </li>
              <li class="result-info__item">
                  <div class="result-info__key">修改中</div>
                  <div class="result-info__value" style='color:#00B1B3;cursor:pointer;' @click='xiugaizhong(backBoneBlackList)'>修改</div> 
              </li>
           </ul>
           <h1 style='text-align:center;border:1px solid #ddd;background-color:#ddd;'>
              <span style="font-size:15px;font-weight:normal;line-height:32px;color:black;">
                图片信息
              </span>
           </h1> 
           <div class='img-url' v-for="item in backBoneBlackListTwo" v-if='backBoneBlackListTwo'>
             <!-- <div v-if='item.url'> -->
               <img :src="item.url" width='100px' height="100px">
             <!-- </div> -->
             <!-- <div style='text-align:center;padding:30px 0;background:#ddd;border:1px solid grey;' v-else>无证据图片</div> -->
              
           </div>
      </modal> 


    <modal
    :show='detug'
    title='催收信息'
    cancle-text=''
    confirm-text=''
    @close='detug=false'
    >
      <h1 style='text-align:center;border:1px solid #ddd;background-color:#ddd;'>
            <span style="font-size:15px;font-weight:normal;line-height:32px;color:black;">
              基础信息
            </span>
      </h1>
    <ul v-if="insfo.analyze">
           <li class="result-info__item">
              <div class="result-info__key">姓名</div>
               <div class="result-info__value">{{insfo.analyze.name ||placeholder}}</div> 
           </li>
    
             <li class="result-info__item">
              <div class="result-info__key">身份证号</div>
               <div class="result-info__value">{{insfo.analyze.idNumber||placeholder }}</div> 
           </li>
            <li class="result-info__item">
              <div class="result-info__key">手机号</div>
               <div class="result-info__value">{{insfo.analyze.mobile||placeholder }}</div> 
           </li>
           <li class="result-info__item">
              <div class="result-info__key">微信号</div>
               <div class="result-info__value">{{insfo.analyze.weixinNo||placeholder}}</div> 
           </li>
            <li class="result-info__item">
              <div class="result-info__key">现居地</div>
               <div class="result-info__value">{{insfo.analyze.address||placeholder }}</div> 
           </li>
       </ul>
      <h1 style='text-align:center;border:1px solid #ddd;background-color:#ddd;'>
            <span style="font-size:15px;font-weight:normal;line-height:32px;color:black;">
              紧急联系人信息
            </span>
      </h1>
      <ul  v-if="insfo.analyze">
           <li class="result-info__item">
              <div class="result-info__key">联系人1</div>
               <div class="result-info__value">{{insfo.analyze.contact1Name||placeholder}}</div> 
           </li>
           <li class="result-info__item">
               <div class="result-info__key">与本人的关系</div>
               <div class="result-info__value">
                <span>{{insfo.analyze.contact1Relation||placeholder}}</span>
               </div> 
           </li>
            <li class="result-info__item">
              <div class="result-info__key">联系方式</div>
               <div class="result-info__value">
                <span>{{insfo.analyze.contact1Mobile||placeholder}}</span>
              </div> 
           </li>
              <li class="result-info__item">
              <div class="result-info__key">半年内通话</div>
               <div class="result-info__value">
                <span>{{insfo.analyze.contact1CallCount||placeholder}}</span>
              </div> 
           </li> 
            <li class="result-info__item">
              <div class="result-info__key">联系人2</div>
               <div class="result-info__value">{{insfo.analyze.contact2Name||placeholder}}</div> 
           </li>
           <li class="result-info__item">
               <div class="result-info__key">与本人的关系</div>
               <div class="result-info__value">
                <span>{{insfo.analyze.contact2Relation||placeholder}}</span>
               </div> 
           </li>
            <li class="result-info__item">
              <div class="result-info__key">联系方式</div>
               <div class="result-info__value">
                <span>{{insfo.analyze.contact2Mobile||placeholder}}</span>
              </div> 
           </li>
              <li class="result-info__item">
              <div class="result-info__key">半年内通话</div>
               <div class="result-info__value">
                <span>{{insfo.analyze.contact2CallCount||placeholder}}</span>
              </div> 
           </li> 
      </ul>
       <h1 style='text-align:center;border:1px solid #ddd;background-color:#ddd;'>
            <span style="font-size:15px;font-weight:normal;line-height:32px;color:black;">
              常用联系号码（近6个月）
            </span>
      </h1>
       <table  width="100%">
                <thead class="table-list__head">
                <tr>
                  <th>号码</th>
                  <th>次数</th>
                </tr>
                </thead>
                <tbody class='table-list__body have-border' v-if="carrier.analyze">
                  <tr v-for='(item,index) in carrier.analyze.callRank'>
                    <td>
                      <span>{{index+1}}. {{item.mobile}}</span>
                    </td>
                    <td>
                      <span>{{item.count}}</span>
                    </td>
                  </tr>
                </tbody>
        </table>
    </modal>

     <modal
    :show='detail_detail_detail'
    title='小c用户详细信息'
    cancle-text=''
     confirm-text=''
     @close='detail_detail_detail=false'
    >   
        <h1 style='text-align:center;'>
            <span style="font-size:15px;font-weight:normal;line-height:30px;">该用户{{detail_no33.validStateStr || placeholder}}</span>
        </h1>
         <h1 style='text-align:center;border:1px solid #ddd;background-color:#ddd;'>
            <span style="font-size:15px;font-weight:normal;line-height:32px;color:black;">个人信息</span>
        </h1>
         <ul>
           <li class="result-info__item">
              <div class="result-info__key">注册时间</div>
              <div class="result-info__value">{{detail_no33.registTime | dateFormat}}</div>
           </li>
           <li class="result-info__item">
              <div class="result-info__key">姓名</div>
              <div class="result-info__value">{{detail_no33.realName || placeholder}}</div>
           </li>
            <li class="result-info__item">
              <div class="result-info__key">年龄</div>
              <div class="result-info__value">{{detail_no33.age || placeholder}}</div>
           </li>
           <li class="result-info__item">
              <div class="result-info__key">性别</div>
              <div class="result-info__value">{{detail_no33.gender || placeholder}}</div>
           </li>
           <li class="result-info__item">
              <div class="result-info__key">身份证号码</div>
              <div class="result-info__value">{{detail_no33.idNumber || placeholder}}</div>
           </li>
           <li class="result-info__item">
              <div class="result-info__key">地理位置省／市</div>
              <div class="result-info__value">{{detail_no33.province || placeholder}}</div>
           </li>
           <li class="result-info__item">
              <div class="result-info__key">芝麻分</div>
              <div class="result-info__value">{{detail_no33.zmScore || placeholder}}</div>
           </li>
           <li class="result-info__item">
              <div class="result-info__key">最近使用设备</div>
              <div class="result-info__value">{{detail_no33.loginDevice || placeholder}}</div>
           </li>
         </ul>
         <h1 style='text-align:center;border:1px solid #ddd;background-color:#ddd;'>
            <span style="font-size:15px;font-weight:normal;line-height:32px;color:black;">账户信息</span>
         </h1>
         <ul>
           <li class="result-info__item">
              <div class="result-info__key">信用报告状态</div>
              <div class="result-info__value">{{detail_no33.isHaveCreditReport || placeholder}}</div>
           </li>
           <li class="result-info__item">
              <div class="result-info__key">当前账户金额</div>
              <div class="result-info__value">{{detail_no33.balance |toYuan}}元</div>
           </li>
            <li class="result-info__item">
              <div class="result-info__key">当前银行信息</div>
              <div class="result-info__value">
                <span>{{detail_no33.bankName || placeholder}}</span>
                <span>{{detail_no33.bankCardNo || placeholder}}</span>
              </div>
           </li>
        </ul>
         <h1 style='text-align:center;border:1px solid #ddd;background-color:#ddd;'>
            <span style="font-size:15px;font-weight:normal;line-height:32px;color:black;">业务信息</span>
         </h1>
          <ul>
           <li class="result-info__item">
              <div class="result-info__key">正在申请借款次数</div>
              <div class="result-info__value">
                 <span>{{detail_no33.countApplyBorrowing || placeholder}}</span>
              </div>
           </li>
           <li class="result-info__item">
              <div class="result-info__key">全部求借款次数</div>
              <div class="result-info__value">
                 <span>{{detail_no33.allCountBorrow || placeholder}}</span>
              </div>
           </li>
           <li class="result-info__item">
              <div class="result-info__key">借条进行中次数</div>
              <div class="result-info__value">
                 <span>{{detail_no33.receiptGoing || placeholder}}</span>
              </div>
           </li>
            <li class="result-info__item">
              <div class="result-info__key">完结的次数</div>
              <div class="result-info__value">
                 <span>{{detail_no33.receiptEeding || placeholder}}</span>
              </div>
           </li>
            <li class="result-info__item">
              <div class="result-info__key">累计借入总金额</div>
              <div class="result-info__value">
                 <span>{{detail_no33.borrowSuccessAmount |toYuan}}元</span>
              </div>
           </li>
           </ul>
    </modal>
    <modal
    :show='detail_detail'
    title='小b用户详细信息'
    cancle-text=''
     confirm-text=''
     @close='detail_detail=false'
    >   
         <h1 style='text-align:center;'>
            <span style="font-size:15px;font-weight:normal;line-height:30px;">该用户{{detail_no1.validStateStr || placeholder}}</span>
        </h1>
        <h1 style='text-align:center;border:1px solid #ddd;background-color:#ddd;'>
            <span style="font-size:15px;font-weight:normal;line-height:32px;color:black;">个人信息</span>
        </h1>
        <ul>
           <li class="result-info__item">
              <div class="result-info__key">注册时间</div>
              <div class="result-info__value">{{detail_no1.registTime | dateFormat}}</div>
           </li>
           <li class="result-info__item">
              <div class="result-info__key">姓名</div>
              <div class="result-info__value">{{detail_no1.realName || placeholder}}</div>
           </li>
            <li class="result-info__item">
              <div class="result-info__key">年龄</div>
              <div class="result-info__value">{{detail_no1.age || placeholder}}</div>
           </li>
           <li class="result-info__item">
              <div class="result-info__key">性别</div>
              <div class="result-info__value">{{detail_no1.gender || placeholder}}</div>
           </li>
           <li class="result-info__item">
              <div class="result-info__key">身份证号码</div>
              <div class="result-info__value">{{detail_no1.idNumber || placeholder}}</div>
           </li>
           <li class="result-info__item">
              <div class="result-info__key">地理位置省／市</div>
              <div class="result-info__value">{{detail_no1.province || placeholder}}</div>
           </li>
           <li class="result-info__item">
              <div class="result-info__key">芝麻分</div>
              <div class="result-info__value">{{detail_no1.zmScore || placeholder}}</div>
           </li>
           <li class="result-info__item">
              <div class="result-info__key">最近使用设备</div>
              <div class="result-info__value">{{detail_no1.loginDevice || placeholder}}</div>
           </li>
        </ul>
         <h1 style='text-align:center;border:1px solid #ddd;background-color:#ddd;'>
            <span style="font-size:15px;font-weight:normal;line-height:32px;color:black;">账户信息</span>
         </h1>
         <ul>
           <li class="result-info__item">
              <div class="result-info__key">信用报告状态</div>
              <div class="result-info__value">{{detail_no1.isHaveCreditReport || placeholder}}</div>
           </li>
           <li class="result-info__item">
              <div class="result-info__key">当前点券金额</div>
              <div class="result-info__value">{{detail_no1.scoreBalance |toYuan}}点券</div>
           </li>
           <li class="result-info__item">
              <div class="result-info__key">当前账户金额</div>
              <div class="result-info__value">{{detail_no1.balance |toYuan}}元</div>
           </li>
            <li class="result-info__item">
              <div class="result-info__key">当前银行信息</div>
              <div class="result-info__value">
                <span>{{detail_no1.bankName || placeholder}}</span>
                <span>{{detail_no1.bankCardNo || placeholder}}</span>
              </div>
           </li>
        </ul>
        <h1 style='text-align:center;border:1px solid #ddd;background-color:#ddd;'>
            <span style="font-size:15px;font-weight:normal;line-height:32px;color:black;">业务信息</span>
        </h1>
        <ul>
           <li class="result-info__item">
              <div class="result-info__key">正在发布出借次数</div>
              <div class="result-info__value">
                 <span>{{detail_no1.countLending || placeholder}}</span>
              </div>
           </li>
           <li class="result-info__item">
              <div class="result-info__key">总发布次数</div>
              <div class="result-info__value">
                 <span>{{detail_no1.countLend || placeholder}}</span>
              </div>
           </li>
           <li class="result-info__item">
              <div class="result-info__key">被申请总量</div>
              <div class="result-info__value">
                 <span>{{detail_no1.countApplyLend || placeholder}}</span>
              </div>
           </li>
            <li class="result-info__item">
              <div class="result-info__key">借条进行中次数</div>
              <div class="result-info__value">
                 <span>{{detail_no1.receiptGoing || placeholder}}</span>
              </div>
           </li>
            <li class="result-info__item">
              <div class="result-info__key">完结的次数</div>
              <div class="result-info__value">
                 <span>{{detail_no1.receiptEeding || placeholder}}</span>
              </div>
           </li>
           <li class="result-info__item">
              <div class="result-info__key">累计出借总金额</div>
              <div class="result-info__value">
                 <span>{{detail_no1.lendSuccessAmount |toYuan}}元</span>
              </div>
           </li>
           <li class="result-info__item">
              <div class="result-info__key">累计出借总次数/代收</div>
              <div class="result-info__value">
                 <span>{{detail_no1.lendSuccessCount || placeholder}}</span>
                 <span>/</span>
                 <span>{{detail_no1.waitReceive || placeholder}}</span>
              </div>
           </li>
        </ul>
    </modal>
    <modal
      :show='show_modal_detail'
      title='详细'
      cancle-text=''
      confirm-text=''
      @close='show_modal_detail=false'>
      <ul v-if='curDetail'>
        <li class="result-info__item">
          <div class="result-info__key">手机号码</div>
          <div class="result-info__value">{{curDetail.mobile || placeholder}}</div>
        </li>
        <li class="result-info__item">
          <div class="result-info__key">姓名</div>
          <div class="result-info__value">{{curDetail.realName || placeholder}}</div>
        </li>
        <li class="result-info__item">
          <div class="result-info__key">正在发布求借款次数/总发布次数</div>
          <div class="result-info__value">{{curDetail.countBorrowing}}/{{curDetail.countBorrow}}</div>
        </li>
        <li class="result-info__item">
          <div class="result-info__key">正在发布出借次数/总发布次数</div>
          <div class="result-info__value">{{curDetail.countLending}}/{{curDetail.countLend}}</div>
        </li>
        <li class="result-info__item">
          <div class="result-info__key">借入总金额/待还</div>
          <div class="result-info__value">{{curDetail.borrowAmount | toYuan}}/{{curDetail.borrowWaitRepayAmount | toYuan}}元</div>
        </li>
        <li class="result-info__item">
          <div class="result-info__key">出借总金额/待收</div>
          <div class="result-info__value">{{curDetail.lendAmount | toYuan}}/{{curDetail.lendWaitComeAmount | toYuan}}元
          </div>
        </li>
        <li class="result-info__item">
          <div class="result-info__key">身份证号码</div>
          <div class="result-info__value">{{curDetail.idNumber || placeholder}}</div>
        </li>
        <li class="result-info__item">
          <div class="result-info__key">银行卡信息</div>
          <div class="result-info__value">{{curDetail.bankName || placeholder}} - {{curDetail.bankCardNo || placeholder}}</div>
        </li>
        <li class="result-info__item">
          <div class="result-info__key">是否有信用报告</div>
          <div class="result-info__value">
            {{curDetail.isHaveCreditReport || placeholder}} &nbsp;&nbsp;
            <span @click='goReportDetail' class='report-detail-button' v-show='curDetail.isHaveCreditReport == "有信用报告"'>查看信用报告</span>
          </div>
        </li>
        <li class="result-info__item">
          <div class="result-info__key">信用报告状态</div>
          <div class="result-info__value">
            {{curDetail.creditReportStatusStr || placeholder}}
          </div>
        </li>
        <li class="result-info__item">
          <div class="result-info__key">渠道号</div>
          <div class="result-info__value">{{curDetail.channel || placeholder}}</div>
        </li>
        <li class="result-info__item">
          <div class="result-info__key">是否推荐</div>
          <div class="result-info__value">{{curDetail.isRecommendStr || placeholder}}</div>
        </li>
        <li class="result-info__item">
          <div class="result-info__key">注册时间</div>
          <div class="result-info__value">{{curDetail.createdAt | dateFormat}}</div>
        </li>
        <li class="result-info__item">
          <div class="result-info__key">年龄</div>
          <div class="result-info__value">{{curDetail.age || placeholder}}</div>
        </li>
        <li class="result-info__item">
          <div class="result-info__key">性别</div>
          <div class="result-info__value">{{curDetail.gender || placeholder}}</div>
        </li>
        <li class="result-info__item">
          <div class="result-info__key">地址位置 省/市</div>
          <div class="result-info__value">{{curDetail.province || placeholder}}</div>
        </li>
        <li class="result-info__item">
          <div class="result-info__key">当前账户余额</div>
          <div class="result-info__value">{{curDetail.balance | toYuan}}元</div>
        </li>
      </ul>
    </modal>

    <modal
      :show='show_modal_recommend'
      :loading='loading_set_recommend'
      :closeButton='false'
      title='推荐'
      @close='show_modal_recommend=false'
      @confirm='setRecommendTip'>
      <ul class='modal-recommend'>
        <li class="form-item">
          <span class="form-item__key">推荐类型</span>
          <div class="result-info__value">
            <select-group v-model='recommendType'>
              <select-option value='' text='请选择推荐类型'></select-option>
              <select-option value='lend' text='小b推荐'></select-option>
              <select-option value='borrow' text='小c推荐'></select-option>
            </select-group>
          </div>
        </li>
        <li class="form-item" v-if='recommendType.value == "borrow"'>
          <span class="form-item__key">推荐位置</span>
          <div class="result-info__value">
            <select-group key='all-borrow' v-model='curRecommend' :maxHeight='250'>
              <select-option value='' text='添加到最后'>添加到最后</select-option>
              <select-option v-for='item in borrowNumber' :key='item' :value='item' :text='item'></select-option>
            </select-group>
          </div>
        </li>
        <li class="form-item" v-if='recommendType.value == "lend"'>
          <span class="form-item__key">推荐位置</span>
          <div class="result-info__value">
            <select-group key='all-lend' v-model='curRecommend' :maxHeight='250'>
              <select-option value='' text='添加到最后'>添加到最后</select-option>
              <select-option v-for='item in lendNumber' :key='item' :value='item' :text='item'></select-option>
            </select-group>
          </div>
        </li>
      </ul>
    </modal>

    <modal
      :show='show_modal_cancle_recommend'
      :loading='loading_cancle_recommend'
      :closeButton='false'
      title='取消推荐'
      @close='show_modal_cancle_recommend=false'
      @confirm='cancleRecommend'>
      <ul class='modal-recommend'>
        <li class="form-item">
          <span class="form-item__key">取消推荐类型</span>
          <div class="result-info__value">
            <select-group v-model='cancleRecommendType'>
              <select-option value='' text='请选择取消推荐类型'></select-option>
              <select-option v-if='curItem.lendRecommendPosition' value='lend' text='小b推荐'></select-option>
              <select-option v-if='curItem.borrowRecommendPosition' value='borrow' text='小c推荐'></select-option>
            </select-group>
          </div>
        </li>
      </ul>
    </modal>
        <confirm
            :show='showConfirm'
            :title='title'
            :tip='tip'
            @confirm='confirmTip'
            @close='showConfirm = false'>
        </confirm>
    <!-- <confirm-->
    <!--:show='showConfirm'-->
    <!--:title='title'-->
    <!--:tip='tip'-->
    <!--@confirm='confirmTip'-->
    <!--@close='showConfirm = false'>-->
    <!--</confirm> -->

    <!--<confirm-->
    <!--:show='showFreeze'-->
    <!--title='冻结用户'-->
    <!--tip='是否冻结该用户？'-->
    <!--:loading='loading_freeze'-->
    <!--@confirm='freeze'-->
    <!--@close='showFreeze = false'>-->
    <!--</confirm>-->
    <modal
      :maskClose="false"
      :show='showFreeze'
      :closeButton='false'
      title='冻结用户行为'
      :loading='loading_freeze'
      @confirm='freeze'
      @close='showFreeze = false'>


      <!--<span class="form-item__value" >-->
        <!--&lt;!&ndash;&nbsp;&nbsp;&nbsp;{{debug[0].freezeName}}&ndash;&gt;-->
        <!--<check-box></check-box>-->
      <!--</span>-->
      <ul v-for="item,index in debug" style="display: inline-block!important;">
        <li>
          <span>{{item.freezeName}}</span>
          <span>
            <check-box v-model="item.freeze" style="display: inline-block!important;" ></check-box>
            <!--<check-box v-model="item.freeze" style="display: inline-block!important;" @click="changeFilter($parent.$index, item)"></check-box>-->
          </span>
          &nbsp;
        </li>
      </ul>
    </modal>
     <modal
     title="关闭在线求借／借款类信息"
     :show=' showFreeze1'
     :width=1200
     @close='showFreeze1=false'
     cancle-text=''
      confirm-text=''
     >
       <ul>
         <li>
           <div style="text-align: center;margin-top:10px">
             <span style="color:#00B1B3">正在发布借款</span>
           </div>
           <template v-if="lendx.length">
           <table width="100%" style="margin-top: 10px">
             <thead>
             <tr>
               <th>借款编号</th>
               <th>借款金额及范围</th>
               <th>借款时间范围</th>
               <th>还款方式</th>
               <th>借款状态</th>
               <th>创建时间</th>
               <th>操作</th>
             </tr>
             </thead>
             <tbody>
             <tr  v-for="item in lendx">
               <td>{{item.borrowNo}}</td>
               <td>
                 <span>{{item.borrowAmount |toYuan}}</span>
               </td>
               <td>
                 <span>{{item.borrowDays }}</span>
                 <span>{{item.daysTypeStr }}</span>
               </td>
               <td>
                 {{item.repayWayStr}}
               </td>
               <td>{{item.borrowStateStr}}</td>
               <td>{{item.createdAt | dateFormat}}</td>
               <td>
                 <span style="cursor: pointer;color:#00B1B3" @click="freezeUserBorrow(item)">冻结用户借款</span>
                 &nbsp;
                 <span style="cursor: pointer;color:#00B1B3" @click="relieveFreezeUserBorrow(item)">解除用户借款</span>
               </td>
             </tr>
             </tbody>
           </table>
           </template>
           <template v-else>
             <transition name='fade'>
               <p class="no-data"> 无订单数据 </p>
             </transition>
           </template>
         </li>
         <li>
           <div style="text-align: center;margin-top:10px">
             <span style="color:#00B1B3">正在申请借款</span>
           </div>
           <template v-if="lendx1.length">
           <table width="100%" style="margin-top: 10px">
             <thead>
             <tr>
               <th>借款编号</th>
               <th>借款金额及范围</th>
               <th>借款时间范围</th>
               <th>还款方式</th>
               <th>借款状态</th>
               <th>创建时间</th>
               <th>操作</th>
             </tr>
             </thead>
             <tbody>
             <tr v-for="item in lendx1">
               <td>{{item.borrowNo}}</td>
               <td>
                 <span>{{item.borrowAmount |toYuan}}</span>
               </td>
               <td>
                 <span>{{item.borrowDays }}</span>
                 <span>{{item.daysTypeStr }}</span>
               </td>
               <td>
                 {{item.repayWayStr}}
               </td>
               <td>{{item.borrowStateStr}}</td>
               <td>{{item.createdAt| dateFormat}}</td>
               <td>
                 <span style="cursor: pointer;color:#00B1B3" @click="freezeUserBorrow(item)">冻结用户借款</span>
                 &nbsp;
                 <span style="cursor: pointer;color:#00B1B3" @click="relieveFreezeUserBorrow(item)">解除用户借款</span>
               </td>
             </tr>
             </tbody>
           </table>
           </template>
           <template v-else>
             <transition name='fade'>
               <p class="no-data"> 无订单数据 </p>
             </transition>
           </template>
         </li>
         <li>
           <div style="text-align: center;margin-top:10px">
             <span style="color:#00B1B3">正在发布出借</span>
           </div>
           <template v-if="lendx2.length">
             <table width="100%" style="margin-top: 10px">
               <thead>
               <tr>
                 <th>出借编号</th>
                 <th>出借金额及范围</th>
                 <th>出借时间范围</th>
                 <th>还款方式</th>
                 <th>出借状态</th>
                 <th>创建时间</th>
                 <th>操作</th>
               </tr>
               </thead>
               <tbody style="margin-top: 10px">
                 <tr v-for="item in lendx2">
                   <td>{{item.lendNo}}</td>
                   <td>
                     <span>{{item.lendAmountFrom |toYuan}}</span>
                     <span>--</span>
                     <span>{{item.lendAmountTo |toYuan}}</span>
                   </td>
                   <td>
                     <span>{{item.lendDaysFrom }}</span>
                     <span>--</span>
                     <span>{{item.lendDaysTo }}</span>
                     <span>{{item.daysTypeStr }}</span>
                   </td>
                   <td>
                     {{item.repayWayStr}}
                   </td>
                   <td>{{item.lendStateStr}}</td>
                   <td>{{item.createdAt| dateFormat}}</td>
                    <td>
                      <span style="cursor: pointer;color:#00B1B3" @click="freezeUserlend(item)">关闭</span>
                      &nbsp;
                      <span style="cursor: pointer;color:#00B1B3" @click="relieveFreezeUserlend(item)">解除关闭</span>
                    </td>
                 </tr>
               </tbody>
             </table>
           </template>
           <template v-else>
             <transition name='fade'>
               <p class="no-data"> 无订单数据 </p>
             </transition>
           </template>
         </li>
       </ul>
     </modal>
     <!-- 分配拓展经理 -->
     <modal
      title="分配拓展经理"
     :show='allot'
     @close='allot=false'
     cancle-text='取消'
      confirm-text='确定'
      :width=1000
      @confirm='lendUserExpand()'
     >
     <ul>
         <li class="result-info__item">
            <div class="result-info__key">分配拓展经理选项</div>
                <div class="result-info__value check-list">
                    <radio-group v-model="fengpei">
                        <radio value='未分配'>未分配</radio>
                         <radio value='陈晓启'>陈晓启</radio>
                         <radio value='韩亮'>韩亮</radio>
                         <radio value='解红权'>解红权</radio>
                         <radio value='王安'>王安</radio>
                         <radio value='雷宏'>雷宏</radio>
                         <radio value='异常'>异常</radio>
                         <radio value='异常-已处理'>异常-已处理</radio>
                    </radio-group>
                </div>
         </li>
     </ul>
     </modal>
     <!-- 切换角色 -->
     <modal
      title="重新设置角色"
     :show='allot1'
     @close='allot1=false'
     cancle-text='取消'
      confirm-text='确定'
      @confirm='setBizRoleAgain()'
   >
      <ul>
         <li class="result-info__item">
            <div class="result-info__key">角色切换</div>
                <div class="result-info__value check-list">
                    <radio-group v-model="qiehuan">
                        <radio value='B'>B</radio>
                         <radio value='C'>C</radio>
                    </radio-group>
                </div>
         </li>
     </ul> 
     </modal>
     <modal
         title="重新设置角色"
        :show='allot2'
        @close='allot2=false'
        cancle-text='取消'
        confirm-text='确定'
        @confirm='setBizRoleAgain1()'
     >
       <ul>
         <li class="result-info__item">
            <div class="result-info__key">角色切换</div>
                <div class="result-info__value check-list">
                    <radio-group v-model="qiehuan1">
                        <radio value='B'>B</radio>
                         <radio value='C'>C</radio>
                         <radio value='Z'>Z</radio>
                    </radio-group>
                </div>
         </li>
     </ul> 
     </modal>
      <modal
      :maskClose="false"
      :show='safferiy'
      :closeButton='false'
      title='冻结用户行为'
      :loading='loading_freeze'
      @confirm='freezeTwo'
      @close='safferiy = false'>
      <ul v-for="item,index in debug" style="display: inline-block!important;">
        <li>
          <span>{{item.freezeName}}</span>
          <span>
            <check-box v-model="item.freeze" style="display: inline-block!important;" ></check-box>
            <!--<check-box v-model="item.freeze" style="display: inline-block!important;" @click="changeFilter($parent.$index, item)"></check-box>-->
          </span>
          &nbsp;
        </li>
      </ul>
    </modal>
  </div>
</template>

<script>
  import {Promise} from 'es6-promise'
  import footerBar from '../components/FooterBar.vue'
  import selectGroup from '../components/SelectGroup.vue'
  import selectOption from '../components/SelectOption.vue'
  import radioGroup from '../components/RadioGroup.vue'
  import datePicker from '../components/DatePicker.vue'
  import areaSelect from '../components/AreaSelect.vue'
  import radio from '../components/Radio.vue'
  import loading from '../components/Loading.vue'
  import tabBox from '../components/TabBox.vue'
  import tab from '../components/Tab.vue'
  import checkBox from '../components/CheckBox.vue'
  import checkBoxGroup from '../components/CheckBoxGroup.vue'
  import toolTip from '../components/ToolTip.vue'
  import modal from '../components/Modal.vue'
  import confirm from '../components/Confirm.vue'
  import buttonLoading from '../components/ButtonLoading.vue'
  import pagination from '../components/Pagination.vue'
  import dateFormat from '../filters/filter-dateFormat'
  import toYuan from '../filters/filter-toYuan'
  import  {mapGetters, mapActions}  from 'vuex'
  import {addLenderValidation, resetAccountPasswordValidation, operatorEditValidation} from '../validation/validation'
  import {allApi, lenderApi} from '../api/api'
  import moment from 'moment'


  export default {
    components: {
      footerBar,
      selectGroup,
      selectOption,
      radioGroup,
      tabBox,
      tab,
      radio,
      checkBox,
      checkBoxGroup,
      areaSelect,
      loading,
      toolTip,
      modal,
      confirm,
      buttonLoading,
      pagination,
      datePicker
    },
    filters: {
      dateFormat,
      toYuan,
      booleanToStr(boolean){
        if (boolean === true) {
          return '是'
        }
        else {
          return '否'
        }
      }
    },
    data() {
      return {
        backBoneBlackList:[],
        children:'',
        children1:'',
        blackLoading:true,
        payYouNo:'',
        blackGroud:'',
        blackListName:'',
        blackListPhone:'',
        paixu1:'',
        // paixu:'',
        lendx:[],
        lendx1:[],
        lendx2:[],
        placeholder: '--',
        recommend: 0,
        curItem: {},
        showConfirm: false,
        showFreeze: false,
         showFreeze1: false,
        sequence: {
          value: '0',
          text: '正序'
        },
        sort: {
          value: '',
          text: '默认'
        },
         sort1: '',
         sort2: {
          value: ''
        },
         sort3:'',
        title: '',
        tip: '',
        curRecommend: {
          value: '',
          text: '添加到最后'
        },
        curUserId: '',
        cancleRecommendType: {
          value: '',
          text: '请选择取消推荐类型'
        },
        recommendType: {
          value: '',
          text: '请选择推荐类型'
        },
        lendNumber: '',
        borrowNumber: '',
        detail_detail:false,
        detail_detail_detail:false,
        detug:false,
        blackDetail:false,
        deleteB:false,
        show_modal_cancle_recommend: false,
        show_modal_recommend: false,
        show_modal_recommend1: false,
        show_modal_recommend2: false,
        show_modal_detail: false,
        loading_set_recommend: false,
        loading_freeze: false,
        loading_cancle_recommend: false,
        channel: '',
        channel1: '',
        channel2: '',
        channel3: '',
        channel5: '',
        name: '',
        name1: '',
        name2: '',
        name3: '',
        name5: '',
        userCount: '',
        curDetail: '',
        listInfo: {},
        listInfo1: {},
        listInfo2: {},
        listInfo3: {},
        listInfo5: {},
        records: [],
        records1: [],
        records2: [],
        records3: [],
        records5: [],
        dateFrom: '',
        dateFrom1: '',
        dateFrom2: '',
        dateFrom3: '',
        dateFrom5: '',
        dateTo: '',
        dateTo1: '',
        dateTo2: '',
        dateTo3: '',
        dateTo5: '',
        mobile: '',
        mobile1: '',
        mobile2: '',
        mobile3: '',
        mobile5: '',
        loading: true,
        loading1: true,
        loading2: true,
        loading_count: true,
        debug:{},
        ios:[],
        ios2:{},
        k:[],
        bug:'',
        detail_no1:'',
        detail_no33:'',
        php:'',
        insfo:{},
        carrier:{},
        ecs:{},
        allot:false,
        allot1:false,
        allot2:false,
        fengpei:'',
        qiehuan:'',
        qiehuan1:'',
        alloa:'',
        alloa1:'',
        alloa2:'',
        safferiy:false,
        freezenColdenMobile:'',
        beReportedUsermobileTwo:'',
        backBoneBlackListTwo:[]
      }
    },
    computed: {
      ...mapGetters([
        'msgTip',
        'localInfo'
      ]),
      currentPage(){
        if (_.isEmpty(this.listInfo)) return 1
        return this.listInfo.pageNum
      },
      hasUserCount(){
        return !_.isEmpty(this.userCount)
      },
      noEditObject(){
        return _.isEmpty(this.editObject)
      },
      sendFreeze(){
        let str = ''
        let freeze =  _.filter(this.debug,(value,index)=>{
            return value.freeze == true
        })
        _.each(freeze,(value,index)=>{
            if(!str){
              str = str + value.typeId
              console.log(str)
            }
            else{
                str = str + ',' + value.typeId
                console.log(str)
            }
        })
        return str
      },
      noInvoiceInfo(){
        return _.isEmpty(this.invoiceInfo)
      },
      lenCover(){
        _.each(this.lendx2,(value,index)=>{
                console.log(value)
          return value;
        })
      },
       replay(){
                let records =  _.filter(this.records3,(value,index)=>{
                      return value!==undefined&&value!==null
                     })
                    //  console.log(records)
                    let k=[];
                    _.each(records,(value,index)=>{
                        // console.log(value.to_user_avatar)
                        k.push(value.mobile)
                     })
                    //  console.log(this.kai2)
                   return k
            },
            // records5
        roles(){
                let records =  _.filter(this.records5,(value,index)=>{
                      return value!==undefined&&value!==null
                     })
                    //  console.log(records)
                    let k=[];
                    _.each(records,(value,index)=>{
                        // console.log(value.to_user_avatar)
                        k.push(value.mobile)
                     })
                    //  console.log(this.kai2)
                   return k
            },
    },
    methods: {
      // actions
      ...mapActions([
        'showLoading',
        'hideLoading',
        'setMsgTip'
      ]),
      freezColden(item){
        // console.log(item.beReportedUsermobile)
        this.beReportedUsermobileTwo=item.beReportedUsermobile
        this.freezenColdenMobile=item.blacklistId
        console.log(this.beReportedUsermobileTwo)
        this.safferiy=true
        this.freezeTypeTwo()
      },
      xiugaizhong(a){
        console.log(a)
        this.$router.push({
          name:'change-index',
          params:{
            it:a
          }
        })
      },
       stateChange(a){
          if(a=='NORMAL'){
            return '待审核'
          }else if(a=='DELETE'){
            return '已移交'
          }else if(a=='FREEZE'){
            return '已冻结并公开'
          }else if(a=='UNFREEZE'){
            return '解除冻结未公开'
          }
      },

      // filters
       timestampToDate(timestamp){
                 if (!timestamp) return this.placeholder
                 return moment(timestamp).format('YYYY-MM-DD HH:mm:ss')
          },
      insure(kai){
          if(kai==true) return '是'
          return '否'
      },
      // function
//      changeFilter(index, item) {
//        this.debug[index].typeId = item.typeId
//    },
      detailBlackList(item){
        this.blackDetail=true
        this.children=item.blacklistId
        this.blacklistDetail()
      },
      deleteBlackLender(item){
        // console.log(item.blacklistId)
         this.children1=item.blacklistId
         this.deleteB=true
      },
      blacklistDetail(){
         allApi.blacklistDetail(
           {
            blacklistId:this.children
           }
         )
          .then(result => {
            console.log('111')  
            this.backBoneBlackList=result
            this.backBoneBlackListTwo=result.imageSay
          })
          .catch(error => {
            console.error(error)
      
          })
      },
      detail_no(item){
        // console.log(item)
        this.detail_detail=true
        this.detail_no1=item
      },
      detail_no2(item){
        // console.log(item)
        this.detail_detail_detail=true
        this.detail_no33=item
      },
      allocation(item,index){
        this.allot=true
        this.alloa=index
      },
      toggle(item,index){
          this.allot1=true
          this.alloa1=index
      },
      toggle1(item,index){
          this.allot2=true
          this.alloa2=index
      },
      showModalDetail(item){
        this.show_modal_detail = true
        this.curDetail = item
      },
      showModalRecommend(item){

        this.curRecommend = {
          value: '',
          text: '添加到最后'
        },
          this.recommendType = {
            value: '',
            text: '请选择推荐类型'
          }
        this.curItem = item
        this.curUserId = item.userId

        this.show_modal_recommend = true

      },
      cfo(item){
        this.showFreeze1= true
        this.curItem = item
        this.curUserId = item.userId
        this.lendingAndBorrowing()
      },
      showModalFreeze(item){
        this.curItem = item
        this.curUserId = item.userId

        this.showFreeze = true
        this.freezeType()

      },
      showModalCancleRecommend(item){
        this.show_modal_cancle_recommend = true
        this.curItem = item
        if (!item.borrowRecommendPosition && item.lendRecommendPosition) {
          this.cancleRecommendType = {
            value: 'lend',
            text: '小b推荐'
          }
          return
        }
        if (item.borrowRecommendPosition && !item.lendRecommendPosition) {
          this.cancleRecommendType = {
            value: 'borrow',
            text: '小c推荐'
          }
          return
        }
        this.cancleRecommendType = {
          value: '',
          text: '请选择取消推荐类型'
        }
      },
      getNumber(){
        allApi.borrowCount()
          .then(result => {
            this.borrowNumber = result
          })
          .catch(error => {
            console.error(error)
          })
        allApi.lendCount()
          .then(result => {
            this.lendNumber = result
          })
          .catch(error => {
            console.error(error)
          })
      },
      getList(num){
        this.loading = true
        let params = {
          pageSize: 10,
          pageNo: num,
          stringdateFrom: this.dateFrom,
          stringdateTo: this.dateTo,
          mobile: this.mobile,
          name: this.name,
          channelStr: this.channel,
          sortString: this.sort.value,
          sequence: this.sequence.value,
        }
        allApi.userList(params)
          .then(result => {
            this.loading = false
            this.listInfo = result
            this.records = result.records
            if (result.totalPage < result.pageNum) {
              this.getList(result.totalPage)
            }
          })
          .catch(error => {
            console.error(error)
            this.loading = false
          })
      },
      getList1(num){
        this.loading1 = true
        let params = {
          pageSize: 10,
          recommedStr: 'b',
          pageNo: num,
          stringdateFrom: this.dateFrom1,
          stringdateTo: this.dateTo1,
          mobile: this.mobile1,
          name: this.name1,
          channelStr: this.channel1,
        }
        allApi.userList(params)
          .then(result => {
            this.loading1 = false
            this.listInfo1 = result
            this.records1 = result.records
            if (result.totalPage < result.pageNum) {
              this.getList1(result.totalPage)
            }
          })
          .catch(error => {
            console.error(error)
            this.loading1 = false
          })
      },
      getList2(num){
        this.loading2 = true
        let params = {
          pageSize: 10,
          recommedStr: 'c',
          pageNo: num,
          stringdateFrom: this.dateFrom1,
          stringdateTo: this.dateTo1,
          mobile: this.mobile1,
          name: this.name1,
          channelStr: this.channel1,
        }
        allApi.userList(params)
          .then(result => {
            this.loading2 = false
            this.listInfo2 = result
            this.records2 = result.records
            if (result.totalPage < result.pageNum) {
              this.getList2(result.totalPage)
            }
          })
          .catch(error => {
            console.error(error)
            this.loading2 = false
          })
      },
      // 小b用户接口
      getList3(num){
        this.loading2 = true
        let params = {
          mobile: this.mobile3,
          name: this.name3,
          stringdateFrom: this.dateFrom3,
          stringdateTo: this.dateTo3,
          channelStr: this.channel3,
          sortStr: this.sort1,
          pageSize: 10,
          pageNo:num,
          expandManager:this.sort3
         }
        allApi.lendUserList(params)
          .then(result => {
            this.loading2 = false
            this.listInfo3 = result
            this.records3 = result.pageInfo.records
            if (result.pageInfo.totalPage < result.pageInfo.pageNum) {
              this.getList3(result.pageInfo.totalPage)
            }
          })
          .catch(error => {
            console.error(error)
            this.loading2 = false
            this.listInfo5 = result
          })
      },
      // 小c用户接口
           getList5(num){
        this.loading2 = true
        let params = {
          mobile: this.mobile5,
          name: this.name5,
          stringdateFrom: this.dateFrom5,
          stringdateTo: this.dateTo5,
          channelStr: this.channel5,
          sortStr: this.sort2,
          pageSize: 10,
          pageNo:num
         }
        allApi.borrowUserList(params)
          .then(result => {
            this.loading2 = false
                this.listInfo5 = result
                this.records5 = result.pageInfo.records
          })
          .catch(error => {
            console.error(error)
            this.loading2 = false
          })
      }, 
      setRecommendTip(type){
        if (this.recommendType.value == 'borrow' && this.curItem.countBorrowing == 0) {
          this.title = '确认推荐小c'
          this.tip = '该用户未发布借款，确认推荐？'
          this.showConfirm = true
          return
        }
        if (this.recommendType.value == 'lend' && this.curItem.countLending == 0) {
          this.title = '确认推荐小b'
          this.tip = '该用户未发布出借，确认推荐？'
          this.showConfirm = true
          return
        }

        this.setRecommend()

      },
      confirmTip(){
        this.showConfirm = false
        this.setRecommend()
      },
      setRecommend(){
        this.loading_set_recommend = true
        let params = {
          userId: this.curUserId,
          priorityNo: this.curRecommend.value
        }
        if (this.recommendType.value == 'borrow') {
          allApi.setBorrowRecommend(params)
            .then(result => {
              this.loading_set_recommend = false
              this.show_modal_recommend = false
              this.show_modal_recommend1 = false
              this.show_modal_recommend2 = false
              this.getList(this.listInfo.pageNum)
              this.getList2(this.listInfo2.pageNum)
              this.getNumber()
            })
            .catch(error => {
              console.error(error)
              this.loading_set_recommend = false
            })
          return
        }
        if (this.recommendType.value == 'lend') {
          allApi.setLendRecommend(params)
            .then(result => {
              this.loading_set_recommend = false
              this.show_modal_recommend = false
              this.show_modal_recommend1 = false
              this.show_modal_recommend2 = false
              this.getList(this.listInfo.pageNum)
              this.getList1(this.listInfo1.pageNum)
              this.getNumber()
            })
            .catch(error => {
              console.error(error)
              this.loading_set_recommend = false
            })
        }
      },
      cancleRecommend(item){
        let params = {
          userId: this.curItem.userId,
        }
        if (this.cancleRecommendType.value == 'borrow') {
          this.loading_cancle_recommend = true
          allApi.delBorrowRecommend(params)
            .then(result => {
              this.loading_cancle_recommend = false
              this.show_modal_cancle_recommend = false
              this.getList(this.listInfo.pageNum)
              this.getList2(this.listInfo2.pageNum)
              this.getNumber()
            })
            .catch(error => {
              console.error(error)
              this.loading_cancle_recommend = false
            })
          return
        }
        if (this.cancleRecommendType.value == 'lend') {
          this.loading_cancle_recommend = true
          allApi.delLendRecommend(params)
            .then(result => {
              this.loading_cancle_recommend = false
              this.show_modal_cancle_recommend = false
              this.getList(this.listInfo.pageNum)
              this.getList1(this.listInfo1.pageNum)
              this.getNumber()
            })
            .catch(error => {
              console.error(error)
              this.loading_cancle_recommend = false
            })
        }
        else {
          this.setMsgTip({
            text: '请选择取消推荐类型',
            type: 'warn'
          })
        }
      },
      goReportDetail(){
        window.open(`https://youjie.kongapi.com/#/user-credit-report-detail/${this.curDetail.creditReportNo}`, '', 'width=375,height=667')
      },
      getAccount(){
        this.loading_count = true
        allApi.userCount()
          .then(result => {
            this.loading_count = false
            this.userCount = result
          })
          .catch(error => {
            console.error(error)
            this.loading_count = false
          })
      },
      freeze(){
        this.loading_freeze = true
        allApi.freezeUser({
          mobile: this.curItem.mobile,
          //需要改正
          typeIds:this.sendFreeze
        })
          .then(result => {
            this.loading_freeze = false
            this.setMsgTip({
              text: '冻结用户成功！',
              type: 'success'
            })
          })
          .catch(error => {
            console.error(error)
            this.loading_freeze = false
          })
      },
      //new





      freezeTwo(){
        this.loading_freeze = true
        allApi.blacklistFreeze({
          blacklistId:this.freezenColdenMobile,
          //需要改正
          typeIds:this.sendFreeze
        })
          .then(result => {
            this.loading_freeze = false
            this.setMsgTip({
              text: '冻结用户成功！',
              type: 'success'
            })
            this.blacklistList(this.payYouNo.pageNum)
            this.safferiy=false
          })
          .catch(error => {
            console.error(error)
            this.loading_freeze = false
          })
      },
      lendingAndBorrowing(){
        this.loading_freeze = true
        allApi.lendingAndBorrowing({
          mobile: this.curItem.mobile,
        })
          .then(result => {
            this.loading_freeze = false
            this.lendx=result.myPublishBorrow;
//            console.log(this.lendx)
            this.lendx1=result.myApplyBorrow;
            this.lendx2=result.myPublishLend;
          })
          .catch(error => {
            console.error(error)
            this.loading_freeze = false
          })
      },
      freezeType(){
        this.loading_freeze = true
        allApi.freezeType({
          mobile: this.curItem.mobile
        })
          .then(result => {
            this.loading_freeze = false
            this.debug=result.data
//            for(let i=0;i<this.debug.length;i++){
//                let a={
//                  "typeId":this.debug[i].typeId,
//                  "freezeType":this.debug[i].freezeType,
//                  "freezeName":this.debug[i].freezeName,
//                  "freeze":this.debug[i].freeze
//                }
//                this.ios.push(a)
//            }
       })
          .catch(error => {
            console.error(error)
            this.loading_freeze = false

          })
      },
     freezeTypeTwo(){
        this.loading_freeze = true
        allApi.freezeType({
          mobile: this.beReportedUsermobileTwo[0]
        })
          .then(result => {
            this.loading_freeze = false
            this.debug=result.data
//            for(let i=0;i<this.debug.length;i++){
//                let a={
//                  "typeId":this.debug[i].typeId,
//                  "freezeType":this.debug[i].freezeType,
//                  "freezeName":this.debug[i].freezeName,
//                  "freeze":this.debug[i].freeze
//                }
//                this.ios.push(a)
//            }
       })
          .catch(error => {
            console.error(error)
            this.loading_freeze = false

          })
      },
      freezeUserBorrow(item){
        this.loading_freeze = true
        this.bug=item
        allApi.freezeUserBorrow({
          borrowNo:this.bug.borrowNo
        })
          .then(result => {
            this.loading_freeze = false
            this.setMsgTip({
              text: '冻结用户借款成功！',
              type: 'success'
            })
          })
          .catch(error => {
            console.error(error)
            this.loading_freeze = false
          })
      },
//      relieveFreezeUserBorrow
      relieveFreezeUserBorrow(item){
      this.loading_freeze = true
      this.bug=item
      allApi.relieveFreezeUserBorrow({
        borrowNo:this.bug.borrowNo
      })
        .then(result => {
          this.loading_freeze = false
          this.setMsgTip({
            text: '解除冻结用户借款成功！',
            type: 'success'
          })
        })
        .catch(error => {
          console.error(error)
          this.loading_freeze = false
        })
    },
//      解除用户出借freezeUserlend
      freezeUserlend(item){
        this.loading_freeze = true
        this.bug=item
        allApi.freezeUserlend({
          lendNo:this.bug.lendNo
        })
          .then(result => {
            this.loading_freeze = false
            this.setMsgTip({
              text: '冻结用户出借成功！',
              type: 'success'
            })
          })
          .catch(error => {
            console.error(error)
            this.loading_freeze = false
          })
      },
//      relieveFreezeUserlend
      relieveFreezeUserlend(item){
        this.loading_freeze = true
        this.bug=item
        allApi.relieveFreezeUserlend({
          lendNo:this.bug.lendNo
        })
          .then(result => {
            this.loading_freeze = false
            this.setMsgTip({
              text: '解除冻结用户出借成功！',
              type: 'success'
            })
          })
          .catch(error => {
            console.error(error)
            this.loading_freeze = false
          })
      },
       urgeTools(){
         this.detug=true
         let params={
           mobile:this.php
         }
        allApi.urgeTools(params)
          .then(result => {
            console.log('111')
            if(result==null){
              // console.log(22)
               this.setMsgTip({
              text: '无数据',
              type: 'warning'
            })
            }
            this.insfo = result.userInfo
            this.carrier= result.carrier
            this.ecs = result.ecs
          })
          .catch(error => {
            console.error(error)
          
          })
      },
       lendUserExpand(){
            let params={
              mobile:this.replay[this.alloa],
              expandManager:this.fengpei
            }
        allApi.lendUserExpand(params)
          .then(result => {
            console.log('111')
            this.setMsgTip({
              text: '已分配！',
              type: 'success'
            })
            // history.go(0)
            this.getList3(this.listInfo3.pageInfo.pageNum)

          })
          .catch(error => {
            console.error(error)
          })
      },
        setBizRoleAgain(){
            let params={
            mobile:this.replay[this.alloa1],
            bizRole:this.qiehuan
            }
        allApi.setBizRoleAgain(params)
          .then(result => {
            console.log('111')
            this.setMsgTip({
              text: '已切换！',
              type: 'success'
            })

          })
          .catch(error => {
            console.error(error)
          })
      },
         setBizRoleAgain1(){
            let params={
            mobile:this.roles[this.alloa2],
            bizRole:this.qiehuan1
            }
        allApi.setBizRoleAgain(params)
          .then(result => {
            console.log('111')
            this.setMsgTip({
              text: '已切换！',
              type: 'success'
            })

          })
          .catch(error => {
            console.error(error)
          })
      },
      blacklistList(num){
        this.blackLoading=true
            let params={
              name:this.blackListName,
              mobile:this.blackListPhone,
              state:this.paixu1,
              pageSize:10,
              pageNo:num,
              // sort:this.paixu
            }
        allApi.blacklistList(params)
          .then(result => {
            console.log('111')
            this.blackGroud=result.records
            this.payYouNo=result
            this.blackLoading=false
            

          })
          .catch(error => {
            console.error(error)
             this.blackLoading=false
          })
      },

      //del
      blacklistdel(num){
        allApi.blacklistdel(
          {
            blacklistId:this.children1
          }
        )
          .then(result => {
            console.log('111')
             this.setMsgTip({
              text: '已移除成功！',
              type: 'success'
            })
            this.deleteB=false
            this.blacklistList(this.payYouNo.pageNum)
          })
          .catch(error => {
            console.error(error)
          })
      },

    },
    created(){
      // this.getAccount()
      this.getList(1)
      this.getList1(1)
      this.getList2(1)
      this.getList3(1)
      this.getList5(1)
      this.getNumber()
      this.blacklistList(1)
      // this.urgeTools()
      // this.lendingAndBorrowing()
      // this.lendUserExpand()
    }
  }
</script>

<style lang="scss">
  @import "../sass/variables";
  @import "../sass/extends";
  @import "../sass/mixins";

  #user-index {
    padding: 0 40px 20px 40px;
    box-sizing: border-box;
    overflow: auto;
    .user-data {
      padding-bottom: 20px;
    }
    .user-data__list {
      display: flex;
      padding-top: 20px;
      min-height: 140px;
    }
    .user-data__item {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      width: 200px;
      height: 120px;
      border: 1px solid $sectionColor;
      border-radius: 4px;
      box-shadow: rgba(0, 0, 0, 0.03) 0px 1px 6px, rgba(0, 0, 0, 0.04) 0px 1px 4px;
      margin-right: 20px;
      span {
        display: block;
        font-size: 30px;
        color: $green;
      }
      p {
        padding-top: 10px;
      }
    }
    .report-detail-button {
      color: $green;
      cursor: pointer;
    }
    .modal-recommend {
      .form-item__value {
        flex: 1;
      }
      min-height: 330px;
    }
    .component-checkbox__check{
      border-radius: 13px!important;
    }
    .img-url{
            width:100px;
            height:100px;
            // border: 1px solid #ddd;
            // margin-left: 100px!important;
            margin-top:5px;
            display: inline-block;
            padding: 0 10px;
        }
  }
</style>
