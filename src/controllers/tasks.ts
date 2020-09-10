import { DtoTasks } from '../dto-interfaces/tasks.dto'
import { ITasks, TasksModel } from '../models/tasks'
import { ErrorMessagesForTasksController as EFT } from './errors/errors.messages'

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
      default:
        return undefined
    }
  }

  private async _deleteOne (): Promise<ITasks | null> {
    const { id } = this._args as DtoTasks
    try {
      const deletedTasks = await TasksModel.findOneAndDelete({ id })

      return deletedTasks
    } catch (error) {
      console.error(error)
      throw new Error(EFT.problemDeleting)
    }
  }

  private async _getAll (): Promise<ITasks[]> {
    const { idCompany, idProject } = this._args as DtoTasks
    try {
      const tasks = await TasksModel.find({ idCompany, idProject })

      return tasks
    } catch (error) {
      console.error(error)
      throw new Error(EFT.problemGettingAll)
    }
  }

  private async _store (): Promise<ITasks> {
    const {
      idCompany,
      idProject,
      limitDate,
      name,
      responsible,
      status,
      subTasks
    } = this._args as DtoTasks

    if (!idCompany) throw new Error(EFT.missingIdCompany)
    else if (!idProject) throw new Error(EFT.missingIdProject)
    else if (!limitDate) throw new Error(EFT.missingLimitDate)
    else if (new Date(limitDate).toString() === 'Invalid Date') throw new Error(EFT.invalidDate)
    else if (!name) throw new Error(EFT.missingName)
    else if (!responsible) throw new Error(EFT.missingResponsible)
    else if (!status) throw new Error(EFT.missingStatus)

    try {
      const newTask = new TasksModel({
        idCompany,
        idProject,
        limitDate: new Date(limitDate),
        name,
        responsible,
        status,
        subTasks
      })
      const result = await newTask.save()

      return result
    } catch (error) {
      if (
        error.message === EFT.missingIdCompany ||
        error.message === EFT.missingIdProject ||
        error.message === EFT.missingLimitDate ||
        error.message === EFT.invalidDate ||
        error.message === EFT.missingName ||
        error.message === EFT.missingResponsible ||
        error.message === EFT.missingStatus
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
      limitDate,
      name,
      responsible,
      status,
      subTasks
    } = this._args as DtoTasks

    if (!limitDate) throw new Error(EFT.missingLimitDate)
    else if (new Date(limitDate).toString() === 'Invalid Date') throw new Error(EFT.invalidDate)
    else if (!name) throw new Error(EFT.missingName)
    else if (!responsible) throw new Error(EFT.missingResponsible)
    else if (!status) throw new Error(EFT.missingStatus)
    else if (!subTasks) throw new Error(EFT.missingSubTasks)

    try {
      const result = await TasksModel.findByIdAndUpdate(
        id,
        {
          limitDate: new Date(limitDate),
          name,
          responsible,
          status,
          subTasks
        },
        {
          new: true
        }
      )

      return result
    } catch (error) {
      if (
        error.message === EFT.missingLimitDate ||
        error.message === EFT.invalidDate ||
        error.message === EFT.missingName ||
        error.message === EFT.missingResponsible ||
        error.message === EFT.missingStatus ||
        error.message === EFT.missingSubTasks
      )
        throw error
      else {
        console.error(error)
        throw new Error(EFT.problemStoringTasks)
      }
    }
  }
}

export { Tasks }
