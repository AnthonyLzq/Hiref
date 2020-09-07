import { Document, model, Schema } from 'mongoose'
import { IRoles } from '../dto-interfaces/projects.dto'

const STATUS_NAMES = ['published', 'active', 'completed', 'canceled']

interface IProjects extends Document {
  categories   : string[],
  description  : string,
  idCompany    : string,
  limitDate    : Date,
  name         : string,
  roles        : IRoles[],
  status       : string,
  subCategories: string[]
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

const Projects = new Schema(
  {
    categories: {
      required: true,
      type    : [String]
    },
    description: {
      required: true,
      type    : String
    },
    idCompany: {
      required: true,
      type    : String
    },
    limitDate: {
      required: true,
      type    : Date
    },
    name: {
      required: true,
      type    : String
    },
    roles: {
      required: true,
      type    : [Roles]
    },
    status: {
      enum    : STATUS_NAMES,
      required: true,
      type    : String
    },
    subCategories: {
      required: true,
      type    : String
    }
  },
  {
    timestamps: {
      createdAt: true,
      updatedAt: true
    }
  }
)

const ProjectsModel = model<IProjects>('projects', Projects)

export { IProjects, ProjectsModel, STATUS_NAMES }
