import { Request } from 'express'
import { DtoJobOffers } from '../dto-interfaces/jobOffers.dto'
import { DtoProjects } from '../dto-interfaces/projects.dto'
import { DtoTasks } from '../dto-interfaces/tasks.dto'

/*
 * With this piece of code we ca personalize the attributes of the request,
 * in case we need it.
 */

interface CustomRequest extends Request {
  body: {
    args: DtoTasks | DtoProjects | DtoJobOffers
  },
  query: {
    status?: string,
    type?  : string
  }
}

export { CustomRequest as Request }
