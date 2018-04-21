import md5 from './md5.js'
import lazy from '../libs/lazyload/lazyload'
import store  from '../vuex/store'

const scrollLoading = (wrapper,wrapperBox,callback) => {
    // return
    let $wrapper = $(wrapper)
    let $wrapper_box = $(wrapperBox)
    let window_height = $(window).height()
    let wrapper_time
    $wrapper.on('scroll.loading',()=>{
        if(wrapper_time){
            clearTimeout(wrapper_time)
        }
        wrapper_time = setTimeout(()=>{
            let scroll_top = $wrapper.scrollTop()
            let $wrapper_box_height = $wrapper_box.height()
            if($wrapper_box_height - window_height - scroll_top <= 20 ){
                callback && callback()
            }
        },350);
    })
}

const scrollFixed = (wrapper,fixedClass,offsetClass) => {
    // return
    let $wrapper = $(wrapper)
    let $fixed = $(fixedClass)
    let offSetTop = $(offsetClass).offset().top
    let wrapper_time
    $wrapper.on('scroll.fixed',()=>{
        if(wrapper_time){
            clearTimeout(wrapper_time)
        }
        wrapper_time = setTimeout(()=>{
            let scroll_top = $wrapper.scrollTop()
            console.log('scroll_top:'+scroll_top)
            console.log('scroll_top:'+scroll_top)
            if(scroll_top - offSetTop > 5 ){
                console.log('fixed')
                // setTimeout(()=>{
                    $fixed.addClass('fixed')
                // },1000)
            }
            else{
                $fixed.removeClass('fixed')
            }
        },100);
    })
}

// 判断是否支持sticky属性
const isSupportSticky = () => {
    var prefixTestList = ['', '-webkit-', '-ms-', '-moz-', '-o-'];
    var stickyText = '';
    for (var i = 0; i < prefixTestList.length; i++ ) {
        stickyText += 'position:' + prefixTestList[i] + 'sticky;';
    }
    // 创建一个dom来检查
    var div = document.createElement('div');
    var body = document.body;
    div.style.cssText = 'display:none;' + stickyText;
    body.appendChild(div);
    var isSupport = /sticky/i.test(window.getComputedStyle(div).position);
    body.removeChild(div);
    div = null;
    console.log('isSupportSticky:'+isSupport)
    return isSupport;
}

const lazyLoad = (params) => {
    let lazyload = new lazy(params)
    lazyload.render()
}
//截取url的api
const getQueryString = function (url) {
    if (url) {
        url = url.substr(url.indexOf("?") + 1);
    }
    let result = {}, queryString = url || location.search.substring(1),
        re = /([^&=]+)=([^&]*)/g, m

    while (m = re.exec(queryString)) {
        result[decodeURIComponent(m[1])] = decodeURIComponent(m[2])
    }

    return result;
}

const dateFormat = (date,fmt) => {
    let _date = new Date(date)
    let o = {
        "M+" : _date.getMonth()+1, //月份
        "d+" : _date.getDate(), //日
        "h+" : _date.getHours()%12 == 0 ? 12 : _date.getHours()%12, //小时
        "H+" : _date.getHours(), //小时
        "m+" : _date.getMinutes(), //分
        "s+" : _date.getSeconds(), //秒
        "q+" : Math.floor((_date.getMonth()+3)/3), //季度
        "S" : _date.getMilliseconds() //毫秒
    };
    let week = {
        "0" : "/u65e5",
        "1" : "/u4e00",
        "2" : "/u4e8c",
        "3" : "/u4e09",
        "4" : "/u56db",
        "5" : "/u4e94",
        "6" : "/u516d"
    };
    if(/(y+)/.test(fmt)){
        fmt=fmt.replace(RegExp.$1, (_date.getFullYear()+"").substr(4 - RegExp.$1.length));
    }
    if(/(E+)/.test(fmt)){
        fmt=fmt.replace(RegExp.$1, ((RegExp.$1.length>1) ? (RegExp.$1.length>2 ? "/u661f/u671f" : "/u5468") : "")+week[_date.getDay()+""]);
    }
    for(let k in o){
        if(new RegExp("("+ k +")").test(fmt)){
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));
        }
    }
    return fmt;
}

const convertRequestURL = function(url,environment) {
    let converted_url
    let mode = getQueryString().mode
    // console.log(mode)

    if(mode == 'test'){
        if(environment == 'baodan') converted_url = "http://192.168.10.4:9067/"+url
        else if(environment == 'open') converted_url = "http://192.168.10.4:9049/"+url
        else if(environment == 'openApi') converted_url = "http://192.168.10.4:9049/"+url
        else if(environment == 'baodandai') converted_url = "http://192.168.10.4:9072/"+url
        //else converted_url = "http://192.168.11.20:8082/"+url
        // http://192.168.1.102:8080/
         else converted_url = "http://youjieadminapi.int.anniu-inc.com/"+url
    }
    else{
        if(environment == 'baodan') converted_url = "http://baodan.qichekb.com/"+url
        else if(environment == 'open') converted_url = "http://210.32.124.25:9088/"+url
        else if(environment == 'openApi') converted_url = "http://210.32.124.25:9088/"+url
        else if(environment == 'baodandai') converted_url = "http://policy-loan.qichekb.com/"+url
        // else converted_url = "http://210.32.124.25:9088/"+url
        else converted_url = "http://youjieadmin.kongapi.com/"+url
    }

    return converted_url
}

const convertParams = function(params,environment) {

    if(environment == 'openApi'){
        params['userid'] = store.state.localInfo.userIduserId
        return params
    }

    let mode = getQueryString().mode
    if(mode == 'mock'){
        return params
    }

    let time = +new Date();
    let appkey
    let secret
    if(process.env.NODE_ENV == 'production' || process.env.NODE_ENV == 'web'){
        appkey = 'ba0a57838f';
        secret = '763f6ef3b392637b';
    }
    else{
        appkey = '60000';
        secret = 'LWLPg7pU4cwrcyy8PwDeGuaY0BHUoX';
    }
    let sign = appkey + secret + time;
    let o = {
        appkey: appkey,
        time: time
    };
    if (params) {
        sign += JSON.stringify(params);
        o.params = JSON.stringify(params);
    }
    o.sign = md5(sign);
    return o;
}

const getScript = (url, callback) => {
    let head = document.getElementsByTagName('head')[0],
        js = document.createElement('script');

    js.setAttribute('type', 'text/javascript');
    js.setAttribute('src', url);

    head.appendChild(js);

    let callbackFn = function(){
        if(typeof callback === 'function'){
            callback();
        }
    }
    js.onload = function() {
        callbackFn();
    }
}

const rules = {
    IDCard(val){
        return /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/.test(val);
    },
    password(val){
        return /(?!^\\d+$)(?!^[a-zA-Z]+$)(?!^[_#@]+$).{8,16}/.test(val);
    },
    tel(val) {
        return /^(\+86([\s-])?)?1\d{10}$/.test(val);
    },
    number(val) {
        return /^[0-9]*$/.test(val);
    },
    email(val) {
        return /^(?:\w+\.?\+?)*\w+@(?:\w+\.)+\w+$/.test(val);
    },
    licence(val) {
        return /^[\u4e00-\u9fa5]{1}[a-zA-Z]{1}[a-zA-Z_0-9]{5}$/.test(val);
    }
}

export {
    scrollLoading,
    scrollFixed,
    isSupportSticky,
    lazyLoad,
    convertRequestURL,
    convertParams,
    getScript,
    getQueryString,
    rules,
}