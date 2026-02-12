import { useAuthStore } from '@/stores/auth'
import Login from '@/pages/auth/login.vue'
import CreateSalesman from '@/pages/manager/create-salesman.vue'
import Customer from '@/pages/manager/Customer.vue'
import Dashboard from '@/pages/manager/dashboard.vue'
import ManageProduct from '@/pages/manager/manageProduct.vue'
import Produk from '@/pages/manager/Produk.vue'
import Salesman from '@/pages/manager/salesman.vue'
import Proffile from '@/pages/proffile.vue'
import Forbidden from '@/pages/Forbidden.vue'

import { createRouter, createWebHistory } from 'vue-router'
import EditProduct from '@/pages/manager/editProduct.vue'
import SalesmanPage from '@/pages/salesman/SalesmanPage.vue'
import Toko from '@/pages/salesman/Toko.vue'
import Store from '@/pages/manager/Store.vue'
import SalesmanStore from '@/pages/salesman/SalesmanStore.vue'
import StoreEdit from '@/pages/manager/StoreEdit.vue'
import SalesmanRequest from '@/pages/salesman/SalesmanRequest.vue'
import Inbox from '@/pages/manager/Inbox.vue'
import InboxDetail from '@/pages/manager/InboxDetail.vue'
import SalesmanAllRequest from '@/pages/salesman/salesmanAllRequest.vue'
import SalesmanRequestDetail from '@/pages/salesman/SalesmanRequestDetail.vue'
import Panduan from '@/pages/manager/Panduan.vue'
import SalesmanCustomer from '@/pages/salesman/SalesmanCustomer.vue'
import CustomerEdit from '@/pages/manager/CustomerEdit.vue'
import Supervisor from '@/pages/manager/Supervisor.vue'
import CreateSupervisor from '@/pages/manager/create-supervisor.vue'
import MonthlStorePdf from '@/pages/salesman/MonthlStorePdf.vue'
import MonthlyCustomerPdf from '@/pages/salesman/MonthlyCustomerPdf.vue'
import CustomerAndStoreThisMonthPdf from '@/pages/salesman/CustomerAndStoreThisMonthPdf.vue'
import StoreRangeReport from '@/pages/salesman/StoreRangeReport.vue'
import CustomerRangeRecap from '@/pages/salesman/CustomerRangeRecap.vue'
import DevArea from '@/pages/dev/DevArea.vue'
import DevUserContact from '@/pages/dev/DevUserContact.vue'
import DevNotifications from '@/pages/dev/DevNotifications.vue'
import DevDetailChat from '@/pages/dev/DevDetailChat.vue'
import Notification from '@/pages/manager/Notification.vue'
import SalesmanNotification from '@/pages/salesman/SalesmanNotification.vue'
import Bantuan from '@/pages/manager/Bantuan.vue'
import SalesmanDeveloperSupport from '@/pages/salesman/SalesmanDeveloperSupport.vue'
import SalesmanPanduan from '@/pages/salesman/SalesmanPanduan.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    // auth
    { path: '/', component: Login, name: 'Login Page' },
    // manager
    {
      path: '/dashboard',
      component: Dashboard,
      meta: { role: ['manager', 'supervisor'], requiresAuth: true },
    },
    {
      path: '/salesman',
      component: Salesman,
      meta: { role: ['manager', 'supervisor'], requiresAuth: true },
    },
    {
      path: '/create-salesman',
      component: CreateSalesman,
      meta: { role: ['manager', 'supervisor'], requiresAuth: true },
    },
    // product
    {
      path: '/product/manage',
      component: ManageProduct,
      meta: { role: ['manager', 'supervisor'], requiresAuth: true },
    },
    {
      path: '/product',
      component: Produk,
      meta: { role: ['manager', 'supervisor'], requiresAuth: true },
    },
    {
      path: '/product/edit',
      component: EditProduct,
      meta: { role: ['manager', 'supervisor'], requiresAuth: true },
    },
    {
      path: '/supervisor',
      component: Supervisor,
      meta: { role: ['manager'], requiresAuth: true },
    },
    {
      path: '/supervisor-create',
      component: CreateSupervisor,
      meta: { role: ['manager'], requriesAuth: true },
    },
    {
      path: '/panduan',
      component: Panduan,
      meta: { role: ['manager', 'supervisor'], requiresAuth: true },
    },
    {
      path: '/customers',
      component: Customer,
      meta: { role: ['manager', 'supervisor'], requiresAuth: true },
    },
    {
      path: '/store',
      component: Store,
      meta: { role: ['manager', 'supervisor'], requiresAuth: true },
    },
    {
      path: '/store/edit',
      component: StoreEdit,
      meta: { role: ['manager', 'supervisor'], requiresAuth: true },
    },
    {
      path: '/inbox',
      component: Inbox,
      meta: { role: ['manager', 'supervisor'], requiresAuth: true },
    },
    {
      path: '/inbox/detail',
      component: InboxDetail,
      meta: { role: ['manager', 'supervisor'], requriesAuth: true },
    },
    {
      path: '/notification',
      component: Notification,
      meta: { role: ['manager', 'supervisor'], requiresAuth: true },
    },
    {
      path: '/customer/edit',
      component: CustomerEdit,
      meta: { role: ['manager', 'supervisor'], requiresAuth: true },
    },
    {
      path: '/bantuan',
      component: Bantuan,
      meta: { role: ['manager', 'supervisor'], requiresAuth: true },
    },
    // proffile
    { path: '/proffile', component: Proffile },
    // salesman
    {
      path: '/salesman/report',
      component: SalesmanPage,
      meta: { role: 'salesman', requiresAuth: true },
    },
    {
      path: '/salesman/toko',
      component: Toko,
      meta: { role: 'salesman', requiresAuth: true },
    },
    {
      path: '/salesman/store',
      component: SalesmanStore,
      meta: { role: 'salesman', requiresAuth: true },
    },
    {
      path: '/salesman/request',
      component: SalesmanRequest,
      meta: { role: 'salesman', requiresAuth: true },
    },
    {
      path: '/salesman/all-request',
      component: SalesmanAllRequest,
      meta: { role: 'salesman', requiresAuth: true },
    },
    {
      path: '/salesman/request/detail',
      component: SalesmanRequestDetail,
      meta: { role: 'salesman', requiresAuth: true },
    },
    {
      path: '/salesman/customer',
      component: SalesmanCustomer,
      meta: { role: 'salesman', requiresAuth: true },
    },
    {
      path: '/salesman/monthly-store-recap/pdf',
      component: MonthlStorePdf,
      meta: { role: 'salesman', requiresAuth: true },
    },
    {
      path: '/salesman/monthly-customer-recap/pdf',
      component: MonthlyCustomerPdf,
      meta: { role: 'salesman', requiresAuth: true },
    },
    {
      path: '/salesman/this-month-recap/customer-and-store/pdf',
      component: CustomerAndStoreThisMonthPdf,
      meta: { role: 'salesman', requiresAuth: true },
    },
    {
      path: '/salesman/store-range-recap/pdf',
      component: StoreRangeReport,
      meta: { role: 'salesman', requriesAuth: true },
    },
    {
      path: '/salesman/customer-range-recap/pdf',
      component: CustomerRangeRecap,
      meta: { role: 'salesman', requiresAuth: true },
    },
    {
      path: '/salesman/notification',
      component: SalesmanNotification,
      meta: { role: 'salesman', requiresAuth: true },
    },
    {
      path: '/salesman/developer/support',
      component: SalesmanDeveloperSupport,
      meta: { role: 'salesman', requiresAuth: true },
    },
    {
      path: '/salesman/panduan',
      component: SalesmanPanduan,
      meta: { role: 'salesman', requiresAuth: true },
    },
    // 403
    { path: '/403', component: Forbidden },
    // developer area
    { path: '/dev-area', component: DevArea, meta: { role: 'developer', requiresAuth: true } },
    {
      path: '/dev-area/user/contact',
      component: DevUserContact,
      meta: { role: 'developer', requiresAuth: true },
    },
    {
      path: '/dev-area/notifications',
      component: DevNotifications,
      meta: { role: 'developer', requiresAuth: true },
    },
    {
      path: '/dev-area/detail/chat',
      component: DevDetailChat,
      meta: { role: 'developer', requiresAuth: true },
    },
  ],
})

router.beforeEach(async (to, from, next) => {
  if (to.fullPath !== '/') {
    const auth = useAuthStore()

    if (!auth.loaded) {
      await auth.fetchUser()
    }

    if (to.meta.requiresAuth && !auth.user) {
      return next('/')
    }

    const allowedRoles: any = to.meta.role

    if (allowedRoles && auth.user) {
      if (!allowedRoles.includes(auth.user.role)) {
        return next('/403')
      }
    }
  }

  next()
})

export default router
