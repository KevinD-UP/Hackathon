import React from "react";

type ArticleProps = {
    img: string
    title: string
    description: string
    url: string
    isActive: boolean
}

export default function Article({img, title, description, url, isActive} : ArticleProps) {

    const divProps = "carousel-item relative float-left w-full"
    const active = isActive ? divProps + " active" : divProps;

    return (
        <div className={active}>
            <a href={url} target="_blank" rel="noreferrer">
                <img
                    src={img}
                    className="brightness-50 block w-full h-48 object-cover"
                    alt="..."
                />
                    <div className="carousel-caption hidden md:block absolute text-center">
                        <h5 className="text-lg font-bold">{title}</h5>
                </div>
            </a>
        </div>
    )
}