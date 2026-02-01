import React, { Component } from 'react'

export class NewsItems extends Component {

       
    render() {
        let { title, description, imgUrl,newsUrl } = this.props;
        return (
            <div>
                <div className="card" >
                    <img src={!imgUrl?"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR9Uwbl4UlWP16fGnZ10E25OaFP6ImiSIKjpg&s":imgUrl} className="card-img-top" alt="..." />
                    <div className="card-body">
                        <h5 className="card-title">{title}</h5>
                        <p className="card-text">{description}</p>
                        <a href={newsUrl} target='_blank' className="btn btn-primary">Go somewhere</a>
                    </div>
                </div>
            </div>
        )
    }
}

export default NewsItems
