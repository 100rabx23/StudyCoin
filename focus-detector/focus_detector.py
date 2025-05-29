import cv2
import asyncio
import websockets
#imports
face_cascade = cv2.CascadeClassifier(cv2.data.haarcascades + "haarcascade_frontalface_default.xml")
cam = cv2.VideoCapture(0, cv2.CAP_DSHOW)
#canera fro the face
async def detect_faces(websocket, path):
    print("Client connected...")
    try:
        while True:
            ret, frame = cam.read()
            if not ret:
                continue

            gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
            faces = face_cascade.detectMultiScale(gray, 1.1, 4)

            status = "present" if len(faces) > 0 else "absent"
            await websocket.send(status)
            await asyncio.sleep(1)
    except websockets.ConnectionClosed:
        print("Client disconnected.")
    finally:
        cam.release()
# its start the server and the connect with react project

start_server = websockets.serve(detect_faces, "localhost", 8765)
print("WebSocket server started at ws://localhost:8765")
asyncio.get_event_loop().run_until_complete(start_server)
asyncio.get_event_loop().run_forever()
