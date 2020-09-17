import { model, Schema } from 'mongoose'
import { ICommonDataForProjectsTasksAndJobOffers } from './utils/commonDataForProjectsTasksAndJobOffers'
import { extendSchema } from './utils/extendProjectsAndJobOffersSchema'

const STATUS_NAMES = ['active', 'completed', 'canceled']

interface IProjects extends ICommonDataForProjectsTasksAndJobOffers {
  idCompany  : string
  supervisors: string[]
}

const ProjectsToExtend = new Schema({
  code: {
    required: false,
    type    : String,
    unique  : true
  },
  idCompany: {
    required: true,
    type    : String
  },
  supervisors: {
    required: true,
    type    : [String]
  }
})

const Projects = extendSchema(ProjectsToExtend, STATUS_NAMES)

const ProjectsModel = model<IProjects>('projects', Projects)

export { IProjects, ProjectsModel, STATUS_NAMES }
