"""Changed Task to the Join Table

Revision ID: 60b3bc2309c0
Revises: f4d80a95b428
Create Date: 2024-07-02 15:39:00.551729

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '60b3bc2309c0'
down_revision = 'f4d80a95b428'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('goals', schema=None) as batch_op:
        batch_op.drop_constraint('fk_goals_user_id_users', type_='foreignkey')
        batch_op.drop_column('user_id')

    with op.batch_alter_table('tasks', schema=None) as batch_op:
        batch_op.add_column(sa.Column('users_id', sa.Integer(), nullable=True))
        batch_op.create_foreign_key(batch_op.f('fk_tasks_users_id_users'), 'users', ['users_id'], ['id'])

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('tasks', schema=None) as batch_op:
        batch_op.drop_constraint(batch_op.f('fk_tasks_users_id_users'), type_='foreignkey')
        batch_op.drop_column('users_id')

    with op.batch_alter_table('goals', schema=None) as batch_op:
        batch_op.add_column(sa.Column('user_id', sa.INTEGER(), nullable=True))
        batch_op.create_foreign_key('fk_goals_user_id_users', 'users', ['user_id'], ['id'])

    # ### end Alembic commands ###