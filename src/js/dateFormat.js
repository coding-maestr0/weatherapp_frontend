import moment from 'moment'

export default function format_date(value) {
    if (value) {
        return moment(String(value)).format('YYYY-MM-DD')
       }
}