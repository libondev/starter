type Fn<T = any> = (data: T) => void;
const map = new Map<string, Set<Fn>>();

const off = <T = any>(event: string, fn: Fn<T>) => map.get(event)?.delete(fn);

const on = <T = any>(event: string, fn: Fn<T>) => {
  (map.get(event) ?? map.set(event, new Set()).get(event)!).add(fn);
};

const once = <T = any>(event: string, fn: Fn<T>) => {
  const wrapper: Fn<T> = (data) => {
    off(event, wrapper);
    fn(data);
  };
  on(event, wrapper);
};

const emit = <T = any>(event: string, data?: T) => {
  map.get(event)?.forEach((fn) => fn(data as T));
};

export const bus = { on, off, once, emit };
