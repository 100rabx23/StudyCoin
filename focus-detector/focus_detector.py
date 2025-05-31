import asyncio
import websockets
import cv2
import numpy as np
import json

# Face detector
face_cascade = cv2.CascadeClassifier(cv2.data.haarcascades + "haarcascade_frontalface_default.xml")

# This function handles incoming WebSocket connections
async def process_frame(websocket):
    print("✅ Client connected")
    try:
        async for message in websocket:
            nparr = np.frombuffer(message, np.uint8)
            img_np = cv2.imdecode(nparr, cv2.IMREAD_COLOR)

            if img_np is None:
                await websocket.send(json.dumps({"error": "Invalid image data"}))
                continue

            gray = cv2.cvtColor(img_np, cv2.COLOR_BGR2GRAY)
            faces = face_cascade.detectMultiScale(gray, 1.3, 5)

            focused = len(faces) > 0
            await websocket.send(json.dumps({"focused": focused}))
            print(f"📤 Focused: {focused}")

    except websockets.exceptions.ConnectionClosedError:
        print("❌ Client disconnected")
    except Exception as e:
        print("⚠️ Error in handler:", str(e))

# Entry point of the server
async def main():
    print("🚀 Starting server on ws://localhost:8000")
    async with websockets.serve(process_frame, "localhost", 8000):  # ✅ Do NOT call process_frame()
        await asyncio.Future()  # Keep the server running

if __name__ == "__main__":
    asyncio.run(main())
