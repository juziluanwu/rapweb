<template>
    <div>
        <el-form :model="interfaceDetail">
            <el-form-item label="名称:">
                <span>{{interfaceDetail.name}}</span>
            </el-form-item>
            <el-form-item label="请求方式:">
                <span>{{getTypeById(interfaceDetail.type)}}</span>
            </el-form-item>
            <el-form-item label="请求连接:">
                <span>{{interfaceDetail.url}}</span>
            </el-form-item>
            <el-form-item label="说明:">
                <span>{{interfaceDetail.remark}}</span>
            </el-form-item>

            <el-form-item label="请求参数:">
                <span>{{interfaceDetail.requestparam}}</span>
            </el-form-item>
            <el-form-item label="返回参数:">
                <span>{{interfaceDetail.responseparam}}</span>
            </el-form-item>

        </el-form>
    </div>
</template>

<script>
    export default {
        name: "DetailInfo",
        data() {
            return {}

        },
        mounted() {
        },
        props: {
            interfaceDetail: {}
        },
        methods: {
            getTypeById(type) {
                //1get 2post 3put 4delete
                if (type == 1) {
                    return 'GET'
                } else if (type == 2) {
                    return 'POST'
                } else if (type == 3) {
                    return 'PUT'
                } else if (type == 4) {
                    return 'DELETE'
                }
            }
        }
    }
</script>

<style scoped>

</style>