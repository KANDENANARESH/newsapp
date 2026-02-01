import React, { Component } from 'react'
import NewsItems from './NewsItems'
import Loading from './Loading';
import PropTypes from 'prop-types'; 
import InfiniteScroll from "react-infinite-scroll-component";

export class News extends Component {
  
        
static defaultProps={
  country:'us',
  pageSize:12,
  category:'general',
}

static propTypes ={
  country:PropTypes.string,
  pageSize:PropTypes.number,
  category:PropTypes.string,
}

constructor() {
    super();
    this.state = {
        articles:[],
        page:1,
        totalResults:0,
    }
}

   async newsUpdate(){
    this.props.setProgress(10)
    const url=`https://newsapi.org/v2/top-headlines?country=us&category=${this.props.category}&apiKey=d4183b87b84f4966b265c54f3ef2b5e9&page=${this.state.page}&pageSize=12`;
    const data = await fetch(url);
    this.props.setProgress(30)
    const parseddata = await data.json();
    this.props.setProgress(70)
    this.setState({articles:parseddata.articles,
      totalResults:parseddata.totalResults
    })
    this.props.setProgress(100)

   }

  async componentDidMount(){
    this.newsUpdate();
  }

  fetchMoreData= async() =>  {
    this.setState({page:this.state.page+1})
    const url=`https://newsapi.org/v2/top-headlines?country=us&category=${this.props.category}&apiKey=d4183b87b84f4966b265c54f3ef2b5e9&page=${this.state.page}&pageSize=12`;
    const data = await fetch(url);
    const parseddata = await data.json();
    this.setState({articles:this.state.articles.concat(parseddata.articles),
      totalResults:parseddata.totalResults
    })

  }

  handlePrevClick=async ()=>{
   
    this.setState({page:this.state.page-1});
    this.newsUpdate();
  }
  handleNextClick= async ()=>{
    if(this.state.page+1 > Math.ceil(this.state.totalResults/12)){

    }
    else{
    
    this.setState({page:this.state.page+1});
    this.newsUpdate();

    }
  }
  render() {
    return (
      <div>
        <div className='container my-3 d-block mx-auto'>
            <h2>Headlines</h2>
            {this.state.loading && <Loading/>}
            {/** these code is for infinite scroll in react */}

            <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length !== this.state.totalResults}
          loader={<Loading />}
        >
          

            <div className='row mt-3'>
                { 
                    this.state.articles.map((ele)=>{
                    
                      return   <div className='col-md-4 mt-3'>
                        {/**slice(0,50) is used keep the size of the card same with same no of charaters in all the cards */}
                <NewsItems title={ele.title?ele.title.slice(0,50):""} description={ele.discription?ele.description.slice(0,50):""} imgUrl={ele.urlToImage} newsUrl={ele.url} />
                </div>
                
                    })
                }
                
            </div>
            </InfiniteScroll>
            {/** these code is for page transition */}

            {/* <div className="d-flex justify-content-between">
            <button type="button" disabled={this.state.page<=1} onClick={this.handlePrevClick} className="btn btn-dark">&larr;Prev</button>
            <button type="button" disabled={this.state.page+1 > Math.ceil(this.state.totalResults/12)} onClick={this.handleNextClick} className="btn btn-dark">Next&larr;</button>
            </div> */}

        </div>
      </div>
    )
  }
}

export default News
