import { ref } from 'vue'
import { api } from '@/lib/http'
const isLoading = ref(false)
export function useOmset() {
  const dataOmset = ref<any[]>([])
  const getOmset = async () => {
    isLoading.value = true
    try {
      const res: any = await api.get('/omset/salesman')
      dataOmset.value = res.data.data
    } catch (err: any) {
    } finally {
      isLoading.value = false
    }
  }

  return { isLoading, dataOmset, getOmset }
}
