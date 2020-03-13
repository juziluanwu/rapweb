<template>
    <el-container>
        <el-row>
            <el-col :span="16">
                <el-input v-model="version" placeholder="请填写接口版本"></el-input>
            </el-col>
            <el-col :span="4">
                <el-button @click="confirmversion()">确认</el-button>
            </el-col>
        </el-row>
    </el-container>
</template>
<script>
    export default {
        name: "VersionHead",
        data() {
            return {
                version:'',
                key:''
            }
        },
        mounted() {
            this.key = this.$route.params.id;
        },
        methods: {
            confirmversion(){
                localStorage.setItem(this.key,this.version)
                var version = localStorage.getItem(this.key);
                if (version != null && version != '') {
                    this.$message({
                        message: '填写成功---当前版本'+version,
                        type: 'success'
                    });
                }
            }
        }
    }
</script>