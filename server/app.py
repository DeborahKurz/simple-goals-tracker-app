#!/usr/bin/env python3

from flask import Flask, request, make_response, jsonify
from flask_restful import Resource
from models import User, Goal, Task
from config import app, db, api

class UserResource(Resource):
    def get(self):
        try:
            users = User.query.all()

            response_dict_list = [u.to_dict() for u in users]
            return response_dict_list, 200
        except Exception as e:
            return {"error": f"Error: {e}"}, 400
        
    def post(self):
        try:
            data = request.get_json()
            username = data['username']
            if not username:
                return {"error": "Username required. Must be at least 1 character long."}, 400
            existing_user = User.query.filter_by(username=username).first()
            if existing_user:
                return {"error": "Please choose a different username"}, 400
            else:
                user = User(username=username)
                db.session.add(user)
                db.session.commit()

                response_dict = user.to_dict()
                response = make_response(
                    jsonify(response_dict),
                    201,
                )
                return response
        except Exception as e:
            return {"error": f"Error: {e}"}, 400
api.add_resource(UserResource, '/')


class UserResourceById(Resource):
    def patch(self, id):
        data = request.get_json()

        user = User.query.filter_by(id = id).first()
        if user:
            try:
               user.username = data['username']

               db.session.commit() 

               response_dict = user.to_dict()
               return response_dict, 202
            
            except Exception as e:
                return {"error": "No user found"}, 404

api.add_resource(UserResourceById, '/<int:id>')


class UsersCompletedTasks(Resource):
    def get(self, user_id):
        tasks = Task.query.filter_by(users_id = user_id).all()
        completed_tasks = [task.to_dict() for task in tasks if task.completed == 1]

        if completed_tasks:
            return completed_tasks, 200
        else:
            response = {"error": "No task(s) found."}

            return response, 404
api.add_resource(UsersCompletedTasks, '/usertasks/<int:user_id>')


class GoalResource(Resource):
    def get(self):
        try:
            goals = Goal.query.all()

            response_dict_list = [g.to_dict() for g in goals]

            return response_dict_list, 200
        
        except Exception as e:
            return {"error": f"Error: {e}"}, 400

    def post(self):
        try:
            data = request.get_json()
            goal_text = data.get('goal') 

            if not goal_text:
                return {"error": "Goal must be at least 1 character long."}, 400

            new_goal = Goal(goal=goal_text)
            db.session.add(new_goal)
            db.session.commit()

            response_dict = new_goal.to_dict()
            response = make_response(
                jsonify(response_dict),
                201
            )
            return response
        except Exception as e:
            return {"error": f"Error: {e}"}, 500
api.add_resource(GoalResource, '/goals')


class TaskResource(Resource):
    def get(self):
        try:
            tasks = Task.query.all()

            response_dict_list = [t.to_dict() for t in tasks]
            return response_dict_list, 200
        
        except Exception as e:
            return {"error": f"Error: {e}"}, 400
             
    def post(self):
        try:
            data = request.get_json()
            task = data.get('task')
            if not task:
                return {"erorr": "Task must be at least 1 character long."}, 400

            goals_id = data.get('goals_id')
            users_id = data.get('users_id')

            goal = Goal.query.filter_by(id=goals_id).first()
            if not goal:
                return {"error": "No goal found."}, 404
            
            user = User.query.filter_by(id=users_id).first()
            if not user:
                return {"error":"No user found."}, 404
            
            new_task = Task(task=task, completed=False, goals_id=goal.id, users_id=user.id)

            db.session.add(new_task)
            db.session.commit()
            
            response_dict = new_task.to_dict()
            response = make_response(
                jsonify(response_dict),
                201
            )
            return response
        except Exception as e:
            return {"error": f"Error: {e}"}     
api.add_resource(TaskResource, '/tasks')
        
class TaskByIdResource(Resource):
    def patch(self,id):
        task = Task.query.get(id)
        if task:
            data = request.get_json()
            try:
                task.task = data['task']
                task.completed = data['completed']
                task.goals_id = data['goals_id']

                db.session.commit()

                response_dict = task.to_dict()
                return response_dict, 202
            except Exception as e:
                return {"error": f"Error: {e}"}
        else:
            return {"error": "No task found."}, 404

    def delete(self,id):
        task = Task.query.filter_by(id=id).first()
        if task:
            db.session.delete(task)
            db.session.commit()
            
            response_dict = {"message": "Task successfully deleted."}
            response = make_response(
                response_dict,
                204
            )
            return response
        else:
            response_dict = {
                {"error": "No task found."}
            }

            response = make_response(
                jsonify(response_dict),
                404
            )
            return response
