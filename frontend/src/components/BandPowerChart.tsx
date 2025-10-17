import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from "recharts";
import { EEGFrame } from "../types";

export default function BandPowerChart({ frame }: { frame?: EEGFrame }) {
    const data = frame ? Object.entries(frame.bands).map(([k,v])=>({ band: k, power: v })) : [];
    return (
        <div className="w-full h-48">
            <ResponsiveContainer>
                <BarChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="band" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="power" />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
}
