import { IInformation } from './utils/informationInterface'

interface IRoles {
  applicants? : string[]
  description : IInformation
  quantity    : number
  remuneration: number
}

/*
 * - Accepted and rejected are the id arrays that will be used to filter the job offers for aspirants.
 * - inEvaluation and completed are the id arrays that will be used to filter the job offer evaluators.
 */

interface DtoJobOffers {
  accepted?        : string[]
  code?            : string
  commercialName?  : string
  completed?       : string[]
  deadline?        : Date
  description?     : IInformation
  id?              : string
  idProject?       : string
  inEvaluation?    : string[]
  numberApplicants?: number
  occupations?     : string[]
  rejected?        : string[]
  roles?           : IRoles[]
  status?          : string
}

export { DtoJobOffers, IRoles }
