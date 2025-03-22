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
        let response = getBotResponse(input.toLowerCase());
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

function getBotResponse(input) {
    let responses = {
        // Greetings
        "hi|hello|hey": ["Hi!", "Hello! How can I assist?", "Hey there!"],

        // Bot identity
        "what is your name|who are you|what are you": [
            "I'm an AI chatbot. Call me Buddy!", 
            "I'm your virtual assistant!"
        ],

        // Creator info
        "who created you|who made you": ["I was created by Akshay PK!", "Akshay PK built me to assist people!"],

        // Commonly asked personal queries
        "how old are you": ["I'm just a virtual AI, so I don't age!"],
        "where are you from": ["I'm from the world of codes and algorithms!"],
        "what is your favorite color": ["I like blue, but I don’t see colors the way humans do."],
        "do you have feelings": ["I don’t have emotions, but I can try to understand yours!"],
        "can you feel pain": ["No, I can’t feel pain, but I understand the concept."],
        "do you have a family": ["I have a creator, Akshay PK, and all my users are like my family!"],
        "can you learn new things": ["I can answer your questions based on what I know, but I don’t learn like humans."],

        // Jokes
        "tell me a joke|make me laugh": [
            "Why did the scarecrow win an award? Because he was outstanding in his field!",
            "Why don’t skeletons fight each other? Because they don’t have the guts!"
        ],

        // AI-related
        "what is ai|define ai": ["AI stands for Artificial Intelligence, which enables machines to think and learn."],
        "can ai replace humans": ["AI can assist humans but can't fully replace them because creativity and emotions are unique to humans."],

        // General Knowledge
        "who is the president of india": ["As of 2025, the President of India is Droupadi Murmu."],
        "who is the prime minister of india": ["As of 2025, the Prime Minister of India is Narendra Modi."],
        "who invented the telephone": ["Alexander Graham Bell invented the telephone in 1876."],
        "who discovered gravity": ["Sir Isaac Newton discovered gravity after seeing an apple fall from a tree."],
        "what is the largest planet in our solar system": ["Jupiter is the largest planet in our solar system."],
        "who painted the mona lisa": ["The Mona Lisa was painted by Leonardo da Vinci."],
        "which is the longest river in the world": ["The Nile River is the longest river in the world."],
        "who wrote harry potter": ["The Harry Potter series was written by J.K. Rowling."],
        "who is known as the father of computers": ["Charles Babbage is known as the Father of Computers."],
        "which is the fastest land animal": ["The cheetah is the fastest land animal, reaching speeds up to 120 km/h (75 mph)."],

        // Technology & Science
        "what is the speed of light": ["The speed of light is approximately 299,792 kilometers per second."],
        "who invented the internet": ["The internet was developed by multiple scientists, but the concept was led by Vinton Cerf and Robert Kahn."],
        "how does wifi work": ["WiFi transmits data wirelessly using radio waves to connect devices to the internet."],
        "what is the meaning of www": ["WWW stands for World Wide Web."],
        "who created google": ["Google was founded by Larry Page and Sergey Brin in 1998."],

        // Space-related
        "how many planets are in the solar system": ["There are 8 planets in the solar system: Mercury, Venus, Earth, Mars, Jupiter, Saturn, Uranus, and Neptune."],
        "which planet is known as the red planet": ["Mars is known as the Red Planet."],
        "what is a black hole": ["A black hole is a region in space where gravity is so strong that nothing, not even light, can escape."],

        // Health & Body
        "how many bones are in the human body": ["There are 206 bones in the adult human body."],
        "which organ is responsible for pumping blood": ["The heart is responsible for pumping blood throughout the body."],
        "what is the largest organ in the human body": ["The skin is the largest organ of the human body."],

        // Fun & Random
        "can you dance": ["I wish I could dance, but I can’t move!"],
        "can you sing": ["I can’t sing, but I can find lyrics for you!"],
        "do you sleep": ["No, I’m always here when you need me!"],

        // Capabilities
        "what can you do": ["I can chat, tell jokes, answer questions, and even solve math problems! Try 'What is 5+3'."],
        "can you solve math problems": ["Yes! Try asking 'What is 12 + 7' or 'Solve 8 * 9'."],

        // Goodbyes
        "bye|goodbye|see you": ["Goodbye! Have a great day!", "See you soon!", "Bye! Take care!"]
    };

    // Regex-based response matching
    for (let pattern in responses) {
        let regex = new RegExp(pattern, "i");
        if (regex.test(input)) {
            let replies = responses[pattern];
            return replies[Math.floor(Math.random() * replies.length)];
        }
    }

    // Arithmetic Calculations
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

    return "I'm not sure about that. Try asking something else!";
}

function handleEnter(event) {
    if (event.key === "Enter") {
        sendMessage();
    }
}
