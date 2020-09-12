import { model, Schema } from 'mongoose'
import { ICommonDataForProjectsTasksAndJobOffers } from './utils/commonDataForProjectsTasksAndJobOffers'
import { ISupervisor } from '../dto-interfaces/projects.dto'
import { extendSchema } from './utils/extendProjectsAndJobOffersSchema'

const STATUS_NAMES = ['active', 'completed', 'canceled']

interface IProjects extends ICommonDataForProjectsTasksAndJobOffers {
  idCompany    : string
  supervisor   : ISupervisor[]
}

const SupervisorSchema = new Schema({
  dni: {
    required: true,
    type    : String
  },
  lastNames: {
    required: true,
    type    : String
  },
  names: {
    required: true,
    type    : String
  }
})

const ProjectsToExtend = new Schema(
  {
    idCompany: {
      required: true,
      type    : String
    },
    supervisor: {
      required: true,
      type    : [SupervisorSchema]
    }
  }
)

const Projects = extendSchema(ProjectsToExtend, STATUS_NAMES)

const ProjectsModel = model<IProjects>('projects', Projects)

export { IProjects, ProjectsModel, STATUS_NAMES }
