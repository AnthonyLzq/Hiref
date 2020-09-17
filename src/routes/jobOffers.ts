import { Router } from 'express'
import { Response } from '../custom/express.response'
import { Request } from '../custom/express.request'
import { response } from '../network/response'
import { JobOffers as JobOffersC } from '../controllers/jobOffers'
import { DtoJobOffers } from '../dto-interfaces/jobOffers.dto'
import { IJobOffers } from '../models/jobOffers'

const JobOffers = Router()

JobOffers.route('/jobOffers/')
  .get(async (req: Request, res: Response): Promise<void> => {
    const joc = new JobOffersC()

    try {
      const result = await joc.process('getAll')
      response(false, { result }, res, 200)
    } catch (error) {
      response(true, { message: error.message }, res, 500)
    }
  })

JobOffers.route('/jobOffers/store/:idProject/')
  .post(async (req: Request, res: Response): Promise<void> => {
    const { body: { args }, params: { idProject } } = req
    const joc = new JobOffersC({
      ...args as DtoJobOffers,
      idProject: idProject as string
    } as DtoJobOffers)

    try {
      const result = await joc.process('store')
      response(false, { result }, res, 200)
    } catch (error) {
      response(true, { message: error.message }, res, 500)
    }
  })

JobOffers.route('/jobOffers/update/:idJobOffer/')
  .patch(async (req: Request, res: Response): Promise<void> => {
    const { body: { args }, params: { idJobOffer }, query } = req
    let joc   : JobOffersC
    let result:
      | IJobOffers
      | IJobOffers[]
      | {
          acceptedJobOffers : IJobOffers[],
          availableJobOffers: IJobOffers[],
          rejectedJobOffers : IJobOffers[]
        }
      | {
          availableJobOffers   : IJobOffers[],
          completedJobOffers   : IJobOffers[],
          inEvaluationJobOffers: IJobOffers[]
        }
      | null
      | undefined
    if (!query || Object.keys(query).length === 0) {
      joc = new JobOffersC({
        ...args as DtoJobOffers,
        id: idJobOffer as string
      } as DtoJobOffers)

      try {
        result = await joc.process('update')
        response(false, { result }, res, 200)
      } catch (error) {
        response(true, { message: error.message }, res, 500)
      }
    } else {
      const { status } = query
      joc = new JobOffersC({
        id    : idJobOffer as string,
        status: status as string
      })

      try {
        result = await joc.process('updateStatus')
        response(false, { result }, res, 200)
      } catch (error) {
        response(true, { message: error.message }, res, 500)
      }
    }
  })

JobOffers.route('/jobOffers/getAll/byProject/:idProject/')
  .get(async (req: Request, res: Response): Promise<void> => {
    const { params: { idProject } } = req
    const joc = new JobOffersC({
      idProject: idProject as string
    } as DtoJobOffers)

    try {
      const result = await joc.process('getAllByProject')
      response(false, { result }, res, 200)
    } catch (error) {
      response(true, { message: error.message }, res, 500)
    }
  })

JobOffers.route('/jobOffers/getAll/byOccupations/')
  .post(async (req: Request, res: Response): Promise<void> => {
    const { body: { args } } = req
    const joc = new JobOffersC(args as DtoJobOffers)

    try {
      const result = await joc.process('getAllByOccupations')
      response(false, { result }, res, 200)
    } catch (error) {
      response(true, { message: error.message }, res, 500)
    }
  })

JobOffers.route('/jobOffers/getAll/forAspirant/')
  .post(async (req: Request, res: Response): Promise<void> => {
    const { body: { args } } = req
    const joc = new JobOffersC(args as DtoJobOffers)

    try {
      const result = await joc.process('getAllForAspirant')
      response(false, { result }, res, 200)
    } catch (error) {
      response(true, { message: error.message }, res, 500)
    }
  })

JobOffers.route('/jobOffers/getAll/forEvaluator/')
  .post(async (req: Request, res: Response): Promise<void> => {
    const { body: { args } } = req
    const joc = new JobOffersC(args as DtoJobOffers)

    try {
      const result = await joc.process('getAllForEvaluator')
      response(false, { result }, res, 200)
    } catch (error) {
      response(true, { message: error.message }, res, 500)
    }
  })

JobOffers.route('/jobOffers/delete/:idJobOffer/')
  .delete(async (req: Request, res: Response): Promise<void> => {
    const { params: { idJobOffer } } = req
    const joc = new JobOffersC({ id: idJobOffer as string } as DtoJobOffers)

    try {
      const result = await joc.process('deleteOne')
      response(false, { result }, res, 200)
    } catch (error) {
      response(true, { message: error.message }, res, 500)
    }
  })

JobOffers.route('/jobOffers/postulate/:idJobOffer/')
  .post(async (req: Request, res: Response): Promise<void> => {
    const { body: { args }, params: { idJobOffer } }  = req
    const joc = new JobOffersC({
      ...args as DtoJobOffers,
      id: idJobOffer as string
    } as DtoJobOffers)

    try {
      const result = await joc.process('postulation')
      response(false, { result }, res, 200)
    } catch (error) {
      response(true, { message: error.message }, res, 500)
    }
  })

export { JobOffers }
