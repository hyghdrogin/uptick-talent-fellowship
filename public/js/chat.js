document.addEventListener("DOMContentLoaded", () => {
	const messageInput = document.getElementById("messageInput");
	const sendMessageButton = document.getElementById("sendMessageButton");
  
	sendMessageButton.addEventListener("click", sendMessage);
	messageInput.addEventListener("keypress", function (e) {
		if (e.key === "Enter") {
			sendMessage();
		}
	});
  
	function sendMessage() {
		const message = messageInput.value.trim();
		if (message !== "") {
			sendToAllClients(message);
			messageInput.value = "";
		}
	}
});
  