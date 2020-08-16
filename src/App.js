import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import MoviePage from "./MoviePage";
import { getTitleApiData, searchByTitle, searchById, loading, setpageCount, paginateApiData, setStartIndex } from "./actions";
import "./styles/App.css";

const App = () => {
  const dispatch = useDispatch();
  const titleUrl = useSelector((state) => state.apiTitleUrl); //API a title ile istek göndermek için
  const idUrl = useSelector((state) => state.apiIdUrl); //API a id ile istek göndermek için
  const titleApiData = useSelector((state) => state.titleApiData); //API dan gelen title ile istenmiş veriler
  const startIndex = useSelector((state) => state.dataStartIndex); //Pagination için verilerin başlangıç noktası
  const paginatedData = useSelector((state) => state.paginatedData); //Hangi sayfada olunduğu dikkate alınarak kesilmiş veri
  const pageNum = useSelector((state) => state.pageNum); //Gelen film sayısına göre sayfa sayısı
  const isLoaded = useSelector((state) => state.isLoaded); //API verileri alınırken "Loading..." gösterilmesi için

  const [userTitle, setUserTitle] = useState("Pokemon");
  const [viewMovie, setViewMovie] = useState(false); //Filmin ismine tıklandığında detaylı sayfayının gösterilmesi için

  useEffect(() => {
    dispatch(searchByTitle(userTitle));
    fetch(titleUrl)
      .then((res) => res.json())
      .then((res) => {
        if (res.Error) {
          throw new Error("Something went wrong");
        } else {
          return res;
        }
      })
      .then((res) => {
        dispatch(getTitleApiData(res.Search)); //Önce tam veriler API dan alınıyor
        dispatch(setpageCount(res.Search.length));
      })
      .then(() => dispatch(loading()));
  }, [dispatch, titleUrl]);

  useEffect(() => {
    dispatch(paginateApiData(titleApiData.slice(startIndex, startIndex + 5))); //Sayfa ilk açıldğında tam verileri kesilmiş veriye çevirir
  }, [dispatch, titleApiData, startIndex]);

  const handlePages = (page) => {
    const newIndex = 5 * (page - 1);
    dispatch(setStartIndex(newIndex)); //Sayfa değiştiğinde başlangıç noktasını değiştirir
  };

  const handleUserTitle = (e) => {
    setUserTitle(e.target.value); //Aramada yazılan değer
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(loading());
    dispatch(searchByTitle(userTitle)); //Kullanıcı arama yaptığında API a istek gönderir
  };

  const handleMoviePage = (id) => {
    setViewMovie(true);
    dispatch(searchById(id)); //Bir filmin ismine tıklandığında detaylı sayfa için id ile API a istek yollar
  };

  return (
    <div className="App">
      {!isLoaded ? (
        <h1> Loading...</h1>
      ) : viewMovie ? (
        <div id="movieInfo">
          <MoviePage idUrl={idUrl} />
          <button className="btn" id="backBtn" onClick={() => setViewMovie(false)}>
            Back
          </button>
        </div>
      ) : (
        <div className="movieList">
          <form onSubmit={handleSubmit}>
            <input type="text" id="userTitle" onChange={handleUserTitle} value={userTitle} />
            <button className="btn">Search</button>
          </form>
          <div className="gridContainer">
            {paginatedData.map((item, index) => (
              <div className="gridItem" key={index}>
                <img
                  className="poster"
                  src={item.Poster === "N/A" ? "https://www.thermaxglobal.com/wp-content/uploads/2020/05/image-not-found.jpg" : item.Poster}
                  alt="Poster Art"
                  width="80px"
                  height="100px"
                ></img>
                <div className="title" onClick={() => handleMoviePage(item.imdbID)}>
                  Title: {item.Title}
                </div>
                <div className="year">Year: {item.Year}</div>
                <div className="imdbId">IMDB ID: {item.imdbID}</div>
              </div>
            ))}
          </div>
          <div className="pagination">
            {pageNum.map((page) => (
              <span className="page" key={page} onClick={() => handlePages(page)}>
                {page}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
