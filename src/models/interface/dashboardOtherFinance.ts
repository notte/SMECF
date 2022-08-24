/** Dashboard - 財務力 
 * fianceAvgScore: 財務力綜合平均分數
 * avgScore: 綜合平均分數 index 0:製造業, 1:服務業
 * futureInvestment: 未來投資能力 index 0:製造業, 1:服務業
 * businessGrowth: 經營成長 index 0:製造業, 1:服務業
 * structure: 財務結構 index 0:製造業, 1:服務業
 */
export interface DashboardOtherFinance {
    fianceAvgScore: number;
    avgScore: number[];
    futureInvestment: number[];
    businessGrowth: number[];
    structure: number[];
}

export function isDashboardOtherFinance(o: any): o is DashboardOtherFinance {
    return "fianceAvgScore" in o && "avgScore" in o && "futureInvestment" in o 
    && "businessGrowth" in o && "structure" in o;
}