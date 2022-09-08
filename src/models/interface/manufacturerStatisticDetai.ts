/** 過案廠商 - 明細
 * capital: 資本額分佈
 * industryRate: 產業別佔比
 * regionalDistribution: 員工數量分佈
 */
export interface IManufacturerStatisticDetail {
    capital: ICapital;
    industryRate: IIndustryRate;
    regionalDistribution: IRegionalDistributionCustomer;
}

/** 資本額分佈
 * 1: 2億以上
 * 2: 1億-2億
 * 3: 7500萬-1億
 * 4: 5000萬-7500萬
 * 5: 2500萬-5000萬
 * 6: 1000萬-2500萬
 * 7: 1000萬以下
 */
export interface ICapital {
    1: number;
    2: number;
    3: number;
    4: number;
    5: number;
    6: number;
    7: number;
}

/** 產業別佔比
 * manufacturing: 製造業
 * service: 服務業
 */
export interface IIndustryRate {
    manufacturing: number;
    service: number;
}

/** 員工數量分佈
 * north:  index 0:製造業, 1:服務業
 * south:  index 0:製造業, 1:服務業
 * east:  index 0:製造業, 1:服務業
 * west:  index 0:製造業, 1:服務業
 */
export interface IRegionalDistributionCustomer {
    north: number[];
    south: number[];
    east: number[];
    west: number[];
}