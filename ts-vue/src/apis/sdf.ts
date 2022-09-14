import { get } from '@/plugins/request';

export function getWords() {
  return get<{ data: string }>('https://sdfsdf.dev/5w');
}
