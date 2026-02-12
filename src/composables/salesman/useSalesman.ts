import { ref } from 'vue'
import { useToast } from '../useToast'
import { onMounted } from 'vue'
import { api } from '@/lib/http'
const selectedDataOmset = ref<any[]>([])
const isShowEditDataOmset = ref(false)
type Form = {
  username: string
  name: string
  password: string
  phone: string
  hari_kerja: number
  target: number
}

type HariKerja = {
  id: number
  day: number
  period: Date
  created_at: string
  updated_at: string
}

type Salesman = {
  id: number
  name: string
  username: string
  phone: string
  code: string
  role: string
  hari_kerja: HariKerja
}
export function useSalesman() {
  const { show } = useToast()
  const isLoading = ref(false)
  const form = ref<Form>({
    username: '',
    name: '',
    password: '',
    phone: '',
    hari_kerja: 0,
    target: 0,
  })
  const createSalesman = async () => {
    isLoading.value = true
    try {
      const res: any = await api.post('/salesman/create', form.value)
      show('Success to create salesman', 'success')
      return res
    } catch (err: any) {
      const errors = err.response.data.errors

      Object.values(errors)
        .flat()
        .forEach((msg: any) => {
          show(msg, 'error')
        })
    } finally {
      isLoading.value = false
    }
  }
  const dataSalesman = ref<Salesman[]>([])
  const getSalesman = async () => {
    isLoading.value = true
    try {
      const res: any = await api.get('/salesman')
      dataSalesman.value = res.data.data
    } catch (err: any) {
      show('Failed to get salesman', 'error')
    } finally {
      isLoading.value = false
    }
  }

  const showConfirmDelete = ref(false)
  const selectedIdDelete = ref(0)
  const setSelectIdDelete = (id: number) => {
    selectedIdDelete.value = id
    showConfirmDelete.value = true
  }
  const deleteSalesman = async () => {
    try {
      const res = await api.post('/salesman/delete', { id: selectedIdDelete.value })
      showConfirmDelete.value = false
      show('Success delete salesman', 'success')

      return res
    } catch (err: any) {
      showConfirmDelete.value = false
      show('Failed to delete salesman', 'error')
    } finally {
    }
  }

  const hariKerjaVal = ref(0)
  const inputHariKerja = async () => {
    isLoading.value = true
    try {
      const res: any = await api.post('/salesman/hari-kerja', { hariKerja: hariKerjaVal.value })
      show('Success', 'success')
    } catch (err: any) {
      show('Failed', 'error')
    } finally {
      isLoading.value = false
    }
  }

  const dataOmsetSalesman = ref<any[]>([])
  const getSalesmanOmset = async () => {
    const res: any = await api.get('/salesman/omset')
    dataOmsetSalesman.value = res.data.data
  }

  const setSelectedDataOmset = (id: number) => {
    const data = dataOmsetSalesman.value.find((e) => e.salesman_id === id)
    if (!data) return
    selectedDataOmset.value.push(data)
    isShowEditDataOmset.value = true
  }

  const editDataOmset = async () => {
    isLoading.value = true
    try {
      await api.post('/omset/edit', selectedDataOmset.value[0])
      show('Success to edit omset', 'success')
      isShowEditDataOmset.value = false
    } catch (err: any) {
      show('Failed to edit omset', 'error')
      isShowEditDataOmset.value = false
    } finally {
      isLoading.value = false
    }
  }

  const loadingSalesmanTarget = ref(false)
  const targetSalesman = ref(0)
  const inputSalesmanTarget = async () => {
    loadingSalesmanTarget.value = true
    try {
      const res: any = await api.post('/salesman/target', { target: targetSalesman.value })
      show('Success to create targer', 'success')
    } catch (err: any) {
      show('Failed to create targer', 'error')
    } finally {
      loadingSalesmanTarget.value = false
    }
  }

  return {
    isLoading,
    form,
    createSalesman,
    dataSalesman,
    setSelectIdDelete,
    getSalesman,
    deleteSalesman,
    showConfirmDelete,
    inputHariKerja,
    hariKerjaVal,
    getSalesmanOmset,
    dataOmsetSalesman,
    targetSalesman,
    inputSalesmanTarget,
    isShowEditDataOmset,
    setSelectedDataOmset,
    selectedDataOmset,
    editDataOmset,
    loadingSalesmanTarget,
  }
}
