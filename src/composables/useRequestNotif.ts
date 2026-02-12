import { api } from '@/lib/http'
import { ref } from 'vue'
export function useRequestNotif() {
  const count = ref(0)
  const inboxCount = async () => {
    try {
      const res: any = await api.get('/inboxs/count')
      count.value = res.data.data
    } catch (err: any) {
    } finally {
    }
  }
  return { count, inboxCount }
}
