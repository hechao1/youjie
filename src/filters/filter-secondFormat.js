
const secondFormat = (second) => {
    if(!second) return '--'

    let h = 0,
        m = 0,
        s = 0,
        _h = '00',
        _m = '00',
        _s = '00';
    h = Math.floor(second / 3600);
    second = Math.floor(second % 3600);
    m = Math.floor(second / 60);
    s = Math.floor(second % 60);
    _s = s < 10 ? '0' + s : s + '';
    _m = m < 10 ? '0' + m : m + '';
    _h = h < 10 ? '0' + h : h + '';
    return _h + ":" + _m + ":" + _s;
}

export default secondFormat
