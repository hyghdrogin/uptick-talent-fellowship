document.querySelector("form").addEventListener("submit", async (event) => {
	event.preventDefault();
	
	const username = document.getElementById("username").value;
	
	const response = await fetch("/users", {
		method: "POST",
		headers: {
			"Content-Type": "application/json"
		},
		body: JSON.stringify({ username })
	});

	const data = await response.json();
	console.log(data.message);

	if (response.ok) {
		window.location.href = "../room.html";
	}
});
  