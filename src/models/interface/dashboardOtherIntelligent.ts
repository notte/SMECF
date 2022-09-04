/** Dashboard - 數位力
 * intelligentAvgScore: 數位力綜合平均分數
 * avgScore: 綜合平均分數 index 0:製造業, 1:服務業
 * valueChainTool: 價值鏈管理 index 0:製造業, 1:服務業
 * researchTool: 研發生產 index 0:製造業, 1:服務業
 * operationTool: 企業營運 index 0:製造業, 1:服務業
 */
export interface IDashboardOtherIntelligent {
    intelligentAvgScore: number;
    avgScore: number[];
    valueChainTool: number[];
    researchTool: number[];
    operationTool: number[];
}