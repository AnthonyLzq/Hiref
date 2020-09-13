# Hiref Backend

## Prerequisites

- You need to have [`Node.js`](https://nodejs.org/en/) and [`Yarn`](https://yarnpkg.com/) installed.
- You need an `.env` file in order to run this project. Here is an example of its content:

```bash
MONGO_URI =
MYSQL_DATABASE =
MYSQL_HOST =
MYSQL_PASS =
MYSQL_USER =
PORT =
```

## Setup

In order to install and use this project (in development mode), please run the following commands in your terminal:

```bash
yarn
yarn service
```

You will a message as follows:

```bash
yarn run v1.22.4
$ nodemon
[nodemon] 2.0.4
[nodemon] to restart at any time, enter `rs`
[nodemon] watching path(s): .env src/**/*
[nodemon] watching extensions: ts
[nodemon] starting `ts-node -r dotenv/config ./src/index`
Server running at port XXXX.
Mongo connection established.
```

## Usage

- All the endpoints, except `home`

There are fifteen endpoints implemented:

1. Home: `/`, it has a get method. It is only decorative.
2. Projects by company: `/projects/:idCompany/`, it has a get and a post method. Here are some examples:

   - You can send a get request with a query parameter or without it, if you send a get request without any query, then you will get all the projects that belongs to the requested company.

   - If you sen a get request with a query like this: `?status=`, then you will get all the projects that belong to the requested company and has the requested status, there are three status allowed: <a id="status"></a>active, completed and canceled. If you ask for another status, you will get an [error](#error).

   - In both cases you will get a response like follows, which contains an array of the projects that were found:

     ```json
     {
       "error": false,
       "message": [
         {
           "_id": "Project MongoDB id",
           "code": "Project id for the company",
           "createdAt": "Iso date",
           "deadline": "Iso date",
           "description": {
             "content": "Project content",
             "title": "Project title"
           },
           "idCompany": "Company id",
           "supervisor": [
             {
               "dni": "DNI",
               "lastNames": "Moody Lucas",
               "names": "Maximo Roy"
             }
           ]
         }
       ]
     }
     ```

   - If you send a post request, a new project that belongs to the requested company will be stored in the database. You need a <a id="project-payload"></a> payload as follows or you will get an [error](#error):

     ```json
     {
       "args": {
         "code": "Company code for the project",
         "deadline": "YEAR-MONTH-DAY",
         "description": {
           "content": "Project description",
           "title": "Project name"
         },
         "idCompany": "Company id",
         "supervisor": {
           "dni": "DNI",
           "lastNames": "Ali Johnson",
           "names": "Sandra Trinity"
         }
       }
     }
     ```

     It will store the project with active status as default. It can't be changed unless an update or update status is performed.</br>
     <a id="one-project-response"></a> You will get a response which contains the project that has been stored:

     ```json
     {
       "error": false,
       "message": {
         "code": "Company code for the project",
         "deadline": "YEAR-MONTH-DAY",
         "description": {
           "content": "Project description",
           "title": "Project name"
         },
         "idCompany": "Company id",
         "supervisor": [
           {
             "dni": "DNI",
             "lastNames": "Ali Johnson",
             "names": "Sandra Trinity"
           }
         ]
       }
     }
     ```

3. Update project: `/projects/:idProject/`, it has a patch method. Here are some examples:

   - You can send a patch request with a query or without it, if you send the request without the query, then you have to send the same payload shown [here](#project-payload), adding the field `status` in the "args", but with the updated information.</br>
     It will return you the same response shown [here](#one-project-response), but with the project that has been updated.

   - If you send the request with a query like this `?status=`, then payload is no longer need it, and the response the same that was shown [here](#one-project-response), but with the status updated. Remember that there are only three status allowed as it is shown [here](#status).

4. Tasks from a project: `/task/:idProject/`, it has a get and a post method. Here are some examples:

   - If you send a get request, then you will get all the tasks from the request project from the requested company. <a id="tasks-response"></a>The response will be as follows:

     ```json
     {
       "error": false,
       "message": [
         {
           "deadline": "Iso date",
           "description": {
             "content": "Task content",
             "title": "Task description"
           },
           "_id": "Task MongoDB id",
           "idProject": "Project MongoDB id",
           "responsible": [
             "Alex Pfeffer Smith",
             "Leopoldo Laurel Mertz Connelly"
           ],
           "status": "Task status",
           "subTasks": ["Sub task 1", "Sub task 2"]
         }
       ]
     }
     ```

   - If you send a post request, then you will store a new task from the request project from the requested company. You need a <a id="task-payload"></a> payload as follows or you will get an [error](#error):

     ```json
     {
       "args": {
         "deadline": "YEAR-MONTH-DAY",
         "description": {
           "title": "Task title",
           "content": "Task content"
         },
         "responsible": [
           "Lexus Wilfred Murphy O'Hara",
           "Barney Anderson Larson"
         ],
         "status": "Task status",
         "subTask": ["Sub task 1", "Sub task 2"]
       }
     }
     ```

     Sub tasks field is optional, in case there isn't any sub task, you should send an empty array. <a id="one-task-response"></a>The response will as follows:

     ```json
     {
       "error": false,
       "message": {
         "deadline": "Iso date",
         "description": {
           "content": "Task content",
           "title": "Task description"
         },
         "_id": "Task MongoDB id",
         "idProject": "Project MongoDB id",
         "responsible": [
           "Alex Pfeffer Smith",
           "Leopoldo Laurel Mertz Connelly"
         ],
         "status": "Task status",
         "subTasks": ["Sub task 1", "Sub task 2"]
       }
     }
     ```

5. Update a task from a project: `/tasks/:idProject/:idTask/`, it has a patch method. Here are some examples:

   - You can send a patch request with query or without it, if you send the request without it, then you need to send the same payload shown [here](#task-payload). Sub tasks field is optional, in case there isn't any sub task, you should send an empty array. The response will be the same shown [here](#one-task-response).

   - If you send the request with a query like this `?status=`, then a payload is no longer need it, and you will get the same response shown [here](#one-task-response), but with the status updated.

6. Delete a task by id: `/task/:idTask`, it has a delete method, if you send it, then you will delete the task. You will get the same response shown [here](#one-task-response).

7. Get all jobs: `/jobs/`, it has a get method. This method will return you all the jobs in the database. The response will be as follows:

   ```json
   {
     "error": false,
     "message": {
       "result": [
         {
           "jobFamily": {
             "id": 1,
             "jobFamilyName": "Business and Financial Operations"
           },
           "occupations": [
             {
               "occupationId": "13-1011.00",
               "occupationName": "Agents and Business Managers of Artists, Performers, and Athletes"
             }
           ]
         }
       ]
     }
   }
   ```

8. Get all the job offers: `/jobOffers/`, it has a get method. This method will return all the job offers stored in the database. <a id="jobOffers-response"></a>The response will be as follows:

   ```json
   {
     "error": false,
     "message": [
       {
         "_id": "Mongo job offer id",
         "code": "Company code for the job offer.",
         "deadline": "YEAR-MONTH-DAY",
         "description": {
           "content": "Job offer content.",
           "title": "Job offer title"
         },
         "idProject": "Project MongoDB id",
         "occupations": ["Ocupation 1", "Ocupation 2"],
         "roles": [
           {
             "name": "Role 1",
             "quantity": 12,
             "remuneration": 930
           }
         ],
         "status": "Job offer status."
       }
     ]
   }
   ```

9. Store a job offer for a project: `/jobOffers/:idProject/`, it has a post method. It will store a job offer for a determined project. <a id="jobOffer-payload"></a>You need a payload as follows or you will get an [error](#error):

   ```json
   {
     "args": {
       "code": "Company code for the project",
       "deadline": "YEAR-MONTH-DAY",
       "description": {
         "content": "Job offer content.",
         "title": "Job offer title"
       },
       "occupations": ["Ocupation 1", "Ocupation 2"],
       "roles": [
         {
           "name": "Role 1",
           "quantity": 12,
           "remuneration": 930
         }
       ]
     }
   }
   ```

   By default, all the job offers status will be stored as published. It can't be changed unless an update or update status is performed.

10. Update a job offer: `/jobOffers/:idJobOffer/`, it has a patch method, here are some examples:

    - You can send the request with a query or without it, if you send the request without, then you need the same payload that is shown [here](#jobOffer-payload), adding the field `status` in the "args". <a id="status-for-jobOffers"></a>Remember that only the following status are allowed: published, inEvaluation, rePublished, completed and canceled. <a id="one-jobOffer-payload"></a> You will get a response as follows:

      ```json
      {
        "error": false,
        "message": {
          "code": "Updated company code for the job offer.",
          "deadline": "YEAR-MONTH-DAY",
          "description": {
            "content": "Updated job offer content.",
            "title": "Updated job offer title"
          },
          "idProject": "Project MongoDB id",
          "occupations": ["Updated ocupation 1", "Updated ocupation 2"],
          "roles": [
            {
              "name": "Updated role 1",
              "quantity": 12,
              "remuneration": 930
            }
          ],
          "status": "Updated job offer status."
        }
      }
      ```

    - If you send the request with a query like this `?status=`, then a payload is no longer need it, and you will get the same response shown [here](#one-jobOffer-payload), but with the status updated.

11. Get all the job offers by project: `/jobOffers/getAllByProject/:idProject`, it has a get method. If you send the request, then you will get the same response shown [here](#jobOffers-response), those who belongs to the requested project.

12. Get all the job offers by occupations `/jobOffers/getAllByOccupations/`, it has a get method. You need the following payload or you will get an [error](#error):

    ```json
    {
      "args": {
        "occupations": ["Occupation 1", "Occupation 2"]
      }
    }
    ```

    The response will be the same shown [here](jobOffers-response#), but with the job offers that has those occupations.

### Notes

<a id="error"></a>In case of error you will get a generic error as follows, with a 500 error code:

```json
{
  "error": true,
  "message": "Error message"
}
```

## Authors:

- **Anthony Luzquiños** - _Initial Work_ - _Database_ - _Deployment_ - _Documentation_ - [AnthonyLzq](https://github.com/AnthonyLzq).
