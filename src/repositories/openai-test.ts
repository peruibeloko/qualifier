fetch('/icp', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    domain: 'https://fly.io/'
  })
})
  .then(r => r.json())
  .then(icp =>
    fetch('/prospects', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        domains: ['https://deno.com/', 'https://oxide.computer/'],
        icp
      })
    })
  )
  .then(r => r.json());
