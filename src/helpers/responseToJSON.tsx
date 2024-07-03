async function responseToJSON<T>(response: Response) {
  if (response.ok) return await response.json().then((resp) => resp as T);
  return response as Response;
}

export default responseToJSON;
