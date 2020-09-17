import { Router } from 'express'
import { Response } from '../custom/express.response'
import { Request } from '../custom/express.request'
import { response } from '../network/response'
import { Tasks as TasksC } from '../controllers/tasks'
import { DtoTasks } from '../dto-interfaces/tasks.dto'
import { ITasks } from '../models/tasks'

const Tasks = Router()

Tasks.route('/tasks/:idProject/')
  .get(async (req: Request, res: Response): Promise<void> => {
    const { params: { idProject } } = req
    const tc = new TasksC({ idProject } as DtoTasks)

    try {
      const result = await tc.process('getAll')
      response(false, { result }, res, 200)
    } catch (error) {
      response(true, { message: error.message }, res, 500)
    }
  })
  .post(async (req: Request, res: Response): Promise<void> => {
    const { body: { args }, params: {  idProject } } = req
    const tc = new TasksC({
      ...args as DtoTasks,
      idProject
    } as DtoTasks)

    try {
      const result = await tc.process('store')
      response(false, { result }, res, 200)
    } catch (error) {
      response(true, { message: error.message }, res, 500)
    }
  })

Tasks.route('/tasks/:idProject/:idTask/')
  .patch(async (req: Request, res: Response): Promise<void> => {
    const {
      body: { args },
      params: { idProject, idTask },
      query
    } = req
    let tc    : TasksC
    let result: ITasks | ITasks[] | null | undefined

    if (!query || Object.keys(query).length === 0) {
      tc = new TasksC({
        ...args as DtoTasks,
        id: idTask,
        idProject
      } as DtoTasks)

      try {
        result = await tc.process('update')
        response(false, { result }, res, 200)
      } catch (error) {
        response(true, { message: error.message }, res, 500)
      }
    } else {
      const { status } = query
      tc = new TasksC({
        id    : idTask as string,
        status: status as string
      } as DtoTasks)

      try {
        result = await tc.process('updateStatus')
        response(false, { result }, res, 200)
      } catch (error) {
        response(true, { message: error.message }, res, 500)
      }
    }
  })

Tasks.route('/task/delete/:idTask/')
  .delete(async (req: Request, res: Response): Promise<void> => {
    const { params: { idTask } } = req
    const tc = new TasksC({ id: idTask as string })

    try {
      const result = await tc.process('deleteOne')
      response(false, { result }, res, 200)
    } catch (error) {
      response(true, { message: error.message }, res, 500)
    }
  })

export { Tasks }
