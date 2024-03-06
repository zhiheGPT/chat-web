import { request } from '@/utils'
import { saasHost } from '../index'
import { hosts } from '@/config/host'

// 新建文件夹
export const createFolder = (folderName) => {
  
}

// 获取文件列表
export const getFiles = () => {
  return request({
    url: `${hosts.chat}/v1/files`,
    method: 'GET',
  })
}
// 获取文件详情
export const getFileById = (id) => {
  return request({
    url: `${hosts.chat}/v1/files/${id}`,
    method: 'GET',
  })
}
// 获取文件详情
export const getFileContent = (id) => {
  return request({
    url: `${hosts.chat}/v1/files/${id}/content`,
    method: 'GET',
  })
}
// 文件删除
export const delFilesById = (id) => {
  return request({
    url: `${hosts.chat}/v1/files/${id}`,
    method: 'DELETE',
  })
}
// 文件上传
export const uploadFile = (formData) => {
  return request({
    url: `${hosts.chat}/v1/files`,
    method: 'POST',
    data: formData,
  })
}