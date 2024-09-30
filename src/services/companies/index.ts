import axios from '@/lib/axios'

import {
  type CompanyPreview,
  type GetCompaniesResponse,
  type UpdateCompanyParams,
  type CreateCompanyParams,
  type GetCompanyByCategoryResponse,
} from './types'

export const companies = {
  async get() {
    const { data: services } =
      await axios.get<GetCompaniesResponse>('/companies')

    return services
  },

  async create(data: CreateCompanyParams) {
    const { data: createdData } = await axios.post<CompanyPreview>(
      '/companies',
      data,
    )

    return createdData
  },

  async update({ id, data }: UpdateCompanyParams) {
    const { data: updatedData } = await axios.put<CompanyPreview>(
      '/companies/' + id,
      data,
    )

    return updatedData
  },

  async getById(id: string) {
    const { data } = await axios.get<CompanyPreview>('/companies/' + id)

    return data
  },

  async getByRating() {
    const { data } = await axios.get<GetCompaniesResponse>('/companies/rating')

    return data
  },

  async getByUserId() {
    const { data } = await axios.get<GetCompaniesResponse>('/user/companies')

    return data
  },

  async getByCategory({ q }: { q: string }) {
    const { data } = await axios.get<GetCompanyByCategoryResponse>(
      '/companies/category',
      {
        params: {
          q,
        },
      },
    )

    return data
  },
}
