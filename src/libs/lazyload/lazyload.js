function lazyLoad(options) {
    var defaults={
        elements :'.lazyload',
        container:window,
        threshold:10,
        placeholder:"data:image/gif;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVQImWNgYGBgAAAABQABh6FO1AAAAABJRU5ErkJggg=="

    }

    this.settings = $.extend({}, defaults, options);
    // this.elements = $(this.settings.elements);
    this.container = $(this.settings.container);


    this.container_scrolltop = 0
    this.container_height = this.container.height()
}

lazyLoad.prototype.render = function() {
    this.elements = $(this.settings.elements);
    // console.log(this.elements)
    this._init();
    this._lazy();
}
lazyLoad.prototype._init = function() {
    var self = this
    var wrapper_time

    this.container.on('scroll.lazy',function(){

        if(wrapper_time){
            clearTimeout(wrapper_time)
        }
        wrapper_time = setTimeout(function(){
            self.container_scrolltop = self.container.scrollTop();
            self._lazy();
        },200);
    }).trigger('scroll.lazy')
}
lazyLoad.prototype._lazy = function() {

    var settings = this.settings;
    var self = this

    this.elements.each(function(){
        var _self = $(this);
        // console.log(_self.attr("src"))
        // if (_self.attr("src") === undefined || _self.attr("src") === false) {
        //     if (_self.is("img")) {
        //         _self.attr("src", settings.placeholder);
        //     }
        // }

        if(_self.attr('data-lazy')){
            console.log(1)
            if(settings.container == window){
                var _offsetTop = _self.offset().top
            }
            else{
                var _offsetTop = _self.offset().top - self.container.offset().top;
            }

            if((_offsetTop - settings.threshold) <= (self.container_height + self.container_scrolltop)){
                _self.attr('src',_self.attr('data-lazy'));
                _self[0].onload = function(){
                    _self.parent().removeClass('lazy-box')
                }
                _self.removeAttr('data-lazy');
            }
        }
    });
}
module.exports = lazyLoad;
