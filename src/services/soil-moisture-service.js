import { BadRequest } from 'fejl'
import { pick, isEmpty, isNaN } from 'lodash'

// Prevent overposting.
const pickProps = data => pick(data, ['moisture', 'timestamp', 'sensor_id', 'mac_address'])

/**
 * counter Service.
 * Gets a counter store injected.
 */
export default class CounterService {
  constructor(soilMoistureStore) {
    this.soilMoistureStore = soilMoistureStore
  }

  async create(data) {
    BadRequest.assert(data, `No payload given`)
    BadRequest.assert(!isEmpty(data), `Payload can't be empty`)
    BadRequest.assert(data.sensor_id, `sensor_id is required`)
    BadRequest.assert(data.moisture, `moisture is required`)
    BadRequest.assert(data.mac_address, `mac_address is required`)
    BadRequest.assert(data.timestamp, `time is required`)
    BadRequest.assert(
      !isNaN(Date.parse(data.timestamp)),
      `timestamp must be a valid ISO string`
    )
    const cleanData = pickProps(data)
    data.timestamp = new Date(data.timestamp)
    return this.soilMoistureStore.create(cleanData)
  }
}
