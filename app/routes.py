from flask import Blueprint, jsonify, request
from . import db
from .models import User, Challenge

routes = Blueprint('routes', __name__)

@routes.route('/leaderboard', methods=['GET'])
def leaderboard():
    users = User.query.order_by(User.score.desc()).limit(10).all()
    leaderboard_data = [{"username": user.username, "score": user.score} for user in users]
    return jsonify(leaderboard_data)

@routes.route('/submit_flag', methods=['POST'])
def submit_flag():
    data = request.json
    user = User.query.filter_by(username=data["username"]).first()
    challenge = Challenge.query.filter_by(id=data["challenge_id"]).first()

    if not user or not challenge:
        return jsonify({"message": "Invalid user or challenge"}), 400

    if data["flag"] == challenge.flag:
        user.score += challenge.points
        db.session.commit()
        return jsonify({"message": "Flag correct! Score updated."})
    else:
        return jsonify({"message": "Incorrect flag. Try again!"}), 400
