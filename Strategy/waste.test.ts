import { expect, test } from "vitest";
import {
  Waste,
  OrganicRecyclingStrategy,
  RecycleRecyclingStrategy,
  ReuseRecyclingStrategy,
  BulkyRecyclingStrategy,
  isWasteWorthIt,
} from "./waste";

test("waste has a strategy pattern for recycling", () => {
  const valueJose = new Waste(new BulkyRecyclingStrategy()).recycleWasteValue({
    name: "José",
    area: 2,
    state: 20,
  });

  expect(valueJose).toBeTypeOf("number");
});

const cfg = {
  name: "kristen",
  area: 0.5,
  state: 60,
};

test("OrganicRecyclingStrategy", () => {
  const strategy = new OrganicRecyclingStrategy();
  const value = strategy.recycle(cfg);
  expect(value).toBe(0);
});

test("RecycleRecyclingStrategy", () => {
  const strategy = new RecycleRecyclingStrategy();
  const value = strategy.recycle(cfg);
  expect(value).closeTo(7.2, 0.0001);
});

test("ReuseRecyclingStrategy", () => {
  const strategy = new ReuseRecyclingStrategy();
  const value = strategy.recycle(cfg);
  expect(value).closeTo(7.2, 0.0001);
});

test("BulkyRecyclingStrategy", () => {
  const strategy = new BulkyRecyclingStrategy();
  const value = strategy.recycle(cfg);
  expect(value).closeTo(2.7, 0.0001);
});

test("isWasteWorthIt has a reasonable threshold", () => {
  const waste1 = new Waste(new BulkyRecyclingStrategy()); // 2.7 < 5
  const result1 = isWasteWorthIt(waste1, cfg);
  expect(result1).toBe(false);

  const waste2 = new Waste(new RecycleRecyclingStrategy()); // 7.2 > 5
  const result2 = isWasteWorthIt(waste2, cfg);
  expect(result2).toBe(true);
});