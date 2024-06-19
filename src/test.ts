import { notate } from ".";

describe("notate", () => {
	const dummy = {
		top: {
			middle: {
				low: "value",
			},
			list: ["one", "two", { three: "four" }],
		},
		nothing: null,
	};

	test("throw an error when non string is supposed to be processed", () => {
		expect(() => notate({}, null)).toThrow(TypeError);
	});
	test("nested data structure", () => {
		expect(notate(dummy, "top.middle")).toEqual({ low: "value" });
	});
	test("an object", () => {
		expect(notate(dummy, "top.middle.low")).toBe("value");
	});
	test("inheritance", () => {
		class Car {
			constructor(public brand: string) {}
			get brandName() {
				return this.brand;
			}
		}
		const car = new Car("Toyota");
		expect(Object.hasOwn(car, "brandName")).toBe(false);
		expect(notate(car, "brandName")).toBe("Toyota");
	});
	test("missing data", () => {
		expect(notate(dummy, "missing.data")).toBeUndefined();
	});
	test("missing nested records", () => {
		expect(notate(dummy, "top.middle.low.lowest.hell")).toBeUndefined();
	});
	test("null cell", () => {
		expect(notate(dummy, "nothing")).toBeNull();
		expect(notate(dummy, "nothing.much")).toBeUndefined();
	});
	test("array notation on objects", () => {
		expect(notate(dummy, "top.middle[low]")).toBeUndefined();
	});
	test("array notation", () => {
		expect(notate(dummy, "top.list[0]")).toBe("one");
		expect(notate(dummy, "top.list[2].three")).toBe("four");
	});
	test("Map", () => {
		const map = new Map<string, any>([
			["key", { chain: "balue" }],
			["missing", "value"],
		]);
		expect(notate({ map }, "map.key.chain")).toBe("balue");
		expect(notate({ map }, "map.size")).toBe(2);
		expect(notate({ map }, "map.missing.key")).toBeUndefined();
	});
	test("Set", () => {
		const set = new Set<any>(["key", "balue", { chain: "free" }]);
		expect(notate({ set }, "set.1")).toBe("balue");
		expect(notate(set, "[2].chain")).toBe("free");
		expect(notate({ set }, "set[1]")).toBe("balue");
		expect(notate({ set }, "set[5]")).toBeUndefined();
	});
	test("Set attribute", () => {
		const set = new Set<any>(["key", "balue", { chain: "free" }]);
		expect(notate({ set }, "set.size")).toBe(3);
		expect(notate({ set }, "set.property")).toBeUndefined();
	});
});
