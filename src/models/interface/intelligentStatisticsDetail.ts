/** 數位力 - 明細
 * order: 庫存與訂單管理
 * carry: 物料搬運
 * customer: 顧客經營與行銷
 * analyze: 數據分析決策
 * goal: 導入工具或技術之目的
 */
export interface IIntelligentStatisticsDetail {
    order: IOrder;
    carry: ICarry;
    customer: ICustomer;
    analyze: IAnalyze;
    goal: IGoal;
}

/** 庫存與訂單管理
 * 1: RFID、二維碼、物聯網感測器
 * 2: 倉儲管理系統(WMS)
 * 3: 供應鏈管理系統(SCM)
 */
export interface IOrder {
    1: number;
    2: number;
    3: number;
}

/** 物料搬運
 * 1: 輸送帶
 * 2: 自動導引車(AGV)
 * 3: 自主移動機器人(AMR)
 */
export interface ICarry {
    1: number;
    2: number;
    3: number;
}

/** 顧客經營與行銷
 * 1: 官方網站
 * 2: 搜尋引擎優化、數位廣告投放
 * 3: 自有社群媒體經營
 * 4: 顧客管理系統(CRM)
 */
export interface ICustomer {
    1: number;
    2: number;
    3: number;
    4: number;
}

/** 數據分析決策
 * 1: 資料庫管理系統
 * 2: 人工智慧(AI)/機器學習技術
 */
export interface IAnalyze {
    1: number;
    2: number;
}

/** 導入工具或技術之目的
 * 1: 提升庫存週轉率
 * 2: 提升交期準確度
 * 3: 降低管理成本
 * 4: 提升銷售量
 * 5: 提高決策效率
 */
export interface IGoal {
    1: number;
    2: number;
    3: number;
    4: number;
    5: number;
}