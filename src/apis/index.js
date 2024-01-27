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
export const createNewCardAPI = async (newDataCard) => {
  const response = await axios.post(`${API_ROOT}/v1/cards`, newDataCard)
  return response.data
}
