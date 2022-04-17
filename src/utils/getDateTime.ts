export function getDateTime() {
  const date = new Date()

  const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  const locale = Intl.DateTimeFormat().resolvedOptions().locale;

  const localeDateTime = date.toLocaleString(locale, { 
    timeZone: timeZone, 
    hour12: true, 
    timeStyle: 'short', 
    dateStyle: 'short'
  })

  return localeDateTime
}