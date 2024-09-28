const doshaOptions = [
    { name: "Vata", emoji: "☁️" },
    { name: "Pitta", emoji: "🔥" },
    { name: "Kapha", emoji: "💧" }
];

// Function to fetch dosha data from the server
const fetchDosha = async (userData) => {
    try {
        const response = await fetch('http://127.0.0.1:8000/prakriti', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userData) // Send the 19 parameters to the backend
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        
        // Assuming that the server sends a dosha name, find corresponding emoji
        const matchedDosha = doshaOptions.find(option => option.name === data.dosha);
        const result = matchedDosha ? `${matchedDosha.name} ${matchedDosha.emoji}` : "Unknown Dosha";

        return result;
    } catch (error) {
        console.error("Error fetching dosha:", error);
        return "Error fetching dosha";
    }
};

// Example of sending data to the backend
const userData = {
    gender: "male",
    age: 30,
    height: 170.5,
    weight: 65,
    smoking: false,
    cigarettes_per_day: null,
    alcohol: false,
    physical_activity: "moderate",
    heart_rate: 72,
    sleep_hours: 7.5,
    stress_level: "medium",
    diet_type: "vegetarian",
    digestion: "good",
    skin_type: "dry",
    hair_type: "normal",
    body_temperature: "warm",
    energy_level: "high",
    metabolism: "fast",
    mood: "calm"
};

// Fetch the dosha
fetchDosha(userData).then(dosha => console.log("Dosha result:", dosha));

export default fetchDosha;
