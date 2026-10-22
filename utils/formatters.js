/**
 * Converts a rating (0-10) to stars (1-5)
 * @param {number} rating - Movie rating from 0 to 10
 * @returns {string} - Star emoji string
 */
export const getRatingStars = (rating) => {
  let stars = 0;

  if (rating >= 0 && rating < 2) {
    stars = 1;
  } else if (rating >= 2 && rating < 4) {
    stars = 2;
  } else if (rating >= 4 && rating < 6) {
    stars = 3;
  } else if (rating >= 6 && rating < 8) {
    stars = 4;
  } else if (rating >= 8 && rating <= 10) {
    stars = 5;
  }

  return '⭐'.repeat(stars);
};

export const formatDuration = (minutes) => {
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;

  return `${hours}h ${remainingMinutes}m`;
};

/*
  function ratingStars(rating) {
    const stars = Math.round((rating || 0) / 2);
    return '🌟'.repeat(stars);
  }

    function formatDuration(minutes) {
    if (!minutes || minutes <= 0) return '0 min';
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;

    if (hours === 0) return `${remainingMinutes} min`;
    if (remainingMinutes === 0) return `${hours} h`;

    return `${hours} h ${remainingMinutes} min`;
  }

*/
