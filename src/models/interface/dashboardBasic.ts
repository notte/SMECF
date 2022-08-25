/** Dashboard - 總覽 
 * avgScore: 綜合平均分數
 * eachDimensionAvgScore: 各構面平均分數
 * highlightCompany: 指標亮點業者
 * manufacturer: 過案廠商樣貌
 */
export interface IDashboardBasic {
    avgScore: number;
    eachDimensionAvgScore: IEachDimensionAvgScore; 
    highlightCompany: IHighlightCompany;
    manufacturer: IManufacturer;
}

/** 各構面平均分數 
 * F: 財務力
 * I: 數位力
 * N: 創新力
 * D: 市場力
 */
export interface IEachDimensionAvgScore {
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
export interface IHighlightCompany {
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
export interface IManufacturer {
    date: number;
    capital: number;
    sumPeople: number;
    st: number;
}