<template>
  <div class="animate" style="margin-top: 80px;padding: 20px;">
    <div class="login_container"
         style="background-image: url('https://s1.ax1x.com/2022/06/11/XgZUnU.png');
                background-repeat: no-repeat;
                background-size: cover;
                height: 800px">


      <avue-crud :data="data" :option="option" :table-loading="showLoading" >
        <template >
          <el-dropdown-item divided >自定义按钮</el-dropdown-item>
        </template>
        <template >
          <el-button :type="type" :size="size">自定义按钮</el-button>
        </template>
      </avue-crud>

    </div>
  </div>
</template>

<script>
export default {
  name: "bloodTest",
  data() {
    return {
      page:{
        total:100,
        currentPage: 1
      },
      data: [
        {
          name:'张三',
          sex:'男'
        }, {
          name:'李四',
          sex:'女'
        }, {
          name:'王五',
          sex:'女'
        }, {
          name:'赵六',
          sex:'男'
        },
        {
          name:'赵六',
          sex:'男'
        },
        {
          name:'赵六',
          sex:'男'
        },
        {
          name:'赵六',
          sex:'男'
        },{
          name:'赵六',
          sex:'男'
        },{
          name:'赵六',
          sex:'男'
        },{
          name:'赵六',
          sex:'男'
        },
        {
          name:'赵六',
          sex:'男'
        },
        {
          name:'赵六',
          sex:'男'
        }




      ],
      menuType:'text',
      showLoading:false,
      showCard:false,
      showBorder: false,
      showStripe: false,
      showHeader: true,
      showIndex: true,
      showCheckbox: false,
      showPage:true,
      sizeValue:'small'
    }
  },
  computed: {
    option(){
      return{
        title:'',
        titleSize:'h3',
        titleStyle:{
          color:'red'
        },
        card:this.showCard,
        border:this.showBorder,
        stripe:this.showStripe,
        showHeader:this.showHeader,
        index:this.showIndex,
        size:this.sizeValue,
        selection:this.showCheckbox,
        page:this.showPage,
        align:'center',
        menuAlign:'center',
        menuType:this.menuType,
        menuBtnTitle:'自定义名称',
        column:[
          {
            label:'姓名',
            prop:'name',
            search:true
          },
          {
            label:'性别',
            prop:'sex'
          }
        ]
      }
    }
  }
}


</script>

<style scoped>

</style>
