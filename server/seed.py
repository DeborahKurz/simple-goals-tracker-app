#!/usr/bin/env python3

# Standard library imports
from random import randint, choice as rc

# Remote library imports
from faker import Faker

# Local imports
from app import app
from models import db, User, Goal, Task, Subtask

def delete_all_data():
    try:
        db.session.query(Subtask).delete()
        db.session.query(Task).delete()
        db.session.query(Goal).delete()
        db.session.query(User).delete()
        db.session.commit()
        print("Deleted existing data.")
    except Exception as e:
        db.session.rollback()
        print(f"Error deleteing data from database: {e}")

### Uncomment the rest of this function to seed the database:

# def create_users(num_users):
#     users = []
#     for _ in range(num_users):
#         username = fake.first_name()
#         user = User(username=username)
#         users.append(user)
#     return users


# def create_goals(num_goals):
#     goals = []

#     if not User.query.first():
#         fake_user = User(username='fake_user')
#         db.session.add(fake_user)
#         db.session.commit()
#     else:
#         fake_user = None

#     users = User.query.all()
    
#     for _ in range(num_goals):
        
#         goal = Goal(goal = fake.text(max_nb_chars=25))
#         goals.append(goal)

#     return goals


# def create_tasks(num_tasks):
#     tasks = []
#     fake = Faker()

#     goals = Goal.query.all()
#     users = User.query.all()

#     for _ in range(num_tasks):
#         goal = rc(goals)
#         user = rc(users)
#         is_completed = fake.boolean(chance_of_getting_true=30)
#         task_text = fake.text(max_nb_chars=25)

#         task = Task(task=task_text, completed=is_completed, goals_id=goal.id, users_id=user.id)
#         tasks.append(task)

#     return tasks


# def create_subtasks(num_subtasks):
#     subtasks = []
#     fake = Faker()

#     tasks = Task.query.all()

#     for _ in range(num_subtasks):
#         task = rc(tasks)
#         is_completed = fake.boolean(chance_of_getting_true=30)
#         subtask_text = fake.text(max_nb_chars=30)

#         subtask = Subtask(subtask=subtask_text, completed=is_completed, task_id=task.id)
#         subtasks.append(subtask)
    
#     return subtasks

### Uncomment ABOVE 


if __name__ == '__main__':
    fake = Faker()
    with app.app_context():
        delete_all_data()
        print("Existing Data Deleted From Database")

    ### Uncomment everything below to seed the database:

        # print("Starting seed...")
        
        # num_users = 5 
        # users_to_create = create_users(num_users)
        # db.session.add_all(users_to_create)
        # db.session.commit()
        # print(f"Seeded {num_users} users successfully.")

        # num_goals = 10
        # goals_to_create = create_goals(num_goals)
        # db.session.add_all(goals_to_create)
        # db.session.commit()
        # print(f"Seeded {num_goals} goals successfully.")

        # num_tasks = 30
        # tasks_to_create = create_tasks(num_tasks)
        # db.session.add_all(tasks_to_create)
        # db.session.commit()
        # print(f"Seeded {num_tasks} tasks successfully.")

        # num_subtasks = 100
        # subtasks_to_create = create_subtasks(num_subtasks)
        # db.session.add_all(subtasks_to_create)
        # db.session.commit()
        # print(f"Seeded {num_subtasks} sub tasks successfully.")

        # print("Seed completed.")
