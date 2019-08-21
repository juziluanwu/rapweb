<template>
  <div id="v-project" style="width: 600px;margin: auto">
    <el-container>
      <el-header>
        <h1>接口文档</h1>
      </el-header>
      <el-main>
        <el-row>
          <el-col :span="16">
            <el-input v-model="searchinfo" placeholder="请输入内容"></el-input>
          </el-col>
          <el-col :span="4">
            <el-button @click="searchProject()">搜索</el-button>
          </el-col>
          <el-col :span="4">
            <el-button @click="showAddDig()">新增</el-button>
          </el-col>
        </el-row>

        <el-table :data="projectinfo" style="width: 100%">
          <el-table-column fixed label="项目名称" width="180">
            <template slot-scope="scope">
              <router-link :to="'/MenuDetail/'+scope.row.id">{{scope.row.name}}</router-link>
            </template>
          </el-table-column>
          <el-table-column fixed="right" label="操作" width="180">
            <template slot-scope="scope">
              <el-button @click="showDetailDig(scope.row)" type="text" size="small">查看</el-button>
              <el-button @click="showEditDig(scope.row)" type="text" size="small">编辑</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-main>
    </el-container>

    <el-dialog title="操作" :visible.sync="dialogFormVisible">
      <el-form :model="projectdetail">
        <el-input v-model="projectdetail.id" type="hidden"></el-input>
        <el-form-item label="项目名称:">
          <el-input v-model="projectdetail.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="项目简介:">
          <el-input type="textarea" :rows="2" placeholder="请输入内容" v-model="projectdetail.remark"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="addOrEdit()">确 定</el-button>
      </div>
    </el-dialog>

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
  props: {
    msg: String
  },
  data() {
    return {
      projectinfo: [],
      searchinfo: "",
      projectdetail: {},
      dialogFormVisible: false,
      detailVisible: false,
      formLabelWidth: 20
    };
  },
  mounted() {
    this.searchProject();
  },
  methods: {
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
    },
    showEditDig(row) {
      this.dialogFormVisible = true;
      this.projectdetail = row;
    },
    showAddDig() {
      this.projectdetail = {};
      this.dialogFormVisible = true;
    },
    addOrEdit() {
      this.projectdetail.type = 1;
      if (this.projectdetail.id) {
        this.$Axios.post("/project/update", this.projectdetail).then(res => {
          if (res.data.success) {
            this.dialogFormVisible = false;
            this.searchProject();
          }
        });
      } else {
        this.$Axios.post("/project/save", this.projectdetail).then(res => {
          if (res.data.success) {
            this.dialogFormVisible = false;
            this.searchProject();
          }
        });
      }
    }
  }
};
</script>

