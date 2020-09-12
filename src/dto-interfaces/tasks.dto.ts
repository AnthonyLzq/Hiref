import { IInformation } from './utils/informationInterface'

export interface DtoTasks {
  deadline?   : Date
  description?: IInformation
  id?         : string
  idProject?  : string
  responsible?: string[]
  status?     : string
  subTasks?   : string[] | []
}
