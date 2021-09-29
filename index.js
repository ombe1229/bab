const KEY = '' // neis api key
const ATPT_OFCDC_SC_CODE = 'J10'
const SD_SCHUL_CODE = '7530119'

const today = new Date()
let year = today.getFullYear()
let month = today.getMonth() + 1
let date = today.getDate()
const MLSV_YMD = String(year)+String(month)+String(date)

const myHeaders = new Headers()
myHeaders.append('Content-Type', 'json')

const url = `https://open.neis.go.kr/hub/mealServiceDietInfo?KEY=${KEY}&Type=json&ATPT_OFCDC_SC_CODE=${ATPT_OFCDC_SC_CODE}&SD_SCHUL_CODE=${SD_SCHUL_CODE}`   
const init = {method: 'GET', headers: myHeaders}

const request = new Request(url, init)
const response = await request.loadJSON()

let menu = response.mealServiceDietInfo[1].row[0].DDISH_NM
let replacedMenu = menu.replace('<br/>', '\n')

if (config.runsInWidget) {
    try {
        let widget = createWidget(`${date}/${month} 급식 정보`, replacedMenu)
        Script.setWidget(widget)
        Script.complete()
    } catch (e) {
        let widget = createWidget('에러', '오늘 밥 없는듯')
        Script.setWidget(widget)
        Script.complete()
    }
}


function createWidget(title, description) {
    let widget = new ListWidget()
    let wTitle = widget.addText(title)
    let wDescription = widget.addText(description)

    wTitle.textColor = Color.white()
    wTitle.font = Font.systemFont(20)
    widget.addSpacer(5)
    wDescription.textColor = Color.white()
    wDescription.font = Font.systemFont(15)
    widget.backgroundColor = new Color('#53D769')

    return widget
}
