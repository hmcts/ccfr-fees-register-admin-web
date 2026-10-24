Feature('FEE Reg Admin Web Smoke Test');

Scenario('FEE Reg Admin Web Health Check Test', async ({I}) => {
  await I.amOnPage('/');

  // Extract the content of the <pre> tag
  const response = await I.executeScript(() => {
    const preElement = document.querySelector('pre');
    return preElement ? preElement.textContent : null;
  });

  if (!response) {
    throw new Error('Failed to extract JSON from the response');
  }

  console.log('Extracted JSON:', response); // Log the extracted JSON
  const jsonResponse = JSON.parse(response); // Parse the JSON response

  // Validate the JSON structure and values
  if (
    jsonResponse.status === 'UP' &&
    jsonResponse.fees?.status === 'UP' &&
    jsonResponse.idamapi?.status === 'UP'
  ) {
    console.log('Health check passed!');
  } else {
    throw new Error('Health check failed: Response does not match expected output');
  }
});
