import { useQuery } from "react-query";
import axios from "axios";

const fetchSuperHeroes = () => {
  return axios.get("http://localhost:4000/superheroes");
};

const onSuccess = (data) => {
  console.log('Perform side effect after data fetching', data);
}

const onError = (error) => {
  console.log('Perform side effect after encountering error', error);
}

export const RQSuperHeroesPage = () => {
  const { isLoading, data, error, isError, isFetching, refetch } = useQuery("super-heroes", fetchSuperHeroes, 
  { onSuccess: onSuccess,
    onError: onError });

  console.log({isLoading, isFetching})

  if (isLoading || isFetching) {
    return <h2>Loading...</h2>;
  }

  if (isError) {
    return <h2>{error.message}</h2>;
  }

  return (
    <>
      <h2>RQ Super Heroes Page</h2>
      <button onClick={refetch}>Fetch Heros</button>
      {data.data.map((hero) => {
        return <div>{hero.name}</div>;
      })}
    </>
  );
};
