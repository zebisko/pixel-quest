import { useState, useCallback } from 'react';

export const useArtworkModal = () => {
  const [selectedArtwork, setSelectedArtwork] = useState(null);

  const openModal = useCallback((artwork) => {
    setSelectedArtwork(artwork);
  }, []);

  const closeModal = useCallback(() => {
    setSelectedArtwork(null);
  }, []);

  return {
    selectedArtwork,
    openModal,
    closeModal,
    isOpen: !!selectedArtwork
  };
};