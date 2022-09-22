/** 過案廠商 - 員工數量分佈
 * north:  index 0:製造業, 1:服務業
 * south:  index 0:製造業, 1:服務業
 * east:  index 0:製造業, 1:服務業
 * center:  index 0:製造業, 1:服務業
*/
export interface IManufacturerStatisticRegion {
    north: number[];
    south: number[];
    east: number[];
    center: number[];
}