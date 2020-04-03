<template>
  <div class="v-detail" style="width: 1300px;margin: auto;">
    <el-container>
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
                <span class="span-ellipsis" @click="selectNode(data)">
                  {{ node.label }}
                </span>
                <span class="tree-btn">
                  <span class="version">{{data.version}}</span>
                </span>
              </span>
            </el-tree>
          </div>
        </el-aside>
        <el-main class="edit-main">
          <div class="show-info">
            <edit-detail ref="editWin"></edit-detail>
          </div>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import "@/sass/components/MenuDetail.scss";
import edit_detail from "./detail";

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
    /**
     * 初始化树状图数据
     */
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
    /**
     * 检索内容
     */
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
    /**
     * 选取节点 展示在右边
     */
    selectNode(node) {
      this.selectnode = node;
      this.$refs.editWin.initData(node, true);
    },
  }
};
</script>
