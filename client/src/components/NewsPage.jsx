import { React, useState, useEffect } from "react";
import Card from "./Card";
import Loader from "./Loader";

function NewsPage() {
    const [data, setData] = useState([]);
    const [page, setPage] = useState(1);
    const [totalResults, setTotalResults] = useState(0);
    const [isLoading, setIsLoading] = useState(false);

    function handlePrevPage() {
        setPage(page - 1);
    }

    function handleNextPage() {
        setPage(page + 1);
    }

    let pageSize = 12;

    useEffect(() => {
        setIsLoading(true);
        fetch(`http://localhost:3000/all-news?page=${page}&pageSize=${pageSize}`)
            .then(response => {
                if (response.ok) {
                    return response.json();
                }
                throw new Error('Network response was not ok');
            })
            .then(myJson => {
                if (myJson && myJson.data) {
                    setTotalResults(myJson.data.totalResults || 0);
                    setData(myJson.data.articles || []);
                }
                setIsLoading(false);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
                setData([]);
                setTotalResults(0);
                setIsLoading(false);
            });
    }, [page])

    return (
        <>
            <div className='my-10 cards grid lg:place-content-center md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 xs:grid-cols-1 xs:gap-4 md:gap-10 lg:gap-14 md:px-16 xs:p-3'>
                {!isLoading ? (data.length > 0 ? data.map((element, index) => (
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

                )) : <p>No articles available.</p>) : <Loader />}
            </div>
            {!isLoading && data.length > 0 && (
                <div className="pagination flex justify-center gap-14 my-10 items-center">
                    <button disabled={page <= 1} className="pagination-btn" onClick={() => handlePrevPage()}>Previous</button>
                    <p className="font-semibold">{page} of {Math.ceil(totalResults / pageSize)}</p>
                    <button disabled={page >= Math.ceil(totalResults / pageSize)} className="pagination-btn" onClick={() => handleNextPage()}>Next</button>
                </div>
            )}
        </>
    )
}

export default NewsPage;