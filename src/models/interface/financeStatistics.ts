/** 財務力 - 統計
 * revenue: 營業額 index 0: 前兩年, 1: 前年, 2:去年
 * sumPeople: 平均員工數 index 0: 前兩年, 1: 前年, 2:去年
 * profits: 稅前淨利 index 0: 前兩年, 1: 前年, 2:去年
 * develop: 研發支出 index 0: 前兩年, 1: 前年, 2:去年
 * structure: 財務結構
 * difficult: 財務問題
 */
export interface IFinanceStatistics {
    revenue: number[];
    sumPeople: number[];
    profits: number[];
    develop: number[];
    structure: IStructure;
    difficult: IDifficult;
}

/** 財務結構 
 * asset: 總資產
 * equity: 股東權益
 * debt: 總負債
*/
export interface IStructure {
    asset: number;
    equity: number;
    debt: number;
}

/** 財務問題 
 * 1: 缺乏專業/專責財務人員
 * 2: 近年財務體質欠佳
 * 3: 自有資金不足，資金籌措困難
 * 4: 訴訟中或其他負債待解決
 * 5: 其他
 */
export interface IDifficult {
    1: number;
    2: number;
    3: number;
    4: number;
    5: number;
}