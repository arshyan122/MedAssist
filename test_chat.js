async function test() {
  try {
    const timestamp = Date.now();
    // Register
    const regRes = await fetch('http://localhost:5000/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: 'Chat Tester',
        email: `tester${timestamp}@example.com`,
        password: 'password123'
      })
    });
    
    const regData = await regRes.json();
    const token = regData.token;
    
    // Call chat API
    const chatRes = await fetch('http://localhost:5000/api/chat', {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}` 
      },
      body: JSON.stringify({ message: "Hello AI" })
    });
    
    const chatData = await chatRes.json();
    console.log("STATUS:", chatRes.status);
    console.log("RESPONSE:", chatData);
  } catch (err) {
    console.error("ERROR:", err.message);
  }
}

test();
