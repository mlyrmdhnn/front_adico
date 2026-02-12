import { computed, ref, watch } from 'vue'
import { api } from '@/lib/http'
import { useToast } from '../useToast'
import { useDebounceFn } from '@vueuse/core'
import router from '@/router'
type Product = {
  brand: number
  barang: string
  uom: number
  satuanUom: string
  karton: string
  configuration: number
  barcode: string
  discount1: number
}
const dataBrand = ref<any>([])
const dataUom = ref<any>([])
const dataConfiguration = ref<any>([])
const brand = ref<string>('')
const uom = ref<string>('')
const configuration = ref<string>('')
const discount1 = ref<number>(0)
const isLoadingDiscount1 = ref(false)
const isLoadingBrand = ref(false)
const isLoadingUom = ref(false)
const isLoadingConfiguration = ref(false)
const isLoadingCreateProduct = ref(false)
const selectedBrand = ref<string | number | null>(null)
const selectedUom = ref<string | number | null>(null)
const selectedConfiguration = ref<string | number | null>(null)
const selectedIdUom = ref(0)

const isLoading = ref(false)

export function useProduct() {
  const { show } = useToast()

  const createBrand = async () => {
    isLoadingBrand.value = true
    try {
      const res: any = await api.post('/brand/create', { brand: brand.value })
      show('Success create brand', 'success')
      return res
    } catch (err: any) {
      show('Failed to create brand', 'error')
    } finally {
      isLoadingBrand.value = false
    }
  }

  const createUom = async () => {
    isLoadingUom.value = true
    try {
      const res = await api.post('/uom/create', { uom: uom.value })
      show('Success create uom', 'success')
      return res
    } catch (err: any) {
      show('Failed to create uom', 'error')
    } finally {
      isLoadingUom.value = false
    }
  }

  const createConfiguration = async () => {
    isLoadingConfiguration.value = true
    try {
      const res = await api.post('/configuration/create', { configuration: configuration.value })
      show('Success to create configuration', 'success')
      return res
    } catch (err: any) {
      show('Failed to create configuration', 'error')
    } finally {
      isLoadingConfiguration.value = false
    }
  }

  watch(discount1, () => {
    if (discount1.value > 100) {
      discount1.value = 100
    }
  })
  const createDiscount1 = async () => {
    isLoadingDiscount1.value = true
    try {
      const res: any = await api.post('/discount1/create', { discount1: discount1.value })
      show('Success to create discount 1 to all product', 'success')
      return res
    } catch (err: any) {
      show('Failed to create discount 1 to all product', 'error')
    } finally {
      isLoadingDiscount1.value = false
    }
  }
  const getAll = async () => {
    isLoading.value = true
    isLoadingBrand.value = true
    isLoadingConfiguration.value = true
    isLoadingUom.value = true
    try {
      const brand = await api.get('/brand')
      const uom = await api.get('/uom')
      const configuration = await api.get('/configuration')
      dataBrand.value = brand.data.data
      dataUom.value = uom.data.data
      dataConfiguration.value = configuration.data.data
    } finally {
      isLoading.value = false
      isLoadingBrand.value = false
      isLoadingConfiguration.value = false
      isLoadingUom.value = false
    }
  }

  const form = ref<Product>({
    brand: 0,
    barang: '',
    uom: 0,
    satuanUom: '',
    karton: '',
    configuration: 0,
    barcode: '',
    discount1: 0,
  })
  const setSelectedBrand = (id: number) => {
    form.value.brand = id
  }
  const setSelectedUom = (id: number) => {
    form.value.uom = id
  }
  const setSelectedConfiguration = (id: number) => {
    form.value.configuration = id
  }
  const createProduct = async () => {
    const validated = form.value
    if (
      selectedBrand.value == 0 ||
      null ||
      selectedUom.value == 0 ||
      null ||
      selectedUom.value == 0 ||
      null ||
      validated.barang.length == 0 ||
      validated.satuanUom.length == 0 ||
      validated.karton.length == 0 ||
      validated.barcode.length == 0
    ) {
      return show('Please check your field again', 'info')
    }
    const payLoad = {
      ...form.value,
      brand: (selectedBrand.value as any)?.id,
      configuration: (selectedConfiguration.value as any)?.id,
      uom: (selectedUom.value as any)?.id,
    }
    isLoadingCreateProduct.value = true
    try {
      const res = await api.post('/product/create', payLoad)
      show('Success create product', 'success')
      return res
    } catch (err: any) {
      show('Failed create product', 'error')
    } finally {
      isLoadingCreateProduct.value = false
    }
  }
  const dataProduct = ref<any[]>([])
  const links = ref<any[]>([])
  const keyword = ref('')

  const getProduct = async (page = 1) => {
    isLoading.value = true
    try {
      const res = keyword.value.trim()
        ? await api.get(`/product/${keyword.value}`, { params: { page } })
        : await api.get('/products', { params: { page } })

      dataProduct.value = res.data.data.data
      links.value = res.data.data.links
    } catch (err) {
    } finally {
      isLoading.value = false
    }
  }

  const searchProduct = useDebounceFn(() => {
    getProduct(1)
  }, 400)

  watch(keyword, searchProduct)

  const showConfirmDelete = ref(false)
  const idDelete = ref(0)
  const isConfirmDelete = (id: number) => {
    idDelete.value = id
    showConfirmDelete.value = true
  }
  const deleteProduct = async () => {
    try {
      const res = await api.post('/product/delete', { id: idDelete.value })
      showConfirmDelete.value = false
      show('Success delete product', 'success')
      return res
    } catch (err: any) {
      show('Failed delete product', 'error')
    } finally {
      getProduct()
    }
  }

  const editForm = ref<Product>({
    brand: 0,
    barang: '',
    uom: 0,
    satuanUom: '',
    karton: '',
    configuration: 0,
    barcode: '',
    discount1: 0,
  })

  const isFound = ref<boolean | null>(null)
  const productEditId = ref(0)
  const dataDetailProduct = ref<any[]>([])
  const getDetailProduct = async (id: number) => {
    isLoading.value = true
    try {
      const res: any = await api.get(`/product/detail/${id}`)
      const data = res.data.data
      dataDetailProduct.value = data
      productEditId.value = data.id
      selectedBrand.value = data.brand
      selectedConfiguration.value = data.configuration
      selectedUom.value = data.uom
      editForm.value.barang = data.name
      editForm.value.satuanUom = data.satuan_uom
      editForm.value.karton = data.karton
      editForm.value.discount1 = data.discount1
      editForm.value.barcode = data.barcode
      isFound.value = true
    } catch (err: any) {
      isFound.value = false
    } finally {
    }
  }

  const editPayload = computed(() => ({
    id: productEditId.value,
    ...editForm.value,
    configuration: (selectedConfiguration.value as any)?.id,
    uom: (selectedUom.value as any)?.id,
    brand: (selectedBrand.value as any)?.id,
  }))

  const editProduct = async () => {
    const validated = editForm.value
    if (
      !selectedBrand.value ||
      !selectedUom.value ||
      !selectedConfiguration.value ||
      !validated.barang ||
      !validated.satuanUom ||
      !validated.karton ||
      !validated.barcode ||
      !validated.discount1
    ) {
      return show('Please check your field again', 'info')
    }
    isLoading.value = true
    try {
      const res: any = await api.post('/product/edit', editPayload.value)
      show('Success edit product', 'success')
      router.push('/product')
      return res
    } catch (err: any) {
      show('Failed edit product', 'error')
    } finally {
      isLoading.value = false
    }
  }

  const clickCreateBrand = async () => {
    await createBrand()
    await getAll()
  }

  const clickCreateUom = async () => {
    await createUom()
    await getAll()
  }

  const clickCreateConfiguration = async () => {
    await createConfiguration()
    await getAll()
  }

  const uomNameEdit = ref<string | null>('')
  const confirmEditUom = (id: number) => {
    const cnfrm = prompt('Are u sure?')
    selectedIdUom.value = id
    uomNameEdit.value = cnfrm
    if (cnfrm) {
      editUom()
    } else {
      return
    }
  }
  const editUom = async () => {
    try {
      const res: any = await api.post('/uom/edit', {
        id: selectedIdUom.value,
        name: uomNameEdit.value,
      })
      return
    } catch (err: any) {
    } finally {
    }
  }

  return {
    brand,
    uom,
    configuration,
    isLoadingBrand,
    isLoadingUom,
    isLoadingConfiguration,
    createBrand,
    createUom,
    createConfiguration,
    selectedBrand,
    selectedUom,
    selectedConfiguration,
    getAll,
    dataBrand,
    dataUom,
    dataConfiguration,
    setSelectedBrand,
    setSelectedUom,
    setSelectedConfiguration,
    form,
    createProduct,
    isLoadingCreateProduct,
    getProduct,
    dataProduct,
    keyword,
    links,
    isLoading,
    deleteProduct,
    showConfirmDelete,
    isConfirmDelete,
    getDetailProduct,
    editForm,
    editProduct,
    dataDetailProduct,
    isFound,
    isLoadingDiscount1,
    createDiscount1,
    discount1,
    clickCreateBrand,
    clickCreateUom,
    clickCreateConfiguration,
    editUom,
    uomNameEdit,
    confirmEditUom,
  }
}
