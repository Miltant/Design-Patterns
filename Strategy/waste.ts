export type WasteObject = { name: string; area: number; state: number };

export class Waste {
  recyclingStrategy: IRecyclingStrategy;

  constructor(strategy: IRecyclingStrategy) {
    this.recyclingStrategy = strategy;
  }
  // Utilise la stratégie courante pour recycler le déchet
  recycleWasteValue(wasteObject: WasteObject): number {
    return this.recyclingStrategy.recycle(wasteObject);
  }
}

export interface IRecyclingStrategy {
  recycle(wasteObject: WasteObject): number;
}

export class OrganicRecyclingStrategy implements IRecyclingStrategy {
  recycle(wasteObject: WasteObject) {
    return 0; // We can't do much with this kind of waste
  }
}

export class RecycleRecyclingStrategy implements IRecyclingStrategy {
  recycle(wasteObject: WasteObject) {
    return 12 * (wasteObject.state / 100);
  }
}

export class ReuseRecyclingStrategy implements IRecyclingStrategy {
  recycle(wasteObject: WasteObject) {
    return 12 * (wasteObject.state / 100);
  }
}

export class BulkyRecyclingStrategy implements IRecyclingStrategy {
  recycle(wasteObject: WasteObject) {
    return 9 * (wasteObject.state / 100) * wasteObject.area;
  }
}

export function isWasteWorthIt(
  element: Waste,
  objectToThrow: { name: string; area: number; state: number }
) {
  const result = element.recycleWasteValue(objectToThrow);
  return result > 5;
}