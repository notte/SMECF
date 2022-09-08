/** Dashboard - 市場力 
 * developAvgScore: 市場力綜合平均分數
 * avgScore: 綜合平均分數 index 0:製造業, 1:服務業
 * rankInternationality: 國際供應鏈排名 index 0:製造業, 1:服務業
 * saleAbroad: 自有品牌國際化 index 0:製造業, 1:服務業
 * zeroCarbon: 淨零碳排放落實 index 0:製造業, 1:服務業
 */
export interface IDashboardOtherDevelop {
    developAvgScore: number;
    avgScore: number[];
    rankInternationality: number[];
    saleAbroad: number[];
    zeroCarbon: number[];
}