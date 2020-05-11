import { apiHelper } from './api-helper'

// TIP: if you have more than a handful of tests here
// in can be beneficial to split them into multiple files for
// test speed.
describe('soil-moisture API', () => {
  it('can create todo', async done => {
    const api = await apiHelper()
    const measure = await api.createMoistureMeasure({
      moisture: 44.5,
      sensor_id: 12345,
      mac_address: 'B0.55.08.04.66.33',
      timestamp: '2020-04-01T00:35:00'
    })

    expect(measure.sensor_id).toBeDefined()
    expect(measure.nonexistent).not.toBeDefined()
    expect(measure).toEqual(
      expect.objectContaining({
        moisture: 44.5,
        sensor_id: 12345,
        mac_address: 'B0.55.08.04.66.33',
        timestamp: '2020-04-01T00:35:00'
      })
    )
    done()
  })
})
