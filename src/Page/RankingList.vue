<!--用户管理-->
<template>
    <div class="animate" style="margin-top: 80px;padding: 20px;">
        <div style="width: 50%;margin: 0 auto">
            <avue-crud :data="data" :option="option" @on-load="onLoad"/>
        </div>
    </div>

</template>

<script>

    import {getRankList} from "@/api/rank";

    export default {
        name: "rankingList",
        data() {
            return {
                data: [],
                form: {},
                query: {},
                loading: true,
                option: {
                    index: true,
                    refreshBtn: false,
                    columnBtn: false,
                    addBtn: false,
                    menu: false,
                    align: 'center',
                    menuAlign: 'center',
                    column: [
                        {label: '捐献者', prop: 'userName',},
                        {label: '血液ID', prop: 'realName'},
                        {label: '捐献量', prop: 'volumeSum',}
                    ]
                },
            };
        },
        directives: {},
        async created() {
        },
        computed: {},
        methods: {
            async onLoad(page, params = {}) {
                this.loading = true;
                let res = await getRankList()
                this.data = res.data;
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
