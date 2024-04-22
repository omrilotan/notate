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
export function notate(source: Record<string, any>, string = ""): any {
	return string
		.replace(/\[(\d+)]/g, ".$1")
		.split(".")
		.reduce(
			(previous: any, current: string): any =>
				typeof previous === "object" && previous !== null
					? previous[current]
					: previous,
			source,
		);
}
