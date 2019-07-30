<template>
    <div>
        <el-form :model="interfaceDetail" label-width="80px">
            <el-input v-model="interfaceDetail.id" type="hidden"></el-input>
            <el-form-item label="接口名称:">
                <el-input v-model="interfaceDetail.name" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="请求类型:">
                <el-select v-model="interfaceDetail.iftype" placeholder="请选择">
                    <el-option label="GET" :value="1"></el-option>
                    <el-option label="POST" :value="2"></el-option>
                    <el-option label="PUT" :value="3"></el-option>
                    <el-option label="DELETE" :value="4"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="请求URL:">
                <el-input v-model="interfaceDetail.url" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="说明:">
                <el-input v-model="interfaceDetail.remark" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="请求参数:">
                <el-input v-model="interfaceDetail.requestparam" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="响应参数:">
                <el-input v-model="interfaceDetail.responseparam" autocomplete="off"></el-input>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button type="primary" @click="addOrEdit()">确 定</el-button>
        </div>
    </div>
</template>

<script>
    export default {
        name: "EditDetail",
        data(){
            return{

            }
        },
        props: {
            interfaceDetail: {}
        },
        methods:{
            addOrEdit() {
                if(this.interfaceDetail.id){
                    //编辑
                    this.$Axios.post(this.BASEURL + '/detail/update', this.interfaceDetail)
                        .then(res => {
                                if (res.data.success) {
                                   //调取父级方法
                                    this.$emit('editendp')
                                }
                            }
                        )
                }else{
                    //新增
                    this.$Axios.post(this.BASEURL + '/detail/save', this.interfaceDetail)
                        .then(res => {
                                if (res.data.success) {
                                    //调取父级方法
                                    this.$emit('saveendp')
                                }
                            }
                        )
                }
            }
        }
    }
</script>

<style scoped>

</style>