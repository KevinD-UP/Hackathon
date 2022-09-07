import React from "react";

type ArticleProps = {
    img: string
    title: string
    description: string
    isActive: boolean
}

export default function Article({img, title, description, isActive}: ArticleProps) {

    const divProps = "carousel-item relative float-left w-full"
    const active = isActive ? divProps + " active" : divProps;

    return (
        <div className={active}>
            <img
                src={img}
                className="block w-full"
                alt="..."
            />
            <div className="carousel-caption hidden md:block absolute text-center">
                <h5 className="text-xl">{title}</h5>
                <p>{description}</p>
            </div>
        </div>
    )
}