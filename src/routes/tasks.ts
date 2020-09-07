import { Router } from 'express'
import { Response } from '../custom/express.response'
import { Request } from '../custom/express.request'
import { response } from '../network/response'
import { Tasks as TasksC } from '../controllers/tasks'
import { DtoTasks } from '../dto-interfaces/tasks.dto'

const Tasks = Router()

Tasks.route('/tasks/:idCompany/:idProject/')
  .get(async (req: Request, res: Response): Promise<void> => {
    const { params: { idCompany, idProject } } = req
    const tc = new TasksC({ idCompany, idProject } as DtoTasks)

    try {
      const result = await tc.process('getAll')
      response(false, { result }, res, 200)
    } catch (error) {
      console.error(error)
      response(true, { message: error.message }, res, 500)
    }
  })
  .post(async (req: Request, res: Response): Promise<void> => {
    const {
      body: { args },
      params: { idCompany, idProject }
    } = req
    const tc = new TasksC({
      ...args as DtoTasks,
      idCompany,
      idProject
    } as DtoTasks)

    try {
      const result = await tc.process('store')
      response(false, { result }, res, 200)
    } catch (error) {
      console.error(error)
      response(true, { message: error.message }, res, 500)
    }
  })

Tasks.route('/tasks/:idCompany/:idProject/:idTask/')
  .patch(async (req: Request, res: Response): Promise<void> => {
    const { body: { args }, params: { idCompany, idProject, idTask } }= req
    const tc = new TasksC({
      ...args as DtoTasks,
      id: idTask,
      idCompany,
      idProject
    } as DtoTasks)

    try {
      const result = await tc.process('update')
      response(false, { result }, res, 200)
    } catch (error) {
      console.error(error)
      response(true, { message: error.message }, res, 500)
    }
  })

Tasks.route('/task/:idTask/')
  .delete(async (req: Request, res: Response): Promise<void> => {
    const { params: { idTask } } = req
    const tc = new TasksC({ id: idTask as string })

    try {
      const result = await tc.process('deleteOne')
      response(false, { result }, res, 200)
    } catch (error) {
      console.error(error)
      response(true, { message: error.message }, res, 500)
    }
  })

export { Tasks }
