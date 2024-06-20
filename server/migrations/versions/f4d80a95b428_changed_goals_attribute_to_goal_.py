"""Changed goals attribute to goal attribute in goals table.

Revision ID: f4d80a95b428
Revises: 1eb7aaace4f8
Create Date: 2024-06-20 15:21:40.945878

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'f4d80a95b428'
down_revision = '1eb7aaace4f8'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('goals', schema=None) as batch_op:
        batch_op.add_column(sa.Column('goal', sa.String(), nullable=True))
        batch_op.drop_column('goals')

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('goals', schema=None) as batch_op:
        batch_op.add_column(sa.Column('goals', sa.VARCHAR(), nullable=True))
        batch_op.drop_column('goal')

    # ### end Alembic commands ###
