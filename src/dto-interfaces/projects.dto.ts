interface IRoles {
  name        : string,
  quantity    : number,
  remuneration: number,
}

interface DtoProjects {
  categories?   : string[],
  description?  : string,
  id?           : string,
  idCompany?    : string,
  limitDate?    : Date,
  name?         : string,
  roles?        : IRoles,
  status?       : string,
  subCategories?: string[]
}

export { IRoles, DtoProjects }
