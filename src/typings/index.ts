export type Vehicle = {
  id: string
  make: string
  model: string
  status: string
  vehicle_class: string
  license_plate_number: string
  license_plate_state: string
  available: boolean
  miles_until_service: number
  last_mileage_reported: number
}

export interface Response<T> {
  data?: Array<T>
}

export type KeyValue = {
  key: string
  value: string
}

export type ColumnDefinition = {
  label: string
  key: string
  render: (value: string) => string
  className?: (value: string) => string
}

export type FilterProps = {
  id: string
  filterValue?: string
  handleFilter?: (filter: KeyValue) => void
}
