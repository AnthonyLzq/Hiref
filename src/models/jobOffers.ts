import { model, Schema } from 'mongoose'
import { ICommonDataForProjectsTasksAndJobOffers } from './utils/commonDataForProjectsTasksAndJobOffers'
import { IRoles } from '../dto-interfaces/jobOffers.dto'
import { extendSchema } from './utils/extendProjectsAndJobOffersSchema'
import { Information as InformationSchema } from './utils/information'

const STATUS_NAMES = ['published', 'inEvaluation', 'rePublished', 'completed', 'canceled']

interface IJobOffers extends ICommonDataForProjectsTasksAndJobOffers {
  idProject  : Schema.Types.ObjectId
  occupations: string[]
  roles      : IRoles[]
}

const Roles = new Schema({
  description: {
    required: true,
    type    : InformationSchema
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

const JobOffersToExtend = new Schema({
  applicants: {
    required: false,
    type    : [String]
  },
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
})

const JobOffers = extendSchema(JobOffersToExtend, STATUS_NAMES)

const JobOffersModel = model<IJobOffers>('jobOffers', JobOffers)

export { IJobOffers, JobOffersModel, STATUS_NAMES }
