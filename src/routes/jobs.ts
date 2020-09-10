import { Router, Response, Request } from 'express'
import { response } from '../network/response'
import { Jobs as JobsC } from '../controllers/jobs'

const Jobs = Router()

Jobs.route('/jobs')
  .get(async (req: Request, res: Response) => {
    const jc = new JobsC()

    try {
      const result = await jc.process('getAll')
      response(false, { result }, res, 200)
    } catch (error) {
      console.error(error)
      response(true, { message: error.message }, res, 500)
    }
  })

export { Jobs }
