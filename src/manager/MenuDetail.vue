<template>
  <div class="v-detail" style="width: 1300px;margin: auto;">
    <el-container>
      <el-header>
        <version-head></version-head>
      </el-header>
      <el-container>
        <el-aside width="500px" height="auto">
          <div class="block">
            <el-input placeholder="输入关键字进行过滤" v-model="filterText"></el-input>
            <el-tree
              style="margin-top:20px;"
              :data="treedata"
              :props="treedataprop"
              node-key="id"
              :default-expanded-keys="expandedKeys"
              highlight-current
              :filter-node-method="filterNode"
              :expand-on-click-node="false"
              ref="tree"
            >
              <span class="tree-item" slot-scope="{ node, data }">
                <span class="span-ellipsis" @click="selectNode(data)">{{ node.label }}</span>
                <span class="tree-btn">
                  <span class="version">{{data.version}}</span>
                  <el-button v-if="data.type != 3" type="text" size="mini" @click="append(data)">新增</el-button>
                  <el-button type="text" v-if="data.type != 1" size="mini" @click="edit(data)">编辑</el-button>
                  <el-button
                    v-if="data.type != 1"
                    type="text"
                    size="mini"
                    @click="remove(node, data)"
                  >删除</el-button>
                </span>
              </span>
            </el-tree>
          </div>
        </el-aside>
        <el-main class="edit-main">
          <div class="show-info">
            <edit-detail ref="editWin" @saveendp="addNode"></edit-detail>
          </div>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import "@/sass/components/MenuDetail.scss";
import edit_detail from "./EditDetail";
import version_head from "./Head";

export default {
  name: "MenuDetail",
  watch: {
    filterText(val) {
      this.$refs.tree.filter(val);
    }
  },
  data() {
    return {
      expandedKeys: [],
      shownode: {},
      operate: "", //显示编辑还是详情
      filterText: "",
      selectnode: {}, //接口详情
      interfacetype: "", //菜单的类型
      projectid: "", //项目id
      treedata: [],
      treedataprop: {
        label: "name",
        children: "children"
      }
    };
  },
  components: {
    "edit-detail": edit_detail,
    "version-head": version_head
  },
  mounted() {
    this.projectid = this.$route.params.id; //获取router传过来的参数
    this.menutree();
  },
  methods: {
    menutree() {
      this.$Axios.get("/project/tree?pid=" + this.projectid).then(res => {
        if (res.data.success) {
          res.data.data.forEach(element => {
            if (element.type == 1) this.expandedKeys.push(element.id);
          });
          this.inittree(res.data.data);
          this.$forceUpdate();
        }
      });
    },
    inittree(data) {
      let tree = [];
      if (data && data.length) {
        for (var i = 0; i < data.length; i++) {
          let item = data[i];
          if (item.type == 1) {
            let node = item;
            this.digui(data, node);
            tree.push(node);
          }
        }
      }
      this.treedata = tree;
    },
    digui(data, fdata) {
      fdata.children = [];
      for (var i = 0; i < data.length; i++) {
        let citem = data[i];
        if (citem.fid == fdata.id) {
          fdata.children.push(citem);
          this.digui(data, citem);
        }
      }
    },
    filterNode(value, data) {
      if (!value) return true;
      let tempname = data.name.indexOf(value);
      if (tempname !== -1) return true;
      if (data.version) {
        let tempversion = data.version.indexOf(value);
        if (tempversion !== -1) return true;
      }
      if (data.url) {
        let tempurl = data.url.indexOf(value);
        if (tempurl !== -1) return true;
      }
    },
    selectNode(node) {
      this.selectnode = node;
      this.$refs.editWin.initData(node, true);
    },
    append(node) {
      var creator = localStorage.getItem("creator");
      if (creator == null || creator == "") {
        this.$alert("请填写创建人", "警告", {
          confirmButtonText: "确定"
        });
        return;
      }
      var version = localStorage.getItem(this.projectid);
      if (version == null || version == "") {
        this.$alert("请填写接口版本，对应原型版本", "警告", {
          confirmButtonText: "确定"
        });
        return;
      }
      this.selectnode = node;
      let childnode = {
        pid: node.pid || node.id,
        fid: node.id,
        // type: node.type == 1 ? 2 : 3,
        type: 2,
        requestparam: "",
        responseparam: ""
      };
      this.$refs.editWin.initData(childnode);
    },
    edit(node) {
      var creator = localStorage.getItem("creator");
      if (creator == null || creator == "") {
        this.$alert("请填写创建人", "警告", {
          confirmButtonText: "确定"
        });
        return;
      }
      var version = localStorage.getItem(this.projectid);
      if (version == null || version == "") {
        this.$alert("请填写接口版本，对应原型版本", "警告", {
          confirmButtonText: "确定"
        });
        return;
      }
      this.selectnode = node;
      this.$refs.editWin.initData(node);
    },
    addNode(child) {
      child.children = [];
      if (!this.selectnode.children) {
        this.$set(this.selectnode, "children", []);
      }
      this.selectnode.children.push(child);
    },
    remove(node, data) {
      this.$confirm("此操作将永久删除该数据, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$Axios.post("/project/delete/" + data.id).then(res => {
            if (res.data.success) {
              const parent = node.parent;
              const children = parent.data.children || parent.data;
              const index = children.findIndex(d => d.id === data.id);
              children.splice(index, 1);
            }
          });
        })
        .catch(() => {
          this.$message.info("已取消删除");
        });
    }
  }
};
</script>
