import { ref, watch } from 'vue'
import { useToast } from '../useToast'
import { api } from '@/lib/http'
const { show } = useToast()
const isLoadingUom = ref(false)
const uomValue = ref('')
const showEditUom = ref(false)
const idUom = ref(0)
export function useUom() {
  const openEditUom = (id: number) => {
    idUom.value = id
    showEditUom.value = true
  }
  const editUom = async () => {
    isLoadingUom.value = true
    try {
      const res: any = await api.post('/uom/edit', { name: uomValue.value, id: idUom.value })
      show('Success to update uom', 'success')
      showEditUom.value = false
      return
    } catch (err: any) {
      show('Failed to update uom', 'error')
      showEditUom.value = false
    } finally {
      isLoadingUom.value = false
    }
  }
  return { editUom, uomValue, isLoadingUom, showEditUom, openEditUom }
}
