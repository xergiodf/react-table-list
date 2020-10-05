import React, { useEffect, useState } from 'react'
import { Vehicle } from './typings'
import getVehicles from './services/vechicles'
import DataTable from './components/DataTable'
import Header from './components/UI/Header'

// Column display definition
const COLUMNS_DEF = [
  {
    label: 'ID',
    key: 'id',
    render: (value: string) => `${value.split('-')[0]}...`,
  },
  {
    label: 'Model',
    key: 'model',
    render: (value: string) => value,
  },
  {
    label: 'Make',
    key: 'make',
    render: (value: string) => value,
  },
  {
    label: 'Licence State',
    key: 'license_plate_state',
    render: (value: string) => value,
  },
  {
    label: 'Licence Plate',
    key: 'license_plate_number',
    render: (value: string) => value,
  },
  {
    label: 'Last mi. reported',
    key: 'last_mileage_reported',
    render: (value: string) => value,
  },
  {
    label: 'Mi. until svc',
    key: 'miles_until_service',
    render: (value: string) => value,
    className: (value: string) => (Number(value) < 500 && 'alert') || '',
  },
  {
    label: 'Status',
    key: 'status',
    render: (value: string) => value,
  },
  {
    label: 'Available',
    key: 'available',
    render: (value: string) => `${(value === 'true' && '🔵️') || '🔴️'}`,
  },
]

const App: React.FC = () => {
  const [vehicles, setVehicles] = useState<Vehicle[] | undefined>()

  useEffect(() => {
    async function load(): Promise<void> {
      const vehiclesResponse = await getVehicles()
      setVehicles(vehiclesResponse.data)
    }

    load()
  }, [])

  return (
    <>
      <Header>React Table List</Header>
      {vehicles && vehicles.length > 0 ? (
        <>
          <DataTable
            sortBy="miles_until_service"
            data={vehicles}
            filters={[
              'license_plate_number',
              'license_plate_state',
              'status',
              'make',
              'model',
              'vehicle_class',
            ]}
            columnsDef={COLUMNS_DEF}
          />
        </>
      ) : (
        <p>Loading data...</p>
      )}
    </>
  )
}

export default React.memo(App)
