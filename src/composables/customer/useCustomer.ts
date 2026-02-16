import { ref, watch } from 'vue'
import { api } from '@/lib/http'
import { useToast } from '../useToast'
import { useDebounceFn } from '@vueuse/core'
export function useCustomer() {
  const { show } = useToast()
  const dataCustomer = ref<any[]>([])
  const links = ref<any[]>([])
  const currentPage = ref(1)
  const lastPage = ref(1)
  const isLoading = ref(false)
  const getDataCustomer = async (page = 1) => {
    isLoading.value = true
    try {
      const res = keyword.value.trim()
        ? await api.get(`/customers/${keyword.value}`, { params: { page } })
        : await api.get('/customers', { params: { page } })

      dataCustomer.value = res.data.data.data
      links.value = res.data.data.links
      currentPage.value = res.data.data.current_page
      lastPage.value = res.data.data.last_page
    } finally {
      isLoading.value = false
    }
  }

  const keyword = ref('')
  const searchCustomer = useDebounceFn(() => {
    getDataCustomer(1)
  }, 400)

  watch(keyword, searchCustomer)

  const showConfirmDelete = ref(false)
  const selectedDeleteId = ref(0)
  const setDelete = (id: number) => {
    showConfirmDelete.value = true
    selectedDeleteId.value = id
  }
  const deleteCustomer = async () => {
    try {
      const res: any = await api.post('/customer/delete', { id: selectedDeleteId.value })
      show('Success delete customer', 'success')
      getDataCustomer()
      return res
    } catch (err: any) {
      show('Failed delete customer', 'error')
    } finally {
      showConfirmDelete.value = false
    }
  }

  const isLoadingCreate = ref(false)
  const formCreateCustomer = ref<{
    // name: string
    phone: string
    npwp: string
    address: string
    storeName: string
    pic: string
    re: string
  }>({
    // name: '',
    phone: '',
    npwp: '',
    address: '',
    storeName: '',
    pic: '',
    re: '',
  })
  const createCustomer = async () => {
    const validate = formCreateCustomer.value
    // if (validate.name.length <= 0) {
    //   return show('Required name field', 'error')
    // }
    if (validate.phone?.length <= 0) {
      return show('Required phone field', 'error')
    }
    if (validate.address.length <= 0) {
      return show('Required address field', 'error')
    }
    // if (validate.pic.length <= 0) {
    //   return show('Required pic field', 'error')
    // }
    if (validate.re.length <= 0) {
      return show('Required re field', 'error')
    }
    if (validate.storeName.length <= 0) {
      return show('Required store name field', 'error')
    }
    isLoadingCreate.value = true

    try {
      const res: any = await api.post('/customer/create', formCreateCustomer.value)
      show('Success to create customer', 'success')
    } catch (err: any) {
      show('Failed to create customer', 'error')
    } finally {
      isLoadingCreate.value = false
    }
  }

  const selectedStore = ref<any>(0)
  const dataStore = ref<any[]>([])
  const getStore = async () => {
    const res: any = await api.get('/store/all')
    dataStore.value = res.data.data
  }

  const formEditCustomer = ref({
    id: null,
    store_name: '',
    phone: '',
    npwp: '',
    address: '',
    pic: '',
    re: '',
  })
  const getCustomerDetail = async (id: any) => {
    isLoading.value = true
    try {
      const res: any = await api.get(`/customer/detail/${id}`)
      formEditCustomer.value = <any>{
        id: res.data.data.id,
        store_name: res.data.data.store_name,
        phone: res.data.data.phone,
        npwp: res.data.data.npwp,
        address: res.data.data.address,
        pic: res.data.data.pic,
        re: res.data.data.re,
      }
      console.log(res.data.data)
    } catch (err: any) {
    } finally {
      isLoading.value = false
    }
  }

  const editCustomer = async () => {
    isLoading.value = true
    try {
      const res: any = await api.post('/customer/edit', formEditCustomer.value)
      show('Success update customer', 'success')
    } catch (err: any) {
      show('Failed update customer', 'error')
    } finally {
      isLoading.value = false
    }
  }

  const dataCustomerBySalesmanMonthly = ref<any[]>([])
  const getCustomerBySalesmanMonthly = async () => {
    try {
      const res: any = await api.get('/customer/by/salesman/monthly')
      dataCustomerBySalesmanMonthly.value = res.data.data
    } catch (err: any) {
    } finally {
    }
  }

  const startDate = ref<string | null>(null)
  const endDate = ref<string | null>(null)
  const getCustomerRangeRecap = async () => {
    try {
      const res: any = await api.post('/customer/by/salesman/recap/range', {
        start: startDate.value,
        end: endDate.value,
      })
      dataCustomerBySalesmanMonthly.value = res.data.data
    } catch (err: any) {
    } finally {
    }
  }
  return {
    startDate,
    endDate,
    getCustomerRangeRecap,
    dataCustomer,
    getDataCustomer,
    links,
    lastPage,
    currentPage,
    isLoading,
    keyword,
    showConfirmDelete,
    setDelete,
    deleteCustomer,
    isLoadingCreate,
    formCreateCustomer,
    createCustomer,
    getCustomerDetail,
    formEditCustomer,
    getStore,
    selectedStore,
    dataStore,
    getCustomerBySalesmanMonthly,
    dataCustomerBySalesmanMonthly,
    editCustomer,
  }
}
