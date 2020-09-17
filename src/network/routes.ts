import { Application, Router } from 'express'
import {
  Home,
  Jobs,
  JobOffers,
  Projects,
  Tasks,
  Users
} from '../routes/index'


const routers = [ JobOffers, Jobs, Projects, Tasks, Users ]

const applyRoutes = (app: Application): void => {
  app.use('/', Home)
  routers.forEach((router: Router): Application => app.use('/api', router))
}

export { applyRoutes }
