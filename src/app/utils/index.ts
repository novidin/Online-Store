export const getRatingStyleColor = (ratingValue: string): string => {
  if (parseFloat(ratingValue) >= 4.8) {
    return 'rating--good';
  } else if (parseFloat(ratingValue) > 3.9) {
    return 'rating--medium';
  } else {
    return 'rating--bad';
  }
}
