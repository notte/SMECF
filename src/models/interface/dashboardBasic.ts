/** Dashboard - 總覽 
 * avgScore: 綜合平均分數
 * eachDimensionAvgScore: 各構面平均分數
 * highlightCompany: 指標亮點業者
 * manufacturer: 過案廠商樣貌
 */
export interface DashboardBasic {
    avgScore: number;
    eachDimensionAvgScore: EachDimensionAvgScore; 
    highlightCompany: HighlightCompany;
    manufacturer: Manufacturer;
}

/** 各構面平均分數 
 * F: 財務力
 * I: 數位力
 * N: 創新力
 * D: 市場力
 */
export interface EachDimensionAvgScore {
    F: number;
    I: number;
    N: number;
    D: number;
}

/** 指標亮點業者 
 * 1: 排名ㄧ
 * 2: 排名二
 * 3: 排名三
 * 4: 排名四
 * 5: 排名五
*/
export interface HighlightCompany {
    1: number;
    2: number;
    3: number;
    4: number;
    5: number;
}

/** 過案廠商樣貌 
 * date: 公司年資
 * capital: 資本額
 * sumPeople: 公司人數
 * st: 場址地區
*/
export interface Manufacturer {
    date: number;
    capital: number;
    sumPeople: number;
    st: number;
}

export function isDashboardBasic(o: any): o is DashboardBasic {
    return "avgScore" in o && "eachDimensionAvgScore" in o 
    && "highlightCompany" in o && "manufacturer" in o;
}