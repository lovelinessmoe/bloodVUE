<!--血液管理-->
<template>
    <div class="animate" style="margin-top: 80px;padding: 20px;">
        <el-dialog title="输入血液信息" v-model="dialogFormVisible">
            <avue-crud :data="transBloodList" :option="ineerOption">

            </avue-crud>
            <template #footer>
              <span class="dialog-footer">
                <el-button @click="dialogFormVisible = false">确定</el-button>
              </span>
            </template>
        </el-dialog>
        <avue-crud
                :data="data"
                :option="option"
                :table-loading="loading"
                @current-change="currentChange"
                @on-load="onLoad"
                @refresh-change="refreshChange"
                @search-change="searchChange"
                @search-reset="searchReset"
                @selection-change="selectionChange"
                @size-change="sizeChange"
                ref="crud"
                v-model="form"
                v-model:page="page">

            <template #menu="{row,index}">
                <el-button @click="openBloodInfoDialog(row,index)"
                           v-if="row.state === 1"
                           icon="el-icon-check"
                           size="small"
                           type="primary">
                    查看分配血液
                </el-button>
            </template>
        </avue-crud>
    </div>


</template>

<script>
    import {getApplyList, lookByBlood} from "@/api/Backstage/doctor/doctorView";

    export default {
        name: "doctorView",
        data() {
            return {
                transBloodList: undefined,
                dialogFormVisible: false,
                data: [],
                form: {},
                query: {},
                loading: true,
                option: {
                    saveBtn: false,
                    updateBtn: false,
                    cancelBtn: false,
                    delBtn: false,
                    editBtn: false,
                    addBtn: false,
                    height: 'auto',
                    calcHeight: 150,
                    tip: false,
                    searchShow: true,
                    searchMenuSpan: 6,
                    card: true,
                    excelBtn: true,
                    border: true,
                    index: true,
                    viewBtn: false,
                    selection: true,
                    dialogClickModal: false,
                    column: [
                        {label: '患者id', prop: 'needPerson'},
                        {label: '需要血液容量', prop: 'needVolume',},
                        {
                            label: '需要血型种类', prop: 'needBloodType', search: true,
                            dicUrl: "/dict/getDictByCode?code=BLOOD_TYPE",
                            type: "select",
                        },
                        {
                            label: '申请单状态', prop: 'state', search: true,
                            dicUrl: "/dict/getDictByCode?code=BLOOD_TRANS_FORM_STATE",
                            type: "select",
                        },
                    ]
                },
                ineerOption: {
                    menu: false,
                    align: 'center',
                    menuAlign: 'center',
                    column: [
                        {label: '捐献者', prop: 'takePerson',},
                        // {label: '用户ID', prop: 'userId', width: 200,},
                        {label: '血液ID', prop: 'bloodId'},
                        {label: '捐献量', prop: 'bloodVolume',},
                        {label: '捐献方式', prop: 'inSource',},
                        {
                            label: '血型', prop: 'bloodGroup',
                            dicUrl: "/dict/getDictByCode?code=BLOOD_GROUP",
                            type: "select",
                        },
                        {
                            label: 'RH', prop: 'rh',
                            dicUrl: "/dict/getDictByCode?code=RH",
                            type: "select",
                        },
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
                let res = await getApplyList(page.currentPage, page.pageSize, Object.assign(params, this.query))
                const data = res.data;
                this.page.total = data.total;
                this.data = data.records;
                this.loading = false;
                this.selectionClear();
            },
            async openBloodInfoDialog(row) {
                this.dialogFormVisible = true;
                console.log(row)
                let res = await lookByBlood(row.formId);
                this.transBloodList = res.data;
            },
            // takeBlood() {
            //   let res = putTakeBlood(this.blood);
            //   if (res.success) {
            //     this.dialogFormVisible = false;
            //   }
            // },


        },
        mounted() {
            this.$store.commit('SET_LOADING', false);
        },
    }
</script>

<style scoped>

</style>
