import { Router } from 'express'
import { Response } from '../custom/express.response'
import { Request } from '../custom/express.request'
import { response } from '../network/response'
import { Projects as ProjectsC } from '../controllers/projects'
import { DtoProjects } from '../dto-interfaces/projects.dto'
import { IProjects } from '../models/projects'

const Projects = Router()

Projects.route('/projects/')
  .get(async (req: Request, res: Response): Promise<void> => {
    const pc = new ProjectsC()

    try {
      const result = await pc.process('getAll')
      response(false, { result }, res, 200)
    } catch (error) {
      console.error(error)
      response(true, { message: error.message }, res, 500)
    }
  })

Projects.route('/projects/:idCompany/')
  .get(async (req: Request, res: Response): Promise<void> => {
    const { params: { idCompany }, query } = req
    let pc    : ProjectsC
    let result: IProjects | IProjects[] | null | undefined
    if (Object.keys(query).length > 0) {
      const { status } = query
      pc = new ProjectsC({ idCompany, status: status as string } as DtoProjects)

      try {
        result = await pc.process('getAllByStatus')
        response(false, { result }, res, 200)
      } catch (error) {
        console.error(error)
        response(true, { message: error.message }, res, 500)
      }
    } else {
      pc = new ProjectsC({ idCompany } as DtoProjects)

      try {
        result = await pc.process('getAllByCompany')
        response(false, { result }, res, 200)
      } catch (error) {
        console.error(error)
        response(true, { message: error.message }, res, 500)
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
      console.error(error)
      response(true, { message: error.message }, res, 500)
    }
  })

Projects.route('/projects/:idCompany/:idProject/')
  .patch(async (req: Request, res: Response): Promise<void> => {
    const { body: { args }, params: { idCompany, idProject } } = req
    const pc = new ProjectsC({
      ...args as DtoProjects,
      idCompany: idCompany as string,
      idProject: idProject as string
    } as DtoProjects)

    try {
      const result = await pc.process('update')
      response(false, { result }, res, 200)
    } catch (error) {
      console.error(error)
      response(true, { message: error.message }, res, 500)
    }
  })

export { Projects }