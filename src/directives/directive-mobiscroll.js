import '../libs/mobiscroll/mobiscroll'

var mobiscrollDate = {
    bind:function(){
        var self = this
        $(this.el).mobiscroll().date({
            theme:'mobiscroll',
            dateFormat: 'yy-mm-dd',
            mode:'scroller',
            lang: 'zh',
            maxDate:new Date(),
            display:'bottom'
        })
    },
    update:function(value){
        $(this.el).mobiscroll('setVal', value)
    }
}

var mobiscrollSelectBasic = {
    bind:function(){
        var placeholder = $(this.el).data('placeholder')
        $(this.el).mobiscroll().select({
            theme:'mobiscroll',
            mode:'scroller',
            lang: 'zh',
            display:'bottom',
            placeholder:placeholder
        })
    },
    update:function(value){
        // mobiscorll不会因为select的值改变而刷新mobiscorll生成的input的值，所以手动修改dom的value
        $(this.el).prev().val(value)
    }
}

var mobiscrollSelectGroup = {
    bind:function(){
        $(this.el).mobiscroll().select({
            theme:'mobiscroll',
            lang: 'zh',
            display: 'bottom',
            label: 'City',
            group: true,
            groupLabel: 'Province',
            fixedWidth: [100, 170]
        })
    },
    update:function(value){
        // mobiscorll不会因为select的值改变而刷新mobiscorll生成的input的值，所以手动修改dom的value
        $(this.el).prev().val(value)
    }
}

export { mobiscrollDate, mobiscrollSelectBasic, mobiscrollSelectGroup }

