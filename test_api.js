const API_KEY = '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';

async function testOpenAIAPI() {
  try {
    console.log('Testing OpenAI API...');
    
    const response = await fetch('https://api.openai.com/v1/images/generations', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${API_KEY}`,
      },
      body: JSON.stringify({
        prompt: 'A simple red apple on a white background',
        n: 1,
        size: '512x512',
      }),
    });

    const data = await response.json();
    
    if (response.ok) {
      console.log('✅ API call successful!');
      console.log('Response:', JSON.stringify(data, null, 2));
      
      if (data.data && data.data[0] && data.data[0].url) {
        console.log('✅ Image URL received:', data.data[0].url);
      } else {
        console.log('❌ No image URL in response');
      }
    } else {
      console.log('❌ API call failed');
      console.log('Status:', response.status);
      console.log('Error:', JSON.stringify(data, null, 2));
    }
  } catch (error) {
    console.log('❌ Network error:', error.message);
  }
}

testOpenAIAPI(); 