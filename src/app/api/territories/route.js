export async function GET(request) {

  const response = await fetch(process.env.API_URL + '/Territories/All', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  });

  return new Response(JSON.stringify(await response.json()),
    {
      headers: {
        'Content-Type': 'application/json'
      }
    });
}

