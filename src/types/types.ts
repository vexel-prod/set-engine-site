export interface CompanyData {
  full_name: string
  short_name: string
  inn: string
  ogrn: string
  reg_date: string
  legal_address: string
  ceo: string
  okved_main: string
  last_verified_date: string
}

export type Theme = 'light' | 'dark'

export interface SimulatorQuestion {
  id: number
  text: string
  options: {
    label: string
    value: string
    points: number
    recommendation: string
  }[]
}

export interface RiskItem {
  id: string
  title: string
  description: string
  severity: 'P1' | 'P2' | 'P3'
  category: string
}
