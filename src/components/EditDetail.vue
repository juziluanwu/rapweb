<template>
    <div>
        <el-form :model="interfaceDetail">
            <el-input v-model="interfaceDetail.id" type="hidden"></el-input>
            <el-form-item label="接口名称:">
                <el-input v-model="interfaceDetail.name" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="请求类型:">
                <el-select v-model="interfaceDetail.type" placeholder="请选择">
                    <el-option label="GET" :value="1"></el-option>
                    <el-option label="POST" :value="2"></el-option>
                    <el-option label="PUT" :value="3"></el-option>
                    <el-option label="DELETE" :value="4"></el-option>
                </el-select>
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
        }
    }
</script>

<style scoped>

</style>