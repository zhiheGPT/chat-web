import { request } from '@/utils'
import { saasHost } from '../index'
// 登录
export const login = (data) => {
  return Promise.resolve(
    request({
      url: `${saasHost}/login`,
      method: 'POST',
      data
    })
  )
}

// 查询用户信息
export const queryUser = () => {
  return Promise.resolve(
    request({
      url: `${saasHost}/getInfo`,
      method: 'GET'
    })
  )
}

// 查询权限菜单
export const queryUserRoleMenusApi = () => {
  return Promise.resolve(
    request({
      url: `${saasHost}/getRouters`,
      method: 'GET'
    })
  )
}


// 登出
export const logout = () => {
  return Promise.resolve(
    request({
      url: `${saasHost}/logout`,
      method: 'POST'
    })
  )
}
// 注册
export const register = (data) => {
  return Promise.resolve(
    request({
      url: '/gpt/api/aigc/register',
      method: 'POST',
      data
    })
  )
}

// 用户昵称修改
export const userNameUpdate = (userName) => {
  return Promise.resolve(
    request({
      url: '/gpt/api/user/update',
      method: 'POST',
      data: { userName }
    })
  )
}

// 用户出初始化
export const userInit = (userName) => {
  return Promise.resolve(
    request({
      url: '/gpt/api/chatpy/init',
      method: 'POST',
      data: {
        userName
      }
    })
  )
}

// 短信验证码
export const getSmsCode = ({ phone, imgCode }) => {
  return Promise.resolve(
    request({
      url: '/gpt/api/common/sendSmsCode',
      method: 'POST',
      data: {
        phone,
        imgCode,
        smsType: 'register'
      }
    })
  )
}

// 验证码
export const getCaptcha = () => {
  return Promise.resolve(
    request({
      url: 'http://chat2aigc.com/gpt/api/aigc/captcha.jpg',
      method: 'GET',
      responseType: 'blob'
    })
  )
}
export const setKey = (dirName) => {
  return Promise.resolve(
    request({
      url: '/gpt/api/chatpy/setKey',
      method: 'POST',
      data: {
        dirName
      }
    })
  )
}


// 用户管理 新增账号
export const insertUserApi = (data) => {
  return Promise.resolve(
    request({
      url: `${saasHost}/system/user`,
      method: 'POST',
      data
    })
  )
}

// 用户管理 编辑账号
export const editUserApi = (data) => {
  return Promise.resolve(
    request({
      url: `${saasHost}/system/user`,
      method: 'PUT',
      data
    })
  )
}

// 用户管理 删除
export const deleteUserApi = (data) => {
  return Promise.resolve(
    request({
      url: `${saasHost}/system/user/${data}`,
      method: 'DELETE',
      data
    })
  )
}
/**
 * 设置 - 用户中心
 */
// 用户头像上传
export const avatarUploadApi = (data) => {
  return Promise.resolve(
    request({
      url: `${saasHost}/system/user/profile/avatar1`,
      method: 'POST',
      data
    })
  )
}
