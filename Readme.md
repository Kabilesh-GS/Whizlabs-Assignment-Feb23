# Task Management

## Overview
This repository contains the Whizlabs training assignment for February 2023.

## Contents
- Assignment details
- Implementation files
- Documentation

## Getting Started
1. Clone or download this repository
2. Review the assignment requirements
3. Complete the tasks as specified

## Installation
- Clone the repo 
- Use command ```npm i``` to install the packages
- Create an .env file and paste the DATABASE_URL and JWT_TOKEN in them
- run the command ```npx prisma migrate deploy```
- run the command ```npx prisma generate```
- run the application using ```npm run start```
- run the seed command to add roles and admin users ```npx prisma db seed```
- open another terminal and run
- ```brew services start redis ``` to start the redis server
- ```npx ts-node src/worker.ts``` to start the bullMQ worker

## Usage
- *ads*
- */v1/adduser* is to register
- */v1/login* is to login in with email and password with the registered account
- */v1/addTask* is to add tasks once the user is logged in
- */v1/getTasks* is to get all the task data, only accessible by the admin
- */v1/getUserTasks* is to view taks only by th particular user
- */v1/deleteTasks* is to delete the task, can be done only by the admin.
- ```http://localhost:3000/api``` to open Swagger UI

### To run test 
- ```npm run test``` for unit testing 
- ```npm run test:e2e``` for integration testing