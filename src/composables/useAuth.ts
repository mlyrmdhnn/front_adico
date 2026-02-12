// import { ref } from "process"
import { ref } from 'vue'
import { api } from '@/lib/http'
import { useAuthStore } from '@/stores/auth'
import { useToast } from './useToast'
type LoginForm = {
  id: number
  username: string
  password: string
}
export function useAuth() {
  const message = ref('')
  const { show } = useToast()
  const auth = useAuthStore()
  const minutes = 56 * 60 * 1000
  const form = ref<LoginForm>({
    id: 0,
    username: '',
    password: '',
  })
  const isLoading = ref<boolean>(false)
  const login = async () => {
    isLoading.value = true
    try {
      const res: any = await api.post('/login', form.value, { skipAuth: true })
      const user = res.data.user
      if (user.role == 'manager' || user.role == 'supervisor') {
        return (window.location.href = '/dashboard')
      }
      if (user?.role === 'salesman') {
        return (window.location.href = '/salesman/report')
      }
      if (user?.role === 'developer') {
        return (window.location.href = '/dev-area')
      }
      return res
    } catch (err: any) {
      message.value = err?.response?.data.message
      if (!err?.response?.data.message) {
        message.value = 'Something went wrong'
      }
    } finally {
      isLoading.value = false
    }
  }

  const logout = async () => {
    isLoading.value = true
    try {
      await api.post('/logout')
      window.location.href = '/'
    } catch (err: any) {
    } finally {
      isLoading.value = false
    }
  }

  const userData = ref<any[]>([])
  const getMe = async () => {
    const res = await api.get('/me')
    userData.value = res.data
  }
  const refresh = async () => {
    try {
      const res = await api.post('/refresh')
    } catch (err: any) {}
  }
  //   const formProffile = ref({})
  const changeProffile = async () => {
    try {
      const res: any = await api.post('/proffile/edit', userData.value)
      show('Success edit proffile', 'success')
    } catch (err: any) {
      show('Failed edit proffile', 'error')
    } finally {
    }
  }
  const formChangePass = ref({
    oldPass: '',
    newPass: '',
    confirmPass: '',
  })

  const changePassword = async () => {
    if (formChangePass.value.newPass !== formChangePass.value.confirmPass) {
      return show('New password and confirm password must be same', 'info')
    }
    if (formChangePass.value.newPass.length < 6) {
      return show('New Password must at least 6 character', 'info')
    }
    try {
      const res = await api.post('/change/password', formChangePass.value)
      const form = formChangePass.value
      show('Success change password', 'success')
      form.oldPass = ''
      form.newPass = ''
      form.confirmPass = ''
    } catch (err: any) {
      show('Failed change password', 'error')
    } finally {
    }
  }
  return {
    isLoading,
    form,
    login,
    getMe,
    userData,
    refresh,
    logout,
    changeProffile,
    changePassword,
    formChangePass,
    message,
  }
}
