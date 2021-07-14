import asyncio
import websockets

PORT = 9000

async def send_file_creation_success_to_electron(websocket, path):
    msg_recv = await websocket.recv()
    print(msg_recv)
    msg_send = "output.mpd was created"
    await websocket.send(msg_send)

start_server = websockets.serve(send_file_creation_success_to_electron, "localhost", PORT)

asyncio.get_event_loop().run_until_complete(start_server)
asyncio.get_event_loop().run_forever()