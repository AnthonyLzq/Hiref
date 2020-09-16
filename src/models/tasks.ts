import { model, Schema } from 'mongoose'
import { ICommonDataForProjectsTasksAndJobOffers } from './utils/commonDataForProjectsTasksAndJobOffers'
import { extendSchema } from './utils/extendTaskSchema'

interface ITasks extends ICommonDataForProjectsTasksAndJobOffers {
  idProject        : Schema.Types.ObjectId
  responsible      : string[]
  status           : string
  subTasks?        : string[]
}

const TasksSchemaToExtend = new Schema({
  idProject: {
    ref     : 'projects',
    required: true,
    type    : Schema.Types.ObjectId
  },
  responsible: {
    required: true,
    type    : [String]
  },
  subTasks: [String]
})

const Tasks = extendSchema(TasksSchemaToExtend)

const TasksModel = model<ITasks>('tasks', Tasks)

export { ITasks, TasksModel }
