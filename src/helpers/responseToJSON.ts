async function responseToJSON<T>(response: Response): Promise<Response | T> {
  if (response.ok) {
    const data = await response.json();
    return data as T;
  }
  return response;
}

export default responseToJSON;