api.add_resource(TaskByIdResource, '/tasks/<int:id>')



class Subtasks()


#get all the user's goals (users_id)
# class UsersGoals(Resource):
#     def get(self, userId):
  
#         tasks = Task.query.filter_by(users_id = userId).all()
#         task_list = [task.goal.to_dict() for task in tasks]

#         return task_list, 200
        
# api.add_resource(UsersGoals, "/usersgoals/<int:userId>")






################## Practice Sessions Below:
#Get all goals for a specific user (users_id):
# class UserGoals(Resource):
#     def get(self, userId):
#         tasks = Task.query.filter_by(users_id = userId).all()
#         task_list = [task.goal.to_dict() for task in tasks]
#         return task_list, 200
# api.add_resource(UserGoals, "/usergoals/<int:userId>")

# Get all users who have completed tasks for a specific goal
# class UsersCompletedTasks(Resource):
#     def get(self, goals_id):
#         tasks = Task.query.filter_by(goals_id = goals_id).all()
#         users = [task.user.to_dict() for task in tasks if task.completed == 1]
#         return users
# api.add_resource(UsersCompletedTasks, '/userscompletedtasks/<int:goals_id>')

#search/filter: Retrieve all tasks that belong to user 3 and goal 7:
# class UserAndGoal(Resource):
#     def get(self, userId, goalId):
#         #query tasks for users_id =3 
#         tasks = Task.query.filter_by(users_id = userId).all()
#         #list comp if task.goal_id = 1 return task#to_dict()
#         task_list = [task.to_dict() for task in tasks if task.goals_id == goalId]
#         if task_list:
#             return task_list, 200
#         else:
#             return {"message": "There are no tasks that match the user and goal"}
# api.add_resource(UserAndGoal, "/userandgoal/<int:userId>/<int:goalId>")

#Post: Create a new task with a Post Request
# class NewTask(Resource):
#     def post(self):
#         data = request.get_json()

#         task = Task(task = data['task'], completed = data['completed'], goals_id = data['goals_id'], users_id = data['users_id'])

#         db.session.add(task)
#         db.session.commit()

#         task_dict = task.to_dict()
#         return task_dict, 202
# api.add_resource(NewTask, "/newtask")

#Patch: Update task id 32 with a completed status of "1":
# class UpdateTask(Resource):
#     def patch(self, taskId):
#         data = request.get_json()
#         task = Task.query.filter_by(id = taskId).first()
#         try:
#             task.task = data['task']
#             task.completed = data['completed']
#             task.goals_id = data['goals_id']
#             task.users_id = data['users_id']
            
#             db.session.commit()

#             response = task.to_dict()
#             return response, 202
        
#         except Exception as e:
#             return {"error": str(e)}
# api.add_resource(UpdateTask, '/updatetask/<int:taskId>')

#DELETE: Delete Task 32
# class DeleteATask(Resource):
#     def delete(self, id):
#         task = Task.query.filter_by(id = id).first()
#         db.session.delete(task)
#         db.session.commit()
#         return {"message": "Task has been deleted"}
# api.add_resource(DeleteATask, "/deleteatask/<int:id>")











#get all tasks associated with a user's id
# class UserTasks(Resource):
#     def get(self, id):
#         tasks = Task.query.filter_by(users_id = id).all()
#         tasks_dict = [task.to_dict() for task in tasks]
#         return tasks_dict, 200
# api.add_resource(UserTasks, '/usertasks/<int:id>')

#search users by username fcruz
# class SearchUsername(Resource):
#     def get(self, name):
#         user = User.query.filter_by(username = name).first()
#         user_dict = user.to_dict()
#         return user_dict, 200
# api.add_resource(SearchUsername, '/searchusername/<string:name>')

#create a new user (Post)
# class NewUser(Resource):
#     def post(self):
#         data = request.get_json()
#         user = User(username=data['username'])
#         db.session.add(user)
#         db.session.commit()
#         response = user.to_dict()
#         return response, 202
# api.add_resource(NewUser, '/newuser')




####################

#Accepts a goal (id)
#searhes for all users associated with goal
# class UsersThroughGoal(Resource):
#     def get(self,id):
#         tasks = Task.query.filter_by(goals_id = id).all()
#         users = [task.user.to_dict(only=("id","username",)) for task in tasks]

