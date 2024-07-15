#!/usr/bin/env python3

from flask import Flask, request, current_app, make_response, jsonify
from flask_restful import Resource, Api
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


if __name__ == '__main__':
    app.run(port=5555, debug=True)
