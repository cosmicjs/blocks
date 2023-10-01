const helpers = {
  // @ts-ignore
  getMonth: function (a) {
    var months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ]
    var month = months[a - 1]
    return month
  },
  // @ts-ignore
  stringToFriendlyDate: function (date_string) {
    const date = date_string.split("-")[2]
    const monthNumber = date_string.split("-")[1]
    const month = this.getMonth(monthNumber)
    const year = date_string.split("-")[0]
    const friendly_date = `${month} ${date}, ${year}`
    return friendly_date
  },
}

export default helpers
