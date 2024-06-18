from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.associationproxy import association_proxy

from config import db

# Models go here!
class User(db.Model):
    __tablename__='users'

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String)

class Goal(db.Model):
    __tablename__='goals'

    id = db.Column(db.Integer, primary_key=True)
    goals = db.Column(db.String)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))

class Task(db.Model):
    __tablename__='tasks'

    id = db.Column(db.Integer, primary_key=True)
    task = db.Column(db.String)
    completed = db.Column(db.Boolean)
    goals_id = db.Column(db.Integer, db.ForeignKey('goals.id'))