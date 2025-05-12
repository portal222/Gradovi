import React from "react";

const NyTimes = (props) => {

    if (props.news.length === 0) {
        return (
            <div className="tabelaZemlje">
                <div className="nytTitle">
                    nothing found in NYT
                </div>
            </div>
        )
    }

    return (
        <div className="tabelaZemlje">
            <div className="nytName">The New York Times News</div>
            <div >
                {props.news.map((details, id) => (
                    <div key={id} >
                        <div className="nytTitle"> {details.headline.main} </div>
                        <div className="nytAbs">{details.abstract} </div>
                        <div className="nytPar">{details.lead_paragraph} </div>
                        <div className="flag">
                            <img className="nytImg" src={details.multimedia.default.url} alt="no picture" />
                        </div>
                        <div className="nytDate">
                            <div>{details.byline.original}</div>
                            <div>{details.pub_date} </div>
                            <a href={details.web_url} target="_blank">NYT</a>
                        </div>
                        <hr></hr>
                    </div>
                ))}

            </div>
        </div>

    )

}
export default NyTimes;