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

            <template #menu="{row,index}">
                <el-button @click="openTakeBloodDialog(row,index)"
                           icon="el-icon-check"
                           size="small"
                           type="primary">
                    申请用血单
                </el-button>
            </template>
        </avue-crud>
    </div>

    <el-dialog title="输入血液信息" v-model="dialogFormVisible">
        <el-row>
            <el-col :md="12" :sm="12" :xs="24" class="grid-cell">
                <el-form-item label="血液种类" prop="">
                    <el-select class="m-2" placeholder="血液种类" size="default" v-model="blood.needBloodType">
                        <el-option
                                :key="item.value"
                                :label="item.label"
                                :value="item.value"
                                v-for="item in dict.BLOOD_TYPE"
                        />
                    </el-select>
                </el-form-item>
            </el-col>
            <el-col :md="12" :sm="12" :xs="24" class="grid-cell">
                <el-form-item label="血液容量" prop="">
                    <el-input clearable type="text" v-model="blood.needVolume"></el-input>
                    <!--                    <el-slider :max="100000" :step="200" show-stops v-model="blood.needVolume"/>-->
                </el-form-item>
            </el-col>

        </el-row>
        <template #footer>
              <span class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取消</el-button>
                <el-button @click="takeBlood()" type="primary">确定</el-button>
              </span>
        </template>
    </el-dialog>

</template>

<script>
    import {getDictByCode} from "@/api/Backstage/dict";
    // import {putTakeBlood} from "@/api/Backstage/doctor/takeBlood";
    import {getuserList, putApplyList} from "@/api/Backstage/doctor/applyBloodList";

    export default {
        name: "applyBloodList",
        data() {
            return {
                blood: {
                    needBloodType: undefined,
                    needVolume: undefined,
                    needPerson: undefined
                },
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
                        // {label: '用户ID', prop: 'userId', width: 200,},
                        {label: '用户名', prop: 'userName'},
                        {label: '年龄', prop: 'age', search: true},
                        {label: '真实姓名', prop: 'realName', search: true},
                        {
                            label: '血型', prop: 'bloodGroup', search: true,
                            dicUrl: "/dict/getDictByCode?code=BLOOD_GROUP",
                            type: "select",
                        },
                        {
                            label: 'RH', prop: 'rh', search: true,
                            dicUrl: "/dict/getDictByCode?code=RH",
                            type: "select",
                        },
                        {
                            label: '性别', prop: 'sex', search: true,
                            dicUrl: "/dict/getDictByCode?code=USER_SEX",
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
                dict: {
                    RH: undefined,
                    BLOOD_GROUP: undefined,
                    BLOOD_TYPE: undefined
                }
            };
        },
        directives: {},
        async created() {
            await this.getDict();
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
                let res = await getuserList(page.currentPage, page.pageSize, Object.assign(params, this.query))
                const data = res.data;
                this.page.total = data.total;
                this.data = data.records;
                this.loading = false;
                this.selectionClear();
            },
            async openTakeBloodDialog(row, index) {
                this.dialogFormVisible = true;
                this.blood.needPerson = row.userId;
            },
            takeBlood() {
                let res = putApplyList(this.blood);
                if (res.success) {
                    this.dialogFormVisible = false;
                }
            },
            async getDict() {
                let res = await getDictByCode('BLOOD_GROUP');
                this.dict.BLOOD_GROUP = res.data;
                res = await getDictByCode('BLOOD_TYPE');
                this.dict.BLOOD_TYPE = res.data;
                res = await getDictByCode('RH');
                this.dict.RH = res.data;
            }


        },
        mounted() {
            this.$store.commit('SET_LOADING', false);
        },
    }
</script>

<style scoped>

</style>
