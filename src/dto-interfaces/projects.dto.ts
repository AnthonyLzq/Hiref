import { IInformation } from './utils/informationInterface'

interface DtoProjects {
  code?       : string
  deadline?   : Date
  description?: IInformation
  id?         : string
  idCompany?  : string
  status?     : string
  supervisors?: string[]
}

export { DtoProjects }
