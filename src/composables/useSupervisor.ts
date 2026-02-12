import { ref } from 'vue'
import { api } from '@/lib/http'
import { useToast } from './useToast'
export default function useSupervisor() {
  const { show } = useToast()
  const isLoadingCreateSupervisor = ref(false)
  const supervisorForm = ref({
    name: '',
    phone: null,
    username: '',
    password: '',
  })
  const createSupervisor = async () => {
    isLoadingCreateSupervisor.value = true
    try {
      const res: any = await api.post('/supervisor/create', supervisorForm.value)
      show('Success to create supervisor', 'success')
    } catch (err: any) {
      const errors = err.response.data.errors

      Object.values(errors)
        .flat()
        .forEach((msg: any) => {
          show(msg, 'error')
        })
    } finally {
      isLoadingCreateSupervisor.value = false
    }
  }
  const dataSupervisor = ref<any[]>([])
  const isLoadingGetSupervisor = ref(false)
  const getSuperVisor = async () => {
    isLoadingGetSupervisor.value = true
    try {
      const res: any = await api.get('/supervisor')
      dataSupervisor.value = res.data.data
    } catch (err: any) {
    } finally {
      isLoadingGetSupervisor.value = false
    }
  }

  const showDeleteSupervisor = ref(false)
  const selectedIdDelete = ref(0)
  const deleteSupervisor = async () => {
    try {
      const res: any = await api.post('/supervisor/delete', { id: selectedIdDelete.value })
      show('Success to delete supervisor', 'success')
      showDeleteSupervisor.value = false
    } catch (err: any) {
      show('Failed to delete supervisor', 'error')
      showDeleteSupervisor.value = false
    }
  }
  return {
    isLoadingCreateSupervisor,
    createSupervisor,
    supervisorForm,
    isLoadingGetSupervisor,
    getSuperVisor,
    dataSupervisor,
    showDeleteSupervisor,
    selectedIdDelete,
    deleteSupervisor,
  }
}
