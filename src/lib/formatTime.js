export default function formatTime(dateTime) {
  const time = dateTime.split('T')[1].split('.')
  return time[0]
}
