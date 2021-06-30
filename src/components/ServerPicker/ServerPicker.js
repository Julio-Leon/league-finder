import { useContext } from "react"
import { RedirectContext } from "../../App"

export default function ServerPicker() {

    const serverData = useContext(RedirectContext)

    const onClickNA1 = () => {
        serverData.setServer('na1')
    }

    const onClickBR1 = () => {
        serverData.setServer('br1')
    }

    const onClickEUN1 = () => {
        serverData.setServer('eun1')
    }

    const onClickEUW1 = () => {
        serverData.setServer('euw1')
    }

    const onClickJP1 = () => {
        serverData.setServer('jp1')
    }

    const onClickKR = () => {
        serverData.setServer('kr')
    }

    const onClickLA1 = () => {
        serverData.setServer('la1')
    }

    const onClickLA2 = () => {
        serverData.setServer('la2')
    }

    const onClickOC1 = () => {
        serverData.setServer('oc1')
    }

    const onClickRU = () => {
        serverData.setServer('ru')
    }

    const onClickTR1 = () => {
        serverData.setServer('tr1')
    }

    let fontColor = ''
    if (serverData.darkModeOn) {
        fontColor = 'white'
    } else {
        fontColor = 'black'
    }

    return (
        <div className="server-picker flex-container">
            <div onClick={onClickNA1} style={{color: fontColor}}>NA</div>
            <div onClick={onClickBR1} style={{color: fontColor}}>BR</div>
            <div onClick={onClickEUN1} style={{color: fontColor}}>EUN</div>
            <div onClick={onClickEUW1} style={{color: fontColor}}>EUW</div>
            <div onClick={onClickJP1} style={{color: fontColor}}>JP</div>
            <div onClick={onClickKR} style={{color: fontColor}}>KR</div>
            <div onClick={onClickLA1} style={{color: fontColor}}>LAN</div>
            <div onClick={onClickLA2} style={{color: fontColor}}>LAS</div>
            <div onClick={onClickOC1} style={{color: fontColor}}>OC</div>
            <div onClick={onClickRU} style={{color: fontColor}}>RU</div>
            <div onClick={onClickTR1} style={{color: fontColor}}>TR</div>
        </div>
    )
}