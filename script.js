const API_KEY = "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";

// Enhance Text
async function enhanceText() {
  let text = document.getElementById("inputText").value;

  let response = await fetch(
    "https://api-inference.huggingface.co/models/gpt2",
    {
      method: "POST",
      headers: {
        Authorization: "Bearer " + API_KEY,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        inputs: "Improve this prompt: " + text
      })
    }
  );

  let data = await response.json();
  document.getElementById("enhancedText").innerText =
    data[0].generated_text;
}

// Generate Image
async function generateImage() {
  let prompt = document.getElementById("enhancedText").innerText;

  // fallback if no enhanced text
  if (!prompt || prompt.trim() === "") {
    prompt = document.getElementById("inputText").value;
  }

  document.getElementById("outputImage").alt = "Loading...";

  try {
    let response = await fetch(
      "https://api-inference.huggingface.co/models/stabilityai/stable-diffusion-2",
      {
        method: "POST",
        headers: {
          Authorization: "Bearer " + API_KEY,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ inputs: prompt })
      }
    );

    // 🔴 IMPORTANT: if API fails → fallback image
    if (!response.ok) {
      document.getElementById("outputImage").src =
        "https://picsum.photos/300";
      return;
    }

    let blob = await response.blob();
    let imageUrl = URL.createObjectURL(blob);

    document.getElementById("outputImage").src = imageUrl;

  } catch (error) {
    // 🔴 fallback if error
    document.getElementById("outputImage").src =
      "https://picsum.photos/300";
  }
}
// Fake Image Analysis (FAST)
function analyzeImage() {
  document.getElementById("imageAnalysis").innerText =
    "A modern object with bright colors and artistic style";
}

// Generate Variation
async function generateVariation() {
  let prompt = document.getElementById("imageAnalysis").innerText;

  let response = await fetch(
    "https://api-inference.huggingface.co/models/stabilityai/stable-diffusion-2",
    {
      method: "POST",
      headers: {
        Authorization: "Bearer " + API_KEY,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ inputs: prompt })
    }
  );

  let blob = await response.blob();
  let imageUrl = URL.createObjectURL(blob);

  document.getElementById("variationImage").src = imageUrl;
}