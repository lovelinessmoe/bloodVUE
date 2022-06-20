<!--血液管理-->
<template>
    <div class="animate" style="margin-top: 80px;padding: 20px;">
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

            <template #menu="{row}">
                <el-button @click="applyReq(row,true)"
                           v-if="row.state === 0"
                           icon="el-icon-check"
                           size="small"
                           type="primary">
                    同意申请
                </el-button>
                <el-button @click="applyReq(row,false)"
                           v-if="row.state === 0"
                           icon="el-icon-close"
                           size="small"
                           type="danger">
                    拒绝申请
                </el-button>
            </template>
        </avue-crud>
    </div>
</template>

<script>
    import {approvalBlood, getApplyList} from "@/api/Backstage/admin/applyList";

    export default {
        name: "ApplyList",
        data() {
            return {
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
            async applyReq(row, accept) {
                approvalBlood(row.formId,accept);
                this.onLoad(this.page);
            },
        },
        mounted() {
            this.$store.commit('SET_LOADING', false);
        },
    }
</script>

<style scoped>

</style>
