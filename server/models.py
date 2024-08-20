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




    ########## PRACTICE BELOW:
    #validate 'task' description type: ensure it is a string:
    # @validates('task')
    # def validate_task_type(self, key, task):
    #     if task is not type(str):
    #         raise ValueError("Failed Validation: Task must be a string")
    #     return task

    #Ensure that 'users_id' is a positive integer
    # @validates('users_id')
    # def validate_users_id(self, key, users_id):
    #     if users_id >= 0:
    #         raise ValueError('Failed Validation: users_id must be greater than 0')
    #     return users_id

    ########## PRACTICE BELOW:
    #GOAL: Validate goal descripton length is at least 5 characters long, and no more than 20
    # @validates('goal')
    # def validate_goal_length(self, key, goal):
    #     #len()
    #     if len(goal) < 5 or len(goal) > 20:
    #         raise ValueError ('Failed Validation: Goal is the wrong length short')
    #     return goal



       ##########################
    #TASK Ensure the task description is not more than 100 characters long:
    # @validates('task')
    # def validate_task_length(self, key, task):
    #     if len(task) > 100:
    #         raise ValueError("Failed Validation: task length is too long")
    #     return task

    # TASK ensure user_id is not a negative number
    # @validates('users_id')
    # def validate_user_id(self, key, users_id):
    #     if not isinstance(users_id, int) or users_id > 0:
    #         raise ValueError("Failed Validaton: users_id is negative or not a number")
    #     return users_id

    #TASK check that goals_id is an integer and is present
    # @validates('goals_id')
    # def validate_goals_id(self, key, goals_id):
    #     if goals_id is not None and not isinstance(goals_id, int):
    #         raise ValueError("Failed Validation: goals_id must be present and an integer")
    #     else:
    #         return goals_id

    #TASK ensure completed is a boolean
    # @validates('completed')
    # def validate_completed(self, key, completed):
    #     if completed is not isinstance(completed, bool):
    #         raise ValueError("Failed Validation: Completed is not a boolean")
    #     return completed
    
    ################

    #USER validate username length between 3 - 20 charcters long
    # @validates('username')
    # def validate_username(self, key, username):
    #     if not (3 < len(username) > 20):
    #         raise ValueError('Failed Validation: Username must be between 3-20 characters long')
    #     return username


    #USER validate the username is not empty and it is not " "
    # @validates('username')
    # def validate_username_not_empty(self, key, username):
    #     #username doesn't exist
    #     #DONE username is not " "
    #     if not username or username.isspace():
    #         raise ValueError("Failed Validation: Username must be atleast 1 character long")

   