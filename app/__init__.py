from flask import Flask
from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

def create_app():
    app = Flask(__name__)

    # Configuration
    app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///ctf.db"  # SQLite database
    app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False  # Suppress warning

    # Initialize extensions
    db.init_app(app)

    # Blueprints (if any)
    # from .routes import main
    # app.register_blueprint(main)

    return app
