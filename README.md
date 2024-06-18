# notate [![](https://img.shields.io/npm/v/notate.svg)](https://www.npmjs.com/package/notate) [![](https://img.shields.io/badge/source--000000.svg?logo=github&style=social)](https://github.com/omrilotan/notate) [![](https://badgen.net/bundlephobia/minzip/notate)](https://bundlephobia.com/result?p=notate)

Resolve dot notation strings

```ts
import { notate } from "notate";

const obj = {
	top_level: {
		nested: {
			value: "My Value",
		},
	},
};

notate(obj, "top_level.nested.value"); // 'My Value'
notate(obj, "top_level.missing.value"); // undefined
```

Resolve list notation as well

```ts
const obj = {
	list: [{ name: "Alice" }, { name: "Bob" }],
};
notate(obj, "list[1].name"); // 'Bob'
```

Supports Map and Set

```ts
const map = new Map([["key", { chain: "value" }]]);
notate(map, "key.chain"); // 'value'

const set = new Set([{ chain: "value" }]);
notate(set, "[0].chain"); // 'value'
```
