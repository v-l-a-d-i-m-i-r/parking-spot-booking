export function stringifyError(object: unknown): string {
  return JSON.stringify(object, function replaceError(_, value) {
    if (value instanceof Error) {
      return Object.getOwnPropertyNames(value).reduce(
        (obj, propName) => {
          obj[propName] = value[propName];
          return obj;
        },
        { name: value.name },
      );
    } else {
      return value;
    }
  });
}
