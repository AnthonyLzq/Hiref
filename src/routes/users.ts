import { Router } from 'express'
import { Response } from '../custom/express.response'
import { Request } from '../custom/express.request'
import { response } from '../network/response'
import { Users as UsersC } from '../controllers/users'

const Users = Router()

Users.route('/users/')
  .get(async (req: Request, res: Response): Promise<void> => {
    const { query: { type } } = req
    const c = new UsersC()
    let result: Record<string, unknown>[] | unknown

    try {
      switch (type as string) {
        case 'clients':
          result = await c.process('getAllClients')
          response(false, { result }, res, 200)
          break
        case 'supervisor':
          result = await c.process('getAllSupervisors')
          response(false, { result }, res, 200)
          break
        default:
          response(true, 'Request not allowed', res, 500)
      }
    } catch (error) {
      response(true, error.message, res, 500)
    }
  })

Users.route('/users/getSupervisorsByProject/:idProject')
  .get(async (req: Request, res: Response): Promise<void> => {
    const { params: { idProject } } = req
    const c = new UsersC(idProject as string)

    try {
      const result = await c.process('getSupervisorsByProject')
      response(false, { result }, res, 200)
    } catch (error) {
      response(true, error.message, res, 500)
    }
  })

export { Users }
