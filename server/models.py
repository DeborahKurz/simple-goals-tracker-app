from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.associationproxy import association_proxy

from config import db

# Models go here!
class User(db.Model, SerializerMixin):
    __tablename__='users'

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String)

    tasks = db.relationship('Task', back_populates='user', cascade='all, delete-orphan')

    serialize_rules = ('-tasks.user',)


class Task(db.Model, SerializerMixin):
    __tablename__='tasks'

    id = db.Column(db.Integer, primary_key=True)
    task = db.Column(db.String)
    completed = db.Column(db.Boolean)
    users_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    goals_id = db.Column(db.Integer, db.ForeignKey('goals.id'))

    goal = db.relationship('Goal', back_populates='tasks')
    user = db.relationship('User', back_populates='tasks')

    serialize_rules = ('-goal.tasks', '-user.tasks')


class Goal(db.Model,SerializerMixin):
    __tablename__='goals'

    id = db.Column(db.Integer, primary_key=True)
    goal = db.Column(db.String)

    tasks = db.relationship('Task', back_populates='goal', cascade='all, delete-orphan')

    serialize_rules = ('-tasks.goal',)
