import React, { Component } from "react";

export class NewItem extends Component {
  render() {
    let { title, description, imageUrl, newsUrl, author, date, source } =
      this.props;
    return (
      <>
        <div className="my-3">
          <div className="card">
            <span
              className="position-absolute top-0 translate-middle badge rounded-pill bg-danger"
              style={{ left: "90%", zIndex: "1" }}
            >
              {source}
            </span>
            <img
              src={
                !imageUrl
                  ? "https://s.yimg.com/lo/mysterio/api/041fa9b1ad2c1e4e9ae0f60a9b71508ad7c3ec3c4796c8f9440dc29cfeef5767/lightyear_networkapi/resizefill_w1200%3Bquality_80%3Bformat_webp/https%3A%2F%2Fmedia.zenfs.com%2Fen%2Finsidermonkey.com%2F37fef960b8d4bce669dcf86c6b29ef55.jpg"
                  : imageUrl
              }
              className="card-img-top"
              alt="..."
              onError={(e) => {
                e.target.src =
                  "https://s.yimg.com/lo/mysterio/api/041fa9b1ad2c1e4e9ae0f60a9b71508ad7c3ec3c4796c8f9440dc29cfeef5767/lightyear_networkapi/resizefill_w1200%3Bquality_80%3Bformat_webp/https%3A%2F%2Fmedia.zenfs.com%2Fen%2Finsidermonkey.com%2F37fef960b8d4bce669dcf86c6b29ef55.jpg";
              }}
            />

            <div className="card-body">
              <h5 className="card-title">{title}</h5>
              <p className="card-text">{description}...</p>
              <p className="card-text">
                <small className="text-muted">
                  By {!author ? "Unknown" : author} on{" "}
                  {new Date(date).toGMTString()}{" "}
                </small>
              </p>
              <a
                href={newsUrl}
                target="_blank"
                rel="noreferrer"
                className="btn btn-sm btn-dark"
              >
                Read More
              </a>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default NewItem;
