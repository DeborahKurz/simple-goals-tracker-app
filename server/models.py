from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.associationproxy import association_proxy
from sqlalchemy.orm import validates
from config import db

class User(db.Model, SerializerMixin):
    __tablename__='users'

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String, unique=True, nullable=False)

    tasks = db.relationship('Task', back_populates='user', cascade='all, delete-orphan')

    goals = association_proxy('tasks', 'goal', creator=lambda goal_obj: Task(goal=goal_obj))

    serialize_rules = ('-tasks.user',)

    @validates('username')
    def validate_username(self,key,username):
        if not username:
            raise ValueError("Failed username validation")
        return username

    def __repr__(self):
        return f'<User {self.id}, {self.username}>'



class Goal(db.Model,SerializerMixin):
    __tablename__='goals'

    id = db.Column(db.Integer, primary_key=True)
    goal = db.Column(db.String, nullable=False)

    tasks = db.relationship('Task', back_populates='goal', cascade='all, delete-orphan')

    users = association_proxy('tasks', 'user', creator=lambda user_obj: Task(user=user_obj))

    serialize_rules = ('-tasks.goal',)

    @validates('goal')
    def validate_goal(self,key,goal):
        if not goal:
            raise ValueError("Failed goal validation")
        return goal

    def __repr__(self):
        return f'<Goal {self.id}, {self.goal}>'



class Task(db.Model, SerializerMixin):
    __tablename__='tasks'

    id = db.Column(db.Integer, primary_key=True)
    task = db.Column(db.String, nullable=False)
    completed = db.Column(db.Boolean)
    users_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    goals_id = db.Column(db.Integer, db.ForeignKey('goals.id'))

    user = db.relationship('User', back_populates='tasks')
    goal = db.relationship('Goal', back_populates='tasks')
    subtasks = db.relationship('Subtask', back_populates='task', cascade='all, delete-orphan')

    serialize_rules = ('-user.tasks', '-goal.tasks', '-subtasks.task')

    @validates('task')
    def validate_task(self,key,task):
        if not task:
            raise ValueError("Failed task validation")
        return task

    def __repr__(self):
        return f'<Task {self.id}, {self.task}, {self.completed}, {self.users_id}, {self.goals_id} >'

class Subtask(db.Model, SerializerMixin):
    __tablename__='subtasks'

    id = db.Column(db.Integer, primary_key=True)
    subtask = db.Column(db.String, nullable=False)
    completed = db.Column(db.Boolean)
    task_id = db.Column(db.Integer, db.ForeignKey('tasks.id'))

    task = db.relationship('Task', back_populates='subtasks')

    serialize_rules = ('-task.subtasks',)

    def __repr__(self):
        return f'<Subtask {self.id}, {self.subtask}, {self.completed}, {self.task_id} >'
