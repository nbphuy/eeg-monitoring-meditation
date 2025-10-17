export function connectEEG(onFrame: (f:any)=>void) {
    const ws = new WebSocket("ws://localhost:8000/ws/eeg");
    ws.binaryType = "arraybuffer";
    ws.onmessage = (ev) => {
        try {
            const text = typeof ev.data === "string" ? ev.data : new TextDecoder().decode(ev.data);
            onFrame(JSON.parse(text));
        } catch {}
    };
    return ws;
}
