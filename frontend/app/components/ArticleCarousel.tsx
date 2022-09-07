import React from "react";
import Article from "~/components/Article";

export default function ArticleCarousel(){
    return (
        <div id="carouselExampleCaptions" className="carousel slide relative py-6" data-bs-ride="carousel">
            <div className="carousel-inner relative w-full overflow-hidden">
                <Article img={"https://mdbootstrap.com/img/Photos/Slides/img%20(15).jpg"}
                         title={"Incendie dans l'Amazonie"}
                         description={"Some representative placeholder content for the first slide."}
                         isActive={true}/>
                <Article img={"https://mdbootstrap.com/img/Photos/Slides/img%20(22).jpg"}
                         title={"Inondations en France"}
                         description={"Some representative placeholder content for the second slide."}
                         isActive={false}/>
                <Article img={"https://mdbootstrap.com/img/Photos/Slides/img%20(23).jpg"}
                         title={"La fonte des glaciers"}
                         description={"Some representative placeholder content for the third slide."}
                         isActive={false}/>
            </div>
            <button
                className="carousel-control-prev absolute top-0 bottom-0 flex items-center justify-center p-0 text-center border-0 hover:outline-none hover:no-underline focus:outline-none focus:no-underline left-0"
                type="button"
                data-bs-target="#carouselExampleCaptions"
                data-bs-slide="prev"
            >
                <span className="carousel-control-prev-icon inline-block bg-no-repeat" aria-hidden="true"></span>
                <span className="visually-hidden">Previous</span>
            </button>
            <button
                className="carousel-control-next absolute top-0 bottom-0 flex items-center justify-center p-0 text-center border-0 hover:outline-none hover:no-underline focus:outline-none focus:no-underline right-0"
                type="button"
                data-bs-target="#carouselExampleCaptions"
                data-bs-slide="next"
            >
                <span className="carousel-control-next-icon inline-block bg-no-repeat" aria-hidden="true"></span>
                <span className="visually-hidden">Next</span>
            </button>
        </div>
    )
}