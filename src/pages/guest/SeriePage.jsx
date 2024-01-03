import { useEffect, useState } from "react";
import Header from "../../components/guest/Header";

function SeriesPage(){
  const [series , setSeries] = useState(null);

  useEffect(()=>{
    (async () =>{
      const seriesRespond = await fetch("http://localhost:8080/api/Series");

      const seriesRespondData = await seriesRespond.json();
      setSeries(seriesRespondData);
    })();
  },[]);

  return(
    <>
    <Header />
      Series page
      <h1>List Of the series:</h1>
      {series ? (
      <>
        {series.map((serie)=>{
          return(
            <article>
              <h2>{serie.seriesName}</h2>
              <iframe width="560" height="315" src={serie.seriesUrl} title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
            </article>
          );
        })}
      </>
      ) : (
        <p>Loading...!</p>
      )}
    </>
  )
}
export default SeriesPage;