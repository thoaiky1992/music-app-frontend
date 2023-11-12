// Closure function
export function useLocalStorage(key: string) {
  function getItem() {
    return JSON.parse(localStorage.getItem(key) as any);
  }
  function setItem(data: any) {
    localStorage.setItem(
      key,
      data instanceof Array || data instanceof Object
        ? JSON.stringify(data)
        : data
    );

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
