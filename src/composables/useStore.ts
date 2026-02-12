import { api } from '@/lib/http'
import { ref, watch } from 'vue'
import { useDebounceFn } from '@vueuse/core'
import { useToast } from './useToast'

type Store = {
  id: number
  name: string
  address: string
}

export function useStore() {
  const isLoadingGet = ref(false)
  const { show } = useToast()

  const storeData = ref<any[]>([])
  const links = ref<any[]>([])
  const keyword = ref('')
  const isLoading = ref(false)

  const getStore = async (page = 1) => {
    isLoadingGet.value = true
    try {
      const res = keyword.value.trim()
        ? await api.get(`/store/${keyword.value}`, { params: { page } })
        : await api.get('/stores', { params: { page } })

      storeData.value = res.data.data.data
      links.value = res.data.data.links
    } catch (err) {
    } finally {
      isLoadingGet.value = false
    }
  }

  const searchStore = useDebounceFn(() => {
    getStore(1)
  }, 400)

  watch(keyword, searchStore)

  const showConfirmDelete = ref(false)
  const selectedDelete = ref(0)
  const setConfirmDelete = (id: number) => {
    selectedDelete.value = id
    showConfirmDelete.value = true
  }
  const deleteStore = async () => {
    try {
      const res = await api.post('/store/delete', { id: selectedDelete.value })
      show('Success delete store', 'success')
    } catch (err: any) {
      show('Failed delete store', 'error')
      showConfirmDelete.value = false
    } finally {
      getStore()
      showConfirmDelete.value = false
    }
  }

  const formEdit = ref<Store>({
    id: 0,
    name: '',
    address: '',
  })
  const isLoadingUpdate = ref(false)
  const getDetail = async (id: any) => {
    try {
      const res = await api.get(`/store/detail/${id}`)
      formEdit.value.id = res.data.data.id
      formEdit.value.name = res.data.data.name
      formEdit.value.address = res.data.data.address
    } catch (err: any) {
    } finally {
    }
  }

  const updateStore = async () => {
    isLoadingUpdate.value = true
    try {
      const res: any = await api.post('/store/edit', formEdit.value)
      show('Success to update store', 'success')
      return res
    } catch (err: any) {
      show('Failed to update store', 'error')
    } finally {
      isLoadingUpdate.value = false
    }
  }

  const dataStore = ref<any[]>([])
  const selectedStore = ref(0)
  const getStoreNp = async () => {
    const res: any = await api.get('/customer/all')
    dataStore.value = res.data.data
  }

  const createStoreForm = ref({
    name: '',
    address: '',
  })

  const createStore = async () => {
    const payload = {
      ...createStoreForm.value,
      customer: (selectedStore.value as any).id,
    }
    const validated = createStoreForm.value
    if (validated.name.length == 0 || validated.address.length == 0) {
      return show('Please input name and address input field', 'info')
    }
    isLoading.value = true
    try {
      const res: any = await api.post('/store/create', payload)
      show('Success create store', 'success')
      return res
    } catch (err: any) {
      show('Failed create store', 'error')
    } finally {
      isLoading.value = false
    }
  }

  const dataStoreBySalesman = ref<any[]>([])
  const storeBySalesman = async () => {
    isLoading.value = true
    try {
      const res: any = await api.get('/store/by/salesman/monthly')
      dataStoreBySalesman.value = res.data.data
    } catch (err: any) {
    } finally {
      isLoading.value = false
    }
  }

  const startDate = ref<string | null>(null)
  const endDate = ref<string | null>(null)
  const getStoreRangeRecap = async () => {
    try {
      const res: any = await api.post('/store/by/salesman/recap/range', {
        start: startDate.value,
        end: endDate.value,
      })
      dataStoreBySalesman.value = res.data.data
    } catch (err: any) {
    } finally {
    }
  }

  return {
    isLoadingGet,
    storeData,
    links,
    keyword,
    getStore,
    showConfirmDelete,
    deleteStore,
    getDetail,
    formEdit,
    isLoadingUpdate,
    updateStore,
    setConfirmDelete,
    isLoading,
    createStore,
    createStoreForm,
    dataStore,
    getStoreNp,
    selectedStore,
    dataStoreBySalesman,
    storeBySalesman,
    startDate,
    endDate,
    getStoreRangeRecap,
  }
}
