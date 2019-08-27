<template>
  <div v-show="isShow" class="menushow">
    <el-form :model="interfaceDetail" label-width="80px" size="mini">
      <el-form-item :label="interfaceDetail.type==3?'接口名称:':'模块名称:'">
        <span>{{interfaceDetail.name}}</span>
      </el-form-item>
      <el-form-item label="请求类型:" v-show="interfaceDetail.type==3">
        <span>{{getTypeById(interfaceDetail.type)}}</span>
      </el-form-item>
      <el-form-item label="请求URL:" v-show="interfaceDetail.type==3">
        <span>{{interfaceDetail.url}}</span>
      </el-form-item>
      <el-form-item label="说明:">
        <span>{{interfaceDetail.remark}}</span>
      </el-form-item>
      <el-form-item label="请求参数:" v-show="interfaceDetail.type==3">
        <span v-html="interfaceDetail.requestparam">{{interfaceDetail.requestparam}}</span>
      </el-form-item>
      <el-form-item label="响应参数:" v-show="interfaceDetail.type==3">
        <span v-html="interfaceDetail.responseparam">{{interfaceDetail.responseparam}}</span>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "EditDetail",
  data() {
    return {
      isShow:false,
      interfaceDetail: {},
    }
  },
  methods: {
    /**
     * 初始化数据
     */
    initData(data) {
      this.isShow = true
      this.interfaceDetail = data
    },
    getTypeById(type) {
      //1get 2post 3put 4delete
      if (type == 1) {
        return "GET";
      } else if (type == 2) {
        return "POST";
      } else if (type == 3) {
        return "PUT";
      } else if (type == 4) {
        return "DELETE";
      }
    },
  }
};
</script>

<style lang="scss" scoped>
  .menushow span{
    display: block;
    margin-left: 10px;
    background: #eee;
    padding: 0 20px;
    text-align: left !important;
  }
</style>