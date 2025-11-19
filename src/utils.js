import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';

dayjs.extend(duration);

export function getRandomInteger(a = 0, b = 1){
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a,b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
}

export function getRandomValue(items){
  return items[getRandomInteger(0, items.length - 1)];
}

export function formatStringToShortDate(date, formatDate) {
  return dayjs(date).format(formatDate);
}

export function callcDate(dateFrom,dateTo){
  const from = dayjs(dateFrom);
  const to = dayjs(dateTo);
  const diff = to.diff(from);
  const d = dayjs.duration(diff);
  const days = d.days();
  const hours = d.hours();
  const minutes = d.minutes();

  const parts = [];

  if (days > 0) {
    parts.push(`${days}D`);
  }

  if (hours > 0 || days > 0) {
    const hoursStr = String(hours).padStart(2, '0');
    parts.push(`${hoursStr}H`);
  }

  const minutesStr = String(minutes).padStart(2, '0');
  parts.push(`${minutesStr}M`);

  return parts.join(' ');

}
