import { ref } from 'vue'
import { api } from '@/lib/http'
export function useRoomChat() {
  const dataUserChat = ref<any[]>([])
  const isLoading = ref(false)
  const getDataUserChat = async () => {
    isLoading.value = true
    try {
      const res: any = await api.get('/developer/room-chat')
      dataUserChat.value = res.data.data
    } catch (err: any) {
    } finally {
      isLoading.value = false
    }
  }

  return { dataUserChat, isLoading, getDataUserChat }
}
