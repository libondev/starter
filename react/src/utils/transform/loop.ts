export function dfs<T extends object>(
  data: T | T[],
  callback: (v: T, parentNode?: T) => any,
  { children = 'children' as keyof T } = {},
) {
  const stack: [T, T | undefined][] = [];

  if (Array.isArray(data)) {
    for (let i = data.length - 1; i >= 0; i--) {
      stack.push([data[i] as T, undefined]);
    }
  } else {
    stack.push([data, undefined]);
  }

  while (stack.length > 0) {
    const [node, parentNode] = stack.pop()!;
    const shouldSkip = callback(node, parentNode);

    // 如果 callback 返回 truthy 值，跳过当前节点的所有子节点
    if (shouldSkip) {
      continue;
    }

    const childNodes = (node as any)[children];

    if (childNodes !== null && childNodes !== undefined) {
      if (Array.isArray(childNodes)) {
        for (let i = childNodes.length - 1; i >= 0; i--) {
          stack.push([childNodes[i], node]);
        }
      } else if (typeof childNodes === 'object') {
        stack.push([childNodes, node]);
      }
    }
  }
}

export function bfs<T extends any[] | Record<string, any>>(
  data: T,
  callback: (v: any, parentNode?: any) => any,
  { children = 'children' } = {},
) {
  let start = 0;
  const queue: [any, any?][] = [[data, undefined]];

  while (start < queue.length) {
    const item = queue[start++];
    if (!item) continue;

    const [node, parentNode] = item;

    if (!node) continue;

    const shouldSkip = callback(node, parentNode);

    // 如果 callback 返回 truthy 值，跳过当前节点的所有子节点
    if (shouldSkip) {
      continue;
    }

    if (Array.isArray(node)) {
      for (const item of node) {
        if (item) {
          queue.push([item, node]);
          const childItems = item[children];
          if (childItems) {
            if (Array.isArray(childItems)) {
              const len = childItems.length;
              for (let j = 0; j < len; j++) {
                queue.push([childItems[j], item]);
              }
            } else {
              queue.push([childItems, item]);
            }
          }
        }
      }
    } else if (typeof node === 'object') {
      const childNodes = node[children];
      if (childNodes) {
        if (Array.isArray(childNodes)) {
          const len = childNodes.length;
          for (let i = 0; i < len; i++) {
            queue.push([childNodes[i], node]);
          }
        } else {
          queue.push([childNodes, node]);
        }
      }
    }
  }
}
