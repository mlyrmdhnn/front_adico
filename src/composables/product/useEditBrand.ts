import { ref } from 'vue'
import { api } from '@/lib/http'
import { useToast } from '../useToast'

const brand = ref<{ name: string; id: number }>({
  name: '',
  id: 0,
})
const isLoadingEditBrand = ref(false)
const showEditBrand = ref(false)
export function useEditBrand() {
  const { show } = useToast()
  const openEditBrand = (id: number) => {
    brand.value.id = id
    showEditBrand.value = true
  }
  const editBrand = async () => {
    isLoadingEditBrand.value = true
    try {
      const res: any = await api.post('/brand/edit', brand.value)
      show('Success to update brand', 'success')
      showEditBrand.value = false
      return
    } catch (err: any) {
      show('Failed to update brand', 'error')
      showEditBrand.value = false
    } finally {
      isLoadingEditBrand.value = false
    }
  }
  return { editBrand, brand, isLoadingEditBrand, showEditBrand, openEditBrand }
}
