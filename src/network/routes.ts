import { Application, Router } from 'express'
import { Home } from '../routes/home'
import { Jobs } from '../routes/jobs'
import { JobOffers } from '../routes/jobOffers'
import { Projects } from '../routes/projects'
import { Tasks } from '../routes/tasks'

const routers = [ JobOffers, Jobs, Projects, Tasks ]

const applyRoutes = (app: Application): void => {
  app.use('/', Home)
  routers.forEach((router: Router): Application => app.use('/api', router))
}

export { applyRoutes }
