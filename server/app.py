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

api.add_resource(UserResource, '/')


if __name__ == '__main__':
    app.run(port=5555, debug=True)

