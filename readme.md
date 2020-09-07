# Hiref Backend

## Prerequisites

- You need to have [`Node.js`](https://nodejs.org/en/) and [`Yarn`](https://yarnpkg.com/) installed.
- You need an `.env` file in order to run this project. Here is an example of its content:

```bash
MONGO_URI =
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

There are seven endpoints implemented:

1. Home: `/`, it has a get method. It is only decorative.
2. Projects: `/projects/`, it has a get method. This method will return you all the projects in the database.
3. Projects by company: `/projects/:idCompany/`, it has a get and a post method. Here are some examples:
   - If you send a get request without any query, then you will get all the projects that belongs to the requested company.
   - If you sen a get request with a query like this: `?status=`, then you will get all the projects that belong to the requested company and has the requested status, there are four status allowed: published, active, completed and canceled. If you ask for another status, you will get an error.
   - If you send a post request, a new project that belongs to the requested company will be saved in the database. You need a payload as follows or you will get an error:
     ```json
     {
       "args": {
         "categories": ["category_1", "category_2"],
         "description": "Here is the project description.",
         "limitDate": "YEAR-MONTH-DAY",
         "name": "Project's name",
         "roles": [
           {
             "name": "Role_1 name",
             "quantity": 30,
             "remuneration": 950
           },
           {
             "name": "Role_2 name",
             "quantity": 30,
             "remuneration": 950
           }
         ]
       }
     }
     ```
     It will store the project with published status as default. It can't be changed unless an update is performed.
4. Update project: `/projects/:idCompany/:idProject`, it has a patch method. You need a payload as follows or you will get an error:
   ```json
   {
     "args": {
       "categories": ["category_1", "category_2"],
       "description": "Here is the project description.",
       "limitDate": "YEAR-MONTH-DAY",
       "name": "Project's name",
       "roles": [
         {
           "name": "Role_1 name",
           "quantity": 30,
           "remuneration": 950
         },
         {
           "name": "Role_2 name",
           "quantity": 30,
           "remuneration": 950
         }
       ]
     }
   }
   ```
5. Tasks from a project: `/task/:idCompany/:idProject/`, it has a get and a post method. Here are some examples:
   - If you send a get request, then you will get all the tasks from the request project from the requested company.
   - If you send a post request, then you will store a new task from the request project from the requested company. You need a payload as follows or you will get an error:
     ```json
     {
       "args": {
         "limitDate": "YEAR-MONTH-DAY",
         "name": "Task name",
         "responsible": ["responsible 1", "responsible 2"],
         "status": "Task status",
         "subTask": ["Sub task 1", "Sub task 2"]
       }
     }
     ```
     Sub tasks field is optional, in case there isn't any sub task, you should send an empty array.
6. Task by company by project by id: `/tasks/:idCompany/:idProject/:idTask/`, it has a patch method. You need a payload as follows or you will get an error:

   ```json
   {
     "args": {
       "limitDate": "YEAR-MONTH-DAY",
       "name": "New name",
       "responsible": ["responsible 1", "responsible 2"],
       "status": "Task status",
       "subTask": ["Sub task 1", "Sub task 2"]
     }
   }
   ```

   Sub tasks field is optional, in case there isn't any sub task, you should send an empty array.

7. Task by id: `/task/:idTask`, it has a delete method, if you send it, then you will delete the task.

### Notes

In case of error you will get a generic error as follows, with a 500 error code:

```json
{
  "error": true,
  "message": "Error message"
}
```

## Authors:

- **Anthony Luzquiños** - _Initial Work_ - _Database_ - _Deployment_ - _Documentation_ - [AnthonyLzq](https://github.com/AnthonyLzq).
