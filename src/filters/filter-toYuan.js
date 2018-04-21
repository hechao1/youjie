
const toYuan = (money) => {
    if(money === 0) return '0.00'
    else if(!money) return '0.00'
    else return (money/100).toFixed(2)
}

export default toYuan
