import { model, Schema } from 'mongoose'
import { ICommonDataForProjectsTasksAndJobOffers } from './utils/commonDataForProjectsTasksAndJobOffers'
import { IRoles } from '../dto-interfaces/jobOffers.dto'
import { extendSchema } from './utils/extendProjectsAndJobOffersSchema'

const STATUS_NAMES = ['published', 'inEvaluation', 'rePublished', 'completed', 'canceled']

interface IJobOffers extends ICommonDataForProjectsTasksAndJobOffers {
  idProject  : Schema.Types.ObjectId
  occupations: string[]
  roles      : IRoles[]
}

const Roles = new Schema({
  name: {
    required: true,
    type    : String
  },
  quantity: {
    required: true,
    type    : Number
  },
  remuneration: {
    required: true,
    type    : Number
  }
})

const JobOffersToExtend = new Schema(
  {
    idProject: {
      ref     : 'projects',
      required: true,
      type    : Schema.Types.ObjectId
    },
    occupations: {
      required: true,
      type    : [String]
    },
    roles: {
      required: true,
      type    : [Roles]
    }
  },
  {
    timestamps: {
      createdAt: true,
      updatedAt: true
    }
  }
)

const JobOffers = extendSchema(JobOffersToExtend, STATUS_NAMES)

const JobOffersModel = model<IJobOffers>('jobOffers', JobOffers)

export { IJobOffers, JobOffersModel, STATUS_NAMES }
