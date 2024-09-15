from flask import Flask, render_template, redirect, url_for
from flask import request
from markupsafe import escape

app = Flask(__name__)

@app.route('/')
def index():
    return redirect(url_for('home'))

@app.route("/home")
def home():
    return render_template("index.html")

@app.route("/start")
def start():
    return render_template("start.html")

@app.route("/feed")
def feed():
    return render_template("feed.html")

@app.route("/profile")
def profile():
    return render_template("profileform.html")

@app.route("/matches")
def matches():
    return render_template("matches.html")