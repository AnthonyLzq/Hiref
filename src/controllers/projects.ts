import { DtoProjects } from '../dto-interfaces/projects.dto'
import { IProjects, ProjectsModel, STATUS_NAMES } from '../models/projects'
import {
  ErrorMessagesForProjectsController as EFP,
  GeneralErrorMessages as GEM
} from './errors/errors.messages'

class Projects {
  private _args: DtoProjects | null

  constructor (args: DtoProjects | null = null) {
    this._args = args
  }

  public process (
    type: string
  ): Promise<IProjects[]> | Promise<IProjects | null> | undefined {
    switch (type) {
      case 'getAllByCompany':
        return this._getAllByCompany()
      case 'getAllByStatus':
        return this._getAllByStatus()
      case 'getOneById':
        return this._getOneById()
      case 'getSupervisorsIdByProject':
        return this._getSupervisorsByProject()
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

  private async _getAllByCompany (): Promise<IProjects[]> {
    const { idCompany } = this._args as DtoProjects
    try {
      const projects = await ProjectsModel.find({ idCompany })

      return projects
    } catch (error) {
      console.error(error)
      throw new Error(EFP.problemGettingAllByCompany)
    }
  }

  private async _getAllByStatus (): Promise<IProjects[]> {
    const { idCompany, status } = this._args as DtoProjects
    try {
      const projects = await ProjectsModel.find({ idCompany, status })

      return projects
    } catch (error) {
      console.error(error)
      throw new Error(EFP.problemGettingAllByStatus)
    }
  }

  private async _getOneById (): Promise<IProjects | null> {
    const { id } = this._args as DtoProjects
    try {
      const project = await ProjectsModel.findById(id as string)

      if (!project) throw new Error(EFP.projectDoesNoExists)

      return project
    } catch (error) {
      if (error.message === EFP.projectDoesNoExists) throw error

      console.error(error)
      throw new Error(EFP.problemGettingOneById)
    }
  }

  private async _getSupervisorsByProject (): Promise<IProjects | null>{
    const { id } = this._args as DtoProjects
    try {
      const supervisorIds = await ProjectsModel.findById(id as string, '-_id supervisors')

      if (!supervisorIds) throw new Error(EFP.projectDoesNoExists)

      return supervisorIds
    } catch (error) {
      if (error.message === EFP.projectDoesNoExists) throw error

      console.error(error)
      throw new Error(EFP.problemGettingOneById)
    }
  }

  private async _store (): Promise<IProjects | null> {
    const {
      code,
      deadline,
      description,
      idCompany,
      supervisors
    } = this._args as DtoProjects

    try {
      if (!code) throw new Error(GEM.missingCode)
      else if (!deadline) throw new Error(GEM.missingDeadline)
      else if (new Date(deadline).toString() === 'Invalid Date')
        throw new Error(GEM.invalidDate)
      else if (!idCompany) throw new Error(GEM.missingIdCompany)
      else if (!description) throw new Error(GEM.missingDescription)
      else if (!supervisors) throw new Error(EFP.missingSupervisor)

      const newProject = new ProjectsModel({
        code,
        deadline: new Date(deadline),
        description,
        idCompany,
        status  : 'active',
        supervisors
      })
      const result = await newProject.save()

      return result
    } catch (error) {
      if (
        error.message === GEM.missingCode ||
        error.message === GEM.missingDeadline ||
        error.message === GEM.invalidDate ||
        error.message === GEM.missingIdCompany ||
        error.message === GEM.missingDescription ||
        error.message === EFP.missingSupervisor
      )
        throw error
      else {
        console.error(error)
        throw new Error(EFP.problemStoringProjects)
      }
    }
  }

  private async _update (): Promise<IProjects | null> {
    const {
      code,
      deadline,
      description,
      id,
      status,
      supervisors
    } = this._args as DtoProjects

    try {
      if (!code) throw new Error(GEM.missingCode)
      else if (!deadline) throw new Error(GEM.missingDeadline)
      else if (new Date(deadline).toString() === 'Invalid Date')
        throw new Error(GEM.invalidDate)
      else if (!description) throw new Error(GEM.missingDescription)
      else if (!supervisors) throw new Error(EFP.missingSupervisor)
      else if (!status) throw new Error(GEM.missingStatus)
      else if (!STATUS_NAMES.includes(status as string))
        throw new Error(GEM.statusNotAllowed)

      const result = await ProjectsModel.findByIdAndUpdate(
        id as string,
        {
          code,
          deadline: new Date(deadline),
          description,
          id,
          status,
          supervisors
        },
        {
          new: true
        }
      )

      return result
    } catch (error) {
      if (
        error.message === GEM.missingCode ||
        error.message === GEM.missingDeadline ||
        error.message === GEM.invalidDate ||
        error.message === GEM.missingDescription ||
        error.message === EFP.missingSupervisor ||
        error.message === GEM.statusNotAllowed
      )
        throw error
      else {
        console.error(error)
        throw new Error(EFP.problemUpdatingProjects)
      }
    }
  }

  private async _updateStatus (): Promise<IProjects | null> {
    const { id, status } = this._args as DtoProjects

    try {
      if (!STATUS_NAMES.includes(status as string))
        throw new Error(GEM.statusNotAllowed)

      const result = await ProjectsModel.findByIdAndUpdate(
        id as string,
        { status: status as string },
        { new: true }
      )

      return result
    } catch (error) {
      console.error(error)
      throw new Error(GEM.problemUpdatingStatus)
    }
  }
}

export { Projects }
