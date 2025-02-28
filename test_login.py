import requests
import json

url = 'http://localhost:5000/api/auth/login'
data = {
    'email': 'sid2@gmail.com',
    'password': 'hello1'
}
headers = {'Content-Type': 'application/json'}

response = requests.post(url, json=data, headers=headers)
print(f"Status Code: {response.status_code}")
print(f"Response: {response.text}")
