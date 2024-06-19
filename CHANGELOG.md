# CHANGELOG

## 2.1.1

- Fix: Support reading Set and Map attributes

## 2.1.0

- New Feature: Support Map and Set
- Fix: missing nested properties falling back on previous cell value
- Fix: Support array notation from first cell `notate(set, "[0].chain")`

## 2.0.0

- Breaking: Change to a named export.

```diff
- import notate from "notate";
+ import { notate } from "notate";
```

- Support array notation

```js
const obj = {
	list: [{ name: "Alice" }, { name: "Bob" }],
};
notate(obj, "list[1].name"); // 'Bob'
```

- Add TypeScript definitions
