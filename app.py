from flask import Flask, jsonify, request
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS

app = Flask(__name__)
app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///ctf.db"
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

db = SQLAlchemy(app)
CORS(app)

# Challenge model
class Challenge(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    description = db.Column(db.String(500), nullable=False)
    flag_format = db.Column(db.String(100), nullable=False)

    def __repr__(self):
        return f"<Challenge {self.name}>"

# Initialize the database
def init_db():
    with app.app_context():
        db.create_all()
        # Add some test challenges if not already in the database
        if Challenge.query.count() == 0:
            challenge1 = Challenge(
                name="Challenge 1", description="This is a test challenge.", flag_format="HD{flag1}"
            )
            challenge2 = Challenge(
                name="Challenge 2", description="This is another test challenge.", flag_format="HD{flag2}"
            )
            db.session.add_all([challenge1, challenge2])
            db.session.commit()

@app.route("/")
def home():
    return jsonify({"message": "Backend is running!"})

@app.route("/api/dashboard", methods=["GET"])
def dashboard():
    """
    Mock dashboard that returns a list of challenges without requiring authentication.
    """
    challenges = Challenge.query.all()
    challenges_data = [
        {
            "id": challenge.id,
            "name": challenge.name,
            "description": challenge.description,
            "flag_format": challenge.flag_format,
        }
        for challenge in challenges
    ]
    return jsonify({"challenges": challenges_data}), 200

# Error handler for unsupported routes
@app.errorhandler(404)
def not_found(e):
    return jsonify({"message": "Route not found", "status": "fail"}), 404

if __name__ == "__main__":
    # Initialize the database before starting the app
    init_db()
    app.run(debug=True)
