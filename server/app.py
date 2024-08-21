#!/usr/bin/env python3

from flask import Flask, request, make_response, jsonify
from flask_restful import Resource
from models import User, Goal, Task, Subtask
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
            
    def delete(self, id):
        user = User.query.filter_by(id = id).first()

        if user:
            db.session.delete(user)
            db.session.commit()

            response = {"message": "User successfully deleted."}
            return response, 200
        else:
            response = {"error" : "No user found"}
            return response
api.add_resource(UserResourceById, '/<int:id>')


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

class Subtasks(Resource):
    def post(self):
        data = request.get_json()

        subtask = Subtask(subtask=data['subtask'],completed=0, task_id=data['task_id'])

        db.session.add(subtask)
        db.session.commit()

        response = subtask.to_dict()
        return response, 202
api.add_resource(Subtasks, '/subtasks')

class SubtasksBySubtaskId(Resource):
    def patch(self, sub_id):

        data = request.get_json()
        subtask = Subtask.query.filter_by(id=sub_id).first()

        if subtask:
            try:
                subtask.subtask = data['subtask']
                subtask.completed = data['completed']
                subtask.task_id = data['task_id']

                db.session.commit()

                response_dict = subtask.to_dict()
                return response_dict, 202
            except Exception as e:
                return {"error": f"Error: {e}"}, 400
        else:
            return {"error": "No task found."}, 404

    def delete(self, sub_id):
        subtask = Subtask.query.filter_by(id=sub_id).first()

        if subtask:
            db.session.delete(subtask)
            db.session.commit()

            response = {"message": "Subtask successfully deleted."}
            return response, 200
        else:
            response = {"error" : "No subtask found"}
            return response, 404
api.add_resource(SubtasksBySubtaskId, '/subtasksid/<int:sub_id>')

class SubtasksByTaskId(Resource):
    def get(self, task_id):
        subtasks = Subtask.query.filter_by(task_id = task_id).all()
        if subtasks:
            subtask_list = [subtask.to_dict() for subtask in subtasks]
            return subtask_list, 200
        else:
            response = {"error": "No subtask(s) found."}
            return response, 404
api.add_resource(SubtasksByTaskId, "/subtasks/<int:task_id>")


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

if __name__ == '__main__':
    app.run(port=5555, debug=True)