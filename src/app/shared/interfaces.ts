export interface OptionsShips {
  limit: number;
  offset: number;

}

export interface OptionsShipsAndFilter extends OptionsShips {
  filter: FilterOptions;
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
  missions?: string[];
  year_built?: string;
}

export interface ShipsCollection {
  ships: Ship[];
}

export interface ShipsAndQuantityResponse {
  ships: Ship[];
  shipsResult: QuantityShipsResult;
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

