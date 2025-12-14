interface PieChartProps {
    percentage: number;
    color: string;
}

export default function PieChart({ percentage, color }: PieChartProps) {
    const radius = 35;
    const circumference = 2 * Math.PI * radius;
    const dashArray = (percentage / 100) * circumference;

    return (
        <div className="relative w-32 h-32 flex items-center justify-center">
            <svg width="100%" height="100%" viewBox="0 0 100 100" className="rotate-[-90deg]">
                <circle cx="50" cy="50" r={radius} fill="none" stroke="#1e293b" strokeWidth="8" />
                <circle
                    cx="50" cy="50" r={radius}
                    fill="none"
                    stroke={color}
                    strokeWidth="8"
                    strokeDasharray={`${dashArray} ${circumference}`}
                    strokeLinecap="round"
                />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-2xl font-bold text-white">{percentage}%</span>
            </div>
        </div>
    );
}
