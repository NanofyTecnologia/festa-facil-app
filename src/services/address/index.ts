import axios from 'axios'

export const address = {
  async get(cep: string) {
    const { data } = await axios.get(`https://viacep.com.br/ws/${cep}/json/`)

    return data
  },
}
