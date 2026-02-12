import { api } from '@/lib/http'
import { ref } from 'vue'
import { useToast } from './useToast'
const valPayment = ref('')

export function usePaymentMethod() {
  const isLoadingCreatePaymentMethod = ref(false)
  const { show } = useToast()
  const paymentMethod = ref<any[]>([])
  const selectedId = ref(0)
  const showPaymentMethodEdit = ref(false)

  const getPaymentMethod = async () => {
    try {
      const res: any = await api.get('/payment/method')
      paymentMethod.value = res.data.data
    } catch (err: any) {}
  }
  const createPaymentMethod = async () => {
    isLoadingCreatePaymentMethod.value = true
    try {
      const res: any = await api.post('/payment-method/create', { val: valPayment.value })
      show('Success to create payment method', 'success')
      valPayment.value = ''
    } catch (err: any) {
      show('Failed to create payment method', 'error')
    } finally {
      isLoadingCreatePaymentMethod.value = false
    }
  }

  const valueEditPayment = ref('')
  const paymentMethodEdit = async () => {
    try {
      const res: any = await api.post('/payment-method/edit', {
        id: selectedId.value,
        value: valueEditPayment.value,
      })
      showPaymentMethodEdit.value = false
      valueEditPayment.value = ''
      show('Success to edit payment method', 'success')
    } catch (err: any) {
      show('Failed to edit payment method', 'error')
      showPaymentMethodEdit.value = false
      valueEditPayment.value = ''
    } finally {
    }
  }
  return {
    paymentMethod,
    valPayment,
    createPaymentMethod,
    isLoadingCreatePaymentMethod,
    getPaymentMethod,
    showPaymentMethodEdit,
    paymentMethodEdit,
    selectedId,
    valueEditPayment,
  }
}
