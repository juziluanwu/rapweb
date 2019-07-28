<template>
    <el-container width="900px">
        <el-header style="width: 600px;margin: auto">
            <el-row>
                <el-col :span="10">
                    <el-input
                            placeholder="输入关键字进行过滤"
                            v-model="filterText">
                    </el-input>
                </el-col>
            </el-row>
        </el-header>
        <el-container>
            <el-aside width="400px" height="auto">
                <div class="block">
                    <el-tree
                            :data="treedata"
                            :props="treedataprop"
                            node-key="id"
                            default-expand-all
                            @node-click="selectNode"
                            highlight-current
                            :filter-node-method="filterNode"
                            :expand-on-click-node="false"
                            ref="tree"
                    >
      <span class="custom-tree-node" slot-scope="{ node, data }">
        <span>{{ node.label }}</span>
        <span>
          <el-button
                  v-if="data.type != 3"
                  type="text"
                  size="mini"
                  @click="() => append(data)">
            新增
          </el-button>
             <el-button
                     type="text"
                     size="mini"
                     @click="() => edit(data)">
            编辑
          </el-button>
          <el-button
                  v-if="data.type != 1"
                  type="text"
                  size="mini"
                  @click="() => remove(node, data)">
            删除
          </el-button>
        </span>
      </span>
                    </el-tree>
                </div>

            </el-aside>
            <el-main>
                <detail-info v-if="operate=='info' && interfacetype == '3'"
                             :interfaceDetail="interfaceinfo"></detail-info>
                <edit-detail v-if="operate=='edit' && interfacetype == '3'"
                             :interfaceDetail="interfaceinfo"></edit-detail>
            </el-main>
        </el-container>
    </el-container>
</template>

<script>
    import edit_detail from './EditDetail'
    import detail_info from './DetailInfo'

    export default {
        name: "MenuDetail",
        components: {
            'edit-detail': edit_detail,
            'detail-info': detail_info
        },
        watch: {
            filterText(val) {
                this.$refs.tree.filter(val);
            }
        },
        data() {
            return {
                operate: '',//显示编辑还是详情
                filterText: '',
                interfaceinfo: {},//接口详情
                interfacetype: '',//菜单的类型
                projectid: '',//项目id
                treedata: [],
                treedataprop: {
                    label: 'name',
                    children: 'children'
                }
            }

        },
        mounted() {
            this.projectid = this.$route.params.id;//获取router传过来的参数
            this.menutree();
        },
        methods: {
            searchInterface() {

            },
            menutree() {

                this.$Axios.get(this.BASEURL + '/menu/list/' + this.projectid)
                    .then(res => {
                        if (res.data.success) {
                            this.inittree(res.data.data)
                        }
                    })
            },
            inittree(data) {
                let tree = []

                if (data && data.length) {
                    for (var i = 0; i < data.length; i++) {
                        let item = data[i]
                        if (item.type == 1) {
                            let node = item
                            this.digui(data, node)
                            tree.push(node)
                        }
                    }
                }
                this.treedata = tree
            },
            digui(data, fdata) {
                fdata.children = []
                for (var i = 0; i < data.length; i++) {
                    let citem = data[i]
                    if (citem.fid == fdata.id) {
                        fdata.children.push(citem)
                        this.digui(data, citem)
                    }
                }
            },
            filterNode(value, data) {
                if (!value) return true;
                return data.name.indexOf(value) !== -1;
            },
            // setDetailId(){
            //     return this.interfaceinfo.id;
            // },
            selectNode(node) {
                this.interfacetype = node.type
                this.operate = 'info'
                if (this.interfacetype == 3) {
                    // this.$refs.childinfo.getdetail(node.id)
                    this.$Axios.get(this.BASEURL + '/detail/info/' + node.id)
                        .then(res => {
                            if (res.data.success) {

                                this.interfaceinfo = res.data.data
                                if (this.interfaceinfo == null) {
                                    this.interfaceinfo = {}
                                }
                            }
                        })


                }

            },
            append(data) {


                // const newChild = { id: id++, label: 'testtest', children: [] };
                // if (!data.children) {
                //     this.$set(data, 'children', []);
                // }
                // data.children.push(newChild);
            },
            addNode(){

            }

        }
    }
</script>

<style scoped>

</style>