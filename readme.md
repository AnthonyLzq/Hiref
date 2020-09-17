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

- All the endpoints begins in `/api`, except `home`.

There are sixteen endpoints implemented:

1. Home: `/`, it has a get method. It is only decorative.
2. Projects by company: `/projects/:idCompany/`, it has a get and a post method. Here are some examples:

   - You can send a get request with a query parameter or without it, if you send a get request without any query, then you will get all the projects that belongs to the requested company.

   - If you sen a get request with a query like this: `?status=`, then you will get all the projects that belong to the requested company and has the requested status, there are three status allowed: <a id="status"></a>active, completed and canceled. If you ask for another status, you will get an [error](#error).

   - In both cases you will get a response like follows, which contains an array of the projects that were found:

     ```json
     {
       "error": false,
       "message": {
         "result": [
           {
             "_id": "Project MongoDB id",
             "code": "Project id for the company",
             "createdAt": "Iso date",
             "deadline": "Iso date",
             "description": {
               "content": "Project content",
               "title": "Project title"
             },
             "status": "Project status",
             "supervisors": [
               "Supervisor_1 Firebase id",
               "Supervisor_2 Firebase id"
             ]
           }
         ]
       }
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
         "supervisors": ["Supervisor_1 Firebase id", "Supervisor_2 Firebase id"]
       }
     }
     ```

     It will store the project with active status as default. It can't be changed unless an update or update status is performed.</br>
     <a id="one-project-response"></a> You will get a response which contains the project that has been stored:

     ```json
     {
       "error": false,
       "message": {
         "result": {
           "_id": "Project MongoDB id",
           "code": "Company code for the project",
           "deadline": "YEAR-MONTH-DAY",
           "description": {
             "content": "Project description",
             "title": "Project name"
           },
           "idCompany": "Company id",
           "supervisors": [
             "Supervisor_1 Firebase id",
             "Supervisor_2 Firebase id"
           ]
         }
       }
     }
     ```

3. Update project: `/projects/update/:idProject/`, it has a patch method. Here are some examples:

   - You can send a patch request with a query or without it, if you send the request without the query, then you have to send the same payload shown [here](#project-payload), adding the field `status` in the "args", but with the updated information.</br>
     It will return you the same response shown [here](#one-project-response), but with the project that has been updated.

   - If you send the request with a query like this `?status=`, then payload is no longer need it, and the response the same that was shown [here](#one-project-response), but with the status updated. Remember that there are only three status allowed as it is shown [here](#status).

4. Tasks from a project: `/task/:idProject/`, it has a get and a post method. Here are some examples:

   - If you send a get request, then you will get all the tasks from the request project from the requested company. <a id="tasks-response"></a>The response will be as follows:

     ```json
     {
       "error": false,
       "message": {
         "result": [
           {
             "_id": "Task MongoDB id",
             "deadline": "Iso date",
             "description": {
               "content": "Task content",
               "title": "Task description"
             },
             "idProject": "Project MongoDB id",
             "responsible": [
               "Responsible_1 Firebase id",
               "Responsible_2 Firebase id"
             ],
             "status": "Task status",
             "subTasks": ["Sub task 1", "Sub task 2"]
           }
         ]
       }
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
           "Responsible_1 Firebase id",
           "Responsible_2 Firebase id"
         ],
         "status": "Task status",
         "subTask": ["Sub task 1", "Sub task 2"]
       }
     }
     ```

     Sub tasks field is optional, in case there isn't any sub task, you should send an empty array. <a id="one-task-response"></a>The response will be as follows:

     ```json
     {
       "error": false,
       "message": {
         "result": {
           "_id": "Task MongoDB id",
           "deadline": "Iso date",
           "description": {
             "content": "Task content",
             "title": "Task description"
           },
           "idProject": "Project MongoDB id",
           "responsible": [
             "Responsible_1 Firebase id",
             "Responsible_2 Firebase id"
           ],
           "status": "Task status",
           "subTasks": ["Sub task 1", "Sub task 2"]
         }
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
     "message": {
       "result": [
         {
           "_id": "Mongo job offer id",
           "code": "Company code for the job offer.",
           "deadline": "YEAR-MONTH-DAY",
           "description": {
             "content": "Job offer content.",
             "title": "Job offer title"
           },
           "idProject": "Project MongoDB id",
           "numberApplicants": 2,
           "occupations": ["Ocupation 1", "Ocupation 2"],
           "roles": [
             {
               "applicants": [
                 "Aspirant 1 Firebase id",
                 "Aspirant 2 Firebase id"
               ],
               "description": {
                 "content": "Role content",
                 "title": "Role title"
               },
               "quantity": 12,
               "remuneration": 930
             }
           ],
           "status": "Job offer status."
         }
       ]
     }
   }
   ```

9. Store a job offer for a project: `/jobOffers/store/:idProject/`, it has a post method. It will store a job offer for a determined project. <a id="jobOffer-payload"></a>You need a payload as follows or you will get an [error](#error):

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
           "description": {
             "content": "Role content",
             "title": "Role title"
           },
           "quantity": 12,
           "remuneration": 930
         }
       ]
     }
   }
   ```

   By default, all the job offers status will be stored as published. It can't be changed unless an update or update status is performed.

10. Update a job offer: `/jobOffers/update/:idJobOffer/`, it has a patch method, here are some examples:

    - You can send the request with a query or without it, if you send the request without, then you need the same payload that is shown [here](#jobOffer-payload), adding the field `status` in the "args". <a id="status-for-jobOffers"></a>Remember that only the following status are allowed: published, inEvaluation, rePublished, completed and canceled. <a id="one-jobOffer-response"></a> You will get a response as follows:

      ```json
      {
        "error": false,
        "message": {
          "result": {
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
                "applicants": [
                  "Aspirant 1 Firebase id",
                  "Aspirant 2 Firebase id"
                ],
                "description": {
                  "content": "Updated role content",
                  "title": "Updated role title"
                },
                "quantity": 12,
                "remuneration": 930
              }
            ],
            "status": "Updated job offer status."
          }
        }
      }
      ```

    - If you send the request with a query like this `?status=`, then a payload is no longer need it, and you will get the same response shown [here](#one-jobOffer-response), but with the status updated.

11. Get all the job offers by project: `/jobOffers/getAll/byProject/:idProject`, it has a get method. If you send the request, then you will get the same response shown [here](#jobOffers-response), those who belongs to the requested project.

12. Get all the job offers by occupations `/jobOffers/getAll/byOccupations/`, it has a post method. You need the following payload or you will get an [error](#error):

    ```json
    {
      "args": {
        "occupations": ["Occupation 1", "Occupation 2"]
      }
    }
    ```

    The response will be the same shown [here](#jobOffers-response), but with the job offers that has those occupations.

13. Get all the job offers by aspirant: `/jobOffers/getAll/forAspirant/`, it has a post method. If you send the request. You need the following payload or you will get an [error](#error):

    ```json
    {
      "args": {
        "acceptedJobOffers": [
          "Job offer id accepted 1",
          "Job offer id accepted 2"
        ],
        "rejectedJobOffers": [
          "Job offer id rejected 1",
          "Job offer id rejected 2"
        ],
        "occupations": [
          "Occupation 1",
          "Occupation 2"
        ]
      }
    }
    ```

    You will get a response as follows:

    ```json
    {
      "error": false,
      "message": {
        "result": {
          "acceptedJobOffers": [
            {
              "_id": "Mongo job offer id",
              "code": "Company code of the accepted job offer.",
              "deadline": "YEAR-MONTH-DAY",
              "description": {
                "content": "Content of the accepted job offer.",
                "title": "Title of the accepted job offer."
              },
              "idProject": "Project MongoDB id",
              "numberApplicants": 2,
              "occupations": ["Ocupation 1", "Ocupation 2"],
              "roles": [
                {
                  "applicants": [
                    "Aspirant 1 Firebase id",
                    "Aspirant 2 Firebase id"
                  ],
                  "description": {
                    "content": "Role content",
                    "title": "Role title"
                  },
                  "quantity": 12,
                  "remuneration": 930
                }
              ],
              "status": "Status of the accepted job offer."
            }
          ],
          "availableJobOffers": [
            {
              "_id": "Mongo job offer id",
              "code": "Company code of the available job offer.",
              "deadline": "YEAR-MONTH-DAY",
              "description": {
                "content": "Content of the available job offer.",
                "title": "Title of the available job offer."
              },
              "idProject": "Project MongoDB id",
              "numberApplicants": 2,
              "occupations": ["Ocupation 1", "Ocupation 2"],
              "roles": [
                {
                  "applicants": [
                    "Aspirant 1 Firebase id",
                    "Aspirant 2 Firebase id"
                  ],
                  "description": {
                    "content": "Role content",
                    "title": "Role title"
                  },
                  "quantity": 12,
                  "remuneration": 930
                }
              ],
              "status": "Status of the available job offer."
            }
          ],
          "rejectedJobOffers": [
            {
              "_id": "Mongo job offer id",
              "code": "Company code of the rejected job offer.",
              "deadline": "YEAR-MONTH-DAY",
              "description": {
                "content": "Content of the rejected job offer.",
                "title": "Title of the rejected job offer."
              },
              "idProject": "Project MongoDB id",
              "numberApplicants": 2,
              "occupations": ["Ocupation 1", "Ocupation 2"],
              "roles": [
                {
                  "applicants": [
                    "Aspirant 1 Firebase id",
                    "Aspirant 2 Firebase id"
                  ],
                  "description": {
                    "content": "Role content",
                    "title": "Role title"
                  },
                  "quantity": 12,
                  "remuneration": 930
                }
              ],
              "status": "Status of the rejected job offer."
            }
          ]
        }
      }
    }
    ```

14. Get all the job offers for the evaluator: `/jobOffers/getAll/forEvaluator/`, it has a post method. If you send the request. You need the following payload or you will get an [error](#error):

    ```json
    {
      "args": {
        "completedJobOffers": [
          "Job offer id completed 1",
          "Job offer id completed 2"
        ],
        "inEvaluationJobOffers": [
          "Job offer id in evaluation 1",
          "Job offer id in evaluation 2"
        ]
      }
    }
    ```

    You will get a response as follows:

    ```json
    {
      "error": false,
      "message": {
        "result": {
          "availableJobOffers": [
            {
              "_id": "Mongo job offer id",
              "code": "Company code of the available job offer.",
              "deadline": "YEAR-MONTH-DAY",
              "description": {
                "content": "Content of the available job offer.",
                "title": "Title of the available job offer."
              },
              "idProject": "Project MongoDB id",
              "numberApplicants": 2,
              "occupations": ["Ocupation 1", "Ocupation 2"],
              "roles": [
                {
                  "applicants": [
                    "Aspirant 1 Firebase id",
                    "Aspirant 2 Firebase id"
                  ],
                  "description": {
                    "content": "Role content",
                    "title": "Role title"
                  },
                  "quantity": 12,
                  "remuneration": 930
                }
              ],
              "status": "Status of the available job offer."
            }
          ],
          "completedJobOffers": [
            {
              "_id": "Mongo job offer id",
              "code": "Company code of the completed job offer.",
              "deadline": "YEAR-MONTH-DAY",
              "description": {
                "content": "Content of the completed job offer.",
                "title": "Title of the completed job offer."
              },
              "idProject": "Project MongoDB id",
              "numberApplicants": 2,
              "occupations": ["Ocupation 1", "Ocupation 2"],
              "roles": [
                {
                  "applicants": [
                    "Aspirant 1 Firebase id",
                    "Aspirant 2 Firebase id"
                  ],
                  "description": {
                    "content": "Role content",
                    "title": "Role title"
                  },
                  "quantity": 12,
                  "remuneration": 930
                }
              ],
              "status": "Status of the completed job offer."
            }
          ],
          "inEvaluationJobOffers": [
            {
              "_id": "Mongo job offer id",
              "code": "Company code of the inEvaluation job offer.",
              "deadline": "YEAR-MONTH-DAY",
              "description": {
                "content": "Content of the inEvaluation job offer.",
                "title": "Title of the inEvaluation job offer."
              },
              "idProject": "Project MongoDB id",
              "numberApplicants": 2,
              "occupations": ["Ocupation 1", "Ocupation 2"],
              "roles": [
                {
                  "applicants": [
                    "Aspirant 1 Firebase id",
                    "Aspirant 2 Firebase id"
                  ],
                  "description": {
                    "content": "Role content",
                    "title": "Role title"
                  },
                  "quantity": 12,
                  "remuneration": 930
                }
              ],
              "status": "Status of the inEvaluation job offer."
            }
          ]
        }
      }
    }
    ```

15. Delete a job offer: `/jobOffers/delete/:idJobOffer/`, it has a delete method. If you send the request, then the request job offer will be deleted from the database. You will get the same response shown [here](#one-jobOffer-response), but with the data of the deleted job offer.

16. Postulate to a job offer: `/jobOffers/postulate/:idJobOffer/`, it has a post method. If you send the request. You need the following payload or you will get an [error](#error):

    ```json
    {
      "args": {
        "roles": [
          {
            "applicants": ["Aspirant Firebase id"],
            "description": {
              "content": "Role content 1",
              "title": "Role title 1"
            },
            "quantity": 12,
            "remuneration": 930
          }
        ]
      }
    }
    ```

    The response will be the same shown [here](#jobOffers-response), but with a new field called applicants.

17. Get all the users: `/users/`, it has a get method. You have to send the request with a query like this `?type=`, if you don't send the request with a query, you will an [error](#error).

    - `?type=clients`: it will give you all the clients stored in firebase, you will get a response as follows:
        ```json
        {
          "error": false,
          "message": {
            "result": [
              {
                "id": "BEkuhoLp1rPiZwco46FKaIha8PP2",
                "role": "client",
                "commercial_name": "Client 2",
                "ruc": "12345678",
                "business_name": "Client business name 2",
                "email": "client2@test.com"
              }
            ]
          }
        }
        ```

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
