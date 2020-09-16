import { IInformation } from './utils/informationInterface'

interface ISupervisor {
  dni      : string
  lastNames: string
  names    : string
}

interface DtoProjects {
  code?       : string
  deadline?   : Date
  description?: IInformation
  id?         : string
  idCompany?  : string
  status?     : string
  supervisor? : ISupervisor[]
}

export { ISupervisor, DtoProjects }
