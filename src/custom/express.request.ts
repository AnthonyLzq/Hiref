import { Request } from 'express'
import { DtoTasks } from '../dto-interfaces/tasks.dto'
import { DtoProjects } from '../dto-interfaces/projects.dto'

/*
 * With this piece of code we ca personalize the attributes of the request,
 * in case we need it.
 */

interface CustomRequest extends Request {
  body: {
    args?: DtoTasks | DtoProjects
  },
  query: {
    status?: string
  }
}

export { CustomRequest as Request }
