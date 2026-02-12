import { ref } from 'vue'
import { api } from '@/lib/http'
import { useToast } from '../useToast'

const isLoadingEditConfiguration = ref(false)
const showEditConfiguration = ref(false)
const configuration = ref<{ configuration: string; id: number }>({
  configuration: '',
  id: 0,
})
export function useEditConfiguration() {
  const { show } = useToast()
  const openEditConfiguration = (id: number) => {
    configuration.value.id = id
    showEditConfiguration.value = true
  }
  const editConfiguration = async () => {
    isLoadingEditConfiguration.value = true
    try {
      const res: any = await api.post('/configuration/edit', configuration.value)
      show('Success to update configuration', 'success')
      showEditConfiguration.value = false

      return
    } catch (err: any) {
      show('Failed to update configuration', 'error')
      showEditConfiguration.value = false
    } finally {
      isLoadingEditConfiguration.value = false
    }
  }
  return {
    isLoadingEditConfiguration,
    showEditConfiguration,
    configuration,
    openEditConfiguration,
    editConfiguration,
  }
}
