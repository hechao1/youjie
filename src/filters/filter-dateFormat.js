import moment from 'moment'

const dateFormat = (timestamp, formatType = 'YYYY-MM-DD HH:mm:ss') => {
	if(_.isString(timestamp)){
		if(timestamp.indexOf('-') == -1){
			timestamp = +timestamp
		}
	}
    if(!timestamp) return '--'
    return moment(timestamp).format(formatType)
}

export default dateFormat
