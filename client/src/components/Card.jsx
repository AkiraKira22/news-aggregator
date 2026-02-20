import React from "react";

function Card(props) {
    <div className="card-container mt-10">

        <div className="card-container flex-wrap p-5 gap-1 mb-1">
            <b className="title">{props.title}</b>
            <div className="card-img">
                <img src={props.imgUrl} alt="img"/>
            </div>
        </div>
        
        <div className="description">
            <p>
                {props.description?.substring(0, 200)}
            </p>
        </div>

        <div className="info">
            <div className="source-info flex items-center gap-2">
                <span className="font-semibold">Source: </span>
                <a href="{props.url}" target="_blank" className="link underline break-word">{props.source.substring(0,70)}</a>
            </div>

            <div className="author-published-info flex flex-col">
                <p className="author">
                    <span>Author: {props.author}</span>
                </p>
                <p className="published-at">
                    <span>Published at: {props.publishedAt}</span>
                </p>
            </div>
        </div>
    </div>
}

export default Card;