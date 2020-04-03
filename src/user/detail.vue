<template>
  <div v-show="isShow" class="menuedit">
    <div v-show="!isShowInfo" slot="footer" class="dialog-footer">
      <el-button type="primary" class="pull-right" @click="addOrEdit()">确 定</el-button>
      <el-button
        type="primary"
        style="margin-right:20px;"
        class="pull-right"
        @click="formatSome()"
      >格式化</el-button>
    </div>
    <el-form :model="interfaceDetail" label-width="80px" size="mini">
      <template>
        <el-select v-model="interfaceDetail.type" placeholder="请选择">
          <el-option label="模块" :value="2"></el-option>
          <el-option label="接口" :value="3"></el-option>
        </el-select>
        <div class="author">author:{{interfaceDetail.creator}}</div>
      </template>
      <el-input v-model="interfaceDetail.id" type="hidden"></el-input>
      <el-form-item :label="interfaceDetail.type==3?'接口名称:':'模块名称:'">
        <el-input v-show="!isShowInfo" v-model="interfaceDetail.name" autocomplete="off"></el-input>
        <span v-show="isShowInfo">{{interfaceDetail.name}}</span>
      </el-form-item>
      <el-form-item label="请求类型:" v-show="interfaceDetail.type==3">
        <span>{{getTypeById(interfaceDetail.iftype)}}</span>
      </el-form-item>
      <el-form-item label="请求URL:" v-show="interfaceDetail.type==3">
        <span>{{interfaceDetail.url}}</span>
      </el-form-item>
      <el-form-item label="说明:">
        <span>{{interfaceDetail.remark}}</span>
      </el-form-item>
      <div class="aotoCon">
        <el-form-item label="请求参数:" v-show="interfaceDetail.type==3">
          <span v-html="interfaceDetail.requestparam">{{interfaceDetail.requestparam}}</span>
        </el-form-item>
        <el-form-item label="响应参数:" v-show="interfaceDetail.type==3">
          <span v-html="interfaceDetail.responseparam">{{interfaceDetail.responseparam}}</span>
        </el-form-item>
      </div>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "EditDetail",
  data() {
    return {
      isShow: false,
      isShowInfo: false,
      interfaceDetail: {},
      editorParam: "",
      editorParamContent: "",
      editorResponse: "",
      editorResponseContent: ""
    };
  },
  methods: {
    /**
     * 初始化数据
     */
    initData(data, isShowInfo) {
      if (data.id != null) {
        this.$Axios.get("/project/info/" + data.id).then(res => {
          if (res.data.success) {
            this.isShow = true;
            this.interfaceDetail = res.data.data;
            this.isShowInfo = isShowInfo;
            this.interfaceDetail.requestparam = this.interfaceDetail.requestparam.replace(
              / /g,
              "&nbsp;"
            );
            this.interfaceDetail.responseparam = this.interfaceDetail.responseparam.replace(
              / /g,
              "&nbsp;"
            );
            if (!isShowInfo) {
              this.editorParam.txt.html(this.interfaceDetail.requestparam);
              this.editorResponse.txt.html(this.interfaceDetail.responseparam);
            }
          }
        });
      } else {
        this.isShow = true;
        this.interfaceDetail = data;
        this.isShowInfo = isShowInfo;
        this.interfaceDetail.requestparam = this.interfaceDetail.requestparam.replace(
          / /g,
          "&nbsp;"
        );
        this.interfaceDetail.responseparam = this.interfaceDetail.responseparam.replace(
          / /g,
          "&nbsp;"
        );
        if (!isShowInfo) {
          this.editorParam.txt.html(this.interfaceDetail.requestparam);
          this.editorResponse.txt.html(this.interfaceDetail.responseparam);
        }
      }
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
    }
  }
};
</script>

<style lang="scss" scoped>
.editTitle {
  border: 1px solid #ccc;
  background: #eee;
  font-size: 14px;
}

.editParam {
  border: 1px solid #ccc;
  border-top: 0;
  text-align: left;
  height: 200px;
  max-height: 200px;
}

.ResponseH {
  height: 700px;
  max-height: 700px;
}

.menuedit span {
  display: block;
  margin-left: 10px;
  background: #eee;
  padding: 0 20px;
  text-align: left !important;
}
</style>