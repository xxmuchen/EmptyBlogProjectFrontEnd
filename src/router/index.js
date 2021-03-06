import {createRouter, createWebHashHistory} from 'vue-router'

// 1. 定义路由组件， 注意，这里一定要使用 文件的全名（包含文件后缀名）
// import countIndex from '../pages/count/countIndex.vue';
// import langshanIndex from '../pages/langshan/langshanIndex.vue';
// import ScreenIndex from '../pages/screen/ScreenIndex.vue';
// import HomePage from '@/page/前端/首页/HomePage';

import HomePageDisplay from '@/components/前端组件/首页组件/HomePageDisplay';
import HomePageDiaryDisplay from '@/components/前端组件/首页组件/HomePageDiaryDisplay';
import HomePageSentenceDisplay from '@/components/前端组件/首页组件/HomePageSentenceDisplay';
import HomePageVlogDisplay from '@/components/前端组件/首页组件/HomePageVlogDisplay';
import HomePageGraphicDisplay from '@/components/前端组件/首页组件/HomePageGraphicDisplay.vue';
import DiaryPage from '@/page/前端/日记页/DiaryPage';
import homePage from '@/page/前端/首页/HomePage';
import DiaryPageHomeDisplay from '@/components/前端组件/日记页组件/DiaryPageHomeDisplay';
// import DiaryPageNewDiaryDisplay from '@/components/前端组件/日记页组件/DiaryPageDiaryDisplay';
// import DiaryPageRecommendDiaryDisplay from '@/components/前端组件/日记页组件/DiaryPageRecommendDiaryDisplay';
// import DiaryPageTopListDiaryDisplay from '@/components/前端组件/日记页组件/DiaryPageTopListDiaryDisplay';
import DiaryPageDiaryDetailDisplay from '@/components/前端组件/日记页组件/DiaryPageDiaryDetailDisplay';
import SentencePage from '@/page/前端/句子页/SentencePage';
import SentencePageHomeDisplay from '@/components/前端组件/句子页组件/SentencePageHomeDisplay'
import DiaryPageDiaryDisplay from '@/components/前端组件/日记页组件/DiaryPageDiaryDisplay';
import VLogPage from '@/page/前端/Vlog页/VLogPage'
import GriphicPage from '@/page/前端/图文页/GriphicPage'
import GriphicPageHomePageDisplay from "@/components/前端组件/图文页组件/GriphicPageHomePageDisplay";
import GriphicPageDetailPageDisplay from "@/components/前端组件/图文页组件/GriphicPageDetailPageDisplay";
// import VLogPageDisplay from '@/components/前端组件/Vlog页组件/VLogPageDisplay'
import UserRegistPage from '@/page/前端/注册页/UserRegistPage'
import UserLoginPage from "@/page/前端/登录页/UserLoginPage";
import WriteDiary from "@/page/前端/日记页/写日记/WriteDiary";
// import ObserveComponent from "@/components/前端组件/评论组件/ObserveComponent";
import WriteSentence from "@/page/前端/句子页/写句子/WriteSentence";
import SentencePageDetailDisplay from "@/components/前端组件/句子页组件/SentencePageDetailDisplay";
import WriteVlog from "@/page/前端/Vlog页/上传视频/WriteVlog";
import WriteGriphic from "@/page/前端/图文页/上传图文/WriteGriphic";
import MySpace from "@/page/前端/我的空间/MySpace";
import MySpaceOwnDiary from "@/components/前端组件/我的空间组件/放空日记/MySpaceOwnDiary";
import MySpaceOwnStarDiary from "@/components/前端组件/我的空间组件/放空日记/MySpaceOwnStarDiary";
import MySpaceOwnCollectDiary from "@/components/前端组件/我的空间组件/放空日记/MySpaceOwnCollectDiary";
import MySpaceOwnSentence from "@/components/前端组件/我的空间组件/放空句子/MySpaceOwnSentence";
import MySpaceOwnStarSentence from "@/components/前端组件/我的空间组件/放空句子/MySpaceOwnStarSentence";
import MySpaceOwnCollectSentence from "@/components/前端组件/我的空间组件/放空句子/MySpaceOwnCollectSentence";
import MySpaceOwnVlog from "@/components/前端组件/我的空间组件/放空Vlog/MySpaceOwnVlog";
import VlogPageDetailDisplay from "@/components/前端组件/Vlog页组件/VlogPageDetailDisplay";
// import MySpaceOwnStarVlog from "@/components/前端组件/我的空间组件/放空Vlog/MySpaceOwnStarVlog";
import MySpaceOwnCollectVlog from "@/components/前端组件/我的空间组件/放空Vlog/MySpaceOwnCollectVlog";
import MySpaceOwnStarVlog from "@/components/前端组件/我的空间组件/放空Vlog/MySpaceOwnStarVlog";
import MySpaceOwnGriphic from "@/components/前端组件/我的空间组件/放空图文/MySpaceOwnGriphic";
import MySpaceOwnStarGriphic from "@/components/前端组件/我的空间组件/放空图文/MySpaceOwnStarGriphic";
import MySpaceOwnCollectGriphic from "@/components/前端组件/我的空间组件/放空图文/MySpaceOwnCollectGriphic";
import MySpaceOwnSetting from "@/components/前端组件/我的空间组件/设置/MySpaceOwnSetting";
import AdminLogin from "@/page/后端/登录页/AdminLogin";
import AdminPage from "@/page/后端/主页面/AdminPage";
import UserInfoManage from "@/components/后端组件/用户管理/UserInfoManage";
import DiaryInfoManage from "@/components/后端组件/日记管理/DiaryInfoManage";
import SentenceInfoManage from "@/components/后端组件/句子管理/SentenceInfoManage";
import VlogInfoManage from "@/components/后端组件/Vlog管理/VlogInfoManage";
import GriphicInfoManage from "@/components/后端组件/图文管理/GriphicInfoManage";
import UserLoginAndRegistInfoVisualizationDisplay
    from "@/components/后端组件/用户信息可视化展示/用户信息可视化/用户居住地址可视化/UserLoginAndRegistInfoVisualizationDisplay";
