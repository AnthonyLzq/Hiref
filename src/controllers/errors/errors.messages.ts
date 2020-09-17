/* eslint-disable no-shadow */

enum GeneralErrorMessages {
  invalidDate = 'Invalid Date',
  missingCode = 'Code must be provided.',
  missingDeadline = 'Deadline must be provided.',
  missingDescription = 'Description must be provided.',
  missingIdCompany = 'Id Company must be provided.',
  missingIdProject = 'Id project must be provided.',
  missingStatus = 'Status must be provided.',
  problemUpdatingStatus = 'There was a problem trying to update the status.',
  statusNotAllowed = 'That status is not allowed.'
}

enum ErrorMessagesForJobsController {
  problemGettingAll = 'There was a problem getting all the jobs.'
}

enum ErrorMessagesForJobOffersController {
  missingApplicants = 'Applicants must be provided.',
  missingCommercialName = 'The commercial company name must be provided.',
  missingCompletedOrInEvaluationArray = 'Completed or in evaluation array are missing.',
  missingOccupations = 'Occupations must be provided.',
  missingRoles = 'Roles must be provided.',
  problemAllowingTheUserPostulate = 'There was a problem trying to allow the postulation.',
  problemDeletingJobOffer = 'There was a problem deleting the job offer',
  problemGettingAll = 'There was a problem getting all the job offers',
  problemGettingAllByOccupations = 'There was a problem getting all the job offers for the requested project.',
  problemGettingAllByProject = 'There was a problem getting all the job offers for the requested project.',
  problemGettingAllForAspirant = 'There was a problem getting all the job offers for the requested aspirant.',
  problemGettingAllForEvaluator = 'There was a problem getting all the job offers for the requested aspirant.',
  problemStoringJobOffers = 'There was a problem trying to store the requested job offer.'
}

enum ErrorMessagesForProjectsController {
  missingSupervisor = 'Supervisor(s) must be provided.',
  problemGettingAllByCompany = 'There was a problem getting all the projects from the requested company.',
  problemGettingAllByStatus = 'There was a problem getting all the projects from the requested company int he requested status.',
  problemGettingOneById = 'There was a problem getting the requested project.',
  problemStoringProjects = 'There was a problem trying to store the project.',
  problemUpdatingProjects = 'There was a problem trying to update the project.',
  projectDoesNoExists = 'The requested project does not exist.'
}

enum ErrorMessagesForTasksController {
  missingResponsible = 'Responsible must be provided.',
  missingSubTasks = 'Sub tasks must be provided.',
  problemDeletingTasks = 'There was a problem deleting the task.',
  problemGettingAll = 'There was a problem getting all the tasks.',
  problemStoringTasks = 'There was a problem trying to store the task.',
  problemUpdatingTasks = 'There was a problem trying to update the task.'
}

export {
  GeneralErrorMessages,
  ErrorMessagesForJobsController,
  ErrorMessagesForJobOffersController,
  ErrorMessagesForProjectsController,
  ErrorMessagesForTasksController
}
