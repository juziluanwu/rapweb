<template>
  <div id="v-project" style="width: 600px;margin: auto">
    <el-container>
      <el-header>
        <h1>接口文档</h1>
      </el-header>
      <el-main>
        <el-row>
          <el-col :span="16"><el-input v-model="searchinfo" placeholder="请输入内容"></el-input></el-col>
          <el-col :span="4"><el-button @click="searchProject()">搜索</el-button></el-col>
          <el-col :span="4"><el-button @click="addProject()">新增</el-button></el-col>
        </el-row>

          <el-table
                  :data="projectinfo"
                  style="width: 100%">
            <el-table-column
                    fixed
                    prop="name"
                    label="项目名称"
                    width="180">
            </el-table-column>
            <el-table-column
                    fixed="right"
                    label="操作"
                    width="180">
              <template slot-scope="scope">
                <el-button @click="info_click(scope.row)" type="text" size="small">查看</el-button>
                <el-button type="text" size="small">编辑</el-button>
              </template>
            </el-table-column>

          </el-table>

      </el-main>
    </el-container>

    <el-dialog title="编辑" :visible.sync="dialogFormVisible">
      <el-form :model="projectdetail">
        <el-form-item label="项目名称">
          <el-input v-model="projectdetail.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="项目简介">
          <el-input
                  type="textarea"
                  :rows="2"
                  placeholder="请输入内容"
                  v-model="projectdetail.remark">
          </el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>

export default {

  name: 'project',
  props: {
    msg: String
  },
  data() {
    return {
      projectinfo: [],
      searchinfo:'',
      projectdetail:{
        name:'',
        remark:''
      },
      dialogFormVisible:false,
      formLabelWidth: 20
    }
  },
  mounted(){
    this.searchProject();
  },
  methods: {
    searchProject(){
      this.$Axios.get('http://localhost:8081/rap/project/list')
      .then(res => {
        this.projectinfo = res.data.data;
      })
    },
    info_click(row){
      this.dialogFormVisible = true;
      this.projectdetail.name=row.name;
      this.projectdetail.remark=row.remark;
    },
    addProject(){

    }
  }
}


</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
