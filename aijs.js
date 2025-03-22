function toggleChatbot() {
    let chatbot = document.getElementById("chatbotContainer");
    chatbot.style.display = (chatbot.style.display === "none" || chatbot.style.display === "") ? "block" : "none";
}

function sendMessage() {
    let inputField = document.getElementById("userInput");
    let input = inputField.value.trim().toLowerCase();
    let chatArea = document.getElementById("chatArea");

    if (input === "") return;

    // Display user message
    appendMessage("You", input, "user");

    setTimeout(() => {
        let response = getBotResponse(input);
        appendMessage("AI", response, "bot");
        chatArea.scrollTop = chatArea.scrollHeight; // Auto-scroll to the latest message
    }, 300);

    inputField.value = ""; // Clear input field
}

function appendMessage(sender, message, type) {
    let chatArea = document.getElementById("chatArea");
    let msgElement = document.createElement("p");
    msgElement.classList.add("message", type);
    msgElement.innerHTML = `${sender}: <br>${message}`;
    chatArea.appendChild(msgElement);
}

function getBotResponse(input) {
    let responses = {
        "hi|hello|hey": ["Hi!", "Hello! How can I help?", "Hey there!"],
        "how are you": ["I'm just a bot, but I'm here to assist!", "I'm good! Thanks for asking.", "I'm doing great! What about you?"],
        "what is your name": ["I'm an AI chatbot. Call me Buddy!", "I'm your virtual assistant!"],
        "who created you|who made you": ["I was created by Akshay PK!", "Akshay PK built me to assist people!"],
        "tell me a joke": [
            "Why did the scarecrow win an award? Because he was outstanding in his field!",
            "Why don’t skeletons fight each other? Because they don’t have the guts!",
            "What do you call cheese that isn’t yours? Nacho cheese!"
        ],
        "what is ai|define ai": ["AI stands for Artificial Intelligence, which enables machines to think and learn.", "Artificial Intelligence makes computers smart."],
        "who is the president of india": ["As of 2025, the President of India is Droupadi Murmu."],
        "who is the prime minister of india": ["As of 2025, the Prime Minister of India is Narendra Modi."],
        "what can you do": ["I can chat, tell jokes, and even solve math problems! Try asking 'What is 5+3'."],
        "bye|goodbye|see you": ["Goodbye! Have a great day!", "See you soon!", "Bye! Take care!"]
    };

    // Handling user input with regex-based pattern matching
    for (let key in responses) {
        let regex = new RegExp(key, "i");
        if (regex.test(input)) {
            let replies = responses[key];
            return replies[Math.floor(Math.random() * replies.length)];
        }
    }

    // Arithmetic Calculation
    let match = input.match(/(-?\d+)\s*([\+\-\*\/])\s*(-?\d+)/);
    if (match) {
        let num1 = parseFloat(match[1]);
        let operator = match[2];
        let num2 = parseFloat(match[3]);
        let result;

        switch (operator) {
            case "+": result = num1 + num2; break;
            case "-": result = num1 - num2; break;
            case "*": result = num1 * num2; break;
            case "/": 
                if (num2 === 0) return "Error: Division by zero is not allowed!";
                result = num1 / num2; 
                break;
            default: return "Invalid operation!";
        }

        return `The result of ${num1} ${operator} ${num2} is ${result}`;
    }

    return "I can chat, solve math problems, and tell jokes! Try asking 'What is 7*8' or 'Tell me a joke'.";
}

function handleEnter(event) {
    if (event.key === "Enter") {
        sendMessage();
    }
}
