export interface OptionsShips {
  limit: number;
  offset: number;
  filter?: FilterOptions;
}

export interface FilterOptions {
  radio: string;
  checkbox: string[];
  text: string;
}

export interface QuantityShips {
  shipsResult: QuantityShipsResult;
}

export interface QuantityShipsResult {
  result: {
    totalCount: number
  };
}

export interface Ship {
  id: string;
  name: string;
  type: string;
  home_port: string;
  missions?: {
    name: string;
  }[];
  year_built?: string;
  weight_kg?: number;
}

export interface ShipsCollection {
  ships: Ship[];
}

export interface ShipsAndQuantity {
  ships: Ship[];
  quantity: number;
}

export interface OptionsPaginator {
  quantity: number;
  options: OptionsShips;
  currentPage: number;
  maxPage: number;
}

