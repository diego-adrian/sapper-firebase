import { writable } from 'svelte/store';

const state = {
  id: null,
  url: null,
  title: null,
  adult: null,
  detail: null,
  ranking: null
};

export default writable(state);