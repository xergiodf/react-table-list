import React, { useEffect, useState } from 'react'
import Reset from './components/UI/Reset'
import { Vehicle } from './typings'
import getVehicles from './services/vechicles'
import Table from './components/Table'

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
      <Reset />

      <header>Kyte code challenge</header>
      {(vehicles && vehicles.length > 0) ? (
        <>
          <Table
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
          >
            <h1>Hola</h1>
          </Table>
        </>
      ) : (<p>Loading data...</p>)}
    </>
  )
}

export default React.memo(App)
