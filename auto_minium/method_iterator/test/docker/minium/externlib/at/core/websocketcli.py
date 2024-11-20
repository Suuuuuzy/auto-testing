#!/usr/bin/env python3

"""
Author:         xiazeng
Create time:    2021/3/11
Description:    
AtServer返回的事件
"""
import time
import websocket
import threading
import logging
import json

logger = logging.getLogger()


def run_ws_server(ws):
    ws.run_forever()


class WebSocketCli:
    def __init__(self, port):
        self.url = "ws://127.0.0.1:%d/" % port
        self.status = "init"
        self.event_callbacks = {}
        self.ensure_open()

    def add_callback(self, event: str, callback):
        callbacks = self.event_callbacks.get(event)
        if not callbacks:
            callbacks = []
            self.event_callbacks[event] = callbacks
        ids = [id(cb) for cb in callbacks]
        if id(callback) in ids:
            logger.error("event:%s, func:%s, duplicate added", id(callback), callback.__name__)
            return
        callbacks.append(callback)

    def close(self):
        self._client.close()

    def reconnect(self):
        self.close()
        self.ensure_open()

    def ensure_open(self):
        self._client = websocket.WebSocketApp(self.url, on_open=self._on_open, on_message=self._on_message,
                                              on_error=self._on_error, on_close=self._on_close)
        self._thread = threading.Thread(target=run_ws_server, args=(self._client,))
        self.status = "pending"
        self._thread.daemon = True
        self._thread.start()
        s = time.time()
        while time.time() - s < 2:
            if self.status != "pending":
                return True
        return False

    def _on_open(self):
        """
        :type ws: websocket.WebSocketApp
        """
        logger.debug('%s, %s, opened', self.url, self._thread.ident)
        self.status = "open"

    def _on_message(self, message):
        """
        :type ws: websocket.WebSocketApp
        """
        # logger.debug("%s, %s: %.1024s", self.url, self._thread.ident, message)
        msg = json.loads(message)
        callbacks = self.event_callbacks.get(msg['event'])
        if not callbacks:
            logger.debug("%s drop, no callback", msg['event'])
            return
        for callback in callbacks:
            callback(msg['data'])

    def _on_error(self, *args):
        pass
        # logger.error("%s, %s, args: %s", self.url, self._thread.ident, args)

    def _on_close(self, *args):
        self.status = "close"
        # logger.debug('%s, %s, closed in on_close, args:%s', self.url, self._thread.ident, args)


if __name__ == '__main__':
    import logging

    logging.basicConfig(level=logging.DEBUG)
    cli = WebSocketCli(9998)
    while cli.status != 'close':
        print(cli.status)
        time.sleep(1)
