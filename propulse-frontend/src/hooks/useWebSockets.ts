import { useEffect, useRef, useState } from "react";


enum WebSocketState {
  UNINSTANTIATED = -1,
  CONNECTING = 0,
  OPEN = 1,
  CLOSING = 2,
  CLOSED = 3,
  ERRORED = 4
}


export const useWebSocket = (path: string) => {
  const [message, setMessage] = useState<string>();
  const [readyState, setReadyState] = useState<WebSocketState>(WebSocketState.CONNECTING);

  const ws = useRef<WebSocket>();

  const sendMessage = (msg: string) => {
    if (ws.current) {
      ws.current.send(msg);
    }
  }

  useEffect(() => {
    ws.current = new WebSocket(path);

    ws.current.onopen = () => {
      setReadyState(WebSocketState.OPEN);
    }

    ws.current.onclose = () => {
      setReadyState(WebSocketState.CLOSED);
    }

    ws.current.onerror = () => {
      setReadyState(WebSocketState.ERRORED);
    }

    ws.current.onmessage = (e) => {
      setMessage(e.data);
    }

    return () => {
      ws.current?.close();
    }
  }, [path])

  return { message, readyState, sendMessage, ws };
}