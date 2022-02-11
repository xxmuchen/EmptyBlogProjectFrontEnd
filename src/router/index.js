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
import SentencePageEncounterLoversDisplay from '@/components/前端组件/句子页组件/SentencePageDetailDisplay';
import DiaryPageDiaryDisplay from '@/components/前端组件/日记页组件/DiaryPageDiaryDisplay';
import VLogPage from '@/page/前端/Vlog页/VLogPage'
import GriphicPage from '@/page/前端/图文页/GriphicPage'
import GriphicPageHomePageDisplay from "@/components/前端组件/图文页组件/GriphicPageHomePageDisplay";
import GriphicPageDetailPageDisplay from "@/components/前端组件/图文页组件/GriphicPageDetailPageDisplay";
// import VLogPageDisplay from '@/components/前端组件/Vlog页组件/VLogPageDisplay'
import UserRegistPage from '@/page/前端/注册页/UserRegistPage'
// 2. 定义路由配置
const routes = [
    // {
    //     path: '/',
    //     redirect: '/countIndex'
    // },
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
            { name:'HomePageGraphicDisplay' , path: 'HomePageGraphicDisplay', component: HomePageGraphicDisplay }

        ]},
    {
        name:'DiaryPage' ,
        path: '/DiaryPage',
        component: DiaryPage,
        redirect: '/DiaryPage/DiaryPageHomeDisplay',
        children: [
            {name:'DiaryPageHomeDisplay' , path: 'DiaryPageHomeDisplay', component: DiaryPageHomeDisplay},
            {name:'DiaryPageDiaryDisplay' , path: 'DiaryPageDiaryDisplay', component: DiaryPageDiaryDisplay},
            { name:'DiaryPageDiaryDetail' , path: 'DiaryPageDiaryDetail', component: DiaryPageDiaryDetailDisplay }
        ]
    },
    {
        name: 'SentencePage',
        path: '/SentencePage',
        component: SentencePage,
        redirect: '/SentencePage/SentencePageHomeDisplay',
        children: [
            {name:'SentencePageHomeDisplay' , path: 'SentencePageHomeDisplay', component: SentencePageHomeDisplay},
            {name:'SentencePageEncounterLoversDisplay' , path: 'SentencePageEncounterLoversDisplay', component: SentencePageEncounterLoversDisplay}

        ]
    },
    {
        name: 'VLogPage',
        path: '/VLogPage',
        component: VLogPage,
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
        name: 'UserRegistPage',
        path: '/UserRegistPage',
        component: UserRegistPage
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