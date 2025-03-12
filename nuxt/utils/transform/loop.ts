export function dfs<T extends object>(
  data: T | T[],
  callback: (v: T) => void,
  { children = 'children' as keyof T } = {},
) {
  const stack: T[] = [];

  // 优化初始化逻辑
  if (Array.isArray(data)) {
    for (let i = data.length - 1; i >= 0; i--) {
      stack.push(data[i] as T);
    }
  } else {
    stack.push(data);
  }

  while (stack.length > 0) {
    const node = stack.pop()!;
    callback(node);

    // 类型安全的子节点获取
    const childNodes = (node as any)[children];

    // 优化子节点处理逻辑
    if (childNodes !== null && childNodes !== undefined) {
      if (Array.isArray(childNodes)) {
        // 反向遍历避免reverse()调用
        for (let i = childNodes.length - 1; i >= 0; i--) {
          stack.push(childNodes[i]);
        }
      } else if (typeof childNodes === 'object') {
        stack.push(childNodes);
      }
    }
  }
}

export function bfs<T extends any[] | Record<string, any>>(
  data: T,
  callback: (v: any) => void,
  { children = 'children' } = {},
) {
  let start = 0;
  const queue = [data];

  while (start < queue.length) {
    const node = queue[start++];

    if (!node) continue;

    callback(node);

    if (Array.isArray(node)) {
      for (const item of node) {
        if (item) {
          queue.push(item);
          const childItems = item[children];
          if (childItems) {
            if (Array.isArray(childItems)) {
              const len = childItems.length;
              for (let j = 0; j < len; j++) {
                queue.push(childItems[j]);
              }
            } else {
              queue.push(childItems);
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
            queue.push(childNodes[i]);
          }
        } else {
          queue.push(childNodes);
        }
      }
    }
  }
}
