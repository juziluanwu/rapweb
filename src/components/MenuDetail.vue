<template>
    <el-container>
        <el-header style="width: 600px;margin: auto">
            <el-row>
                <el-col :span="10">
                    <el-input v-model="interfaceinfo" placeholder="请输入内容"></el-input>
                </el-col>
                <el-col :span="10">
                    <el-button @click="searchInterface()">搜索</el-button>
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
                            :expand-on-click-node="false">
      <span class="custom-tree-node" slot-scope="{ node, data }">
        <span>{{ node.label }}</span>
        <span>
          <el-button
                  type="text"
                  size="mini"
                  @click="() => append(data)">
            新增
          </el-button>
          <el-button
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
            <el-main>Main</el-main>
        </el-container>
    </el-container>
</template>

<script>
    export default {
        name: "MenuDetail",
        data() {
            return {
                interfaceinfo: '',
                projectid: '',
                treedata: [],
                treedataprop: {
                    label: 'name',
                    children: 'children'
                }
            }

        },
        mounted() {
            this.projectid = this.$route.params.id;
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
            }
        }
    }
</script>

<style scoped>

</style>