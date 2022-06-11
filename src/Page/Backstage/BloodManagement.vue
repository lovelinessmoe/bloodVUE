<template>
  <!-- eslint-disable-next-line -->
  <div class="animate" style="margin-top: 80px;padding: 20px;">

    <h1 style="margin: 0 auto; text-align: center; color: #d81e06">血液管理</h1>
    <el-row style="margin-bottom:20px">
      <el-radio-group v-model="sizeValue">

      </el-radio-group>
    </el-row>
    <avue-form ref="form" v-model="obj" :option="option" @reset-change="emptytChange" @submit="submit">
<!--      <template #menu-form="">-->
<!--        <el-button @click="tip">自定义按钮</el-button>-->
<!--      </template>-->
    </avue-form>
  </div>
</template>

<script>
var DIC = {
  VAILD: [{
    label: '真',
    value: 'true'
  }, {
    label: '假',
    value: 'false'
  }],
  SEX: [{
    label: '男',
    value: 0
  }, {
    label: '女',
    value: 1
  }]
}
export default {
  name: "BloodManagement",
  data() {
    return {
      obj:{},
      sizeValue:'small'
    }
  },
  computed: {
    option(){
      return{
        size:this.sizeValue,
        mockBtn:true,
        submitText: '完成',
        printBtn:true,
        column: [{
          label: "姓名",
          prop: "username",
          tip: '这是信息提示',
          span: 8,
          maxlength: 3,
          suffixIcon: 'el-icon-tickets',
          prefixIcon: 'el-icon-tickets',
          minlength: 2,
          mock:{
            type:'name',
            en:true,
          },
          rules: [{
            required: true,
            message: "请输入用户名",
            trigger: "blur"
          }],
          // click:({value,column})=>{
          //   this.$message.success('click')
          // }
        },
          {
            label: "姓名",
            prop: "name",
            disabled:true,
            mock:{
              type:'name'
            },
            span:8
          },
          {
            label: "密码",
            prop: "password",
            type:'password',
            mock:{
              type:'name'
            },
            span:8
          },
          {
            label: "血型",
            prop: "type",
            type: "select",
            dicData: DIC.VAILD,
            span:6,
            mock:{
              type:'dic',
            },
          },
          // {
          //   label: "权限",
          //   prop: "grade",
          //   span: 6,
          //   type: "checkbox",
          //   dicData: DIC.VAILD,
          //   mock:{
          //     type:'dic',
          //   },
          // },
          // {
          //   label: "性别",
          //   prop: "switch",
          //   span: 6,
          //   type: "switch",
          //   dicData: DIC.SEX,
          //   mock:{
          //     type:'dic'
          //   },
          //   hide: true,
          //   row:true,
          // },
          {
            label: "性别",
            prop: "sex",
            span: 6,
            type: "radio",
            dicData: DIC.SEX,
            mock:{
              type:'dic'
            }
          },
          {
            label: "献血量",
            prop: "number",
            type: 'number',
            span: 6,
            precision:2,
            mock:{
              type:'number',
              max:1,
              min:2,
              precision:2
            },
            minRows: 0,
            maxRows: 3,
            row:true,
          },
          {
            label: "网站",
            span: 12,
            prop: "url",
            prepend:'http://',
            mock:{
              type:'url',
              header:false,
            },
            append:'com',
            row:true,
          },
          {
            label: "献血日期",
            prop: "date",
            type: "date",
            span:8,
            format:'yyyy-MM-dd',
            valueFormat:'yyyy-MM-dd',
            mock:{
              type:'datetime',
              format:'yyyy-MM-dd'
            },
          },
          // {
          //   label: "日期时间",
          //   prop: "datetime",
          //   type: "datetime",
          //   span:8,
          //   format:'yyyy-MM-dd hh:mm:ss',
          //   valueFormat:'yyyy-MM-dd hh:mm:ss',
          //   mock:{
          //     type:'datetime',
          //     format:'yyyy-MM-dd hh:mm:ss',
          //     now:true,
          //   },
          // },
          {
            label: "时间",
            prop: "time",
            type: "time",
            span:8,
            format:'hh:mm:ss',
            valueFormat:'hh:mm:ss',
            mock:{
              type:'datetime',
              format:'hh:mm:ss'
            },
          },
          {
            label: "献血地址",
            span: 24,
            prop: "address",
            mock:{
              type:'county'
            },
          },{
            label: "指导建议",
            span: 24,
            prop: "adit",
            mock:{
              type:'word',
              min:10,
              max:30
            },
          }]
      }
    }
  },
  mounted(){
    this.obj={
      username :'smallwei',
      switch:0,
      phone:'17547400800'
    }
  },
  methods:{
    emptytChange(){
      this.$message.success('清空方法回调');
    },
    submit () {
      this.$message.success('当前数据'+JSON.stringify(this.obj));
    },
    // tip(){
    //   this.$message.success('自定义按钮');
    // }
  }
}


</script>

<style scoped>

</style>
