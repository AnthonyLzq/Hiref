import { Schema } from 'mongoose'

const Information = new Schema({
  content: {
    required: true,
    type    : String
  },
  title: {
    required: true,
    type    : String
  }
})

export { Information }
