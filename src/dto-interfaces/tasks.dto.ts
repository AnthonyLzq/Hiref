export interface DtoTasks {
  id?         : string,
  idCompany?  : string,
  idProject?  : string,
  limitDate?  : Date,
  name?       : string,
  responsible?: [string],
  status?     : string,
  subTasks?   : [string]
}
