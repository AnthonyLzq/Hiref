import { Schema } from 'mongoose'
import { CommonDataForProjectsTasksAndJobOffers } from './commonDataForProjectsTasksAndJobOffers'

const extendSchema = (schemaToExtend: Schema): Schema => {
  return new Schema({
    ...CommonDataForProjectsTasksAndJobOffers.obj,
    ...schemaToExtend.obj,
    status: {
      required: true,
      type    : String
    }
  })
}

export { extendSchema }
