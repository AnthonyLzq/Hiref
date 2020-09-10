import { DtoProjects } from '../dto-interfaces/projects.dto'
import { IProjects, ProjectsModel, STATUS_NAMES } from '../models/projects'
import { ErrorMessagesForProjectsController as EFP } from './errors/errors.messages'

class Projects {
  private _args: DtoProjects | null

  constructor (args: DtoProjects | null = null) {
    this._args = args
  }

  public process (
    type: string
  ): Promise<IProjects[]> | Promise<IProjects | null> | undefined {
    switch (type) {
      case 'getAll':
        return this._getAll()
      case 'getAllByCompany':
        return this._getAllByCompany()
      case 'getAllByStatus':
        return this._getAllByStatus()
      case 'store':
        return this._store()
      case 'update':
        return this._update()
      default:
        return undefined
    }
  }

  // eslint-disable-next-line class-methods-use-this
  private async _getAll (): Promise<IProjects[]> {
    try {
      const projects = await ProjectsModel.find({})

      return projects
    } catch (error) {
      console.error(error)
      throw new Error(EFP.problemGettingAll)
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

  private async _store (): Promise<IProjects | null> {
    const {
      categories,
      description,
      idCompany,
      limitDate,
      name,
      roles,
      subCategories
    } = this._args as DtoProjects

    if (!categories) throw new Error(EFP.missingCategories)
    else if (!description) throw new Error(EFP.missingDescription)
    else if (!idCompany) throw new Error(EFP.missingIdCompany)
    else if (!limitDate) throw new Error(EFP.missingLimitDate)
    else if (new Date(limitDate).toString() === 'Invalid Date') throw new Error(EFP.invalidDate)
    else if (!name) throw new Error(EFP.missingName)
    else if (!roles) throw new Error(EFP.missingRoles)
    else if (!subCategories) throw new Error(EFP.missingSubCategories)

    try {
      const newProject = new ProjectsModel({
        categories,
        description,
        idCompany,
        limitDate: new Date(limitDate),
        name,
        roles,
        status   : 'published'
      })
      const result = await newProject.save()

      return result
    } catch (error) {
      if (
        error.message === EFP.missingCategories ||
        error.message === EFP.missingDescription ||
        error.message === EFP.missingIdCompany ||
        error.message === EFP.missingLimitDate ||
        error.message === EFP.invalidDate ||
        error.message === EFP.missingName ||
        error.message === EFP.missingRoles
      )
        throw error
      else {
        console.error(error)
        throw error(EFP.problemStoringProjects)
      }
    }
  }

  private async _update (): Promise<IProjects | null> {
    const {
      categories,
      description,
      id,
      limitDate,
      name,
      roles,
      status,
      subCategories
    } = this._args as DtoProjects

    if (!categories) throw new Error(EFP.missingCategories)
    else if (!description) throw new Error(EFP.missingDescription)
    else if (!limitDate) throw new Error(EFP.missingLimitDate)
    else if (new Date(limitDate).toString() === 'Invalid Date') throw new Error(EFP.invalidDate)
    else if (!name) throw new Error(EFP.missingName)
    else if (!roles) throw new Error(EFP.missingRoles)
    else if (!subCategories) throw new Error(EFP.missingSubCategories)
    else if (!STATUS_NAMES.includes(status as string))
      throw new Error(EFP.statusNotAllowed)

    try {
      const result = await ProjectsModel.findByIdAndUpdate(
        id,
        {
          categories,
          description,
          limitDate,
          name,
          roles,
          status,
          subCategories
        },
        {
          new: true
        }
      )

      return result
    } catch (error) {
      if (
        error.message === EFP.missingCategories ||
        error.message === EFP.missingDescription ||
        error.message === EFP.missingLimitDate ||
        error.message === EFP.invalidDate ||
        error.message === EFP.missingName ||
        error.message === EFP.missingRoles ||
        error.message === EFP.missingSubCategories ||
        error.message === EFP.statusNotAllowed
      )
        throw error
      else {
        console.error(error)
        throw new Error(EFP.problemUpdatingProjects)
      }
    }
  }
}

export { Projects }
