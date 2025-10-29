fetch('/icp', {
  method: 'POST',
	headers: {
		'Content-Type': 'application/json'
	},
	body: JSON.stringify({
		domain: 'https://hono.dev'
	})
})