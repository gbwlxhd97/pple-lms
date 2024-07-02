import { requestAPI } from '@/utils/fetch'

const getAgencyList = async () => {
  const {data} = await requestAPI().get(`/agency/agencies`);
  return data
}


const agencyAPIList = {
  getAgencyList
}

export default agencyAPIList;