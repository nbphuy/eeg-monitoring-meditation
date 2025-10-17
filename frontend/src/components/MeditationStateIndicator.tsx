export default function MeditationStateIndicator({ idx }: { idx?: number }) {
    const v = idx ?? 0;
    const label = v > 1.2 ? "Relaxed" : v > 0.8 ? "Neutral" : "Tense";
    return (
        <div className="p-3 rounded-xl border">
            <div className="text-sm opacity-70">Meditation Index</div>
            <div className="text-2xl font-semibold">{v.toFixed(2)}</div>
            <div className="opacity-80">{label}</div>
        </div>
    );
}
