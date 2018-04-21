<template>
    <div class="component-pagination">
        <div class="component-pagination__box">
            <i
                class="component-pagination__prev iconfont icon-arrow"
                :class='{disabled : firstPage}'
                @click='pageChange(currentPage-1)'></i>
            <ul class="component-pagination__pages">
                <li
                    class='component-pagination__page'
                    :class='{ active : 1 == currentPage }'
                    v-if="totalPage > 0"
                    @click='pageChange(1)'>1</li>
                <li
                    class='component-pagination__more'
                    v-if="showPrevMore"
                    @click='clickPrevMore'>&nbsp; ... &nbsp;</li>
                <li
                    class='component-pagination__page'
                    v-for='page in pages'
                    :class='{ active : page == currentPage }'
                    @click='pageChange(page)'>{{ page }}</li>
                <li
                    class='component-pagination__more'
                    v-if="showNextMore"
                    @click='clickNextMore'>&nbsp; ... &nbsp;</li>
                <li
                    class='component-pagination__page'
                    :class='{ active : totalPage == currentPage }'
                    v-if="totalPage > 1"
                    @click='pageChange(totalPage)'>{{ totalPage }}</li>
            </ul>
            <i
                class="component-pagination__next iconfont icon-arrow"
                :class='{disabled : lastPage}'
                @click='pageChange(currentPage+1)'></i>
        </div>
    </div>
</template>

<script>

    export default {
        props:{
            currentPage:{
                type: Number,
                default: 1
            },
            totalPage:Number,
        },
        data() {
            return{
                currentShowPage:this.currentPage,
                showPrevMore: false,
                showNextMore: false,
            }
        },
        computed:{
            pages(){
                let pageCount = 7
                let pageLen = this.totalPage
                let currentPage = this.currentShowPage
                let showPrevMore = false;
                let showNextMore = false;

                if(pageLen > pageCount){
                    if(currentPage > pageCount - 2){
                        showPrevMore = true;
                    }
                    if (currentPage < pageLen - 2) {
                        showNextMore = true;
                    }
                }

                let pageArr = []
                if (showPrevMore && !showNextMore) {
                    const startPage = pageLen - (pageCount - 2);
                    for (let i = startPage; i < pageLen; i++) {
                        pageArr.push(i);
                    }
                }
                else if (!showPrevMore && showNextMore) {
                    for (let i = 2; i < pageCount; i++) {
                        pageArr.push(i);
                    }
                }
                else if (showPrevMore && showNextMore) {
                    const offset = Math.floor(pageCount / 2) - 1;
                    for (let i = currentPage - offset ; i <= currentPage + offset; i++) {
                        pageArr.push(i);
                    }
                }
                else {
                    for (let i = 2; i < pageLen; i++) {
                        pageArr.push(i);
                    }
               }
               this.showPrevMore = showPrevMore;
               this.showNextMore = showNextMore;
               return pageArr
            },
            lastPage(){
                return this.currentPage == this.totalPage
            },
            firstPage(){
                return this.currentPage == 1
            }
        },
        methods:{
            pageChange(page){
                if(page == this.currentPage) return
                this.currentShowPage = page
                this.$emit('pageChange',page)
            },
            clickPrevMore(){
                let page = this.currentShowPage - 5
                if(this.currentShowPage < 1) page = 1
                this.currentShowPage = page
            },
            clickNextMore(){
                let page = this.currentShowPage + 5
                if(this.currentShowPage > this.totalPage) page = this.totalPage
                this.currentShowPage = page
            },
        }
    }
</script>

<style lang="scss">
    @import "../sass/variables";
    @import "../sass/extends";
    @import "../sass/mixins";

    .component-pagination{
        display:flex;
        justify-content:center;
        padding-top: 20px;
        padding-bottom: 20px;
    }
    .component-pagination__more{
        cursor:pointer;
        &:hover{
            color:$defaultColor;
        }
    }
    .component-pagination__box{
        display:flex;
        width: 100%;
        justify-content:center;
        align-items:center;
        color:$green;
        .iconfont{
            padding:5px 10px;
            &:hover{
                color:$defaultColor;
            }
            &.disabled{
                color:$sectionColor;
                pointer-events:none
            }
        }
    }
    .component-pagination__pages{
        max-width:70%;
        flex-wrap:wrap;
        display:flex;
        font-size: 13px;
    }
    .component-pagination__page{
        cursor:pointer;
        color:$green;
        height:22px;
        line-height:22px;
        padding: 0 5px;
        box-sizing:border-box;
        text-align:center;
        border-radius:3px;
        &:hover{
            color:$importColor;
        }
        &.active{
            color:$importColor;
        }
    }
    .component-pagination__prev{
        cursor:pointer;
        transform:rotate(180deg)
    }
    .component-pagination__next{
        cursor:pointer;
    }

    .component-checkbox{
        display:flex;
        align-items:center;
        padding-left:6px;
        cursor:poiner;
        &:first-child{
            padding-left: 0;
        }
    }
    .component-checkbox__check{
        display: block;
        color:$green;
        width: 18px;
        height:18px;
        box-sizing:border-box;
        border:1px solid $green;
        border-radius:2px;
        position: relative;
        &.checked{
            .iconfont{
                transform:scale(1);
            }
        }
        .iconfont{
            position: absolute;
            font-size:16px;
            width: 16px;
            height:16px;
            top:50%;
            left:50%;
            margin:-8px 0 0 -8px;
            transform:scale(0);
            transition:ease 150ms transform;
            &:before{
                position: absolute;
                width: 100%;
                height:100%;
                top:0px;
                left:0;
            }
        }
    }
    .component-checkbox__text{
        padding-left: 16px;
    }
</style>
