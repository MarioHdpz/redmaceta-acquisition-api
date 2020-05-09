/**
 * In-memory soil moisture store.
 * For demo purposes, gets the logger injected.
 */
const mongoose = require('mongoose')

const MoistureSchema = mongoose.Schema({
  moisture: Number,
  timestamp: Date,
  sensor_id: Number,
  mac_address: String
})

const Moisture = mongoose.model('Moisture', MoistureSchema)

export default function createMoistureStore(logger) {
  const onInsert = err => {
    if (err) {
      logger.debug(err)
    }
  }

  return {
    async create(data) {
      try {
        await Moisture.collection.updateOne(
          { sensor_id: data.sensor_id, count: { $lt: 100 } },
          {
            $push: {
              measures: {
                moisture: data.moisture,
                timestamp: data.timestamp
              }
            },
            $set: {
              end_date: data.timestamp
            },
            $inc: { count: 1 },
            $setOnInsert: {
              sensor_id: data.sensor_id,
              start_date: data.timestamp,
              mac_address: data.mac_address
            }
          },
          { upsert: true },
          onInsert
        )
      } catch (error) {
        throw Error("Can't save to database")
      }
      return data
    }
  }
}
