/* eslint-disable max-len, @typescript-eslint/naming-convention, no-extra-parens */
import { Types } from 'mongoose'
import { DtoJobOffers, IRoles } from '../dto-interfaces/jobOffers.dto'
import { IInformation } from '../dto-interfaces/utils/informationInterface'
import { IJobOffers, JobOffersModel, STATUS_NAMES } from '../models/jobOffers'
import {
  ErrorMessagesForJobOffersController as EFJ,
  GeneralErrorMessages as GEM
} from './errors/errors.messages'

class JobOffers {
  private _args: DtoJobOffers | null

  constructor (args: DtoJobOffers | null = null) {
    this._args = args
  }

  public process (
    type: string
  ):
    | Promise<IJobOffers[]>
    | Promise<IJobOffers | null>
    | Promise<{
        acceptedJobOffers : IJobOffers[]
        availableJobOffers: IJobOffers[]
        rejectedJobOffers : IJobOffers[]
      }>
    | Promise<{
        availableJobOffers   : IJobOffers[]
        completedJobOffers   : IJobOffers[]
        inEvaluationJobOffers: IJobOffers[]
      }>
    | undefined {
    switch (type) {
      case 'deleteOne':
        return this._deleteOne()
      case 'getAll':
        return this._getAll()
      case 'getAllByProject':
        return this._getAllByProject()
      case 'getAllByOccupations':
        return this._getAllByOccupations()
      case 'getAllForAspirant':
        return this._getAllForAspirant()
      case 'getAllForEvaluator':
        return this._getAllForEvaluator()
      case 'postulation':
        return this._postulation()
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

  private async _deleteOne (): Promise<IJobOffers | null> {
    const { id } = this._args as DtoJobOffers

    try {
      const deletedJobOffer = await JobOffersModel.findByIdAndDelete(id)

      return deletedJobOffer
    } catch (error) {
      console.error(error)
      throw new Error(EFJ.problemDeletingJobOffer)
    }
  }

  // eslint-disable-next-line class-methods-use-this
  private async _getAll (): Promise<IJobOffers[]> {
    try {
      const jobOffers = await JobOffersModel.find({
        $or: [{ status: 'published' }, { status: 'rePublished' }]
      })

      return jobOffers
    } catch (error) {
      console.error(error)
      throw new Error(EFJ.problemGettingAll)
    }
  }

  private async _getAllByProject (): Promise<IJobOffers[]> {
    const { idProject } = this._args as DtoJobOffers

    try {
      const jobOffers = await JobOffersModel.find({
        idProject: new Types.ObjectId(idProject as string)
      })

      return jobOffers
    } catch (error) {
      console.error(error)
      throw new Error(EFJ.problemGettingAllByProject)
    }
  }

  private async _getAllByOccupations (): Promise<IJobOffers[]> {
    const { occupations } = this._args as DtoJobOffers

    try {
      const jobOffers = await JobOffersModel.find({
        occupations: { $in: occupations as string[] }
      })

      return jobOffers
    } catch (error) {
      console.error(error)
      throw new Error(EFJ.problemGettingAllByOccupations)
    }
  }

  private async _getAllForAspirant (): Promise<{
    acceptedJobOffers : IJobOffers[]
    availableJobOffers: IJobOffers[]
    rejectedJobOffers : IJobOffers[]
  }> {
    console.log(this._args)
    const { accepted, occupations, rejected } = this._args as DtoJobOffers
    /*
     * jobOffers:
     * - 0: Available job offers, not accepted nor rejected.
     * - 1: Accepted job offers.
     * - 2: Rejected job offers.
     */
    try {
      if (!occupations || (occupations as string[]).length === 0)
        throw new Error(EFJ.missingOccupations)
      let jobOffers: IJobOffers[][] | IJobOffers[] | null

      if (
        (accepted as string[]).length > 0 &&
        (rejected as string[]).length > 0 &&
        (occupations as string[]).length > 0
      ) {
        const acceptedIds = (accepted as string[]).map(
          (id: string) => new Types.ObjectId(id)
        )
        const rejectedIds = (rejected as string[]).map(
          (id: string) => new Types.ObjectId(id)
        )
        const acceptedAndRejectedIds = [...acceptedIds, ...rejectedIds]

        jobOffers = await Promise.all([
          JobOffersModel.find({
            _id        : { $nin: acceptedAndRejectedIds },
            occupations: { $in: occupations as string[] }
          }),
          JobOffersModel.find({
            _id        : { $in: acceptedIds },
            occupations: { $in: occupations as string[] }
          }),
          JobOffersModel.find({
            _id        : { $in: rejectedIds },
            occupations: { $in: occupations as string[] }
          })
        ])

        return {
          acceptedJobOffers : jobOffers[1],
          availableJobOffers: jobOffers[0],
          rejectedJobOffers : jobOffers[2]
        }
      }
      if (
        (accepted as string[]).length > 0 &&
        (occupations as string[]).length > 0
      ) {
        const acceptedIds = (accepted as string[]).map(
          (id: string) => new Types.ObjectId(id)
        )
        jobOffers = await Promise.all([
          JobOffersModel.find({
            _id        : { $nin: acceptedIds },
            occupations: { $in: occupations as string[] }
          }),
          JobOffersModel.find({
            _id        : { $in: acceptedIds },
            occupations: { $in: occupations as string[] }
          })
        ])

        return {
          acceptedJobOffers : jobOffers[1],
          availableJobOffers: jobOffers[0],
          rejectedJobOffers : []
        }
      }
      if (
        (rejected as string[]).length > 0 &&
        (occupations as string[]).length > 0
      ) {
        const rejectedIds = (accepted as string[]).map(
          (id: string) => new Types.ObjectId(id)
        )
        jobOffers = await Promise.all([
          JobOffersModel.find({
            _id        : { $nin: rejectedIds },
            occupations: { $in: occupations as string[] }
          }),
          JobOffersModel.find({
            _id        : { $in: rejectedIds },
            occupations: { $in: occupations as string[] }
          })
        ])

        return {
          acceptedJobOffers : [],
          availableJobOffers: jobOffers[0],
          rejectedJobOffers : jobOffers[1]
        }
      }

      jobOffers = await JobOffersModel.find({
        occupations: { $in: occupations as string[] }
      })

      return {
        acceptedJobOffers : [],
        availableJobOffers: jobOffers,
        rejectedJobOffers : []
      }
    } catch (error) {
      if (error.message === EFJ.missingOccupations) throw error

      console.error(error)
      throw new Error(EFJ.problemGettingAllForAspirant)
    }
  }

  private async _getAllForEvaluator (): Promise<{
    availableJobOffers   : IJobOffers[]
    completedJobOffers   : IJobOffers[]
    inEvaluationJobOffers: IJobOffers[]
  }> {
    const { completed, inEvaluation } = this._args as DtoJobOffers
    /*
    * jobOffers:
    * - 0: Available job offers, not in evaluation nor completed.
    * - 1: Completed job offers.
    * - 2: In evaluation job offers.
    */
    try {
      let jobOffers: IJobOffers[][] | IJobOffers[] | null
      if (
        (completed as string[]).length > 0 &&
        (inEvaluation as string[]).length > 0
      ) {
        const completedIds = (completed as string[]).map(
          (id: string) => new Types.ObjectId(id)
        )
        const inEvaluationIds = (inEvaluation as string[]).map(
          (id: string) => new Types.ObjectId(id)
        )
        const completedAndInEvaluationIds = [...completedIds, ...inEvaluationIds]
        jobOffers = await Promise.all([
          JobOffersModel.find(
            {
              $or: [{ status: 'published' }, { status: 'rePublished' }],
              _id: { $in: completedAndInEvaluationIds }
            }
          ),
          JobOffersModel.find(
            {
              $or: [{ status: 'published' }, { status: 'rePublished' }],
              _id: { $in: completedIds }
            }
          ),
          JobOffersModel.find(
            {
              $or: [{ status: 'published' }, { status: 'rePublished' }],
              _id: { $in: inEvaluationIds }
            }
          )
        ])

        return {
          availableJobOffers   : jobOffers[0],
          completedJobOffers   : jobOffers[1],
          inEvaluationJobOffers: jobOffers[2]
        }
      }
      if ((completed as string[]).length > 0) {
        const completedIds = (completed as string[]).map(
          (id: string) => new Types.ObjectId(id)
        )
        jobOffers = await Promise.all([
          JobOffersModel.find(
            {
              $or: [{ status: 'published' }, { status: 'rePublished' }],
              _id: { $nin: completedIds }
            }
          ),
          JobOffersModel.find(
            {
              $or: [{ status: 'published' }, { status: 'rePublished' }],
              _id: { $in: completedIds }
            }
          )
        ])

        return {
          availableJobOffers   : jobOffers[0],
          completedJobOffers   : jobOffers[1],
          inEvaluationJobOffers: []
        }
      }
      if ((inEvaluation as string[]).length > 0) {
        const inEvaluationIds = (inEvaluation as string[]).map(
          (id: string) => new Types.ObjectId(id)
        )
        jobOffers = await Promise.all([
          JobOffersModel.find(
            {
              $or: [{ status: 'published' }, { status: 'rePublished' }],
              _id: { $nin: inEvaluationIds }
            }
          ),
          JobOffersModel.find(
            {
              $or: [{ status: 'published' }, { status: 'rePublished' }],
              _id: { $in: inEvaluationIds }
            }
          )
        ])

        return {
          availableJobOffers   : jobOffers[0],
          completedJobOffers   : [],
          inEvaluationJobOffers: jobOffers[1]
        }
      }

      jobOffers = await JobOffersModel.find({
        $or: [{ status: 'published' }, { status: 'rePublished' }]
      })

      return {
        availableJobOffers   : jobOffers,
        completedJobOffers   : [],
        inEvaluationJobOffers: []
      }
    } catch (error) {
      console.error(error)
      throw new Error(EFJ.problemGettingAllForEvaluator)
    }
  }

  private async _store (): Promise<IJobOffers | null> {
    const {
      code,
      commercialName,
      deadline,
      description,
      idProject,
      occupations,
      roles
    } = this._args as DtoJobOffers

    try {
      if (!code) throw new Error(GEM.missingCode)
      if (!commercialName) throw new Error(EFJ.missingCommercialName)
      else if (!deadline) throw new Error(GEM.missingDeadline)
      else if (new Date(deadline).toString() === 'Invalid Date')
        throw new Error(GEM.invalidDate)
      else if (!description) throw new Error(GEM.missingDescription)
      else if (!idProject) throw new Error(GEM.missingIdProject)
      else if (!occupations) throw new Error(EFJ.missingOccupations)
      else if (!roles) throw new Error(EFJ.missingRoles)

      const newJobOffer = new JobOffersModel({
        code,
        commercialName,
        deadline        : new Date(deadline),
        description,
        idProject,
        numberApplicants: 0,
        occupations,
        roles,
        status          : 'published'
      })
      const result = await newJobOffer.save()

      return result
    } catch (error) {
      if (
        error.message === GEM.missingCode ||
        error.message === GEM.missingDeadline ||
        error.message === GEM.invalidDate ||
        error.message === GEM.missingDescription ||
        error.message === GEM.missingDescription ||
        error.message === GEM.missingIdProject ||
        error.message === EFJ.missingOccupations ||
        error.message === EFJ.missingRoles ||
        error.message === GEM.statusNotAllowed
      )
        throw error
      else {
        console.error(error)
        throw new Error(EFJ.problemStoringJobOffers)
      }
    }
  }

  private async _postulation (): Promise<IJobOffers | null> {
    const { id, roles } = this._args as DtoJobOffers

    try {
      if (!roles) throw new Error(EFJ.missingRoles)

      const aspirant = (((roles as IRoles[])[0] as IRoles).applicants as string[])[0]
      const roleName =  (((roles as IRoles[])[0] as IRoles).description as IInformation).title

      const updatedOffer = await JobOffersModel.findByIdAndUpdate(
        id as string,
        {
          $addToSet: { 'roles.$[r].applicants': aspirant },
          $inc     : { numberApplicants: 1 }
        },
        { arrayFilters: [{ 'r.description.title': roleName }], new: true }
      )

      return updatedOffer
    } catch (error) {
      if (error.message === EFJ.missingApplicants) throw error
      else {
        console.error(error)
        throw new Error(EFJ.problemAllowingTheUserPostulate)
      }
    }
  }

  private async _update (): Promise<IJobOffers | null> {
    const { code, deadline, description, id, occupations, roles, status } = this
      ._args as DtoJobOffers

    try {
      if (!code) throw new Error(GEM.missingCode)
      else if (!deadline) throw new Error(GEM.missingDeadline)
      else if (new Date(deadline).toString() === 'Invalid Date')
        throw new Error(GEM.invalidDate)
      else if (!description) throw new Error(GEM.missingDescription)
      else if (!occupations) throw new Error(EFJ.missingOccupations)
      else if (!roles) throw new Error(EFJ.missingRoles)
      else if (!status) throw new Error(GEM.missingStatus)
      else if (!STATUS_NAMES.includes(status))
        throw new Error(GEM.statusNotAllowed)

      const updatedJobOffer = await JobOffersModel.findByIdAndUpdate(
        id as string,
        {
          code,
          deadline: new Date(deadline),
          description,
          occupations,
          roles,
          status
        },
        {
          new: true
        }
      )

      return updatedJobOffer
    } catch (error) {
      if (
        error.message === GEM.missingCode ||
        error.message === GEM.missingDeadline ||
        error.message === GEM.invalidDate ||
        error.message === GEM.missingDescription ||
        error.message === GEM.missingDescription ||
        error.message === EFJ.missingOccupations ||
        error.message === EFJ.missingRoles ||
        error.message === GEM.missingStatus ||
        error.message === GEM.statusNotAllowed
      )
        throw error
      else {
        console.error(error)
        throw new Error(EFJ.problemStoringJobOffers)
      }
    }
  }

  private async _updateStatus (): Promise<IJobOffers | null> {
    const { id, status } = this._args as DtoJobOffers

    try {
      if (!STATUS_NAMES.includes(status as string))
        throw new Error(GEM.statusNotAllowed)

      const result = await JobOffersModel.findByIdAndUpdate(
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

export { JobOffers }
