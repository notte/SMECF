/** Dashboard - 創新力 
 * newAvgScore: 創新力綜合平均分數
 * avgScore: 綜合平均分數 index 0:製造業, 1:服務業
 * patent: 專利研發 index 0:製造業, 1:服務業
 * license: 國際認證 index 0:製造業, 1:服務業
 * ideas: 創新商業化 index 0:製造業, 1:服務業
 */
export interface IDashboardOtherNew {
    newAvgScore: number;
    avgScore: number[];
    patent: number[];
    license: number[];
    ideas: number[];
}