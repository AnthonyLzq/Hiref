# Hiref

## Version 0.11.2

- Fixed:
  - Payload from the projects.
- Pending:
  - To return the name of the company from firebase.
  - To create three endpoints:
    - Get all supervisors (firebase).
    - Get all supervisors per project (firebase).
    - Get all the clients (companies, from firebase).

## Version 0.11.1

- Fixed:
  - Status field to the tasks.
  - Endpoints.
- Pending:
  - To return the name of the company from firebase.
  - To create three endpoints:
    - Get all supervisors (firebase).
    - Get all supervisors per project (firebase).
    - Get all the clients (companies, from firebase).

## Version 0.11.0

- Implemented:
  - Added field applicants to each role in the job offer (this field is an array that stores firebase ids from the aspirants).
  - Added field number of applicants in the job offer, which is incremented each time an application is performed.
- Updated:
  - Removed internal \_id for sub-documents.
- Pending:
  - To return the name of the company from firebase.
  - To create three endpoints:
    - Get all supervisors (firebase).
    - Get all supervisors per project (firebase).
    - Get all the clients (companies, from firebase).

## Version 0.10.1

- Fixed:
  - Default status when a job offer is created.
- Pending:
  - To return the name of the company from firebase.
  - To add the field applicants to the model of job offers.
  - To create three endpoints:
    - Get all supervisors (firebase).
    - Get all supervisors per project (firebase).
    - Get all the clients (companies, from firebase).

## Version 0.10.0

- Implemented:
  - Field description (information interface) to the roles in a job offer.
  - Field applicants to the job offer.
  - Endpoint to postulate to a job offer.
- Updated:
  - Now, only the supervisor ids (from Firebase) are stored in the project collection (MongoDB).
  - Removed responsible number from the task model.
- Pending:
  - To return the name of the company from firebase.
  - To add the field applicants to the model of job offers.
  - To create three endpoints:
    - Get all supervisors (firebase).
    - Get all supervisors per project (firebase).
    - Get all the clients (companies, from firebase).

## Version 0.9.0

- Implemented:
  - Firebase connection.
  - Global variable to handle Firebase connection.
- Pending:
  - To return the name of the company from firebase.
  - To add the field applicants to the model of job offers.
  - To add the field description to the roles.
  - To create three endpoints:
    - Get all supervisors (firebase).
    - Get all supervisors per project (firebase).
    - Get all the clients (companies, from firebase).
    - Change the endpoint to store projects, now it receives an array of supervisor ids.

## Version 0.8.1

- Fixed:
  - [Documentation](https://github.com/AnthonyLzq/Hiref#readme).
  - Endpoints that had a get request with payload were changed for post.
- Pending:
  - Firebase connection.
  - Notifications to the aspirants when a job offer is published.

## Version 0.8.0

- Updated:
  - [Documentation](https://github.com/AnthonyLzq/Hiref#readme).
- Pending:
  - Firebase connection.
  - Notifications to the aspirants when a job offer is published.

## Version 0.7.0

- Updated:
  - [Documentation](https://github.com/AnthonyLzq/Hiref#readme).
- Pending:
  - Finish updating [documentation](https://github.com/AnthonyLzq), three endpoints missing.

## Version 0.6.0

- Implemented:
  - Job offers endpoint.
  - Code refactoring, job offers are now created from a project.
- Updated:
  - Error messages.
- Pending:
  - To update [documentation](https://github.com/AnthonyLzq/Hiref#readme).

## Version 0.5.0

- Implemented:
  - Mysql connection.
  - Jobs endpoint.
- Updated:
  - [Documentation](https://github.com/AnthonyLzq/Hiref#readme).

## Version 0.4.1

- Fixed:
  - Errors messages.
  - Payload to store a project.

## Version 0.4.0

- Implemented:
  - [Documentation](https://github.com/AnthonyLzq/Hiref#readme).
  - Some code refactoring.
- Pending:
  - Socket connection.
  - Notifications.
  - Secure request (Bearer token).

## Version 0.3.0

- Implemented:
  - Projects endpoint.
  - `dist` folder.
- Removed:
  - Users endpoint.
- Fixed:
  - Dockerfile.

## Version 0.2.2

- Implemented:
  - Now the tasks has its own time createdAt field.
- Fixed:
  - Throw errors when an update is performed without all the requested params.
  - New data type for the sub tasks.
  - Now, errors for controllers have their own file.

## Version 0.2.1

- Fixed:
  - Data types that were arrays.

## Version 0.2.0

- Eliminated aspirants.
- Implemented:
  - Not tested endpoint for tasks.
- Pending:
  - Update [documentation](https://github.com/AnthonyLzq/Hiref#readme).

## Version 0.1.0

- Project Initialization.
- 80% of aspirants model.
