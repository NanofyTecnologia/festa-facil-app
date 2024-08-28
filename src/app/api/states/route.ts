import axios from 'axios'
import { NextResponse } from 'next/server'

type GetStatesResponse = {
  'UF-nome': string
  'UF-sigla': string
}

export async function GET() {
  const response = await axios.get<GetStatesResponse[]>(
    'https://servicodados.ibge.gov.br/api/v1/localidades/estados?orderBy=nome&view=nivelado',
  )

  const data = response.data.map((state) => ({
    name: state['UF-nome'],
    acronym: state['UF-sigla'],
  }))

  return NextResponse.json(data, { status: 200 })
}
