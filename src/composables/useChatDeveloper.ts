import { api } from '@/lib/http'
import { ref } from 'vue'
import { useToast } from './useToast'
const selectedUser = ref<any | null>(null)

export function useChatDeveloper() {
  const { show } = useToast()
  const message = ref('')
  const isLoading = ref(false)
  const sendMessage = async () => {
    isLoading.value = false
    try {
      const res: any = await api.post('/chat/developer', { message: message.value })
      message.value = ''
    } catch (err: any) {
      show('Failed to send message', 'error')
    } finally {
      isLoading.value = false
    }
  }
  const historyChat = ref<any[]>([])
  const getMessage = async () => {
    try {
      const res: any = await api.get('/user/chat')
      historyChat.value = res.data.data
    } catch (err: any) {
    } finally {
    }
  }

  const dataChat = ref<any[]>()
  const getDetailChat = async () => {
    try {
      const res: any = await api.post('/developer/detail/chat', {
        user_id: selectedUser.value?.id,
      })
      dataChat.value = res.data.data
    } catch (err: any) {
    } finally {
    }
  }

  const sendMsg = async () => {
    try {
      const res: any = await api.post('/developer/send', {
        message: message.value,
        user_id: selectedUser.value?.id,
      })
      message.value = ''
    } catch (err: any) {
      show('Failed to send data', 'error')
    } finally {
    }
  }

  const totalNotifChat = ref(0)
  const getNotifChatCount = async () => {
    try {
      const res: any = await api.get('/user/chat/count/notification')
      totalNotifChat.value = res.data.data
    } catch (err: any) {
    } finally {
    }
  }

  const readChatNotif = async () => {
    const res: any = await api.post('/user/chat/read')
  }

  return {
    isLoading,
    message,
    sendMessage,
    historyChat,
    getMessage,
    selectedUser,
    dataChat,
    getDetailChat,
    sendMsg,

    totalNotifChat,
    getNotifChatCount,

    readChatNotif,
  }
}
