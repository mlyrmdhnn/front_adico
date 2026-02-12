import { ref } from 'vue'
import { api } from '@/lib/http'
import { useToast } from './useToast'
import { useInbox } from './useInbox'
const { getDetail, detailInbox } = useInbox()
export function useRequest() {
  const { show } = useToast()
  const isLoadingEdit = ref(false)
  const dataStore = ref<any[]>([])
  const selectedStore = ref<any>(null)
  const isDisabled = ref(false)

  const getStore = async () => {
    const res = await api.get('/store/all')
    dataStore.value = res.data.data
  }

  const dataProduct = ref<any[]>([])

  const getProduct = async () => {
    const res = await api.get('/products/all')

    dataProduct.value = res.data.data
  }

  const createRequest = async (payload: any) => {
    isDisabled.value = true
    try {
      await api.post('/salesman/request', payload)
      show('Success to send request', 'success')
    } catch (err: any) {
      show('Failed to send request', 'error')
    } finally {
      isDisabled.value = false
    }
  }

  const selectedPaymentMethod = ref<any>(null)
  const paymentMethod = ref<any[]>([])
  const note = ref<any>('')
  const getPaymentMethod = async () => {
    try {
      const res: any = await api.get('/payment/method')
      paymentMethod.value = res.data.data
    } catch (err: any) {}
  }

  const query = ref<any>(0)
  const discount2 = ref<any>(0)
  const selectedDiscount2 = ref(0)
  const showEditDiscount2Form = ref(false)

  const setShowDiscount2 = (id: number) => {
    selectedDiscount2.value = id
    showEditDiscount2Form.value = true
  }

  // editDiscount2 sekarang hanya urus API, tidak panggil getDetail
  const editDiscount2 = async () => {
    isLoadingEdit.value = true
    try {
      await api.post('/discount2', {
        discount2: discount2.value,
        id: selectedDiscount2.value,
      })
      show('Success edit discount 2', 'success')
      showEditDiscount2Form.value = false
      selectedDiscount2.value = 0
    } catch (err: any) {
      show('Failed edit discount 2', 'error')
      showEditDiscount2Form.value = false
      selectedDiscount2.value = 0
    } finally {
      isLoadingEdit.value = false
    }
  }

  const discount1 = ref<any>(0)
  const showEditDiscount1Form = ref(false)
  const selectedDiscount1 = ref(0)
  const setShowDiscount1 = (id: number) => {
    selectedDiscount1.value = id
    showEditDiscount1Form.value = true
  }
  const editDiscount1 = async () => {
    isLoadingEdit.value = true
    try {
      await api.post('/discount1', {
        discount1: discount1.value,
        id: selectedDiscount1.value,
      })
      show('Success edit discount 1', 'success')
      showEditDiscount1Form.value = false
      selectedDiscount1.value = 0
    } catch (err: any) {
      show('Failed edit discount 1', 'error')
      showEditDiscount1Form.value = false
      selectedDiscount1.value = 0
    } finally {
      isLoadingEdit.value = false
    }
  }

  return {
    isLoadingEdit,

    dataStore,
    selectedStore,
    getStore,

    dataProduct,
    getProduct,

    createRequest,
    paymentMethod,
    getPaymentMethod,
    selectedPaymentMethod,
    note,

    discount2,
    showEditDiscount2Form,
    editDiscount2,
    setShowDiscount2,

    discount1,
    showEditDiscount1Form,
    editDiscount1,
    setShowDiscount1,

    query,
    selectedDiscount2,

    isDisabled,
  }
}
