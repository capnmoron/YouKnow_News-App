import React, { useEffect, useState } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component';
import NewsItem from './NewsItem'
import Spinner from './Spinner';

const News = (props)=> {
    const [articles, setArticles] = useState([])
    const [loading, setLoading] = useState(true)
    const [page, setPage] = useState(1)
    const [totalResults, setTotalResults] = useState(0)
    
    const caps = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }


    // async updateNews(){
    //     const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apikey=9bbfbd78e9294de39ef18af8d21fd95a&pageSize=${props.pageSize}`;
    //     this.setState({loading: true});
    //     let data = await fetch(url);
    //     let parsedData = await data.json();
    //     this.setState({ articles: parsedData.articles, totalResults: parsedData.totalResults, loading: false })
    // }
    useEffect(async() => {
        document.title = `${caps(props.category)} - YouKnow`
        props.setProgress(10)
        let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apikey=9bbfbd78e9294de39ef18af8d21fd95a&pageSize=${props.pageSize}`;
        setLoading(true);
        let data = await fetch(url);
        props.setProgress(30)
        let parsedData = await data.json();
        props.setProgress(50)
        setArticles(parsedData.articles)
        setTotalResults(parsedData.totalResults)
        setLoading(false)
        props.setProgress(100)
    }, [])

    // handlePrevClick = async () => {
    //     let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apikey=9bbfbd78e9294de39ef18af8d21fd95a&page=${this.state.page - 1}&pageSize=${props.pageSize}`;
    //     this.setState({ loading: true });
    //     let data = await fetch(url);
    //     let parsedData = await data.json();
    //     this.setState({
    //         articles: parsedData.articles,
    //         page: this.state.page - 1,
    //         loading: false
    //     });

    //     // this.setState({page: this.state.page - 1})
    //     // this.updateNews();
    // }

    // handleNextClick = async () => {
    //     if (!(this.state.page + 1 > Math.ceil(this.state.totalResults / 20))) {
    //         let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apikey=9bbfbd78e9294de39ef18af8d21fd95a&page=${this.state.page + 1}&pageSize=${props.pageSize}`;
    //         this.setState({ loading: true })
    //         let data = await fetch(url);
    //         let parsedData = await data.json();
    //         this.setState({
    //             articles: parsedData.articles,
    //             page: this.state.page + 1,
    //             loading: false
    //         });
    //     }

        // this.setState({page: this.state.page + 1})
        // this.updateNews();
    // }
    const fetchMoreData = async () => {
        let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apikey=9bbfbd78e9294de39ef18af8d21fd95a&page=${page+1}&pageSize=${props.pageSize}`;
        setPage(page+1);
        let data = await fetch(url);
        let parsedData = await data.json();
        setArticles(articles.concat(parsedData.articles))
        setTotalResults(parsedData.totalResults)
        setLoading(false)
      };

        return (
            <div className="container my-3">
                <h1 className="text-center" style={{margin: '35px 0px', marginTop: '90px'}}>YouKnow - Top Headlines from {caps(props.category)}   </h1>
                {loading && <Spinner />}
                <InfiniteScroll
                    dataLength={articles.length}
                    next={fetchMoreData}
                    hasMore={articles.length !== totalResults}
                    loader={<Spinner />}
                >
                    <div className="container">
                    <div className="row">
                        {articles.map((element) => {
                            return <div className="col-md-4" key={element.url} >
                                <NewsItem title={element.title ? element.title.slice(0, 45) : ""} description={element.description ? element.description.slice(0, 88) : ""} imageUrl={element.urlToImage} newsUrl={element.url} author={element.author ? element.author : "Unknown"} date={element.publishedAt} />
                            </div>
                        })}
                    </div>
                    </div>
                </InfiniteScroll>
                {/* <div className="container d-flex justify-content-between">
                    <button disabled={this.state.page <= 1} type="button" class="btn btn-dark" onClick={this.handlePrevClick}>&larr; Previous</button>
                    <button disabled={this.state.page + 1 > Math.ceil(this.state.totalResults / props.pageSize)} type="button" className="btn btn-dark" onClick={this.handleNextClick}>Next &rarr;</button>
                </div> */}
            </div>
        )
    
}

export default News
