document.getElementById("roomSelectionForm").addEventListener("submit", async (event) => {
	event.preventDefault();
  
	const selectedRoom = document.getElementById("chatRoom").value.toLowerCase();
    
	const response = await fetch("/rooms", {
		method: "POST",
		headers: {
			"Content-Type": "application/json"
		},
		body: JSON.stringify({ selectedRoom })
	});
	console.log(selectedRoom);
	if (response.ok) {
		window.location.href = "../chat.html";
	} else {
		console.error("Failed to join the chat room.");
	}
});
  