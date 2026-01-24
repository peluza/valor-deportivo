
export const STRATEGY_NAMES: Record<string, string> = {
    '1X2_COMERCIAL': 'Ganador del Partido (1X2)',
    '1X_COMERCIAL': 'Doble Oportunidad',
    'WINNER_HOME': 'Ganador (Local)',
    'WINNER_AWAY': 'Ganador (Visitante)',
    'MONEYLINE_HOME_MEDIUM': 'Línea de Dinero (Local)',
    'MONEYLINE_AWAY_MEDIUM': 'Línea de Dinero (Visitante)',
    'OVER_UNDER': 'Más/Menos Goles',
};

export const getStrategyName = (raw: string) => STRATEGY_NAMES[raw] || raw.replace(/_/g, ' ');

export interface Match {
    id: number;
    sport: string;
    strategy: string;
    home_team: string;
    away_team: string;
    date: string;
    time: string;
    status: string;
    odds: number;
    prob_1: number;
    prob_x: number;
    prob_2: number;
    prob_over: number;
    prob_under: number;
    league: string;
}
