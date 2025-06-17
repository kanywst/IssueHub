/**
 * 日付関連のユーティリティ関数
 */

/**
 * 日付をフォーマットする
 * @param date - フォーマットする日付
 * @param locale - ロケール (デフォルト: 'ja-JP')
 * @param options - Intl.DateTimeFormatのオプション
 * @returns フォーマットされた日付文字列
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
 * 現在から指定された日付までの経過時間を計算して表示する
 * @param date - 比較する日付
 * @returns 経過時間の文字列表現
 */
export const timeAgo = (date: Date | string): string => {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  const now = new Date();
  const seconds = Math.floor((now.getTime() - dateObj.getTime()) / 1000);

  // 1分未満
  if (seconds < 60) {
    return `${seconds}秒前`;
  }

  // 1時間未満
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) {
    return `${minutes}分前`;
  }

  // 1日未満
  const hours = Math.floor(minutes / 60);
  if (hours < 24) {
    return `${hours}時間前`;
  }

  // 1ヶ月未満
  const days = Math.floor(hours / 24);
  if (days < 30) {
    return `${days}日前`;
  }

  // 1年未満
  const months = Math.floor(days / 30);
  if (months < 12) {
    return `${months}ヶ月前`;
  }

  // 1年以上
  const years = Math.floor(months / 12);
  return `${years}年前`;
};

/**
 * 2つの日付の間の日数を計算する
 * @param startDate - 開始日
 * @param endDate - 終了日 (デフォルト: 現在の日付)
 * @returns 日数
 */
export const daysBetween = (
  startDate: Date | string,
  endDate: Date | string = new Date()
): number => {
  const start = typeof startDate === 'string' ? new Date(startDate) : startDate;
  const end = typeof endDate === 'string' ? new Date(endDate) : endDate;

  // 時間、分、秒、ミリ秒をリセットして日付だけを比較
  const startDay = new Date(start.getFullYear(), start.getMonth(), start.getDate());
  const endDay = new Date(end.getFullYear(), end.getMonth(), end.getDate());

  const diff = endDay.getTime() - startDay.getTime();
  return Math.floor(diff / (1000 * 60 * 60 * 24));
};
