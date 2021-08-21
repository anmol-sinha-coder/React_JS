import React from "react";
import axios from "axios";
import Grid from "@material-ui/core/Grid";
import { CircularProgress } from "@material-ui/core";
import InfiniteScroll from "react-infinite-scroll-component";
import "./styles.css";

export default function App() {
  const [responseData, setResponseData] = React.useState([]);
  const [isNext, setNext] = React.useState(false);
  const [pageCount, setCount] = React.useState(-1);

  const loadMoreData = () => {
    setCount(pageCount + 1);
  };

  React.useEffect(() => {
    if (pageCount !== -1) {
      setNext(true);
      axios
        .get(`https://picsum.photos/v2/list?page=${pageCount}&limit=100`)
        .then((response) => {
          setResponseData((prev) => [...prev, ...response.data]);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [pageCount]);

  return (
    <Grid>
      <header>
        <h1>Fetching Data</h1>
      </header>
      <body>
        <button onClick={loadMoreData}> Click to fetch Data </button>
        <InfiniteScroll
          dataLength={responseData.length}
          next={loadMoreData}
          hasMore={isNext}
          loader={
            <Grid
              style={{ height: "80%", paddingLeft: "35%", overflow: "hidden" }}
            >
              Loading More Data
              <CircularProgress />
            </Grid>
          }
        >
          <Grid
            container
            justify="center"
            style={{
              width: "100%",
              height: "100%",
              marginTop: "1vh",
              border: "1px solid red"
              // border:"1px solid white"
            }}
          >
            <center>
              <table class="container">
                <tr>
                  <thead>
                    <th scope="col">ID</th>
                    <th scope="col">Author</th>
                    <th scope="col">Picture</th>
                    <th scope="col">Download Url</th>
                  </thead>
                </tr>
                <tbody>
                  {responseData.map((data, index) => (
                    <tr>
                      <Grid key={index.toString()}>
                        <td>{data.id}</td>
                        {/* <td>{data.download_url}</td> */}

                        <td>{data.author}</td>
                        <td>
                          <img
                            height="80px"
                            width="80px"
                            src={data.download_url}
                            alt={"No img"}
                          />
                        </td>
                        <td>{data.url}</td>

                        {/* <li>{index}</li> */}
                        {console.log(data.url)}
                      </Grid>
                    </tr>
                  ))}
                </tbody>
              </table>
            </center>
          </Grid>
        </InfiniteScroll>
      </body>
    </Grid>
  );
}

// export default App;
