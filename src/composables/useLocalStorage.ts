// Closure function
export function useLocalStorage(key: string) {
  function getItem() {
    return JSON.parse(localStorage.getItem(key) as string);
  }
  function setItem(data: any) {
    localStorage.setItem(key, JSON.stringify(data));
  }
  return {
    getItem,
    setItem,
  };
}
