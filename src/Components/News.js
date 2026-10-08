import React, { Component } from "react";
import NewItem from "./NewItem";
import Spinner from "./Spinner";
import PropTypes from "prop-types";

export class News extends Component {
  static defaultProps = {
    country: "us",
    pageSize: 10,
    category: "general",
  };
  static propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
  };

  constructor() {
    super();
    this.state = {
      articles: [],
      loading: false,
      page: 1,
    };
  }

  async updateNews() {
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=277973a780dc427998b85b7c3ce792d5&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    this.setState({ loading: true });
    try {
      let data = await fetch(url); // Ask NEWSAPI for news
      let parsedData = await data.json(); // Convert response to JavaScript object

      console.log("API response:", parsedData);

      // Did the server reject our request?
      if (!data.ok) {
        console.error("API Error:", parsedData);
        return;
      }

      // Make sure articles is an array
      this.setState({
        articles: parsedData.articles || [],
        totalResults: parsedData.totalResults,
        loading: false,
      });
    } catch (error) {
      console.error("Fetch error:", error);
    }
  }

  async componentDidMount() {
    this.updateNews();
  }

  handlePrevClick = async () => {
    this.setState({ page: this.state.page - 1 }, this.updateNews());
  };

  handleNextClick = async () => {
    this.setState({ page: this.state.page + 1 }, this.updateNews());
  };

  render() {
    return (
      <>
        <div className="container my-3">
          <h1 className="text-center" style={{ margin: "30px 0" }}>
            NewsMonkey - Top Headlines
          </h1>
          {this.state.loading && <Spinner />}
          <div className="row">
            {!this.state.loading &&
              (this.state.articles || []).map((element) => {
                return (
                  <div className="col-md-4" key={element.url}>
                    <NewItem
                      title={element.title ? element.title : ""}
                      description={
                        element.description
                          ? element.description.slice(0, 88)
                          : ""
                      }
                      imageUrl={element.urlToImage}
                      newsUrl={element.url}
                      author={element.author}
                      date={element.publishedAt}
                      source={element.source.name}
                    />
                  </div>
                );
              })}
          </div>
        </div>
        <div className="container d-flex justify-content-between">
          <button
            type="button"
            className="btn btn-dark"
            onClick={this.handlePrevClick}
            disabled={this.state.page <= 1}
          >
            &larr; Previous
          </button>
          <button
            type="button"
            className="btn btn-dark"
            onClick={this.handleNextClick}
            disabled={
              this.state.page + 1 >
              Math.ceil(this.state.totalResults / this.props.pageSize)
            }
          >
            Next &rarr;
          </button>
        </div>
      </>
    );
  }
}

export default News;
