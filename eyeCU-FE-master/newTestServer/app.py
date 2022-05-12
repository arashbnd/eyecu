
# Importing flask module in the project is mandatory
# An object of Flask class is our WSGI application.


from distutils.log import debug
from operator import pos
from flask import Flask, request, jsonify, Response
import jwt
import json
from flask_jwt_extended import create_access_token
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required
from flask_jwt_extended import JWTManager
import base64
import cv2
from flask_cors import CORS
frame = cv2.imread("justin_leung.jpg")
small_frame = cv2.resize(frame, (0, 0), fx=0.25, fy=0.25)
small_frame_bytes = cv2.imencode('.jpg', small_frame)[1].tobytes()
sender = base64.encodebytes(small_frame_bytes).decode("utf-8")
import face_recognition
app = Flask(__name__)
app.config["JWT_SECRET_KEY"] = "super-secret"  # Change this!
jwt = JWTManager(app)
CORS(app)
def user_error_to_json(error_message):
    return Response(json.dumps(error_message), status=400, mimetype='application/json')

def positiveReponse(message): # this takes in a dictionary and makes it into a positive json 
    return Response(json.dumps(message), status=200, mimetype='application/json')

def createdResponse(message):
    return Response(json.dumps(message), status=201, mimetype='application/json')
# add errors
# add validators class or methods
@app.route('/login', methods=['GET', 'POST'])
def login():
    body = request.get_json()
    access_token = create_access_token(identity="Justin")
    return positiveReponse({"token": access_token})
    errors = {}
    errors["general"] = 'Wrong Credentials, please try again' # this has to be general to fit the needs
    return user_error_to_json({"general":'Wrong Credentials, please try again'})
    #return jsonify({"token": encoded_jwt})
    #return jsonify(body)

@app.route('/signup', methods=['GET', 'POST'])
def signup():
    body = request.get_json()
    print(body)
    access_token = create_access_token(identity="Justin")
    return positiveReponse({"token": access_token})
    # errors = {}
    # errors["general"] = 'Wrong Credentials, please try again' # this has to be general to fit the needs
    # return user_error_to_json({"general":'Wrong Credentials, please try again'})
    #return jsonify({"token": encoded_jwt})
    #return jsonify(body)

@app.route("/user", methods=["GET"])
@jwt_required()
def protected():
    # Access the identity of the current user with get_jwt_identity
    current_user = get_jwt_identity() # this tells us the identity of the user/ This should be the primary key
    user_data = {}
    user_data["user_data"] = {
        "full_name":"Justin Leung",
        'image':"data:image/jpeg;base64,{}".format(sender)
    }
    return positiveReponse(user_data)

@app.route("/upload", methods=["POST"])
#@jwt_required() # took this out so we didn't need auth token
def upload():
    # Access the identity of the current user with get_jwt_identity
    pic_data = request.form # ImmutableMultiDict([('fileName', 'IMG_5649.jpg'), ('fileType', 'image/jpeg'), ('entityName', 'IMG_5649.jpg')])
    pic = request.files['file']
    if not pic:
        return user_error_to_json({"general": "No File Uploaded."})
    test_image = face_recognition.load_image_file(pic)
    face_locations = face_recognition.face_locations(test_image)
    face_encodings = face_recognition.face_encodings(test_image, face_locations)
    print("hitting here")
    valid = len(face_encodings)
    if valid == 1:
        print("found face")
        return createdResponse({"general": "Face Is Recognized and Saved."})
    elif valid > 1:
        print("too many faces")
        return user_error_to_json({"general": "Too Many Faces Detected. Please Show 1 Face."})
    elif valid == 0:
        print("no faces")
        return user_error_to_json({"general": "No Faces Detected. Please Show 1 Face."})

    return positiveReponse("works")
# main driver function
if __name__ == '__main__':
  
    # run() method of Flask class runs the application 
    # on the local development server.
    app.run(debug=True, port=5001)