#         # user_data = [user.to_dict() for user in users]

#         return jsonify(users)
# api.add_resource(UsersThroughGoal, '/users/<int:id>')

# class UsersTasks(Resource):
#     # return all user objects that have completed tasks
#     def get(self):
#         tasks = Task.query.filter_by(completed = 1).all()
#         users = [task.user.to_dict() for task in tasks]

#         return jsonify(users)
#         #query tasks to find the completed ones
#         # use a list comprehension to get the users

# api.add_resource(UsersTasks, "/usertasks")


# # create a search feature that finds users. Return the user object.
# class FindUser(Resource):
#     def get(self, id):
#             #Get list of users
#             #search for the username that has been passed in as 'name'
#             #get only the first one
#             #return jsonify() with user
#             user = User.query.filter_by(username = id).first()
#             user_dict = user.to_dict()
#             return jsonify(user_dict)
# api.add_resource(FindUser, "/finduser/<string:id>")


#Accepts a goal (id)
#searhes for all users associated with that goal
    #Need a def with id
    #Query Tasks for tasks with goals_id
    #List Comprehension tasks list for Task.user.username
    #to_dict()
    #jsonify()
# class GoalUsers(Resource):
#     def get(self, id):
#         tasks = Task.query.filter_by(goals_id = id).all()
#         users = [task.user.to_dict() for task in tasks]
#         return jsonify(users)
# api.add_resource(GoalUsers, "/goaluser/<int:id>")


# #Search for not completed tasks.
# class NotCompleted(Resource):
#     #create a get funtion
#     def get(self):
#         #query tasks for completed = 0
#         tasks = Task.query.filter_by(completed = False).all()
#         #list comprehension to get the task's 'task'instead of the object
#         task_list = [task.task for task in tasks]
#         #to_dict() the tasks
#         # task_dict = task_list.to_dict()
#         #jsonify() and return the data
#         return jsonify(task_list)
# api.add_resource(NotCompleted, "/notcompleted")


# #Goal = 'Say Hello'
# #Final all users associated with the goal
# class FindGoal(Resource):
#     #create a def for a get
#     def get(self, goalpassedin):
#         findgoalid = Goal.query.filter_by(goal = goalpassedin).first()

#         goalid = findgoalid.id

#         taskswithgoalid = Task.query.filter_by(goals_id = goalid).all()

#         users = [task.user for task in taskswithgoalid]
#         user_dict = users.to_dict()
#         return jsonify(user_dict)
# api.add_resource(FindGoal, '/findgoal/<string:goalpassedin>')


# class SearchTasksFeature(Resource):
#     def get(self, task_prompt):
#     #query db for tasks that include task_prompt
#     #return jsonify()
#         tasks = Task.query.filter(Task.task.like(f'%{task_prompt}')).all()

#         return jsonify(tasks)
# api.add_resource(SearchTasksFeature, '/searchtasks/<string:task_prompt>')



# #find user by username
# #Get all the user's tasks
# class FindUsersTasks(Resource):
#     def get(self, ausername):
#         user = User.query.filter_by(username = ausername).first()
#         tasks = [task.to_dict() for task in user.tasks]
#         print(tasks)
#         return tasks, 200
# api.add_resource(FindUsersTasks, '/finduserstasks/<string:ausername>')
# #query to get the user that matches the username
# #access the tasks

# #fetch all users that do not have tasks
# # if there are no users without tasks, return a custom message
# class UsersNoTasks(Resource):
#     def get(self):
#         #query users get all users
#         users = User.query.filter(User.tasks == None).all()
#         print(users)
#         if users:
#             user_list = [user.to_dict() for user in users]
#             # user_dict = users.to_dict()
#             return user_list, 200
#         else:
#             response = {"error": "No users"}
#             return response, 404

# api.add_resource(UsersNoTasks, '/usersnotasks')


# #fetch all goals 
# #return tasks associated with each goal
# class GoalTasks(Resource):
#     def get(self):
#         #query all goals

#         # goals = Goal.query.all()
#         tasks = [task for goal in Goal.query.all() for task in goal.tasks]

#         for goal in Goal.query.all():
#             for task in goal.tasks:
#                 return task
#         print(tasks)


#         # task_dict = [task.to_dict() for task in tasks]
#         # return task_dict, 200
#         return jsonify(tasks)

#         #list comprehension thorugh goals return tasks

# api.add_resource(GoalTasks, "/goaltasks")

if __name__ == '__main__':
    app.run(port=5555, debug=True)

