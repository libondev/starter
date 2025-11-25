import { createAlova } from 'alova';
import adapterFetch from 'alova/fetch';

export const client = createAlova({
  requestAdapter: adapterFetch(),
  responded: response => response.json()
});

export const useGet = client.Get.bind(client);
export const usePost = client.Post.bind(client);
export const usePut = client.Put.bind(client);
export const useDelete = client.Delete.bind(client);
export const usePatch = client.Patch.bind(client);
