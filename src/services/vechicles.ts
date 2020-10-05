import { Response, Vehicle } from '../typings'
import fakeData from '../fixtures/sample-data.json'

const proxy = 'https://cors-anywhere.herokuapp.com/'
const api = 'https://drive-kyte.herokuapp.com/api/v1/'

async function getVehicles(): Promise<Response<Vehicle>> {
  try {
    return await (await fetch(`${proxy}${api}vehicles`)).json()
  } finally {
    return fakeData
  }
}

export default getVehicles
