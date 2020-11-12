<script>
  import Movie from './Movie.svelte';
  export let movies;
  export let urlSmall;
</script>

<style>
  .Thumbnail {
    height: 300px;
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    text-align: center;
    z-index: 2;
  }
  .movies {
    height: 250px;
    display: flex;
    flex-direction: row;
    align-items: flex-end;
    justify-content: flex-start;
    overflow: auto;
  }
  button {
    background: var(--red);
    color: var(--white);
    padding: 10px;
    margin-bottom: 10px;
    outline: none;
    width: 150px;
    border-radius: 5px;
    border: none;
  }
</style>

<div class="Thumbnail">
  <button>Comprar ticket</button>
  <div class="movies">
    {#each movies as movie (movie.id)}
      <Movie {movie} {urlSmall}/>
    {/each}
  </div>
</div>