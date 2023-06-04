import * as XLSX from 'xlsx'

export function getDate(value) {
  if (typeof value === 'object' || typeof value === 'number') {
    var date = new Date(value)
    var day =
      date.getDate().toString().length === 1
        ? '0' + date.getDate()
        : date.getDate()
    var month =
      (date.getMonth() + 1).toString().length === 1
        ? '0' + (date.getMonth() + 1)
        : date.getMonth() + 1
    var year = date.getFullYear()
    return year + '-' + month + '-' + day

    //return day + '-' + month + '-' + year
  } else {
    return value
  }
}
export function dateFormat(value) {
  if (value) {
    value = value.split('-')
    value = value[2] + '-' + value[1] + '-' + value[0]
    return value
  }
}

export const exportTemplateExcel = (template, title) => {
  var wb = XLSX.utils.book_new()
  var ws = XLSX.utils.json_to_sheet(template)
  XLSX.utils.book_append_sheet(wb, ws, title)
  XLSX.writeFile(wb, title + '.xlsx')
}

export function getDateTime() {
  var today = new Date()
  var date =
    today.getDate() + '-' + (today.getMonth() + 1) + '-' + today.getFullYear()
  var time =
    today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds()
  var dateTime = date + ' ' + time
  // console.log(date)
  return date
}
