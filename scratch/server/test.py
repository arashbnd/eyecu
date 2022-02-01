from cgitb import small
import numpy as np
import cv2
import time

# cam = cv2.VideoCapture(0)
# ret, frame = cam.read()
frame = cv2.imread("./img/known/justin_leung.jpg")
small_frame = cv2.resize(frame, (0, 0), fx=0.25, fy=0.25)
small_frame_copy = cv2.imencode('.jpg', small_frame)[1]
#small_frame_bytes = small_frame[1].tobytes()
# print(type(small_frame))
small_frame_bytes = cv2.imencode('.jpg', small_frame)[1].tobytes()

nparr = np.frombuffer(small_frame_bytes, np.byte)
img2 = cv2.imdecode(nparr, cv2.IMREAD_ANYCOLOR) # this gives us the orignal array





print(img2)
print("second")
print(frame)
cv2.imshow("first", frame)
cv2.imshow("second", img2)
cv2.waitKey(0)
cv2.destroyAllWindows()
# while True:

#     if cv2.waitKey(1) or 0xFF == ord('q'):
#         break
# cam.release()
# cv2.destroyAllWindows() 
