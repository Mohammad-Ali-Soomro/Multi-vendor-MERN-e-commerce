// Test the DEPLOYED backend activation endpoint
const https = require("https");
const jwt = require("jsonwebtoken");
require("dotenv").config({ path: "config/.env" });

function post(hostname, path, body) {
  return new Promise((resolve, reject) => {
    const data = JSON.stringify(body);
    const req = https.request({
      hostname,
      port: 443,
      path,
      method: "POST",
      headers: { "Content-Type": "application/json", "Content-Length": Buffer.byteLength(data) },
    }, (res) => {
      let body = "";
      res.on("data", (chunk) => body += chunk);
      res.on("end", () => {
        try {
          resolve({ status: res.statusCode, data: JSON.parse(body) });
        } catch (e) {
          resolve({ status: res.statusCode, data: body });
        }
      });
    });
    req.on("error", reject);
    req.write(data);
    req.end();
  });
}

async function testDeployed() {
  const HOST = "multi-vendor-mern-e-commerce-gamma.vercel.app";

  // Step 0: Test if backend is alive
  console.log("=== STEP 0: Test backend health ===");
  const healthRes = await new Promise((resolve, reject) => {
    https.get(`https://${HOST}/test`, (res) => {
      let body = "";
      res.on("data", (chunk) => body += chunk);
      res.on("end", () => resolve({ status: res.statusCode, data: body }));
    }).on("error", reject);
  });
  console.log(`Status: ${healthRes.status}`);
  console.log(`Response: ${healthRes.data}`);

  if (healthRes.status !== 200) {
    console.log("!!! Backend is NOT responding !!!");
    return;
  }

  // Step 1: Create an activation token using the SAME secret
  const testEmail = `deployed_test_${Date.now()}@test.com`;
  const userData = {
    name: "Deploy Test User",
    email: testEmail,
    password: "Test1234",
    avatar: {
      public_id: "test_avatar_id",
      url: "https://res.cloudinary.com/test/image/upload/test.jpg",
    },
  };

  // Use LOCAL activation secret to create the token
  const localToken = jwt.sign(userData, process.env.ACTIVATION_SECRET, { expiresIn: "30m" });
  console.log(`\n=== STEP 1: POST /api/v2/user/activation on DEPLOYED backend ===`);
  console.log(`Using ACTIVATION_SECRET: ${process.env.ACTIVATION_SECRET.substring(0, 15)}...`);

  const activationRes = await post(HOST, "/api/v2/user/activation", { activation_token: localToken });
  console.log(`Status: ${activationRes.status}`);
  console.log(`Response: ${JSON.stringify(activationRes.data, null, 2)}`);

  if (activationRes.data.success) {
    console.log("\n✅ Activation works on deployed backend!");
    
    // Step 2: Try login on deployed backend
    console.log("\n=== STEP 2: POST /api/v2/user/login-user on DEPLOYED backend ===");
    const loginRes = await post(HOST, "/api/v2/user/login-user", { email: testEmail, password: "Test1234" });
    console.log(`Status: ${loginRes.status}`);
    console.log(`Response: ${JSON.stringify(loginRes.data, null, 2)}`);
  } else {
    console.log("\n❌ Activation FAILED on deployed backend!");
    console.log("This means the ACTIVATION_SECRET on Vercel is DIFFERENT from your local one.");
    console.log(`Local secret: ${process.env.ACTIVATION_SECRET}`);
    console.log("Go to Vercel → Settings → Environment Variables and check the ACTIVATION_SECRET value.");
  }
}

testDeployed().catch(err => {
  console.error("Error:", err.message);
});
