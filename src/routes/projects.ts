import { Router } from 'express'
import { Response } from '../custom/express.response'
import { Request } from '../custom/express.request'
import { response } from '../network/response'
import { Projects as ProjectsC } from '../controllers/projects'
import { DtoProjects } from '../dto-interfaces/projects.dto'
import { IProjects } from '../models/projects'

const Projects = Router()

Projects.route('/projects/:idCompany/')
  .get(async (req: Request, res: Response): Promise<void> => {
    const { params: { idCompany }, query } = req
    let pc    : ProjectsC
    let result: IProjects | IProjects[] | null | undefined

    if (!query || Object.keys(query).length === 0) {
      pc = new ProjectsC({ idCompany } as DtoProjects)

      try {
        result = await pc.process('getAllByCompany')
        response(false, { result }, res, 200)
      } catch (error) {
        response(true, error.message, res, 500)
      }
    } else {
      const { status } = query
      pc = new ProjectsC({ idCompany, status: status as string } as DtoProjects)

      try {
        result = await pc.process('getAllByStatus')
        response(false, { result }, res, 200)
      } catch (error) {
        response(true, error.message, res, 500)
      }
    }
  })
  .post(async (req: Request, res: Response): Promise<void> => {
    const { body: { args }, params: { idCompany } } = req
    const pc = new ProjectsC({
      ...args as DtoProjects,
      idCompany: idCompany as string
    } as DtoProjects)

    try {
      const result = await pc.process('store')
      response(false, { result }, res, 200)
    } catch (error) {
      response(true, error.message, res, 500)
    }
  })

Projects.route('/projects/getById/:idProject/')
  .get(async (req: Request, res: Response): Promise<void> => {
    const { params: { idProject } } = req
    const pc = new ProjectsC({ id: idProject as string } as DtoProjects)

    try {
      const result = await pc.process('getOneById')
      response(false, { result }, res, 200)
    } catch (error) {
      response(true, error.message, res, 500)
    }
  })

Projects.route('/projects/update/:idProject/')
  .patch(async (req: Request, res: Response): Promise<void> => {
    const { body: { args }, params: { idProject }, query } = req
    let pc    : ProjectsC
    let result: IProjects | IProjects[] | null | undefined

    if (!query || Object.keys(query).length === 0) {
      pc = new ProjectsC({
        ...args as DtoProjects,
        id: idProject as string
      } as DtoProjects)

      try {
        result = await pc.process('update')
        response(false, { result }, res, 200)
      } catch (error) {
        response(true, error.message, res, 500)
      }
    } else {
      const { status } = query
      pc = new ProjectsC({
        id    : idProject as string,
        status: status as string
      } as DtoProjects)

      try {
        result = await pc.process('updateStatus')
        response(false, { result }, res, 200)
      } catch (error) {
        response(true, error.message, res, 500)
      }
    }
  })

export { Projects }
