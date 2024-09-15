from flask import Flask, flash, session, render_template, request, redirect, url_for
from pymongo import MongoClient
from bson import ObjectId

app = Flask(__name__)
app.secret_key = "hitt"
client = MongoClient('mongodb://localhost:27017')

db = client['SwipeOverflow']

users_collection = db.users 

domains = ['Front-end', 'Back-end', 'Full-stack']
experiences = ['First-Timer', 'Veteran']
origins = ['George Mason University', 'Virginia Tech', 'UNC Chapel Hill', 'Marymount University']
hacks = ['VTHacks 12', 'PatriotHacks 2024', 'HooHacks 2024']

# new_user = {
#     'email': "eton@gmu.edu", 
#     'password': "password123",
#     'name': "Ethan",
#     'domain': domains[2],
#     'experience': experiences[1],
#     'prefteamsize': 3,
#     'placetostay': False,
#     'cancarpool': False, 
#     'origin': origins[0],
#     'currhack': hacks[0]
# }
# users.insert_one(new_user)

@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        email = request.form.get('email')
        password = request.form.get('password')

        existing_user = users_collection.find_one({"email": email, "password": password})
        if existing_user:
            session['user_id'] = str(existing_user['_id'])  
            # return f"Welcome, {existing_user['email']}! You are now logged in."
            return redirect('/')
        else:
            return "Invalid email or password. Please try again."

        # return f"Email: {email}, Password: {password}"
    # return render_template('login.html')
    return render_template('start.html')

@app.route('/signup', methods=['POST'])
def signup():
    email = request.form.get('email')
    password = request.form.get('password')
    confirm_password = request.form.get('confirm_password')

    # Check if the user already exists
    if users_collection.find_one({'email': email}):
        flash('Email already exists. Please log in.')
        return redirect(url_for('login'))  # Redirect to the login page or home

    # Check if passwords match
    if password != confirm_password:
        flash('Passwords do not match.')
        return redirect(url_for('signup'))  # Redirect to the signup page or home

    # Insert the new user into the database
    users_collection.insert_one({
        'email': email,
        'password': password
    })

    flash('Sign up successful! Please log in.')
    return redirect(url_for('login'))  

@app.route('/register', methods=['GET', 'POST'])
def register():
    if request.method == 'POST':
        email = request.form.get('email')
        password = request.form.get('password')
        name = request.form.get('name')
        
        # Check if user already exists
        if users_collection.find_one({"email": email}):
            return "User already exists. Please login."
        
        # Insert new user into MongoDB
        new_user = {
            'email': email,
            'password': password,
            'name': name,
            # Add other default fields if needed
        }
        users_collection.insert_one(new_user)
        return redirect(url_for('login'))

    return render_template('register.html')

@app.route('/')
def home():
    if 'user_id' in session:
        user = users_collection.find_one({"_id": ObjectId(session['user_id'])})
        user_id = ObjectId(session['user_id'])

        # Get the preferred team size and experience from the query parameters
        team_size = request.args.get('team_size', '')
        experience = request.args.get('experience', '')
        domain = request.args.get('domain', '')

        # Prepare the filter query
        query = {"_id": {"$ne": user_id}}

        if team_size:
            query['prefteamsize'] = int(team_size)
        if experience:
            query['experience'] = experience
        if domain: 
            query['domain'] = domain

        users = users_collection.find(query)

        return render_template('feed.html', logged_in_user=user, users=users)
    
    else:
        return redirect(url_for('login'))


@app.route('/logout')
def logout():
    # Remove user_id from session to log out
    session.pop('user_id', None)
    # Redirect to the login page or home page
    return redirect(url_for('login'))


if __name__ == '__main__':
    app.run(debug=True)