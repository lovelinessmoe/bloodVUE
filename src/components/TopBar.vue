<template>
    <div :class="{'fixed':fixed,'hidden':hidden}" @click.stop="mobileShow=false"
         id="layout-header">
        <div class="site-logo">
            <router-link to="/blood/home">
                <img alt="" src="@/assets/img/logo.svg">
            </router-link>
        </div>
        <div @click.stop="mobileShow=!mobileShow" class="menus-btn">
            Menus
        </div>
        <div :class="{'mobileShow':mobileShow}" @click.stop="mobileShow=!mobileShow" class="site-menus">
            <div class="menu-item header-search">
                <header-search/>
            </div>
            <div class="menu-item">
                <router-link to="/blood/home">首页</router-link>
            </div>
            <div class="menu-item">
                <router-link to="/RankingList">排行榜</router-link>
            </div>
            <div class="menu-item"
                 v-if="this.$store.state.user?this.$store.state.user.authorities[0].authority==='ROLE_DOCTOR':false">
                <router-link to="/backstage/doctorView">查看我的申请单</router-link>
            </div>
            <div class="menu-item"
                 v-if="this.$store.state.user?this.$store.state.user.authorities[0].authority==='ROLE_DOCTOR':false">
                <router-link to="/backstage/applyBloodList">申请患者用血</router-link>
            </div>
            <div class="menu-item"
                 v-if="this.$store.state.user?this.$store.state.user.authorities[0].authority==='ROLE_DOCTOR':false">
                <router-link to="/backstage/bloodUser">抽血化验</router-link>
            </div>
            <div class="menu-item hasChild"
                 v-if="this.$store.state.user?this.$store.state.user.authorities[0].authority==='ROLE_ADMIN':false">
                <router-link to="/backstage">后台管理</router-link>
                <div class="childMenu">
                    <div class="sub-menu">
                        <router-link to="/backstage/userMan">用户管理</router-link>
                    </div>
                    <div class="sub-menu">
                        <router-link to="/backstage/bloodManagement">血液管理</router-link>
                    </div>
                    <div class="sub-menu">
                        <router-link to="/backstage/applyList">血液申请审批</router-link>
                    </div>
                </div>
            </div>
            <div class="menu-item hasChild" v-if="this.$store.state.user">
                <router-link to="/blood/userInfo">{{this.$store.state.user.username}}</router-link>
                <div class="childMenu">
                    <div class="sub-menu">
                        <a @click="switchUser()">切换账号</a>
                    </div>
                    <div class="sub-menu">
                        <a @click="logout()">退出登陆</a>
                    </div>
                </div>
            </div>

            <div class="menu-item" v-else>
                <router-link to="/login">登陆/注册</router-link>
            </div>
        </div>
    </div>

</template>

<script>
    import {logout} from "@/api/login";
    import HeaderSearch from "@/components/HeaderSearch";
    import {removeUser} from "@/utils/token";

    export default {
        name: "TopBar",
        components: {HeaderSearch},
        data() {
            return {
                lastScrollTop: 0,
                fixed: false,
                hidden: false,
                category: [],
                mobileShow: false
            }
        },
        mounted() {
            window.addEventListener('scroll', this.watchScroll);
        },
        beforeUnmount() {
            window.removeEventListener("scroll", this.watchScroll);
        },
        created() {
            // 更新vuex的用户状态
            this.$store.commit('REFRESH_USER');
        },
        methods: {
            async logout() {
                await logout();
                await removeUser();
            },
            async switchUser() {
                await logout();
                await removeUser();
                await this.$router.push("/login");
            },
            watchScroll() {
                let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
                if (scrollTop === 0) {
                    this.fixed = false;
                } else if (scrollTop >= this.lastScrollTop) {
                    this.fixed = false;
                    this.hidden = true;
                } else {
                    this.fixed = true;
                    this.hidden = false;
                }
                this.lastScrollTop = scrollTop;
            }
        }
    }
</script>

<style lang="less" scoped>
    #layout-header {
        position: fixed;
        top: 0;
        z-index: 9;
        width: 100%;
        height: 80px;
        padding: 0 80px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        transition: .3s all ease;
        -webkit-transition: .3s all ease;
        -moz-transition: .3s all linear;
        -o-transition: .3s all ease;
        -ms-transition: .3s all ease;
        background-color: #FDFDFD;

        &.hidden {
            top: -100px;
        }

        &.fixed {
            background-color: #FFFFFF;
            box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
        }
    }

    .site-logo {
        text-align: center;

        img {
            width: 120px;
            height: 120px;
        }

        p.site-name {
            font-size: 15px;
            font-weight: bold;
            position: relative;
            top: -10px;
        }
    }

    .menus-btn {
        display: none;
        visibility: hidden;
    }

    .site-menus {
        display: flex;
        align-items: center;

        .menu-item {
            min-width: 60px;
            height: 50px;
            line-height: 50px;
            text-align: center;
            position: relative;

            a {
                padding: 12px 10px;
                color: #545454;
                font-weight: 500;
                font-size: 16px;

                &:hover {
                    color: #ff6d6d;
                }
            }

            &:not(:last-child) {
                margin-right: 15px;
            }

            &.hasChild:hover .childMenu {
                opacity: 1;
                visibility: visible;
                transform: translateY(-5px);
            }
        }

        .childMenu {
            width: 130px;
            background-color: #FDFDFD;
            border-radius: 3px;
            border: 1px solid #ddd;
            box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
            position: absolute;
            top: 55px;
            z-index: 2;
            opacity: 0;
            visibility: hidden;
            transition: .7s all ease;
            -webkit-transition: .6s all ease;
            -moz-transition: .6s all linear;
            -o-transition: .6s all ease;
            -ms-transition: .6s all ease;

            &:before, &:after {
                content: '';
                position: absolute;
                width: 0;
                height: 0;
                border-left: 6px solid transparent;
                border-right: 6px solid transparent;
                border-bottom: 8px solid white;
                top: -8px;
                left: 20px;
            }

            &:before {
                top: -9px;
                border-bottom: 8px solid #ddd;
            }

            .sub-menu {
                height: 40px;
                line-height: 40px;
                position: relative;

                &:not(:last-child):after {
                    /*position: absolute;*/
                    content: '';
                    width: 50%;
                    height: 1px;
                    color: #ff6d6d;
                    bottom: 0;
                    left: 25%;
                    z-index: 99;
                }
            }
        }
    }

    @media (max-width: 960px) {
        #layout-header {
            padding: 0 20px;
        }
    }

    @media (max-width: 600px) {
        #layout-header {
            padding: 0 10px;
        }

        .menus-btn {
            display: block;
            visibility: visible;
        }

        .site-menus {
            position: absolute;
            display: none;
            visibility: hidden;
            background-color: #F9F9F9;
            width: 100%;
            left: 0;
            top: 80px;
            z-index: -9;
            box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);

            .menu-item {
                position: relative;
                height: unset;

                &:not(:last-child) {
                    margin-right: 0;
                }
            }

            .childMenu {
                position: relative;
                width: 100%;
                top: 0;
                background-color: #F3F3F3;
                opacity: 1;
                visibility: visible;
                border: none;
                box-shadow: none;

                &:before, &:after {
                    content: '';
                    position: relative;
                    width: 0;
                    height: 0;
                    border-left: 0;
                    border-right: 0;
                    border-bottom: 0;
                }
            }
        }

        .site-menus.mobileShow {
            display: inline-block;
            visibility: visible;
            z-index: 99;
        }
    }
</style>
