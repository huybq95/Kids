import moment from 'moment'
export function getCurrentDate() {
  return moment(new Date().getTime()).format('DD/MM/YYYY')
}
