/* eslint-disable no-shadow */

enum ErrorMessagesForTasksController {
  missingIdCompany = 'Id company must be provided.',
  missingIdProject = 'Id project must be provided.',
  missingLimitDate = 'Limit date must be provided.',
  missingName = 'Name must be provided.',
  missingResponsible = 'Responsible must be provided.',
  missingStatus = 'Status must be provided.',
  missingSubTasks = 'Sub tasks must be provided.',
  problemDeleting = 'There was a problem deleting the tasks.',
  problemGettingAll = 'There was a problem getting all the tasks.',
  problemStoringTasks = 'There was a problem trying to store the task.',
  problemUpdatingTasks = 'There was a problem trying to update the task.'
}

export { ErrorMessagesForTasksController }
