const KEY = ''
const ATPT_OFCDC_SC_CODE = 'J10'
const SD_SCHUL_CODE = '7530119'

const date = new Date(+new Date() + 3240 * 10000)
const MLSV_YMD = date.toISOString().substring(0, 10).replaceAll("-", "")

const myHeaders = { "Content-Type": "json" }

const url = `https://open.neis.go.kr/hub/mealServiceDietInfo?KEY=${KEY}&Type=json&ATPT_OFCDC_SC_CODE=${ATPT_OFCDC_SC_CODE}&SD_SCHUL_CODE=${SD_SCHUL_CODE}&MLSV_YMD=${MLSV_YMD}`
const init = { method: 'GET', headers: myHeaders }

const request = new Request(url, init)
const response = await request.loadJSON()

let menu = response.mealServiceDietInfo[1].row[0].DDISH_NM
let replacedMenu = menu.replaceAll('<br/>', '\n')

if (config.runsInWidget) {
    try {
        let widget = createWidget(replacedMenu.replace(/[0-9?.]/g, ''))
        Script.setWidget(widget)
        Script.complete()
    } catch (e) {
        let widget = createWidget('에러', '오늘 밥 없는듯')
        Script.setWidget(widget)
        Script.complete()
    }
}


function createWidget(description) {
    let widget = new ListWidget()
    let wDescription = widget.addText(description)
    wDescription.textColor = Color.white()
    wDescription.font = Font.systemFont(13)
    widget.backgroundColor = new Color('#76a2e8')

    return widget
}
