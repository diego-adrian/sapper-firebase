import { timestamp, files, shell } from '@sapper/service-worker';

const ASSETS = `cache${timestamp}`;

// `shell` is an array of all the files generated by the bundler,
// `files` is an array of everything in the `static` directory
const to_cache = shell.concat(files);
const staticAssets = new Set(to_cache);

self.addEventListener('install', event => {
	event.waitUntil(
		caches
			.open(ASSETS)
			.then(cache => cache.addAll(to_cache))
			.then(() => {
				self.skipWaiting();
			})
	);
});

self.addEventListener('activate', event => {
	event.waitUntil(
		caches.keys().then(async keys => {
			// delete old caches
			for (const key of keys) {
				if (key !== ASSETS) await caches.delete(key);
			}

			self.clients.claim();
		})
	);
});


/**
 * Fetch the asset from the network and store it in the cache. 
 * Fall back to the cache if the user is offline.
 */
async function fetchAndCache(request) {
	const cache = await caches.open(`offline${timestamp}`)

	try {
		const response = await fetch(request);
		cache.put(request, response.clone());
		return response;
	} catch (err) {
		const response = await cache.match(request);
		if (response) return response;

		throw err;
	}
}

self.addEventListener('fetch', event => {
	if(!(event.request.url.indexOf('http') === 0)){
    return;
  }
	if (event.request.method !== 'GET' || event.request.headers.has('range')) return;

	const soloRed = fetch(event.request);
  event.respondWith(soloRed);
});
