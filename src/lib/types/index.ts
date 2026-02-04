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

export const mockProperties: Property[] = [
	{
		id: '1',
		name: 'グランドヒルズ新宿 801号室',
		address: '東京都新宿区西新宿3-15-8',
		status: '販売中',
		acquisitionPrice: 45000000,
		totalCost: 56200000,
		estimatedSalePrice: 72000000,
		grossProfit: 13640000,
		profitRate: 18.9,
		structure: 'RC',
		completionDate: '1998/03/15',
		landArea: 85.5,
		buildingArea: 72.3,
		purchasePrice: 45000000,
		renovationCost: 8500000,
		calculationMethod: '指定配分 (Manual)',
		buildingRatio: 0.45,
		rentRoll: [
			{ id: '1', roomNumber: '801', area: 72, currentRent: 180000, estimatedRent: 195000, occupied: true }
		]
	},
	{
		id: '2',
		name: 'アーバンテラス目黒 1202号室',
		address: '東京都目黒区下目黒4-22-6',
		status: '取得済',
		acquisitionPrice: 52000000,
		totalCost: 64920000,
		estimatedSalePrice: 82000000,
		grossProfit: 14620000,
		profitRate: 17.8,
		structure: 'SRC',
		completionDate: '2005/08/20',
		landArea: 95.2,
		buildingArea: 85.6,
		purchasePrice: 52000000,
		renovationCost: 9800000,
		calculationMethod: '指定配分 (Manual)',
		buildingRatio: 0.5,
		rentRoll: [
			{ id: '1', roomNumber: '1201', area: 42, currentRent: 165000, estimatedRent: 175000, occupied: true },
			{ id: '2', roomNumber: '1202', area: 43, currentRent: 168000, estimatedRent: 178000, occupied: true }
		]
	},
	{
		id: '3',
		name: 'メゾンドール世田谷 201号室',
		address: '東京都世田谷区三軒茶屋1-25-11',
		status: 'リノベ中',
		acquisitionPrice: 58000000,
		totalCost: 72980000,
		estimatedSalePrice: 92000000,
		grossProfit: 16260000,
		profitRate: 17.7,
		structure: 'RC',
		completionDate: '1995/05/20',
		landArea: 128.5,
		buildingArea: 350,
		purchasePrice: 58000000,
		renovationCost: 12000000,
		calculationMethod: '指定配分 (Manual)',
		buildingRatio: 0.4,
		rentRoll: [
			{ id: '1', roomNumber: '101', area: 40, currentRent: 150000, estimatedRent: 160000, occupied: true },
			{ id: '2', roomNumber: '102', area: 40, currentRent: 150000, estimatedRent: 160000, occupied: true },
			{ id: '3', roomNumber: '201', area: 50, currentRent: 0, estimatedRent: 200000, occupied: false }
		]
	},
	{
		id: '4',
		name: 'サンライズコート品川 502号室',
		address: '東京都品川区大井1-35-9',
		status: '成約済',
		acquisitionPrice: 42000000,
		totalCost: 52020000,
		estimatedSalePrice: 65000000,
		grossProfit: 11030000,
		profitRate: 17.0,
		structure: 'RC',
		completionDate: '2000/11/10',
		landArea: 78.3,
		buildingArea: 65.8,
		purchasePrice: 42000000,
		renovationCost: 7200000,
		calculationMethod: '指定配分 (Manual)',
		buildingRatio: 0.42,
		rentRoll: [
			{ id: '1', roomNumber: '502', area: 65, currentRent: 155000, estimatedRent: 165000, occupied: true }
		]
	},
	{
		id: '5',
		name: 'パークサイドレジデンス渋谷 305号室',
		address: '東京都渋谷区道玄坂2-8-12',
		status: 'リノベ中',
		acquisitionPrice: 38000000,
		totalCost: 46480000,
		estimatedSalePrice: 58000000,
		grossProfit: 9780000,
		profitRate: 16.9,
		structure: 'SRC',
		completionDate: '2002/04/25',
		landArea: 65.8,
		buildingArea: 55.2,
		purchasePrice: 38000000,
		renovationCost: 6500000,
		calculationMethod: '指定配分 (Manual)',
		buildingRatio: 0.48,
		rentRoll: [
			{ id: '1', roomNumber: '305', area: 55, currentRent: 145000, estimatedRent: 158000, occupied: true }
		]
	},
	{
		id: '6',
		name: 'ガーデンプレイス杉並 703号室',
		address: '東京都杉並区阿佐ヶ谷北5-12-3',
		status: '取得済',
		acquisitionPrice: 41000000,
		totalCost: 51260000,
		estimatedSalePrice: 63000000,
		grossProfit: 9850000,
		profitRate: 15.6,
		structure: 'RC',
		completionDate: '1997/09/18',
		landArea: 88.5,
		buildingArea: 75.2,
		purchasePrice: 41000000,
		renovationCost: 7800000,
		calculationMethod: '指定配分 (Manual)',
		buildingRatio: 0.44,
		rentRoll: [
			{ id: '1', roomNumber: '703', area: 75, currentRent: 142000, estimatedRent: 155000, occupied: true }
		]
	},
	{
		id: '7',
		name: 'クレストタワー池袋 1505号室',
		address: '東京都豊島区東池袋3-42-7',
		status: '成約済',
		acquisitionPrice: 35000000,
		totalCost: 43600000,
		estimatedSalePrice: 53000000,
		grossProfit: 7810000,
		profitRate: 14.7,
		structure: 'SRC',
		completionDate: '2008/06/30',
		landArea: 52.3,
		buildingArea: 48.5,
		purchasePrice: 35000000,
		renovationCost: 6200000,
		calculationMethod: '指定配分 (Manual)',
		buildingRatio: 0.52,
		rentRoll: [
			{ id: '1', roomNumber: '1505', area: 48, currentRent: 138000, estimatedRent: 148000, occupied: true }
		]
	},
	{
		id: '8',
		name: 'リバーフロント中野 908号室',
		address: '東京都中野区中央2-18-4',
		status: '販売中',
		acquisitionPrice: 32000000,
		totalCost: 39720000,
		estimatedSalePrice: 48000000,
		grossProfit: 6840000,
		profitRate: 14.3,
		structure: 'RC',
		completionDate: '1999/12/05',
		landArea: 58.2,
		buildingArea: 52.8,
		purchasePrice: 32000000,
		renovationCost: 5500000,
		calculationMethod: '指定配分 (Manual)',
		buildingRatio: 0.46,
		rentRoll: [
			{ id: '1', roomNumber: '908', area: 52, currentRent: 125000, estimatedRent: 138000, occupied: true }
		]
	}
];
