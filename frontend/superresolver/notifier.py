
# websockets

import asyncio
import websockets

from watchdog.observers import Observer
from watchdog.events import PatternMatchingEventHandler


PORT = 9000



async def send_file_creation_success_to_electron(websocket, path):
    msg_recv = await websocket.recv()
    print(msg_recv)

    patterns = ["output.mpd"]
    my_event_handler = PatternMatchingEventHandler(patterns, None, None, False)


    def notify_client(event):
        msg_send = "output.mpd was created"
        websocket.send(msg_send)
        my_observer.join()
        my_observer.stop()
        print("notfy client has finished")

    my_event_handler.on_created = notify_client
    my_observer = Observer(timeout=120)
    path = "./dash"
    my_observer.schedule(notify_client, path, recursive=False)
    my_observer.start()


start_server = websockets.serve(send_file_creation_success_to_electron, "localhost", PORT)

asyncio.get_event_loop().run_until_complete(start_server)
asyncio.get_event_loop().run_forever()