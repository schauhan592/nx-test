import moment from 'moment';

export default function timeSince(timeStamp: number) {
  return moment(timeStamp).fromNow();
}
