from flask_socketio import SocketIO
from flask import Flask, render_template, request
import socketio
import face_recognition
import cv2
import numpy as np
import base64



def convert_byte_to_mat(byte):
    nparr = np.frombuffer(byte, np.byte)
    img2 = cv2.imdecode(nparr, cv2.IMREAD_ANYCOLOR)
    return img2

def convert_mat_to_byte(mat):
    frame = cv2.imencode('.jpg', mat)[1].tobytes()
    return frame



# here we are experimenting with the face recog
justin_image = face_recognition.load_image_file('./img/known/justin_leung.jpg')
justin_face_encoding = face_recognition.face_encodings(justin_image)[0]
known_face_encodings = [
    justin_face_encoding
]
known_face_names = [
    "Justin Leung"
]



app = Flask(__name__)
#, ping_timeout=60, ping_interval=10''
#socketio = SocketIO(app,cors_allowed_origins="*",  logger=True, engineio_logger=True)
socketio = SocketIO(app,cors_allowed_origins="*", async_mode="eventlet")

@app.route('/test')
def test():
    return "test"

@app.route('/')
def index():
    return render_template('index.html')

@socketio.on('connect', namespace='/web')
def connect_web():
    print('[INFO] Web client connected: {}'.format(request.sid))


@socketio.on('disconnect', namespace='/web')
def disconnect_web():
    print('[INFO] Web client disconnected: {}'.format(request.sid))


@socketio.on('connect', namespace='/cv')
def connect_cv():
    print('[INFO] CV client connected: {}'.format(request.sid))
    
@socketio.on('pingpong', namespace='/cv')
def pingpong(): # this indicates that the client is ready to send data
    print('ping pong')
    socketio.emit("send_data", room=request.sid, namespace="/cv")

@socketio.on('disconnect', namespace='/cv')
def disconnect_cv():
    print('[INFO] CV client disconnected: {}'.format(request.sid))


@socketio.on('cv2server', namespace='/cv')
def handle_cv_image(image): # we can run the box stuff and image recon here
    #print(message) # placeholder for when we get the images back from the client
    #lines 74 to 100 are good
    frame = convert_byte_to_mat(image)
    rgb_frame = frame[:, :, ::-1]
    face_locations = face_recognition.face_locations(rgb_frame)
    face_encodings = face_recognition.face_encodings(rgb_frame, face_locations)

    face_names = []
    for face_encoding in face_encodings:
        matches = face_recognition.compare_faces(known_face_encodings, face_encoding)
        name = "Unknown"
        
        face_distances = face_recognition.face_distance(known_face_encodings, face_encoding)
        best_match_index = np.argmin(face_distances)
        if matches[best_match_index]:
            name = known_face_names[best_match_index]
        face_names.append(name)
    for (top, right, bottom, left), name in zip(face_locations, face_names):
        # Draw a box around the face
        cv2.rectangle(frame, (left, top), (right, bottom), (0, 0, 255), 2)

        # Draw a label with a name below the face
        cv2.rectangle(frame, (left, bottom + 10), (right, bottom), (0, 0, 255), cv2.FILLED)
        font = cv2.FONT_HERSHEY_DUPLEX
        cv2.putText(frame, name, (left + 1, bottom + 6), font, 0.35, (255, 255, 255), 1)
    frame = cv2.imencode('.jpg', frame)[1].tobytes()
    frame = base64.encodebytes(frame).decode("utf-8")
    socketio.emit('server2web', {'image':"data:image/jpeg;base64,{}".format(frame)}, namespace='/web')
    # frame = base64.encodebytes(image).decode("utf-8")
    # socketio.emit('server2web', {'image':"data:image/jpeg;base64,{}".format(frame)}, namespace='/web')
    #pass
if __name__ == "__main__":
    print('[INFO] Starting server at http://localhost:5001')
    socketio.run(app=app, host='0.0.0.0', port=5001)