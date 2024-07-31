from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.associationproxy import association_proxy
from sqlalchemy.orm import validates
from config import db

class User(db.Model, SerializerMixin):
    __tablename__='users'

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String, unique=True, nullable=False)

    @validates('username')
    def validate_username(self,key,username):
        if not username:
            raise ValueError("Failed username validation")
        return username

    tasks = db.relationship('Task', back_populates='user', cascade='all, delete-orphan')

    goals = association_proxy('tasks', 'goal', creator=lambda goal_obj: Task(goal=goal_obj))

    serialize_rules = ('-tasks.user',)

    def __repr__(self):
        return f'<User {self.id}, {self.username}>'


class Task(db.Model, SerializerMixin):
    __tablename__='tasks'

    id = db.Column(db.Integer, primary_key=True)
    task = db.Column(db.String, nullable=False)
    completed = db.Column(db.Boolean)
    users_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    goals_id = db.Column(db.Integer, db.ForeignKey('goals.id'))

    @validates('task')
    def validate_task(self,key,task):
        if not task:
            raise ValueError("Failed task validation")
        return task

    user = db.relationship('User', back_populates='tasks')
    goal = db.relationship('Goal', back_populates='tasks')

    serialize_rules = ('-user.tasks', '-goal.tasks')

    def __repr__(self):
        return f'<Task {self.id}, {self.task}, {self.completed}, {self.user.username} {self.goal.goal}>'


class Goal(db.Model,SerializerMixin):
    __tablename__='goals'

    id = db.Column(db.Integer, primary_key=True)
    goal = db.Column(db.String, nullable=False)

    @validates('goal')
    def validate_goal(self,key,goal):
        if not goal:
            raise ValueError("Failed goal validation")
        return goal

    tasks = db.relationship('Task', back_populates='goal', cascade='all, delete-orphan')

    users = association_proxy('tasks', 'user', creator=lambda user_obj: Task(user=user_obj))

    serialize_rules = ('-tasks.goal',)

    def __repr__(self):
        return f'<Goal {self.id}, {self.goal}>'
        
    