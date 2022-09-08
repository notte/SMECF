/** 市場力 - 統計
 * rankInternationality: 國際供應鏈關鍵地位 index 0: 無, 1: 有
 * saleAbroad: 自有品牌海外出貨比例 index 0: 無, 1: 有
 * carbonSearch: 淨零碳排落實狀況
 */
export interface IDevelopStatistics {
    rankInternationality: number[];
    saleAbroad: number[];
    carbonSearch: ICarbonSearch;
}

/** 淨零碳排落實狀況
 * have: 有盤查碳排放量 index 0: 無, 1: 有
 * downRoad: 規劃具體減碳路徑 index 0: 無, 1: 有
 * process: 改善製程 index 0: 無, 1: 有
 * conversion: 能源轉換 index 0: 無, 1: 有
 * reuse: 循環經濟 index 0: 無, 1: 有
 */
export interface ICarbonSearch {
    have: number[];
    downRoad: number[];
    process: number[];
    conversion: number[];
    reuse: number[];
}