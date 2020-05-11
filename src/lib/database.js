import { env } from './env'
const mongoose = require('mongoose')

export const initDB = () => {
  mongoose.connect(env.MONGO_URI, { useNewUrlParser: true })

  mongoose.connection.once('open', () => {
    console.log('connected to database')
  })

  return mongoose.connection
}
