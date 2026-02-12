import { ref, watch, onMounted, onUnmounted } from 'vue'
import { api } from '@/lib/http'
import { useDebounceFn } from '@vueuse/core'
import { useToast } from './useToast'

const isLoadingGet = ref(false)
const inboxData = ref<any[]>([])
const links = ref<any[]>([])
const keyword = ref('')

export function useInbox() {
  const { show } = useToast()

  const getInbox = async (page = 1) => {
    isLoadingGet.value = true
    try {
      const res: any = keyword.value.trim()
        ? await api.get(`/inbox/${keyword.value}`, { params: { page } })
        : await api.get('/inbox/all', { params: { page } })
      inboxData.value = res.data.data.data
      links.value = res.data.data.links
    } catch (err: any) {
    } finally {
      isLoadingGet.value = false
    }
  }

  const searchInbox = useDebounceFn(() => {
    getInbox(1)
  }, 400)

  watch(keyword, searchInbox)

  const detailInbox = ref<any | null>(null)
  const detailId = ref(0)
  const getDetail = async (id: any) => {
    detailId.value = id
    isLoadingGet.value = true
    try {
      const res: any = await api.get(`/inbox/detail/${id}`)
      detailInbox.value = res.data.data
    } catch (err: any) {
    } finally {
      isLoadingGet.value = false
    }
  }

  const rejectUpdate = async () => {
    try {
      const res: any = await api.post('/reject', { id: detailInbox.value?.id })
      getDetail(detailId.value)
      show('Success update status', 'success')
    } catch (err: any) {
      show(err?.response?.data?.message, 'error')
    } finally {
    }
  }

  const approvedUpdate = async () => {
    try {
      const res: any = await api.post('/approved', { id: detailInbox.value?.id })
      show('Success update status', 'success')
      getDetail(detailId.value)
    } catch (err: any) {
      show(err?.response?.data?.message, 'error')
    }
  }

  const intervalInboxPolling = async () => {
    try {
      const res: any = await api.get('/inbox/all')
      inboxData.value = res.data.data.data

      return res
    } catch (err: any) {
    } finally {
    }
  }

  // const getAllSalesmanRequest = async (page = 1) => {
  //   isLoadingGet.value = true
  //   try {
  //     const res: any = keyword.value.trim()
  //       ? await api.get(`/salesman/detail/request/${keyword.value}`, { params: { page } })
  //       : await api.get('/salesman/all/requests', { params: { page } })
  //     inboxData.value = res.data.data.data
  //     links.value = res.data.data.links
  //   } catch (err: any) {
  //   } finally {
  //     isLoadingGet.value = false
  //   }
  // }

  return {
    getInbox,
    keyword,
    inboxData,
    isLoadingGet,
    links,
    getDetail,
    detailInbox,
    rejectUpdate,
    approvedUpdate,
    intervalInboxPolling,
    // inboxCount,
    // count,
  }
}
