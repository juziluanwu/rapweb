<template>
    <div>
        <el-form :model="interfaceDetail">
            <el-input v-model="interfaceDetail.id" type="hidden"></el-input>
            <el-form-item label="项目名称:">
                <el-input v-model="interfaceDetail.name" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="项目简介:">
                <el-input
                        type="textarea"
                        :rows="2"
                        placeholder="请输入内容"
                        v-model="interfaceDetail.remark">
                </el-input>
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
                interfaceDetail: {}
            }
        },
        props:'setDetailId'
    }
</script>

<style scoped>

</style>