<template>
  <div v-show="isShow" class="menuedit">
    <el-form :model="interfaceDetail" label-width="80px" size="mini">
      <el-input v-model="interfaceDetail.id" type="hidden"></el-input>
      <el-form-item :label="interfaceDetail.type==3?'接口名称:':'模块名称:'">
        <el-input v-show="!isShowInfo" v-model="interfaceDetail.name" autocomplete="off"></el-input>
        <span v-show="isShowInfo">{{interfaceDetail.name}}</span>
      </el-form-item>
      <el-form-item label="请求类型:" v-show="interfaceDetail.type==3">
        <el-select v-show="!isShowInfo" class="w100pct" v-model="interfaceDetail.iftype" placeholder="请选择">
          <el-option label="GET" :value="1"></el-option>
          <el-option label="POST" :value="2"></el-option>
          <el-option label="PUT" :value="3"></el-option>
          <el-option label="DELETE" :value="4"></el-option>
        </el-select>
        <span v-show="isShowInfo">{{getTypeById(interfaceDetail.type)}}</span>
      </el-form-item>
      <el-form-item label="请求URL:" v-show="interfaceDetail.type==3">
        <el-input v-show="!isShowInfo" v-model="interfaceDetail.url" autocomplete="off"></el-input>
        <span v-show="isShowInfo">{{interfaceDetail.url}}</span>
      </el-form-item>
      <el-form-item label="说明:">
        <el-input v-show="!isShowInfo" v-model="interfaceDetail.remark" autocomplete="off"></el-input>
        <span v-show="isShowInfo">{{interfaceDetail.remark}}</span>
      </el-form-item>
      <el-form-item label="请求参数:" v-show="interfaceDetail.type==3">
        <div v-show="!isShowInfo">
          <div ref="editorParamT" class="editTitle"></div>
          <div ref="editorParam" class="editParam"></div>
        </div>
        <span v-show="isShowInfo" v-html="interfaceDetail.requestparam">{{interfaceDetail.requestparam}}</span>
      </el-form-item>
      <el-form-item label="响应参数:" v-show="interfaceDetail.type==3">
        <div v-show="!isShowInfo">
          <div ref="editorResponseT" class="editTitle"></div>
          <div ref="editorResponse" class="editParam"></div>
        </div>
        <span v-show="isShowInfo" v-html="interfaceDetail.responseparam">{{interfaceDetail.responseparam}}</span>
      </el-form-item>
    </el-form>
    <div v-show="!isShowInfo" slot="footer" class="dialog-footer">
      <el-button type="primary" class="pull-right" @click="addOrEdit()">确 定</el-button>
    </div>
  </div>
</template>

<script>
import E from 'wangeditor'
export default {
  name: "EditDetail",
  data() {
    return {
      isShow:false,
      isShowInfo:false,
      interfaceDetail: {},
      editorParam:'',
      editorParamContent:'',
      editorResponse:'',
      editorResponseContent:'',
    }
  },
  mounted () {
    this.initEditor()
  },
  methods: {
    /**
     * 初始化数据
     */
    initData(data, isShowInfo) {
      this.isShow = true
      this.isShowInfo = isShowInfo
      this.interfaceDetail = data
      this.editorParam.txt.html(this.interfaceDetail.requestparam)
      this.editorResponse.txt.html(this.interfaceDetail.responseparam)
    },
    /**
     * 初始化编辑器
     */
    initEditor () {
      this.editorParam = new E(this.$refs.editorParamT,this.$refs.editorParam)
      this.editorParam.customConfig.onchange = (html) => {
        this.interfaceDetail.requestparam = html
      }
      this.editorParam.create()
      this.editorResponse = new E(this.$refs.editorResponseT,this.$refs.editorResponse)
      this.editorResponse.customConfig.onchange = (html) => {
        this.interfaceDetail.responseparam = html
      }
      this.editorResponse.create()
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
    addOrEdit() {
      if (this.interfaceDetail.id) {
        //编辑
        this.$Axios.post("/project/update", this.interfaceDetail).then(res => {
          if (res.data.success) {
            //调取父级方法
            this.isShowInfo=true
          }
        });
      } else {
        //新增
        this.$Axios.post("/project/save", this.interfaceDetail).then(res => {
          if (res.data.success) {
            //调取父级方法
            this.$emit("saveendp", res.data.data)
            this.isShowInfo=true
          }
        });
      }
    }
  }
};
</script>

<style lang="scss" scoped>
  .editTitle {
    border:1px solid #ccc;
    background: #eee;
    font-size: 14px;
  }
  .editParam {
    border:1px solid #ccc;
    border-top: 0;
    text-align:left;
    height:200px;
    max-height:200px;
  }
  .menuedit span{
    display: block;
    margin-left: 20px;
    text-align: left !important;
  }
</style>