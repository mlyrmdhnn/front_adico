import { api } from '@/lib/http'
import { ref, computed, watch } from 'vue'
import { useToast } from './useToast'
const attendanceData = ref<any[]>([])

export function useAttendance() {
  const { show } = useToast()
  const isLoading = ref(false)

  const groupedByDate = computed(() => {
    return attendanceData.value.reduce((acc: any, item: any) => {
      if (!acc[item.date]) {
        acc[item.date] = []
      }
      acc[item.date].push(item)
      return acc
    }, {})
  })

  const getAttendance = async () => {
    isLoading.value = true
    try {
      const res: any = await api.get('/attendance/type')
      attendanceData.value = res.data.data
    } finally {
      isLoading.value = false
    }
  }

  const attendanceDataByDate = ref<any[]>([])
  const selectedDate = ref<Date | null>(null)
  const getAttendanceByDate = async () => {
    isLoading.value = true
    try {
      const res: any = await api.get(`/attendances/detail/${selectedDate.value}`)
      attendanceDataByDate.value = res.data.data
    } catch (err: any) {
      attendanceDataByDate.value = []
    } finally {
      isLoading.value = false
    }
  }

  watch(selectedDate, () => {
    getAttendanceByDate()
  })

  const getTodayAttendance = async () => {
    isLoading.value = true
    try {
      const res: any = await api.get('/attendances/today')
      attendanceData.value = res.data.data
    } catch (err: any) {
    } finally {
      isLoading.value = false
    }
  }

  const type = ref<any>([])
  const selectedAttendance = ref(0)
  const getType = async () => {
    const res: any = await api.get('/attendance/type')
    type.value = res.data.data
  }

  const attendance = async () => {
    isLoading.value = true
    try {
      const res: any = await api.post('/attendance', { id: selectedAttendance.value })
      show('Success to input attendance', 'success')
    } catch (err: any) {
      show(err?.response?.data?.message, 'error')
    } finally {
      isLoading.value = false
    }
  }

  const loadingCreateAttendance = ref(false)
  const attendanceVal = ref('')
  const createAttendance = async () => {
    loadingCreateAttendance.value = true
    try {
      const res: any = await api.post('/attendance/create', { attendance: attendanceVal.value })
      show('Success to create attendance', 'success')
    } catch (err: any) {
      show('Failed to create attendance', 'error')
    } finally {
      loadingCreateAttendance.value = false
    }
  }

  const selectedType = ref(0)
  const selectedSalesman = ref(0)
  const showEditForm = ref(false)

  const setSelectSalesman = (id: number) => {
    selectedSalesman.value = id
    showEditForm.value = true
  }

  const editAttendance = async () => {
    try {
      const res: any = await api.post('/attendance/edit', {
        salesman_id: selectedSalesman.value,
        type_id: selectedType.value,
      })
      show('Success edit attendance', 'success')

      const index = attendanceData.value.findIndex((a) => a.salesman.id === selectedSalesman.value)
      if (index !== -1) {
        attendanceData.value[index].type.id = selectedType.value
        const selectedTypeObj = type.value.find((t: { id: any }) => t.id === selectedType.value)
        if (selectedTypeObj) {
          attendanceData.value[index].type.type = selectedTypeObj.type
        }
      }
    } catch (err: any) {
      show('Failed edit attendance', 'error')
    } finally {
      showEditForm.value = false
    }
  }

  const editedType = ref('')
  const idEditType = ref(0)
  const showFormEditAttendanceType = ref(false)
  const editAttendanceType = async () => {
    try {
      const res: any = await api.post('/attendance/edit/type', {
        val: editedType.value,
        id: idEditType.value,
      })
      showFormEditAttendanceType.value = false
      show('Success to edit attendance', 'success')
      editedType.value = ''
    } catch (err: any) {
      show('Failed to edit attendance', 'error')
      showFormEditAttendanceType.value = false
      editedType.value = ''
    }
  }

  return {
    editedType,
    idEditType,
    showFormEditAttendanceType,
    editAttendanceType,

    isLoading,
    attendance,
    getAttendance,
    groupedByDate,
    getTodayAttendance,
    attendanceData,
    selectedDate,
    attendanceDataByDate,
    getAttendanceByDate,
    type,
    getType,
    // formEdit,
    setSelectSalesman,
    editAttendance,
    showEditForm,
    selectedType,
    selectedAttendance,
    loadingCreateAttendance,
    attendanceVal,
    createAttendance,
  }
}
