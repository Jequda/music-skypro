import { durationFormat } from "./durationFormat";

describe("Функция форматирования времени", () => {
  it("Правильно форматирует число 6 в строку", () => {
    const result = durationFormat(6);
    expect(result).toBe("0:06");
  });
  it("Правильно форматирует число 116 в строку", () => {
    const result = durationFormat(116);
    expect(result).toBe("1:56");
  });
  it("Правильно форматирует число 0 в строку", () => {
    const result = durationFormat(0);
    expect(result).toBe("0:00");
  });
});
