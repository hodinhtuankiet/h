import axios from 'axios'
import { API_ROOT } from '~/utils/constants'

export const fetchBoardDetailsAPI = async (boardId) => {
  try {
    const response = await axios.get(`${API_ROOT}/v1/boards/${boardId}`)
    return response.data
  } catch (error) {
    if (error.response) {
      // The request was made, but the server responded with a status code outside of 2xx
      console.error('Server responded with an error:', error.response.data)
      console.error('Status Code:', error.response.status)
    } else if (error.request) {
      // The request was made, but no response was received
      console.error('No response received from the server:', error.request)
    } else {
      // Something happened in setting up the request that triggered an Error
      console.error('Error setting up the request:', error.message)
    }

    // Propagate the error to the caller if needed
    throw error
  }
};
