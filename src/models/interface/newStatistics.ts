/** 創新力 - 統計
 * patent: 專利
 * license: 許可證
 * ideas: 創新商業化
 */
export interface INewStatistics {
    patent: IPatent;
    license: ILicense;
    ideas: IIdeas;
}

/** 專利
 * have: 國內外專利 index 0: 無, 1: 有
 * type: 專利類型
 */
export interface IPatent {
    have: number[];
    type: IPatentType;
}

/** 專利類型
 * localCreative: 國內發明專利
 * localNew: 國內新型專利
 * localDesign: 國內設計專利
 * oversea: 國外專利
 */
export interface IPatentType {
    localCreative: number;
    localNew: number;
    localDesign: number;
    oversea: number;
}

/** 許可證
 * have: 國際認證 index 0: 無, 1: 有
 * type: 許可證類型
 * ideas: 創新商業化
 */
export interface ILicense {
    have: number[];
    type: ILicenseType;
}

/** 許可證類型
 * productSafety: 產品安全認證
 * qualityManagement: 品質管理認證
 * other: 其他
 */
export interface ILicenseType {
    productSafety: number;
    qualityManagement: number;
    other: number;
}

/** 創新商業化
 * have: 創新商業化 index 0: 無, 1: 有
 * type: 創新商業化類型
 */
export interface IIdeas {
    have: number[];
    type: IIdeasType;
}

/** 創新商業化類型
 * newProduct: 有新產品
 * newCause: 有新事業
 */
export interface IIdeasType {
    newProduct: number;
    newCause: number;
}