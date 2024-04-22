# CHANGELOG

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
