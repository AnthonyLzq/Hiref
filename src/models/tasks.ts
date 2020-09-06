import { Document, model, Schema } from 'mongoose'

interface ITasks extends Document {
  idCompany        : string,
  limitDate        : Date,
  name             : string,
  responsible      : string[],
  responsibleNumber: number,
  status           : string,
  subTasks?        : string[]
}

const Tasks = new Schema(
  {
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
    responsible: {
      required: true,
      type    : [String]
    },
    responsibleNumber: {
      required: true,
      type    : Number
    },
    status: {
      required: true,
      type    : String
    },
    subTasks: [String]
  },
  {
    timestamps: {
      createdAt: true,
      updatedAt: true
    }
  }
)

const TasksModel = model<ITasks>('tasks', Tasks)

export { ITasks, TasksModel }
