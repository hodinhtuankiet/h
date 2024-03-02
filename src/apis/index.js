import axios from 'axios'
import { API_ROOT } from '~/utils/constants'
// Get BoardAPI
export const fetchBoardDetailsAPI = async (boardId) => {
  const response = await axios.get(`${API_ROOT}/v1/boards/${boardId}`)
  // axios always response.data
  return response.data
}
// POST ColumnAPI
export const createNewColumnAPI = async (newDataColumn) => {
  const response = await axios.post(`${API_ROOT}/v1/columns`, newDataColumn)
  return response.data
}
// POST CardAPI
export const createNewCardAPI = async (newDataCard, formData) => {
  console.log('Images in anxios :', newDataCard.images)
  const response = await axios.post(`${API_ROOT}/v1/cards`, newDataCard, formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  })
  return response.data
}
// export const createNewCardAPI = async (newDataCard) => {
//   console.log('Images in anxios :', newDataCard.images)
//   const response = await axios.post(`${API_ROOT}/v1/cards`, newDataCard
//     // headers: { 'Content-Type': 'multipart/form-data' }
//   )
//   return response.data
// }
export const deleteColumnAPI = async (columnId) => {
  const response = await axios.delete(`${API_ROOT}/v1/columns/${columnId}`)
  return response.data
}
