import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getIdApiData } from "./actions";
import "./styles/MoviePage.css";

const MoviePage = ({ idUrl }) => {
  const dispatch = useDispatch();
  const idApiData = useSelector((state) => state.idApiData); //Filmin detaylı bilgilerinin verisi

  useEffect(() => {
    fetch(idUrl)
      .then((res) => res.json())
      .then((res) => {
        if (res.Error) {
          throw new Error("Something went wrong");
        } else {
          return res;
        }
      })
      .then((res) => {
        dispatch(getIdApiData(res)); //Component prop olarak aldığı url ile API dan id araması yapar
      });
  }, [dispatch, idUrl]);

  return (
    <div id="MovieInfo">
      <img
        className="poster"
        src={idApiData.Poster === "N/A" ? "https://www.thermaxglobal.com/wp-content/uploads/2020/05/image-not-found.jpg" : idApiData.Poster}
        alt="Poster Art"
        width="225px"
        height="175px"
      ></img>
      <div>
        <strong>Title:</strong> {idApiData.Title}
      </div>
      <div>
        <strong>Released:</strong> {idApiData.Released}
      </div>
      <div>
        <strong>Runtime:</strong> {idApiData.Runtime}
      </div>
      <div>
        <strong>Genre: </strong>
        {idApiData.Genre}
      </div>
      <div>
        <strong>Director:</strong> {idApiData.Director}
      </div>
      <div>
        <strong>Actors:</strong> {idApiData.Actors}
      </div>
      <div>
        <strong>IMDB Rating:</strong> {idApiData.imdbRating}
      </div>
    </div>
  );
};

export default MoviePage;