import UserLocationInfoVisualizationDisplay
    from "@/components/后端组件/用户信息可视化展示/用户信息可视化/用户注册登录可视化/UserLocationInfoVisualizationDisplay";
import BlogWriteInfoVisualizationDisplay
    from "@/components/后端组件/用户信息可视化展示/日记信息可视化/日记撰写可视化/BlogWriteInfoVisualizationDisplay";
import BlogObserveInfoVisualizationDisplay
    from "@/components/后端组件/用户信息可视化展示/日记信息可视化/日记评论可视化/BlogObserveInfoVisualizationDisplay";
// import BlogStarAndCollectInfoVisualizationDisplay
//     from "@/components/后端组件/用户信息可视化展示/日记信息可视化/日记点赞收藏可视化/BlogStarInfoVisualizationDisplay";
import BlogStarInfoVisualizationDisplay
    from "@/components/后端组件/用户信息可视化展示/日记信息可视化/日记点赞收藏可视化/BlogStarInfoVisualizationDisplay";
import BlogCollectInfoVisualizationDisplay
    from "@/components/后端组件/用户信息可视化展示/日记信息可视化/日记点赞收藏可视化/BlogCollectInfoVisualizationDisplay";
import SentencePageTagDisplay from "@/components/前端组件/句子页组件/SentencePageRightSideBar/SentencePageTagDisplay";
import ManagerInfoManage from "@/components/后端组件/管理员管理/一级管理员管理/ManagerInfoManage";
import SuperManagerInfoManage from "@/components/后端组件/管理员管理/二级管理员管理/SuperManagerInfoManage";
import AdminNoticeManage from "@/components/后端组件/公告管理/公告管理/AdminNoticeManage";
import SensitiveWordsManage from "@/components/后端组件/敏感词汇管理/SensitiveWordsManage";

