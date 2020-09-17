import { model, Schema, Types } from 'mongoose'
import { ICommonDataForProjectsTasksAndJobOffers } from './utils/commonDataForProjectsTasksAndJobOffers'
import { IRoles } from '../dto-interfaces/jobOffers.dto'
import { extendSchema } from './utils/extendProjectsAndJobOffersSchema'
import { Information as InformationSchema } from './utils/information'

const STATUS_NAMES = ['published', 'inEvaluation', 'rePublished', 'completed', 'canceled']

interface IJobOffers extends ICommonDataForProjectsTasksAndJobOffers {
  idProject  : Types.ObjectId
  occupations: string[]
  roles      : IRoles[]
}

const Roles = new Schema(
  {
    applicants: {
      required: false,
      type    : [String]
    },
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
  },
  {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    _id: false
  }
)

const JobOffersToExtend = new Schema({
  idProject: {
    ref     : 'projects',
    required: true,
    type    : Schema.Types.ObjectId
  },
  numberApplicants: {
    required: true,
    type    : Number
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
