# notate [![](https://img.shields.io/npm/v/notate.svg)](https://www.npmjs.com/package/notate) [![](https://img.shields.io/badge/source--000000.svg?logo=github&style=social)](https://github.com/omrilotan/notate) [![](https://badgen.net/bundlephobia/minzip/notate)](https://bundlephobia.com/result?p=notate)

Resolve dot notation strings

```js
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

```js
const obj = {
	list: [{ name: "Alice" }, { name: "Bob" }],
};
notate(obj, "list[1].name"); // 'Bob'
```
