import moment from 'moment';

export default function currentTime(timeStamp: number) {
  return moment(timeStamp).format('YYYY-MM-DD HH:mm:ss');
}
