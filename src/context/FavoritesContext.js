import { createContext, useContext } from 'react';
import { usePersistentState } from '../utils/usePersistentState';

const FavoritesContext = createContext(null);

export function FavoritesProvider({ children }) {
  const [favoriteIds, setFavoriteIds, loaded] = usePersistentState(
    'bloom:favorites',
    []
  );

  const isFavorite = (id) => favoriteIds.includes(id);

  const toggleFavorite = (id) => {
    setFavoriteIds((current) =>
      current.includes(id)
        ? current.filter((itemId) => itemId !== id)
        : [...current, id]
    );
  };

  return (
    <FavoritesContext.Provider
      value={{ favoriteIds, isFavorite, toggleFavorite, loaded }}
    >
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites() {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error('useFavorites must be used inside FavoritesProvider');
  }
  return context;
}