from flask import Flask
import os
import requests as r 
import redis
import json 
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

API_KEY = os.getenv('API_KEY')
API_HEADER = {'key': API_KEY}
WEATHER_URL = "https://api.weatherapi.com/v1/"

db = redis.Redis(host="localhost", port=6379)

def request(url):
    # Check cache
    if db.exists(url):
        json_str = db.get(url)
        data = json.loads(json_str)
        print("From Cache")
        return data

    # Make Request
    resp = r.get(url, headers=API_HEADER)
    data = resp.json()

    # Write to Cache
    json_str = json.dumps(data)
    db.set(url, json_str)
    db.expire(url, 900)

    print("From API")
    return data

@app.get("/current/city/<city>")
def hello(city):
    url = WEATHER_URL + "current.json?q={city}"
    url = url.format(city=city)
    data = request(url)
    return data