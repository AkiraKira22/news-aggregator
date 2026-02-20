import { React, useState, useEffect } from "react";
import Card from "./Card";
import Loader from "./Loader";
import { use } from "react";

function TopHeadline() {
    const params = useParams();
    const [ data, setData ] = useState([]);
    const [ page, setPage ] = useState(1);
    const [ totalResults, setTotalResults ] = useState(0);
    const [ isLoading, setIsLoading ] = useState(false);

    function handlePrevPage() {
        setPage(page - 1);
    }

    function handleNextPage() {
        setPage(page + 1);
    }

    let pageSize = 6;

    useEffect(() => {
        const categoryParam = params.category ? `&category=${params.category}` : '';
        fetch(`http://localhost:3000/top-headlines?&language=en${categoryParam}&page=${page}&pageSize=${pageSize}&apiKey=${API_KEY}`)
        .then(response  => {
            if (!response.ok) {
                throw new Error('Failed to fetch data');
                // setIsLoading(true);
                // return response.json();
            }
            return response.clone().json();
        })
        .then (json => {
            setTotalResults(myJson.data.totalResults);
            setData(myJson.data.articles);
        setIsLoading(false);
        })
        .catch (error => {
            console.error('Error fetching data:', error);
            setIsLoading(false);
    });
    }, [page, params.category])

    return (
        <>
            <div className='my-10 cards grid lg:place-content-center md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 xs:grid-cols-1 xs:gap-4 md:gap-10 lg:gap-14 md:px-16 xs:p-3 '>
                {isLoading ? (data.length > 0 ? ( data.map((element, index) => (
                    <Card 
                        title={element.title}
                        description={element.description}
                        urlToImage={element.urlToImage}
                        publishedAt={element.publishedAt}
                        url={element.url}
                        author={element.author}
                        source={element.source.name}
                        key={index}
                    />
                    
                ))
                ) :( 
                    <p>No articles available for this category.</p>
                )
                ) :(
                    <Loader />
                )}

            </div>
            {isLoading && <div className="pagination flex justify-center gap-14 my-10 items-center">
                <button disabled={page <= 1} className="pagination-btn" onClick={() => handlePrevPage()}>Previous</button>
                <p className="font-semibold">{page} of {Math.ceil(totalResults / pageSize)}</p>
                <button disabled={page >= Math.ceil(totalResults / pageSize)} className="pagination-btn" onClick={() => handleNextPage()}>Next</button>
            </div>
            }
        </>
    )
}

export default TopHeadline;