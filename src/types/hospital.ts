export interface Hospital {
  id: number
  hospitalName: string
  logoUrl: string
  hospitalEmail: string
  phoneNumber: string
  address: string
  type: string
  longitude: number
  latitude: number
  country: string
  countryId: string
  countryCode: string
  state: string
  distanceInMeters: number
  distanceInKm: number
  formattedDistance: string
}

export interface HospitalApiResponse {
  message: string
  statusCode: number
  data: {
    data: Hospital[]
    totalCount: number
    page: number
    perPage: number
    totalPages: number
  }
}

export interface FilterParams {
  countryId: number
  page?: number
  perPage?: number
  searchTerm?: string
  type?: string
  state?: string
  longitude?: number
  latitude?: number
}
