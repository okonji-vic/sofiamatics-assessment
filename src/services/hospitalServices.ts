import axios from "@/lib/axiosInstance"
import type { HospitalApiResponse, FilterParams } from "@/types/hospital"

export async function fetchHospitals(params: FilterParams): Promise<HospitalApiResponse> {
  const response = await axios.get<HospitalApiResponse>("hospitals", { params })
  console.log("Hospital API Response:", response)
  return response.data
}

export async function searchHospitals(searchTerm: string, page = 1): Promise<HospitalApiResponse> {
  return fetchHospitals({
    countryId: 166,
    searchTerm,
    page,
    perPage: 10,
  })
}

export async function filterHospitalsByType(type: string, page = 1): Promise<HospitalApiResponse> {
  return fetchHospitals({
    countryId: 166,
    type,
    page,
    perPage: 10,
  })
}

export async function filterHospitalsByState(state: string, page = 1): Promise<HospitalApiResponse> {
  // return fetchHospitals({
  //   countryId: 166,
  //   state,
  //   page,
  //   perPage: 10,
  // })
  const response = await axios.get<HospitalApiResponse>("hospitals", {
    params: {
      countryId: 166,
      state,
      page,
      perPage: 10,
    },
  })
  console.log("Filter by State API Response:", response)
  // filter results manually
  const filteredData = response.data.data.data.filter(
    (hospital) => hospital.state.toLowerCase() === state.toLowerCase()
  )
  console.log("Filtered Hospitals:", filteredData)
  return {
    ...response.data,
    data: {
      ...response.data.data,
      data: filteredData,
      totalCount: filteredData.length,
      totalPages: Math.ceil(filteredData.length / 10),
    },
  }
}
