# Hiref

## Version 0.6.0

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
