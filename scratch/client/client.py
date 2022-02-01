import asyncio
from distutils.log import debug
from numpy import deg2rad
import socketio
import cv2
import base64
cap = cv2.VideoCapture(0)
sio = socketio.AsyncClient(logger=True)

@sio.event
async def connect():
    print('connection established')

@sio.event
def connect_error(data):
    print("The connection failed!")
    print(data)

# @sio.event
# async def my_message(data):
#     print('message received with ', data)
#     await sio.emit('my response', {'response': 'my response'})

@sio.event
async def disconnect():
    print('disconnected from server')

@sio.event
async def send_data():
    while(cap.isOpened()):
        ret, img = cap.read()
        if ret:
            img = cv2.resize(img, (0,0), fx=0.5, fy=0.5)
            frame = cv2.imencode('.jpg', img)[1].tobytes()
            frame = base64.encodebytes(frame).decode("utf-8")
            await sio.emit('cv2server', frame)
        else:
            break


async def main():
    await sio.connect('http://localhost:5001',transports=['websocket', 'polling'], namespaces=['/cv'])

if __name__ == '__main__':
    asyncio.run(main(), debug=True)




# import socketio
# from time import sleep

# #sio = socketio.Client(engineio_logger=True)
# sio = socketio.Client(engineio_logger=True, logger=True)
# i = 0


# @sio.event
# def connect():
#     print('[INFO] Successfully connected to server.')


# @sio.event
# def connect_error(body):
#     print('[INFO] Failed to connect to server.' + body)


# @sio.event
# def disconnect():
#     print('[INFO] Disconnected from server.')





# def message(json):
#     print("/////////////////////////////500")
#     sio.emit('send', json)



# if __name__ == '__main__':
#     # sio.connect('http://192.168.0.108:5000') ## uncomment this line when the server is on remote system change the ip address with the ip address
#     # of the system where the server is running.#'http://localhost:5000/'
#     # sio.connect('0.0.0.0:5000')
#     sio.connect('http://localhost:5001/')
#     sio.wait()


# import socketio
# sio = socketio.Client()


# @sio.event
# def connect():
#     print('[INFO] Successfully connected to server.')

# @sio.event
# def connect_error(body):
#     print('[INFO] Failed to connect to server.' + body)



# if __name__ == "__main__":
#             sio.connect('http://localhost:5001',transports=['websocket'],namespaces=['/cv'])
#             sio.wait(5)