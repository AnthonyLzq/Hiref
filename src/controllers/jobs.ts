import { CustomNodeJSGlobal } from '../custom/global'
import { ErrorMessagesForJobsController as EFJ } from './errors/errors.messages'

declare const global: CustomNodeJSGlobal

class Jobs {
  private _allJobs: Record<string, unknown>[]

  constructor () {
    this._allJobs = []
  }

  public process (
    type: string
  ): Promise<Record<string, unknown>[]> | undefined {
    switch (type) {
      case 'getAll':
        return this._getAll()
      default:
        return undefined
    }
  }

  private async _getAll (): Promise<Record<string, unknown>[]> {
    try {
      const jobFamilies = await global.mysqlDatabase
        .select('id_jobfamily as id', 'description as jobFamily')
        .from('jobfamily')
      const queryResult = await global.mysqlDatabase
        .select(
          'j.id_jobfamily as jobFamilyId',
          'o.id_ocupation as occupationId',
          'o.description as occupation'
        )
        .from({ j: 'jobfamily' })
        .innerJoin(
          { o: 'ocupation' },
          'j.id_jobfamily',
          '=',
          'o.idfk_jobfamily'
        )

      jobFamilies.forEach(jobFamily => {
        const occupations: Record<string, string>[] = []
        queryResult.forEach(row => {
          if (row.jobFamilyId === jobFamily.id)
            occupations.push({
              occupation  : row.occupation as string,
              occupationId: row.occupationId as string
            })
        })
        this._allJobs.push({ jobFamily, occupations })
      })

      return this._allJobs
    } catch (error) {
      console.error(error)
      throw new Error(EFJ.problemGettingAll)
    }
  }
}

export { Jobs }
