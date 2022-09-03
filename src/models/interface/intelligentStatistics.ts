/** 數位力 - 統計
 * valueChainTool: 價值鏈管理
 * researchTool: 研發生產
 * operationTool: 企業營運
 */
export interface IIntelligentStatistics {
    valueChainTool: ValueChainTool;
    researchTool: IResearchTool;
    operationTool: IOperationTool;
}

/** 價值鏈管理
 * isUseTool: index 0: 無, 1: 有
 * order: 庫存與訂單管理
 * carry: 物料搬運
 * customer: 顧客經營與行銷
 * analyze: 數據分析決策
 */
export interface ValueChainTool {
    isUseTool: number[];
    order: number;
    carry: number;
    customer: number;
    analyze: number;
}

/** 研發生產
 * isUseTool: index 0: 無, 1: 有
 * design: 產品研發設計
 * monitor: 生產設備監測
 * auto: 產線自動化
 * manage: 生產管理系統
 * analyze: 數據分析決策
 */
export interface IResearchTool {
    isUseTool: number[];
    design: number;
    monitor: number;
    auto: number;
    manage: number;
    analyze: number;
}

/** 企業營運
 * isUseTool: index 0: 無, 1: 有
 * erp: 企業資源管理
    hrs: 人事管理系統
    fas: 財務會計系統
    ics: 生產管理系統
    analyze: 數據分析決策
 */
export interface IOperationTool {
    isUseTool: number[];
    erp: number;
    hrs: number;
    fas: number;
    ics: number;
    analyze: number;
}