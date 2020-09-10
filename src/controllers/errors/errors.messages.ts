/* eslint-disable no-shadow */

enum ErrorMessagesForProjectsController {
  invalidDate = 'Invalid Date',
  missingCategories = 'Categories must be provided.',
  missingDescription = 'Description must be provided',
  missingIdCompany = 'Id Company must be provided.',
  missingLimitDate = 'Limit date must be provided.',
  missingName = 'Name must be provided.',
  missingRoles = 'Roles must be provided',
  missingSubCategories = 'Sub categories must be provided.',
  problemGettingAll = 'There was a problem getting all the projects.',
  problemGettingAllByCompany = 'There was a problem getting all the projects from the requested company.',
  problemGettingAllByStatus = 'There was a problem getting all the projects from the requested company int he requested status.',
  problemStoringProjects = 'There was a problem trying to store the project.',
  problemUpdatingProjects = 'There was a problem trying to update the project.',
  statusNotAllowed = 'That status is not allowed.'
}

enum ErrorMessagesForTasksController {
  invalidDate = 'Invalid Date',
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

export { ErrorMessagesForProjectsController, ErrorMessagesForTasksController }
