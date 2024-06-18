/**
 * Resolve dot notation strings
 *
 * @param  {Record<string, any>} context     Object to start notation search (defaults to global scope)
 * @param  {string} [string=''] Dot notation representation
 * @return {any}				Whatever it finds / undefined
 *
 * @example
 * const obj = {
 *   top_level: {
 *     nested: {
 *       value: 'My Value'
 *     }
 *   }
 * };
 *
 * notate(obj, 'top_level.nested.value');
 * // 'My Value'
 *
 * notate(obj, 'top_level.missing.value');
 * // undefined
 */
export function notate(
	source: Record<string, any> | Map<string, any> | Set<any>,
	string = "",
): any {
	return string
		.replace(/^\[(\d+)]/, "$1") // Array notation first cell
		.replace(/\[(\d+)]/g, ".$1") // Array notation rest of the cells
		.split(".")
		.reduce((previous: any, current: string): any => {
			if (previous instanceof Map) return previous.get(current);
			if (previous instanceof Set) return getNthItem(previous, Number(current));
			if (previous === null) return undefined;
			return previous?.[current];
		}, source);
}

/**
 * Get nth item from Set
 */
function getNthItem(set: Set<any>, place: number): any {
	if (place < 0) return undefined;
	if (place >= set.size) return undefined;
	const iterator = set.values();
	let index = -1;
	let next = iterator.next();
	while (next.done === false) {
		if (++index === place) return next.value;
		next = iterator.next();
	}
	return undefined;
}
