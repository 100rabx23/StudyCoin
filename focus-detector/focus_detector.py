import asyncio
import websockets
import cv2
import numpy as np

async def handler(websocket, _):
    print("📡 Client connected!")
    try:
        async for message in websocket:
            print("🟢 Frame received")
            np_arr = np.frombuffer(message, np.uint8)
            img = cv2.imdecode(np_arr, cv2.IMREAD_COLOR)
            if img is not None:
                cv2.imshow("Focus Detector", img)
                if cv2.waitKey(1) & 0xFF == ord('q'):
                    break
    except Exception as e:
        print("❌ Error:", e)
    finally:
        cv2.destroyAllWindows()
        print("📴 Client disconnected")

async def main():
    async with websockets.serve(handler, "localhost", 8000):
        print("🚀 WebSocket server running at ws://localhost:8000")
        await asyncio.Future()  # Run forever

if __name__ == "__main__":
    asyncio.run(main())
