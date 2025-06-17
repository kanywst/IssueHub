/**
 * Date utility functions
 */

/**
 * Format a date
 * @param date - Date to format
 * @param locale - Locale (default: 'ja-JP')
 * @param options - Intl.DateTimeFormat options
 * @returns Formatted date string
 */
export const formatDate = (
  date: Date | string,
  locale = 'ja-JP',
  options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }
): string => {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  return new Intl.DateTimeFormat(locale, options).format(dateObj);
};

/**
 * Calculate and display elapsed time from the specified date to now
 * @param date - Date to compare
 * @returns String representation of elapsed time
 */
export const timeAgo = (date: Date | string): string => {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  const now = new Date();
  const seconds = Math.floor((now.getTime() - dateObj.getTime()) / 1000);

  // Less than 1 minute
  if (seconds < 60) {
    return `${seconds} seconds ago`;
  }

  // Less than 1 hour
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) {
    return `${minutes} minutes ago`;
  }

  // Less than 1 day
  const hours = Math.floor(minutes / 60);
  if (hours < 24) {
    return `${hours} hours ago`;
  }

  // Less than 1 month
  const days = Math.floor(hours / 24);
  if (days < 30) {
    return `${days} days ago`;
  }

  // Less than 1 year
  const months = Math.floor(days / 30);
  if (months < 12) {
    return `${months} months ago`;
  }

  // 1 year or more
  const years = Math.floor(months / 12);
  return `${years} years ago`;
};

/**
 * Calculate the number of days between two dates
 * @param startDate - Start date
 * @param endDate - End date (default: current date)
 * @returns Number of days
 */
export const daysBetween = (
  startDate: Date | string,
  endDate: Date | string = new Date()
): number => {
  const start = typeof startDate === 'string' ? new Date(startDate) : startDate;
  const end = typeof endDate === 'string' ? new Date(endDate) : endDate;

  // Reset hours, minutes, seconds, milliseconds to compare dates only
  const startDay = new Date(start.getFullYear(), start.getMonth(), start.getDate());
  const endDay = new Date(end.getFullYear(), end.getMonth(), end.getDate());

  const diff = endDay.getTime() - startDay.getTime();
  return Math.floor(diff / (1000 * 60 * 60 * 24));
};
