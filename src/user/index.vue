<template>
  <div id="v-project" style="width: 700px;margin: auto">
    <el-container>
      <el-header>
        <h1>接口文档</h1>
      </el-header>
      <el-main>
        <el-row>
          <el-col :span="15">
            <el-input v-model="searchinfo" placeholder="请输入内容"></el-input>
          </el-col>
          <el-col :span="3">
            <el-button @click="searchProject()">搜索</el-button>
          </el-col>
          <el-col :span="3">
            <el-button @click="iniSearchProject()">重置</el-button>
          </el-col>
          <el-col :span="3">
            <el-button @click="showAddDig()">新增</el-button>
          </el-col>
        </el-row>

        <el-table :data="projectinfo" style="width: 100%">
          <el-table-column fixed label="项目名称">
            <template slot-scope="scope">
              <router-link :to="'/UserDetail/'+scope.row.id">{{scope.row.name}}</router-link>
            </template>
          </el-table-column>
          <el-table-column fixed="right" label="操作" width="100">
            <template slot-scope="scope">
              <el-button @click="showDetailDig(scope.row)" type="text" size="small">查看</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-main>
    </el-container>
    <el-dialog title="详情" :visible.sync="detailVisible">
      <el-form :model="projectdetail">
        <el-form-item label="项目名称:">
          <span>{{projectdetail.name}}</span>
        </el-form-item>
        <el-form-item label="项目简介:">
          <span>{{projectdetail.remark}}</span>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="detailVisible = false">取 消</el-button>
        <el-button type="primary" @click="detailVisible = false">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "project",
  data() {
    return {
      projectinfo: [],
      projectdetail: "",
      searchinfo: "",
      detailVisible: false
    };
  },
  mounted() {
    this.searchProject();
  },
  methods: {
    iniSearchProject() {
      this.searchinfo = "";
      this.searchProject();
    },
    searchProject() {
      this.$Axios
        .get("/project/list?name=" + this.searchinfo + "&type=1")
        .then(res => {
          this.projectinfo = res.data.data;
        });
    },
    showDetailDig(row) {
      this.detailVisible = true;
      this.projectdetail = row;
    }
  }
};
</script>
