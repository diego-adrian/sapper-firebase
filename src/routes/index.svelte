<script context="module">
  export async function preload(page, session) {
		const { API_KEY_MOVIEDB, LANGUAGE_MOVIEDB, URL_MOVIEDB, URL_SMALL_IMAGE, URL_BIG_IMAGE } = session;
		let movies = await this.fetch(`${URL_MOVIEDB}movie/popular?api_key=${API_KEY_MOVIEDB}&language=${LANGUAGE_MOVIEDB}&page=1`);
		movies = await movies.json();
		movies = movies.results || [];
    return { movies, URL_SMALL_IMAGE, URL_BIG_IMAGE };
  }
</script>
<script>
	import Store from '../store';
	import Page from '../components/Page.svelte';
	import Thumbnail from '../components/Thumbnail.svelte';
	export let movies;
	export let URL_SMALL_IMAGE;
	export let URL_BIG_IMAGE;
	if (Array.isArray(movies) && movies.length > 0) {
		const firstMovie = movies[0];
		Store.update(state => ({
			...state,
			id: firstMovie.id,
			adult: firstMovie.adult,
			url: firstMovie.poster_path,
			title: firstMovie.title,
			ranking: firstMovie.vote_average,
			detail: firstMovie.overview
		}));
	}
</script>

<style>
	@media (min-width: 480px) {
	}
</style>

<svelte:head>
	<title>Movie Svelte</title>
</svelte:head>

<Page urlBig={URL_BIG_IMAGE}>
	<Thumbnail {movies} urlSmall={URL_SMALL_IMAGE} />
</Page>
