// src/router/index.ts
import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Home from '../views/Home.vue'
import Test from '../views/Test.vue'
import StartPage from "@/views/StartPage.vue";
import Solution from "@/views/solution/Solution.vue";
import SolutionSpecific1 from "@/views/solution/components/SolutionSpecific1.vue";
import SolutionSpecific2 from "@/views/solution/components/SolutionSpecific2.vue";
import SolutionSpecific3 from "@/views/solution/components/SolutionSpecific3.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    // 主页相关
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/homeview',
      name: 'homeview',
      component: HomeView
    },
    {
      path: "/start",
      name: "StartPage",
      component: StartPage,
      props: (route) => ({ config: route.query.config || null }),
    },
    
    // 认证相关路由
    {
      path: '/login',
      name: 'Login',
      component: () => import('@/views/auth/Login.vue')
    },
    {
      path: '/register',
      name: 'Register',
      component: () => import('@/views/auth/Register.vue')
    },
    {
      path: '/forgot-password',
      name: 'ForgotPassword',
      component: () => import('@/views/auth/ForgotPassword.vue')
    },

    // 计算相关路由
    {
      path: '/calculation',
      name: 'Calculation',
      component: () => import('@/views/calculation/Calculation.vue')
    },
    {
      path: '/calculation/results',
      name: 'CalculationResults',
      component: () => import('@/views/calculation/CalculationResults.vue')
    },
    {
      path: '/calculation/conversion',
      name: 'ConversionScale',
      component: () => import('@/views/calculation/ConversionScale.vue')
    },
    {
      path: '/calculation/settings',
      name: 'VariableSettings',
      component: () => import('@/views/calculation/VariableSettings.vue')
    },
    

    // 数据库相关路由
    {
      path: '/database/examples',
      name: 'DatabaseExamples',
      component: () => import('@/views/database/DatabaseExamples.vue')
    },
    {
      path: '/database/load',
      name: 'LoadData',
      component: () => import('@/views/database/LoadData.vue')
    },
    {
      path: '/database/save',
      name: 'SaveData',
      component: () => import('@/views/database/SaveData.vue')
    },

    // 文件操作相关路由
    {
      path: '/file-upload',
      name: 'FileUpload',
      component: () => import('@/views/files/FileUpload.vue')
    },
    {
      path: '/file-operations',
      name: 'FileOperations',
      component: () => import('@/views/files/FileOperations.vue')
    },

    // 帮助文档相关路由
    {
      path: '/help',
      name: 'Help',
      component: () => import('@/views/help/Help.vue'),
      children: [
        {
          path: 'examples',
          name: 'HelpExamples',
          component: () => import('@/views/help/HelpExamples.vue'),
        },
        {
          path: 'quickstart',
          name: 'QuickStart',
          component: () => import('@/views/help/QuickStart.vue'),
        },
        {
          path: 'moduledocs',
          name: 'ModuleDocs',
          component: () => import('@/views/help/ModuleDocs.vue'),
        },
      ],
    },
    {
      path: '/help/home',
      name: 'HelpHome',
      component: () => import('@/views/help/HelpHome.vue')
    },
    {
      path: '/quickstart',
      name: 'QuickStart',
      component: () => import('@/views/help/QuickStart.vue')
    },
    {
      path: '/moduledocs',
      name: 'ModuleDocs',
      component: () => import('@/views/help/ModuleDocs.vue')
    },
    {
      path: '/help/examples',
      name: 'HelpExamples',
      component: () => import('@/views/help/HelpExamples.vue'),
    },

    // 图像处理相关路由
    {
      path: '/images/display',
      name: 'ImageDisplay',
      component: () => import('@/views/images/ImageDisplay.vue')
    },
    {
      path: '/images/drawing',
      name: 'Drawing',
      component: () => import('@/views/images/Drawing.vue')
    },
    {
      path: '/images/settings',
      name: 'GraphSettings',
      component: () => import('@/views/images/GraphSettings.vue')
    },
    {
      path: '/images/processing',
      name: 'ImageProcessingExamples',
      component: () => import('@/views/images/ImageProcessingExamples.vue')
    },
    //解决方案相关路由
    {
      path: "/solution",
      name: "Solution",
      component: Solution,
      children: [
        { path: "specific1", name: "SolutionSpecific1", component: SolutionSpecific1 },
        { path: "specific2", name: "SolutionSpecific2", component: SolutionSpecific2 },
        { path: "specific3", name: "SolutionSpecific3", component: SolutionSpecific3 },
      ],
    },
    // 结果相关路由
    {
      path: '/results',
      name: 'Results',
      component: () => import('@/views/results/Results.vue')
    },

    // 设置相关路由
    {
      path: '/settings',
      name: 'UserSettings',
      component: () => import('@/views/settings/UserSettings.vue')
    },
    {
      path: '/settings/config',
      name: 'ConfigSettings',
      component: () => import('@/views/settings/ConfigSettings.vue')
    },
    {
      path: '/settings/category-selection',
      name: 'CategorySelection',
      component: () => import('@/views/settings/CategorySelection.vue'),
    },
    

    // 其他路由
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue')
    },
    {
      path: '/test',
      name: 'Test',
      component: Test
    }
  ]
})

// 路由守卫
router.beforeEach((to, from, next) => {
  // 获取token
  const token = localStorage.getItem('token')
  
  // 需要登录但没有token的路由
  const requiresAuth = !['Login', 'Register', 'ForgotPassword'].includes(to.name as string)
  
  if (requiresAuth && !token) {
    next('/login')
  } else {
    next()
  }
})


export default router