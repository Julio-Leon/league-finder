import { useContext } from "react";
import { RedirectContext } from "../../App";

export default function CorsAlert() {

    const corsData = useContext(RedirectContext)

    let visibility= 'none'

    if (corsData.corsFailed) {
        visibility = 'flex'
    } else {
        visibility = 'none'
    }

    return (
        <div className="cors-alert-bg flex-container" style={{display: visibility}}>
            <div className="cors-alert flex-container">
                <div className='cors-failed'>
                    CORS Failed!
                </div>
                <div className='install-cors'>
                    Install Moesif Origin & CORS Changer google extension from   
                    <a href="https://chrome.google.com/webstore/detail/moesif-origin-cors-change/digfbfaphojjndkpccljibejjbppifbc" target='_blank'>Moesif Origin & Cors Changer</a> and reload page!
                </div>
            </div>
        </div>
    )
}