import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from "recharts";
import { EEGFrame } from "../types";

type Props = { frames: EEGFrame[]; channel?: number; };
export default function EEGChart({ frames, channel=0 }: Props) {
    // gộp frames thành chuỗi điểm hiển thị
    const data = frames.flatMap(f => {
        const ch = f.data[channel] || [];
        return ch.map((v, i) => ({ t: f.timestamp + i/f.fs, v }));
    });
    return (
        <div className="w-full h-64">
            <ResponsiveContainer>
                <LineChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="t" tickFormatter={(v)=>v.toFixed(1)} />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="v" dot={false} />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
}
