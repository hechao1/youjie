<template>
    <div class='component-upload'>
        <div class="component-upload__content">
            <slot></slot>
        </div>
        <input v-if='type == "image"' class="component-upload__input" type="file" accept="image/*" @change='upload'>
        <input v-if='type == "txt"' class="component-upload__input" type="file" accept="text/plain" @change='upload'>
        <input v-if='type == "all"' class="component-upload__input" type="file" @change='upload'>
    </div>
</template>

<script>

    export default {
        props:{
            type:{
                type: String,
                default: 'image'
            },
        },
        data() {
            return {
                fileData:'',
                fileLoading:false,
                localIds:'',
            }
        },
        methods:{
            upload(e){

                this.fileLoading = true

                let result
                let files = e.target.files;
                let file = files[0];
                let type = file && file.name.substring(file.name.lastIndexOf(".")+1).toLowerCase();

                // if (type!='xlsx') {
                //     this.setMsgTip('文件格式必须为*.xlsx')
                //     this.fileLoading = false
                //     return
                // }
                console.log(file.name)

                let reader = new FileReader();
                reader.onload = () => {
                    result = reader.result
                    if(this.type == 'txt'){
                        result = reader.result.replace(/\r/g, "\n")
                        result = result.replace(/\n\n/g, "\n")
                    }
                    this.fileData = {
                        name:file.name,
                        result:result
                    }
                    this.done()
                    e.target.value = ''
                }
                reader.onloadend = () => {
                    this.fileLoading = false
                }
                if(this.type == 'image'){
                    reader.readAsDataUrl(file);
                    return
                }
                if(this.type == 'txt'){
                    reader.readAsText(file);
                    return
                }
            },
            done(){
                console.log(this.fileData)
                this.$emit('done',this.fileData)
            }
        }
    }
</script>

<style lang="scss">
    @import "../sass/variables";
    @import "../sass/extends";
    @import "../sass/mixins";
    
    .component-upload{
        position: relative;
    }
    .component-upload__content{
        position: relative;
    }
    .component-upload__input{
        position: absolute;
        z-index:2;
        top:0;
        left:0;
        width: 100%;
        height: 100%;
        opacity:0;
        cursor: pointer;
    }
</style>


