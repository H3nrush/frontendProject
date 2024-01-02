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