export namespace DateTimeUtils {

    export function convertTimezone(date: Date | string, timezone: string) {
        return new Date((typeof date === 'string' ? new Date(date) : date).toLocaleString('en-US', {timeZone: timezone}));
    }

    export function getWeekdayName(date: Date, locale: string = 'default') {
        return date.toLocaleDateString(locale, { weekday: 'long' });
    }

    export function getMonthName(date: Date, locale: string = 'default') {
        return date.toLocaleDateString(locale, { month: 'long' });
    }

    export function getDateString(date: Date, locale: string = 'default') {
        return date.toLocaleDateString(locale);
    }

    export function getTimeString(date: Date, locale: string = 'default') {
        return date.toLocaleString(locale, { hour: 'numeric', minute: 'numeric', hour12: true });
    }

    export function getDateTimeString(date: Date) {
        return `${getDateString(date)}, ${getTimeString(date)}`;
    }
}
