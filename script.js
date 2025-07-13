const WORKER_URL = "https://insta-downloader.hirehubhrsolutions1.workers.dev";

fetch(WORKER_URL, {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ url: userEnteredUrl })
})

document.getElementById("downloadForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  const status = document.getElementById("status");
  const url = document.getElementById("videoURL").value.trim();

  if (!url.includes("instagram.com")) {
    status.textContent = "❌ Please enter a valid Instagram video URL.";
    return;
  }

  status.textContent = "🔄 Processing...";

  try {
    const res = await fetch(WORKER_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ url })
    });

    const data = await res.json();
    if (!res.ok || !data.downloadUrl) {
      status.textContent = "❌ Download link not found.";
      return;
    }

    // initiate download
    const a = document.createElement("a");
    a.href = data.downloadUrl;
    a.download = "video.mp4";
    document.body.appendChild(a);
    a.click();
    a.remove();
    status.textContent = "✅ Download started!";
  } catch (err) {
    console.error(err);
    status.textContent = "❌ Server error. Please try again.";
  }
});
