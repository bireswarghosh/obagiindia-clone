const r = await fetch('http://localhost:3002/api/cms-auth', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ pin: '1234' }),
});
console.log('cms-auth 1234 ->', r.status, await r.text());
