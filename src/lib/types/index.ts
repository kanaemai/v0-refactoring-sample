export type PropertyStatus = '販売中' | '取得済' | 'リノベ中' | '成約済';

export interface RentRollItem {
	id: string;
	roomNumber: string;
	area: number;
	currentRent: number;
	estimatedRent: number;
	occupied: boolean;
}

export interface Property {
	id: string;
	name: string;
	address: string;
	status: PropertyStatus;
	acquisitionPrice: number;
	totalCost: number;
	estimatedSalePrice: number;
	grossProfit: number;
	profitRate: number;
	structure: string;
	completionDate: string;
	landArea: number;
	buildingArea: number;
	purchasePrice: number;
	renovationCost: number;
	calculationMethod: string;
	buildingRatio: number;
	rentRoll: RentRollItem[];
}
