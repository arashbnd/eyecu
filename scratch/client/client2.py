from unicodedata import name
import socketio
import cv2
import base64
from time import sleep

sio = socketio.Client()
#sio = socketio.Client(logger=True, engineio_logger=True)
cap = cv2.VideoCapture(0)
i = 0


# @sio.event
# def connect(namespace='/cv'):
#     print('[INFO] Successfully connected to server.')

@sio.on('connect', namespace='/cv')
def on_connect():
    print('[INFO] Successfully connected to server.') # we need to wait until this is true somehow
    sio.emit("pingpong", namespace='/cv')

# @sio.event
# def connect_error(body, namespace='/cv'):
#     print('[INFO] Failed to connect to server.' + body)

@sio.on('connect_error', namespace='/cv')
def on_connect(body):
    print('[INFO] Successfully connected to server.' + body)

# @sio.event
# def disconnect():
#     print('[INFO] Disconnected from server.')
@sio.on('disconnect', namespace='/cv')
def disconnect():
    print('[INFO] Disconnected from server.')

@sio.on('send_data', namespace='/cv')
def send_data():
    while(cap.isOpened()):
        ret, img = cap.read()
        if ret:
            img = cv2.resize(img, (0,0), fx=0.25, fy=0.25)
            frame = cv2.imencode('.jpg', img)[1].tobytes()
            #frame = base64.encodebytes(frame).decode("utf-8")
            sio.emit('cv2server', frame, namespace='/cv')
            #sio.emit('cv2server', {'image':"data:image/jpeg;base64,{}".format(frame)}, namespace='/cv') # do the data part later in server
        else:
            socketio.emit("disconnect", namespace="/cv")




# @sio.event
# def send_data():
#     print("this was hit")
#     while(cap.isOpened()):
#         ret, img = cap.read()
#         if ret:
#             img = cv2.resize(img, (0,0), fx=0.5, fy=0.5)
#             frame = cv2.imencode('.jpg', img)[1].tobytes()
#             frame = base64.encodebytes(frame).decode("utf-8")
#             sio.emit('cv2server', frame)
#         else:
#             break







if __name__ == '__main__':
    # sio.connect('http://192.168.0.108:5000') ## uncomment this line when the server is on remote system change the ip address with the ip address
    # of the system where the server is running.#'http://localhost:5000/'
    # sio.connect('0.0.0.0:5000')
    sio.connect('http://localhost:5001/', namespaces=['/cv'])
    #sleep(3000)
    #sio.connect('http://localhost:5001/', namespaces=['/cv']) - no workspace connects
    #sio.connect('http://localhost:5001/', transports=['websocket', 'polling'])
    #sio.connect('http://localhost:5001',transports=['websocket', 'polling'], namespaces=['/cv'])
    #sio.wait()



