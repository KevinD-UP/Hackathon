import React from "react";
import Article from "~/components/Article";

type AnalysisResult = {
    score: number;
}

type SourceArticle = {
    sourceName: string;
    author: string;
    title: string;
    description: string;
    url: string;
    urlToImage: string;
    publishedAt: string;
}

type ArticleWithAnalysis = {
    analysisResult: AnalysisResult,
    article: SourceArticle
}

type ArticleCarouselProps = {
    articles: ArticleWithAnalysis[]
}

export default function ArticleCarousel({articles}: ArticleCarouselProps) {

   /* const articles = [
        {
            img: "https://mdbootstrap.com/img/Photos/Slides/img%20(15).jpg",
            title: "Incendie dans l'Amazonie",
            description: "Some representative placeholder content for the first slide.",
            isActive: true
        },
        {
            img: "https://mdbootstrap.com/img/Photos/Slides/img%20(22).jpg",
            title: "Inondations en France",
            description: "Some representative placeholder content for the second slide.",
            isActive: false
        },
        {
            img: "https://mdbootstrap.com/img/Photos/Slides/img%20(23).jpg",
            title: "La fonte des glaciers",
            description: "Some representative placeholder content for the third slide.",
            isActive: false
        }
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
    ];*/

    console.log(articles);
    let head = articles.shift(); // removes and stores first element in "head"
    head = head === undefined ?
        {
            analysisResult: {score: 0},
            article : {
                sourceName: "",
                author: "",
                title: "",
                description: "",
                url: "",
                urlToImage: "",
                publishedAt: ""
            }
        } : head;

    return (
        <div id="carouselExampleCaptions" className="carousel slide relative py-6" data-bs-ride="carousel">
            <div className="carousel-inner relative w-full overflow-hidden">

                <Article img={head.article.urlToImage}
                         title={head.article.title}
                         description={head.article.description}
                         url={head.article.url}
                         isActive={true}/>

                {
                    articles.map((wrappedArticle) => (
                        <Article img={wrappedArticle.article.urlToImage}
                            title={wrappedArticle.article.title}
                            description={wrappedArticle.article.description}
                            url={wrappedArticle.article.url}
                            isActive={false}/>
                    ))
                }
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