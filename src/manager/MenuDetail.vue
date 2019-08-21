<template>
  <div id="v-detail" style="width: 1300px;margin: auto;">
    <el-container width="900px">
      <el-container>
        <el-aside width="400px" height="auto">
          <div class="block">
          <el-input placeholder="输入关键字进行过滤" v-model="filterText"></el-input>
            <el-tree
            style="margin-top:20px;"
              :data="treedata"
              :props="treedataprop"
              node-key="id"
              default-expand-all
              highlight-current
              :filter-node-method="filterNode"
              :expand-on-click-node="false"
              ref="tree"
            >
              <span class="tree-item" slot-scope="{ node, data }">
                <span @click="selectNode(data)">{{ node.label }}</span>
                <span class="tree-btn">
                  <el-button
                    v-if="data.type != 3"
                    type="text"
                    size="mini"
                    @click="append(data)"
                  >新增</el-button>
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
import "@/sass/components/MenuDetail.scss"
import edit_detail from "./EditDetail";

export default {
  name: "MenuDetail",
  components: {
    "edit-detail": edit_detail,
  },
  watch: {
    filterText(val) {
      this.$refs.tree.filter(val);
    },
  },
  data() {
    return {
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
  mounted() {
    this.projectid = this.$route.params.id; //获取router传过来的参数
    this.menutree();
  },
  methods: {
    menutree() {
      this.$Axios.get("/project/tree?pid=" + this.projectid).then(res => {
        if (res.data.success) {
          this.inittree(res.data.data);
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
      return data.name.indexOf(value) !== -1;
    },

    selectNode(node) {
      this.selectnode = node
      this.$refs.editWin.initData(node,true)
    },
    append(node) {
      this.selectnode = node
      let childnode = {
        pid: node.pid||node.id,
        fid: node.id,
        type: node.type == 1? 2 : 3,
        requestparam:'',
        responseparam:'',
      };
      this.$refs.editWin.initData(childnode)
    },
    edit(node) {
      this.selectnode = node
      this.$refs.editWin.initData(node)
    },
    addNode(child) {
      child.children = [];
      if (!this.selectnode.children) {
        this.$set(this.selectnode, "children", []);
      }
      this.selectnode.children.push(child);
    },
  }
};
</script>
