export const getRatingStyleColor = (ratingValue: string): string => {
  const rating: number = parseFloat(ratingValue);

  switch (true) {
    case rating >= 4.8:
      return 'rating--good';
    case rating > 3.9:
      return 'rating--medium';
    default:
      return 'rating--bad';
  }
}
