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
    date: IManufacturerDate;
    capital: IManufacturerCapital;
    sumPeople: IManufacturerSumPeople;
    st: IManufacturerSt;
}

/** 公司年資
 * 1: 5年以下
 * 2: 6-20年
 * 3: 21-50年
 * 4: 51年以上
 */
 export interface IManufacturerDate {
    1: number;
    2: number;
    3: number;
    4: number;
}

/** 資本額
 * 1: 2億以上
 * 2: 1億-2億
 * 3: 7500萬-1億
 * 4: 5000萬-7500萬
 * 5: 2500萬-5000萬
 * 6: 1000萬-2500萬
 * 7: 1000萬以下
 */
 export interface IManufacturerCapital {
    1: number;
    2: number;
    3: number;
    4: number;
    5: number;
    6: number;
    7: number;
}

/** 公司人數
 * 1: 10人以下
 * 2: 11-100人
 * 3: 101-200人
 * 4: 201人以上
 */
 export interface IManufacturerSumPeople {
    1: number;
    2: number;
    3: number;
    4: number;
}

/** 場址地區
 * 1: 東
 * 2: 南
 * 3: 西
 * 4: 北
 */
 export interface IManufacturerSt {
    1: number;
    2: number;
    3: number;
    4: number;
}