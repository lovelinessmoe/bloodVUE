<template>
    <div class="home">

        <div class="login_container"
             style="background-image: url('https://s1.ax1x.com/2022/05/01/OCEBE6.jpg');
                background-repeat: no-repeat;
                background-size: cover;
                height: 800px">
            <h1 style="position: relative;
        padding-top: 300px;
        margin: 0 auto;
        color: #FDFDFD;
        padding-lefteft: 450px;
        font-size: 50px;
        text-align:center;
        vertical-align:middle;
        display:block;
          ">欢迎进入血库管理系统</h1>
        </div>


    </div>
</template>

<script>

    export default {
        name: "HomePage",
        components: {},
        props: ['cate', 'words'],
        async created() {
        },
        data() {
            return {}
        },
        computed: {},
        methods: {}
    }
</script>

<style lang="less" scoped>

    .quote {
        border-left: 3px solid #ff6d6d;
        background-color: #FBFBFB;
        padding: 15px 20px;
        border-radius: 3px;
    }

    .site-content {
        .notify {
            margin: 60px 0;
            border-radius: 3px;

            & > div {
                padding: 20px;
            }
        }


        .search-result {
            padding: 15px 20px;
            text-align: center;
            font-size: 20px;
            font-weight: 400;
            border: 1px dashed #ddd;
            color: #828282;
        }
    }

    .top-feature {
        width: 100%;
        height: auto;
        margin-top: 30px;

        .feature-content {
            margin-top: 10px;
            display: flex;
            justify-content: space-between;
            position: relative;

            .feature-item {
                width: 32.9%;
            }
        }
    }

    .site-main {
        padding-top: 80px;

        &.search {
            padding-top: 0;
        }
    }

    .more {
        margin: 50px 0;

        .more-btn {
            width: 100px;
            height: 40px;
            line-height: 40px;
            text-align: center;
            color: #ADADAD;
            border: 1px solid #ADADAD;
            border-radius: 20px;
            margin: 0 auto;
            cursor: pointer;

            &:hover {
                color: #8fd0cc;
                border: 1px dashed #8fd0cc;
            }
        }
    }

    /******/
    @media (max-width: 800px) {
        .top-feature {
            display: none;
        }

        .site-main {
            padding-top: 40px;
        }

        .site-content {
            .notify {
                margin: 30px 0 0 0;
            }

            .search-result {
                margin-bottom: 20px;
                font-size: 16px;
            }
        }
    }

    /******/
</style>

