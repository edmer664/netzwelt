export async function POST(request) {

  const body = await request.json();

  // send post request to login api
  const response = await fetch(process.env.API_URL + '/Account/SignIn', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      username: body.username,
      password: body.password
    })
  });

  return new Response(JSON.stringify(await response.json()),
    {
      headers: {
        'Content-Type': 'application/json'
      },
      status: response.status
    }
  );

}
