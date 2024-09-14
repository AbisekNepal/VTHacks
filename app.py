from flask import Flask, session, render_template, request, redirect, url_for
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
    return render_template('login.html')

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
        # user = users.find_one({"_id": session['user_id']})

        users = users_collection.find({"_id": {"$ne": user_id}})
        
        return render_template('home.html', logged_in_user = user, users = users)
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