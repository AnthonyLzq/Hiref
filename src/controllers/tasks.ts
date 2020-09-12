import { Schema } from 'mongoose'
import { DtoTasks } from '../dto-interfaces/tasks.dto'
import { ITasks, TasksModel } from '../models/tasks'
import { ErrorMessagesForTasksController as EFT, GeneralErrorMessages as GEM } from './errors/errors.messages'

class Tasks {
  private _args: DtoTasks | null

  constructor (args: DtoTasks | null = null) {
    this._args = args
  }

  public process (
    type: string
  ): Promise<ITasks[]> | Promise<ITasks | null> | undefined {
    switch (type) {
      case 'deleteOne':
        return this._deleteOne()
      case 'getAll':
        return this._getAll()
      case 'store':
        return this._store()
      case 'update':
        return this._update()
      case 'updateStatus':
        return this._updateStatus()
      default:
        return undefined
    }
  }

  private async _deleteOne (): Promise<ITasks | null> {
    const { id } = this._args as DtoTasks
    try {
      const deletedTasks = await TasksModel.findByIdAndDelete(id)

      return deletedTasks
    } catch (error) {
      console.error(error)
      throw new Error(EFT.problemDeletingTasks)
    }
  }

  private async _getAll (): Promise<ITasks[]> {
    const { idProject } = this._args as DtoTasks
    try {
      const tasks = await TasksModel.find({
        idProject: new Schema.Types.ObjectId(idProject as string)
      })

      return tasks
    } catch (error) {
      console.error(error)
      throw new Error(EFT.problemGettingAll)
    }
  }

  private async _store (): Promise<ITasks> {
    const {
      idProject,
      deadline,
      description,
      responsible,
      status,
      subTasks
    } = this._args as DtoTasks

    try {
      if (!idProject) throw new Error(GEM.missingIdProject)
      else if (!deadline) throw new Error(GEM.missingDeadline)
      else if (new Date(deadline).toString() === 'Invalid Date')
        throw new Error(GEM.invalidDate)
      else if (!description) throw new Error(GEM.missingDescription)
      else if (!responsible) throw new Error(EFT.missingResponsible)
      else if (!status) throw new Error(GEM.missingStatus)
      else if (!subTasks) throw new Error(EFT.missingSubTasks)

      let newTask: ITasks
      if (subTasks && subTasks.length > 0)
        newTask = new TasksModel({
          deadline         : new Date(deadline),
          description,
          idProject,
          responsible,
          responsibleNumber: responsible.length,
          status,
          subTasks
        })
      else
        newTask = new TasksModel({
          deadline         : new Date(deadline),
          description,
          idProject,
          responsible,
          responsibleNumber: responsible.length,
          status
        })
      const result = await newTask.save()

      return result
    } catch (error) {
      if (
        error.message === GEM.missingIdProject ||
        error.message === GEM.missingDeadline ||
        error.message === GEM.invalidDate ||
        error.message === GEM.missingDescription ||
        error.message === EFT.missingResponsible ||
        error.message === GEM.missingStatus ||
        error.message === EFT.missingSubTasks
      )
        throw error
      else {
        console.error(error)
        throw new Error(EFT.problemStoringTasks)
      }
    }
  }

  private async _update (): Promise<ITasks | null> {
    const {
      id,
      deadline,
      description,
      responsible,
      status,
      subTasks
    } = this._args as DtoTasks

    try {
      if (!deadline) throw new Error(GEM.missingDeadline)
      else if (new Date(deadline).toString() === 'Invalid Date') throw new Error(GEM.invalidDate)
      else if (!description) throw new Error(GEM.missingDescription)
      else if (!responsible) throw new Error(EFT.missingResponsible)
      else if (!status) throw new Error(GEM.missingStatus)
      else if (!subTasks) throw new Error(EFT.missingSubTasks)

      let result: ITasks | null
      if (subTasks.length > 0)
        result = await TasksModel.findByIdAndUpdate(
          id,
          {
            deadline: new Date(deadline),
            description,
            responsible,
            status,
            subTasks
          },
          {
            new: true
          }
        )
      else
        result = await TasksModel.findByIdAndUpdate(
          id,
          {
            deadline: new Date(deadline),
            description,
            responsible,
            status
          },
          {
            new: true
          }
        )

      return result
    } catch (error) {
      if (
        error.message === GEM.missingDeadline ||
        error.message === GEM.invalidDate ||
        error.message === GEM.missingDescription ||
        error.message === EFT.missingResponsible ||
        error.message === GEM.missingStatus ||
        error.message === EFT.missingSubTasks
      )
        throw error
      else {
        console.error(error)
        throw new Error(EFT.problemStoringTasks)
      }
    }
  }

  private async _updateStatus (): Promise<ITasks | null> {
    const { id, status } = this._args as DtoTasks

    try {
      const result = await TasksModel.findByIdAndUpdate(
        id as string,
        { status: status as string }
      )

      return result
    } catch (error) {
      console.error(error)
      throw error
    }
  }
}

export { Tasks }
