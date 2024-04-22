import { notate } from ".";

describe("notate", () => {
	const dummy = {
		top: {
			middle: {
				low: "value",
			},
			list: ["one", "two", { three: "four" }],
		},
	};

	test("Should throw an error when non string is supposed to be processed", () => {
		expect(() => notate({}, null)).toThrow(TypeError);
	});
	test("Resolves to nested data structure", () => {
		expect(notate(dummy, "top.middle")).toEqual({ low: "value" });
	});
	test("Resolves to an object", () => {
		expect(notate(dummy, "top.middle.low")).toBe("value");
	});
	test("Resolves missing data to 'undefined'", () => {
		expect(notate(dummy, "missing.data")).toBe(undefined);
	});
	test("Resolves array notation", () => {
		expect(notate(dummy, "top.list[0]")).toBe("one");
		expect(notate(dummy, "top.list[2].three")).toBe("four");
	});
});
