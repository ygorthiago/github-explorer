export function getDateTime() {
  const date = new Date();

  const { timeZone } = Intl.DateTimeFormat().resolvedOptions();
  const { locale } = Intl.DateTimeFormat().resolvedOptions();

  const localeDateTime = date.toLocaleString(locale, {
    timeZone,
    hour12: true,
    timeStyle: 'short',
    dateStyle: 'short',
  });

  return localeDateTime;
}
