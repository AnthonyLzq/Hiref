import { Document, Schema } from 'mongoose'
import { IInformation } from '../../dto-interfaces/utils/informationInterface'
import { Information as InformationSchema } from './information'

interface ICommonDataForProjectsTasksAndJobOffers extends Document {
  code?      : string
  deadline   : Date
  description: IInformation
  status     : string
}

const CommonDataForProjectsTasksAndJobOffers = new Schema(
  {
    deadline: {
      required: true,
      type    : Date
    },
    description: {
      required: true,
      type    : InformationSchema
    }
  },
  {
    timestamps: {
      createdAt: true,
      updatedAt: true
    }
  }
)

export {
  ICommonDataForProjectsTasksAndJobOffers,
  CommonDataForProjectsTasksAndJobOffers
}
