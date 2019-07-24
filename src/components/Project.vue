<template>
  <div id="v-project" style="width: 600px;margin: auto">
    <el-container>
      <el-header>
        <h1>  接口文档</h1>
      </el-header>
      <el-main>
        <el-row>
          <el-col :span="12"><div class="grid-content bg-purple"><el-input v-model="input" placeholder="请输入内容"></el-input></div></el-col>
          <el-col :span="12"><div class="grid-content bg-purple-light"> <el-button round>搜索</el-button></div></el-col>
        </el-row>
        <template>
          <el-table
                  :data="tableData"
                  style="width: 100%">
            <el-table-column
                    prop="date"
                    label="项目名称"
                    width="180">
            </el-table-column>
            <el-table-column
                    prop="name"
                    label="操作"
                    width="180">
            </el-table-column>

          </el-table>
        </template>
      </el-main>
    </el-container>
  </div>
</template>

<script>
export default {

  name: 'project',
  props: {
    msg: String
  }
}

 new Vue({
  el: '#v-project',
})
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
