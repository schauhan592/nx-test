export default function getTimeSince(timestamp: number): string {
  const currentTime = Math.floor(Date.now() / 1000); // Get current Unix timestamp in seconds
  const timeElapsed = currentTime - timestamp;

  const seconds = timeElapsed % 60;
  const minutes = Math.floor((timeElapsed / 60) % 60);
  const hours = Math.floor((timeElapsed / (60 * 60)) % 24);
  const days = Math.floor(timeElapsed / (60 * 60 * 24));

  if (days)
    return `${days} ${days === 1 ? 'day' : 'days'} ${hours} ${hours === 1 ? 'hr' : 'hrs'} ago`;
  else if (hours)
    return `${hours} ${hours === 1 ? 'hr' : 'hrs'} ${minutes} ${
      minutes === 1 ? 'min' : 'mins'
    } ago`;
  else if (minutes)
    return `${minutes} ${minutes === 1 ? 'min' : 'mins'} ${seconds === 1 ? 'sec' : 'secs'} ago`;
  else return `${seconds} ${seconds === 1 ? 'sec' : 'secs'} ago`;
}
