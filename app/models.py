from . import db
import re

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    password = db.Column(db.String(120), nullable=False)
    score = db.Column(db.Integer, default=0)

    def __repr__(self):
        return f"<User {self.username}>"

class Challenge(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(100), nullable=False)
    description = db.Column(db.Text, nullable=False)
    flag = db.Column(db.String(100), nullable=False)
    points = db.Column(db.Integer, nullable=False)

    def __init__(self, title, description, flag, points):
        if not re.match(r"^HD\\{.+\\}$", flag):
            raise ValueError("Flag must follow the format HD{flag}")
        self.title = title
        self.description = description
        self.flag = flag
        self.points = points
