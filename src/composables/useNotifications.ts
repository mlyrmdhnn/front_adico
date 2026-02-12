import { api } from '@/lib/http'
import { ref } from 'vue'
import { useToast } from './useToast'
export function useNotifications() {
  const isLoadingCreateGlobalNotif = ref(false)
  const isLoadingCreateNotif = ref(false)
  const { show } = useToast()

  const formGlobalNotif = ref({ title: '', description: '' })

  const createGlobalNotif = async () => {
    const validate = formGlobalNotif.value
    if (validate.title.length < 0) {
      return show('Required title field', 'error')
    }
    if (validate.title.length > 20) {
      return show('Title field 20 char maxium', 'info')
    }
    if (validate.description.length > 255) {
      return show('Description field 255 char maximum', 'info')
    }
    if (validate.description.length < 0) {
      return show('Required field', 'error')
    }
    isLoadingCreateGlobalNotif.value = true
    try {
      const res: any = api.post('/notification/global/create', formGlobalNotif.value)
      show('Success to create notfication', 'success')
      const form = formGlobalNotif.value
      form.description = ''
      form.title = ''
    } catch (err: any) {
      show('Failed to create notification', 'error')
    } finally {
      isLoadingCreateGlobalNotif.value = false
    }
  }

  const dataUser = ref<any[]>([])
  const selectedUser = ref<any>(null)
  const getUser = async () => {
    try {
      const res: any = await api.get('/user/all')
      dataUser.value = res.data.data
    } catch {}
  }
  const formNotif = ref({ title: '', description: '' })
  const createNotif = async () => {
    isLoadingCreateNotif.value = true
    try {
      const payload = {
        title: formNotif.value.title,
        description: formNotif.value.description,
        user_id: selectedUser.value.id,
      }
      const res: any = await api.post('/notification/create', payload)
      show('Success to create notification', 'success')
      const form = formNotif.value
      form.title = ''
      form.description = ''
    } catch (err: any) {
      show('Failed to create notification', 'error')
    } finally {
      isLoadingCreateNotif.value = false
    }
  }

  const salesmanNotifData = ref<any[]>([])
  const isLoadingGetNotif = ref(false)
  const salesmanGetNotification = async () => {
    isLoadingGetNotif.value = true
    try {
      const res: any = await api.get('/salesman/notification')
      salesmanNotifData.value = res.data.data
    } catch (err: any) {
    } finally {
      isLoadingGetNotif.value = false
    }
  }

  const notificationCount = ref(0)
  const getNotifCount = async () => {
    const res: any = await api.get('/notification/count')
    notificationCount.value = res.data.data
  }

  const readNotif = async () => {
    const res: any = await api.post('/notification/read')
  }

  return {
    isLoadingCreateGlobalNotif,
    formGlobalNotif,
    createGlobalNotif,

    dataUser,
    getUser,
    selectedUser,

    isLoadingCreateNotif,
    formNotif,
    createNotif,

    salesmanNotifData,
    isLoadingGetNotif,
    salesmanGetNotification,

    notificationCount,
    getNotifCount,

    readNotif,
  }
}
