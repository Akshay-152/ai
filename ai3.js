let botResponses = {};

// Fetch responses from GitHub JSON
fetch("https://raw.githubusercontent.com/Akshay-152/ai/main/responses.json")
    .then(response => response.json())
    .then(data => {
        botResponses = data;
    })
    .catch(error => console.error("Error loading chatbot responses:", error));

// Spelling correction dictionary
const spellingCorrections = {
    "helo": "hello",
    "hw": "how",
    "prsdnt": "president",
    "pm": "prime minister",
    "whats": "what is",
    "tel me": "tell me",
    "computr": "computer",
    "mathamatics": "mathematics",
    "scince": "science",
    "wrld": "world",
    "mobl": "mobile",
    "calcultor": "calculator",
    "wht": "what",
    "isnt": "is not",
    "ur": "your",
    "u": "you",
    "r": "are",
    "thnx": "thanks",
    "govrment": "government",
    "tecnology": "technology"
};

// Function to auto-correct spelling mistakes
function correctSpelling(input) {
    let words = input.split(" ");
    for (let i = 0; i < words.length; i++) {
        if (spellingCorrections[words[i]]) {
            words[i] = spellingCorrections[words[i]];
        }
    }
    return words.join(" ");
}

// Get chatbot response
function getBotResponse(input) {
    input = correctSpelling(input.toLowerCase());

    for (let pattern in botResponses) {
        let regex = new RegExp(pattern, "i");
        if (regex.test(input)) {
            let replies = botResponses[pattern];
            return replies[Math.floor(Math.random() * replies.length)];
        }
    }

    return "I'm not sure about that. Try asking something else!";
}

// Chatbot UI functions
function toggleChatbot() {
    let chatbot = document.getElementById("chatbotContainer");
    chatbot.style.display = (chatbot.style.display === "none" || chatbot.style.display === "") ? "block" : "none";
}

function sendMessage() {
    let inputField = document.getElementById("userInput");
    let input = inputField.value.trim();

    if (input === "") return;

    appendMessage("You", input, "user");

    setTimeout(() => {
        let response = getBotResponse(input);
        appendMessage("AI", response, "bot");
    }, 500);

    inputField.value = ""; // Clear input field
}

function appendMessage(sender, message, type) {
    let chatArea = document.getElementById("chatArea");
    let msgElement = document.createElement("p");
    msgElement.classList.add("message", type);
    msgElement.innerHTML = `<strong>${sender}:</strong> ${message}`;
    chatArea.appendChild(msgElement);
    chatArea.scrollTop = chatArea.scrollHeight;
}

function handleEnter(event) {
    if (event.key === "Enter") {
        sendMessage();
    }
}
