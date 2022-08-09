// Closure function
export function useLocalStorage(key: string) {
  function getItem() {
    return JSON.parse(localStorage.getItem(key) as string);
  }
  function setItem(data: any) {
    localStorage.setItem(key, JSON.stringify(data));
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
