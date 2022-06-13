<!--用户管理-->
<template>
  <div class="animate" style="margin-top: 80px;padding: 20px;">
    <avue-crud
        :data="data"
        :option="option"
        :table-loading="loading"
        @current-change="currentChange"
        @on-load="onLoad"
        @refresh-change="refreshChange"
        @row-del="rowDel"
        @row-save="rowSave"
        @row-update="rowUpdate"
        @search-change="searchChange"
        @search-reset="searchReset"
        @selection-change="selectionChange"
        @size-change="sizeChange"
        ref="crud"
        v-model="form"
        v-model:page="page">

      <template #menu-left="">
        <el-button @click="delSelection" text type="danger">
          删除{{selectionList.length}}个用户
        </el-button>


      </template>


    </avue-crud>
  </div>

</template>

<script>
import {add, getList, remove, removeMany, update} from "@/api/Backstage/admin/user";

export default {
  name: "bloodManagemnet",
  data() {
    return {
      data: [],
      form: {},
      query: {},
      loading: true,
      option: {

        addBtn:false,
        height: 'auto',
        calcHeight: 150,
        tip: true,
        searchShow: true,
        searchMenuSpan: 6,
        card: true,
        excelBtn: true,
        border: true,
        index: true,
        viewBtn: false,
        selection: true,
        dialogClickModal: true,
        column: [
          {label: '血液ID', prop: 'blood_id'},
          {label: '捐献方式', prop: 'in_source'},
          {
            label: '血型', prop: 'blood_type', search: true,
            dicUrl: "/dict/getDictByCode?code=ROLE",
            type:"select",
          },
          {label: '捐献开始时间', prop: 'take_time', width: 200, search: true},
          {label: '捐献结束时间', prop: 'expire_time', search: true},
          // {label: 'xu', prop: 'realName', search: true},
          {
            label: '血型', prop: 'bloodGroup', search: true,
            dicUrl: "/dict/getDictByCode?code=BLOOD_GROUP",
            type:"select",
          },
          {
            label: 'RH', prop: 'rh', search: true,
            dicUrl: "/dict/getDictByCode?code=RH",
            type:"select",
          },
          {
            label: '捐献量', prop: 'blood_volume', search: true,
            dicUrl: "/dict/getDictByCode?code=USER_SEX",
            type:"select",
          },
          {label: '年龄', prop: 'age', search: true},
        ]
      },
      currentStartIndex: 0,
      currentEndIndex: 20,
      page: {
        pageSize: 10,
        currentPage: 1,
        total: 0
      },
      selectionList: [],
    };
  },
  directives: {},
  async created() {
  },
  computed: {},
  methods: {
    async delSelection() {
      if (this.selectionList.length !== 0) {
        let r = await this.$confirm("确定将选择数据删除?", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
        if (r === 'confirm') {
          let res = await removeMany(this.selectionList);
          if (res.success) {
            await this.onLoad(this.page);
            this.$message({
              type: "success",
              message: "操作成功!"
            });
          }
        }
      } else {
        this.$message.error('未选中任何项')
      }
    },
    async rowSave(row, done, loading) {
      try {
        await add(row)
        await this.onLoad(this.page);
        this.$message({
          type: "success",
          message: "操作成功!"
        });
        done();
      } catch (e) {
        loading();
        console.log(e);
      }
    },
    async rowUpdate(row, index, done, loading) {
      try {
        await update(row)
        await this.onLoad(this.page);
        this.$message({
          type: "success",
          message: "操作成功!"
        });
        done();
      } catch (e) {
        loading();
        console.log(e);
      }
    },
    async rowDel(row) {
      let r = await this.$confirm("确定将选择数据删除?", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
      if (r === 'confirm') {
        let res = await remove(row.userId);
        if (res.success) {
          await this.onLoad(this.page);
          this.$message({
            type: "success",
            message: "操作成功!"
          });
        }
      }
    },
    searchReset() {
      this.query = {};
      this.onLoad(this.page);
    },
    searchChange(params, done) {
      this.query = params;
      this.page.currentPage = 1;
      this.onLoad(this.page, params);
      done();
    },
    selectionChange(list) {
      this.selectionList = list;
    },
    selectionClear() {
      this.selectionList = [];
      this.$refs.crud.toggleSelection();
    },
    currentChange(currentPage) {
      this.page.currentPage = currentPage;
    },
    sizeChange(pageSize) {
      this.page.pageSize = pageSize;
    },
    refreshChange() {
      this.onLoad(this.page, this.query);
    },
    async onLoad(page, params = {}) {
      this.loading = true;
      let res = await getList(page.currentPage, page.pageSize, Object.assign(params, this.query))
      const data = res.data;
      this.page.total = data.total;
      this.data = data.records;
      this.loading = false;
      this.selectionClear();
    }
  },
  mounted() {
    this.$store.commit('SET_LOADING', false);
  },
}
</script>

<style scoped>

</style>
