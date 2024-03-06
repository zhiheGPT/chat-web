import { ref } from 'vue'
import { getFiles, delFilesById } from '@/api'
import { useChatStore } from '@/stores'


export const useFile = () => {
  const loading = ref(false)
  const folders = ref([])
  const chatStore = useChatStore()
  const initFolder = async () => {
    loading.value = true
    folders.value = await getFiles().finally(() => loading.value = false)
    chatStore.setFile(folders.value[0])
  }
  const deleteFile = async (id) => {
    await delFilesById(id)
    initFolder()
  }
  return {
    loading,
    folders,
    deleteFile,
    initFolder
  }
}