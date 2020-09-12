import { Schema } from 'mongoose'
import { CommonDataForProjectsTasksAndJobOffers } from './commonDataForProjectsTasksAndJobOffers'

const extendSchema = (
  schemaToExtend: Schema,
  availableStatus: string[]
  ): Schema => {
  const CommonDataForProjectsAndJobOffersWithStatus = new Schema ({
    ...CommonDataForProjectsTasksAndJobOffers.obj,
    status: {
      enum    : availableStatus,
      required: true,
      type    : String
    }
  })

  return new Schema({
    ...schemaToExtend.obj,
    ...CommonDataForProjectsAndJobOffersWithStatus.obj
  })
}

export { extendSchema }
