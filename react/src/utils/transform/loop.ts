export function dfs<T>(
  data: T,
  callback: (v: T) => void,
  { children = 'children' } = {},
) {
  if (Array.isArray(data)) {
    data.forEach((item) =>
      JSON.stringify(item, (_, value) => {
        callback(value);

        return value[children];
      }),
    );

    return;
  }

  JSON.stringify(data, (_, value) => {
    callback(value);

    return value[children];
  });
}
