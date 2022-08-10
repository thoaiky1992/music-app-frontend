// Closure function
export function useLocalStorage(key: string) {
  function getItem() {
    return JSON.parse(localStorage.getItem(key) as any);
  }
  function setItem(data: any) {
    data instanceof Array || data instanceof Object
      ? localStorage.setItem(key, JSON.stringify(data))
      : localStorage.setItem(key, data);

    window.dispatchEvent(new Event("storage"));
  }
  function removeItem() {
    localStorage.removeItem(key);
  }
  return {
    getItem,
    setItem,
    removeItem,
  };
}
