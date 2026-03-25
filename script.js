document.getElementById("contactForm").addEventListener("submit", async function(e) {
  e.preventDefault();

  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;

  const data = { name, email };

  try {
    const response = await fetch("https://your-backend-url.onrender.com/save", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    });

    const result = await response.json();
    alert(result.message);

  } catch (error) {
    alert("Error sending data");
    console.error(error);
  }
});