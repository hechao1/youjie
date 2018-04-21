import lazyLoad from '../libs/lazyload/lazyload'

const lazy = (params) => {
    setTimeout(()=>{
    console.log(params)
    let lazyload = new lazyLoad(params)
    lazyload.render()
},2000)
}

export default lazy