// 2. 定义路由配置
const routes = [
    // 前台部分
    {
        path: '/' ,
        redirect: '/HomePage'
    },
    {
        name:'HomePage' ,
        path: '/HomePage',
        component: homePage,
        redirect: '/HomePage/HomePageDisplay',
        children: [
            { name:'HomePageDisplay' , path: 'HomePageDisplay', component: HomePageDisplay },
            { name:'HomePageDisplay' , path: 'HomePageDisplay', component: HomePageDisplay },
            { name:'HomePageDiaryDisplay' , path: 'HomePageDiaryDisplay', component: HomePageDiaryDisplay },
            { name:'HomePageSentenceDisplay' , path: 'HomePageSentenceDisplay', component: HomePageSentenceDisplay },
            { name:'HomePageVlogDisplay' , path: 'HomePageVlogDisplay', component: HomePageVlogDisplay },
            { name:'HomePageGraphicDisplay' , path: 'HomePageGraphicDisplay', component: HomePageGraphicDisplay },
            {
                name: 'MySpace' ,
                path: 'MySpace' ,
                component: MySpace ,
                children: [
                    { name:'MySpaceOwnDiary' , path: 'MySpaceOwnDiary', component: MySpaceOwnDiary },
                    { name:'MySpaceOwnStarDiary' , path: 'MySpaceOwnStarDiary', component: MySpaceOwnStarDiary },
                    { name:'MySpaceOwnCollectDiary' , path: 'MySpaceOwnCollectDiary', component: MySpaceOwnCollectDiary },
                    { name:'MySpaceOwnSentence' , path: 'MySpaceOwnSentence', component: MySpaceOwnSentence },
                    { name:'MySpaceOwnStarSentence' , path: 'MySpaceOwnStarSentence', component: MySpaceOwnStarSentence },
                    { name:'MySpaceOwnCollectSentence' , path: 'MySpaceOwnCollectSentence', component: MySpaceOwnCollectSentence },
                    { name:'MySpaceOwnVlog' , path: 'MySpaceOwnVlog', component: MySpaceOwnVlog },
                    { name:'MySpaceOwnStarVlog' , path: 'MySpaceOwnStarVlog', component: MySpaceOwnStarVlog },
                    { name:'MySpaceOwnCollectVlog' , path: 'MySpaceOwnCollectVlog', component: MySpaceOwnCollectVlog },
                    { name:'MySpaceOwnGriphic' , path: 'MySpaceOwnGriphic', component: MySpaceOwnGriphic },
                    { name:'MySpaceOwnStarGriphic' , path: 'MySpaceOwnStarGriphic', component: MySpaceOwnStarGriphic },
                    { name:'MySpaceOwnCollectGriphic' , path: 'MySpaceOwnCollectGriphic', component: MySpaceOwnCollectGriphic },
                    { name:'MySpaceOwnSetting' , path: 'MySpaceOwnSetting', component: MySpaceOwnSetting },
                ]
            }
        ]
    },
    {
        name: 'WriteVlog',
        path: '/WriteVlog',
        component: WriteVlog
    },
    {
        name:'DiaryPage' ,
        path: '/DiaryPage',
        component: DiaryPage,
        redirect: '/DiaryPage/DiaryPageHomeDisplay',
        children: [
            {name:'DiaryPageHomeDisplay' , path: 'DiaryPageHomeDisplay', component: DiaryPageHomeDisplay},
            {
                name:'DiaryPageDiaryDisplay' ,
                path: 'DiaryPageDiaryDisplay',
                component: DiaryPageDiaryDisplay,
                props() {
                    return {
                        name: '最新日记'
                    }
                }
            },
            {
                name:'DiaryPageDiaryDetailDisplay' ,
                path: 'DiaryPageDiaryDetailDisplay',
                component: DiaryPageDiaryDetailDisplay

            }
        ]
    },
    {
        name: 'WriteDiary',
        path: '/WriteDiary',
        component: WriteDiary
    },
    {
        name: 'SentencePage',
        path: '/SentencePage',
        component: SentencePage,
        redirect: '/SentencePage/SentencePageHomeDisplay',
        children: [
            { name:'SentencePageHomeDisplay' , path: 'SentencePageHomeDisplay', component: SentencePageHomeDisplay },
            { name:'SentencePageDetailDisplay' , path: 'SentencePageDetailDisplay', component: SentencePageDetailDisplay },
            { name:'SentencePageTagDisplay' , path: 'SentencePageTagDisplay', component: SentencePageTagDisplay }
        ]
    },
    {
        name: 'WriteSentence',
        path: '/WriteSentence',
        component: WriteSentence,
    },
    {
        name: 'VLogPage',
        path: '/VLogPage',
        component: VLogPage
    },
    {
        name: 'VlogPageDetailDisplay' ,
        path: '/VlogPageDetailDisplay' ,
        component: VlogPageDetailDisplay
    },
    {
        name: 'GriphicPage',
        path: '/GriphicPage',
        component: GriphicPage,
        redirect: '/GriphicPage/GriphicPageHomePageDisplay',
        children: [
            {name:'GriphicPageHomePageDisplay' , path: 'GriphicPageHomePageDisplay', component: GriphicPageHomePageDisplay},
            {name:'GriphicPageDetailPageDisplay' , path: 'GriphicPageDetailPageDisplay', component: GriphicPageDetailPageDisplay}
        ]
    },
    {
        name: 'WriteGriphic',
        path: '/WriteGriphic',
        component: WriteGriphic
    },
    {
        name: 'UserRegistPage',
        path: '/UserRegistPage',
        component: UserRegistPage
    },
    {
        name: 'UserLoginPage',
        path: '/UserLoginPage',
        component: UserLoginPage
    },
    // {
    //     name: 'ObserveComponent',
    //     path: '/ObserveComponent',
    //     component: ObserveComponent
    // },
    // 后台部分
    {
        name: 'AdminLogin',
        path: '/AdminLogin',
        component: AdminLogin
    },
    {
        name: 'AdminPage',
        path: '/AdminPage',
        component: AdminPage,
        children: [
            { name: 'UserInfoManage' , path: 'UserInfoManage' , component: UserInfoManage },
            { name: 'DiaryInfoManage' , path: 'DiaryInfoManage' , component: DiaryInfoManage },
            { name: 'SentenceInfoManage' , path: 'SentenceInfoManage' , component: SentenceInfoManage },
            { name: 'VlogInfoManage' , path: 'VlogInfoManage' , component: VlogInfoManage },
            { name: 'GriphicInfoManage' , path: 'GriphicInfoManage' , component: GriphicInfoManage },
            { name: 'UserLoginAndRegistInfoVisualizationDisplay' , path: 'UserLoginAndRegistInfoVisualizationDisplay' , component: UserLoginAndRegistInfoVisualizationDisplay },
            { name: 'UserLocationInfoVisualizationDisplay' , path: 'UserLocationInfoVisualizationDisplay' , component: UserLocationInfoVisualizationDisplay },
            { name: 'BlogWriteInfoVisualizationDisplay' , path: 'BlogWriteInfoVisualizationDisplay' , component: BlogWriteInfoVisualizationDisplay },
            { name: 'BlogObserveInfoVisualizationDisplay' , path: 'BlogObserveInfoVisualizationDisplay' , component: BlogObserveInfoVisualizationDisplay },
            { name: 'BlogStarInfoVisualizationDisplay' , path: 'BlogStarInfoVisualizationDisplay' , component: BlogStarInfoVisualizationDisplay },
            { name: 'BlogCollectInfoVisualizationDisplay' , path: 'BlogCollectInfoVisualizationDisplay' , component: BlogCollectInfoVisualizationDisplay },
            { name: 'ManagerInfoManage' , path: 'ManagerInfoManage' , component: ManagerInfoManage },
            { name: 'SuperManagerInfoManage' , path: 'SuperManagerInfoManage' , component: SuperManagerInfoManage },
            { name: 'AdminNoticeManage' , path: 'AdminNoticeManage' , component: AdminNoticeManage },
            { name: 'SensitiveWordsManage' , path: 'SensitiveWordsManage' , component: SensitiveWordsManage },
        ]
    }
];

// 3. 创建路由实例
const router = createRouter({
    // 4. 采用hash 模式
    history: createWebHashHistory(),
    // 采用 history 模式
    // history: createWebHistory(),
    routes, // short for `routes: routes`
});

export default router
