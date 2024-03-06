import { ref, onMounted } from 'vue'
import { queryRobotList } from '@/api'
import { getRobotOption } from '@aigc/utils'

export const useRobot = () => {
  const list = ref([])
  const categorys = ref(getRobotOption())
  categorys.value.forEach(item => item.checked = false)

  const queryList = async (req = {
    labelId: 1,
    pageSize: 100,
    pageNum: 1
  }) => {
    const { data } = await queryRobotList(req)
    list.value = data.map((item) => {
      return { ...item, checked: false }
    })
  }

  return {
    list,
    categorys,
    queryList
  }
}