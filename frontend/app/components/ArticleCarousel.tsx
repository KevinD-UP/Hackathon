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

                <Article key={head.article.title}
                         img={head.article.urlToImage}
                         title={head.article.title}
                         url={head.article.url}
                         isActive={true}/>

                {
                    articles.map((wrappedArticle) => (
                        <Article
                            key={wrappedArticle.article.title}
                            img={wrappedArticle.article.urlToImage}
                            title={wrappedArticle.article.title}
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