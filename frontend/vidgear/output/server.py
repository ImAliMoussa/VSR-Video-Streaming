from http.server import HTTPServer, SimpleHTTPRequestHandler, test


class CORSRequestHandler(SimpleHTTPRequestHandler):
    def end_headers(self):
        self.send_header("Access-Control-Allow-Origin", "*")
        SimpleHTTPRequestHandler.end_headers(self)


if __name__ == "__main__":
    print(
        "https://videojs-http-streaming.netlify.app/?debug=false&autoplay=false&muted=false&minified=false&sync-workers=false&liveui=true&llhls=false&url=http%3A%2F%2Flocalhost%3A4000%2Fdash_out.mpd&type=application%2Fdash%2Bxml&keysystems=&buffer-water=false&override-native=true&preload=auto&mirror-source=true"
    )
    test(
        CORSRequestHandler, HTTPServer, port=4000,
    )

