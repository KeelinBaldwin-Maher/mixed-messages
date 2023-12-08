function generateHaiku(haiku) {
    console.log(haiku);
    
    const syllables = [1, 2, 3, 4]; // Determines how many syllables a word will have

    const line1Syllables = createLine(syllables, 5); // 5
    const line2Syllables = createLine(syllables, 7); // 7
    const line3Syllables = createLine(syllables, 5); // 5

    const line1 = addWords(line1Syllables);
    const line2 = addWords(line2Syllables);
    const line3 = addWords(line3Syllables);

    printHaiku(line1, line2, line3);
}

function printHaiku(line1, line2, line3) {
    const haikuContainer = document.querySelector(".haiku_container");
    const haiku = `<p class="haiku"><span>${line1}</span><br><span>${line2}</span><br><span>${line3}</span></p>`;
    haikuContainer.style.flex = "1";
    haikuContainer.innerHTML = haiku;

    
}

// id determines what to animate
// animation path determines where the object will go
// animation timing determines where to render the object
// duration
function animate(id, path, timing, render, duration) {
    let start = performance.now();

    requestAnimationFrame(function animate(time) {
        // timeLine needs to go from 0 to 1
        let currentTime = ((time - start) / duration) > 1 ? 1 :
            ((time - start) / duration) < 0 ? 0 : ((time - start) / duration);

        // Based on the timing determine the objects state
        const currentState = path(timing(currentTime));

        render(id, currentState); // Render object

        (timeLine < 1) ? requestAnimationFrame(animate) : ""; // Go to next frame
    });
}

function addWords(syllableAmts) {
    let words = getWordList(syllableAmts[0]); // Retrieves a list of words that have that specific amount of syllables
    let randomWord = words[Math.floor(Math.random() * words.length)];
    let line = randomWord; 

    for (let i = 1; i < syllableAmts.length; i++) {
        words = getWordList(syllableAmts[i]);
        randomWord = words[Math.floor(Math.random() * words.length)];
        
        while (line.includes(randomWord)) { // If the word already exists in the line get a new word
            randomWord = words[Math.floor(Math.random() * words.length)];
        }

        line += " " + randomWord;
    }

    return line[0].toUpperCase() + line.slice(1) + "."; // Capitalize first word
}

// This will determine how many words will be in the haiku line
// It also choses how many syllables the words will have, 
// ensuring that all of the word's syllables will add up to the 
// correct amount of syllables required for the haiku line
function createLine(syllables, amtOfSyllables) {
    const line = new Array();

    let syllableSum = 0;

    while (syllableSum != amtOfSyllables) {
        const i = Math.floor(Math.random() * syllables.length); // random index of syllables array

        if ((syllableSum + syllables[i]) > amtOfSyllables) {// Don'd add syllables that go over the line amount
            continue;
        } else {
            line.push(syllables[i]);
            syllableSum += syllables[i];
        }
    }

    return line;
}

function getWordList(i) {
    // source: https://capitalizemytitle.com/one-syllable-words/
    const oneSyllableWords = ["strong", "big", "soft", "smart", "best", "thin",
        "clear", "sweet", "wild", "plain", "lean", "love", "fish", "duck",
        "dream", "care", "work", "ask", "point", "bow", "ship", "pen", "key",
        "faith", "breath", "peace", "cake", "bed", "rock", "home", "hate", "zone",
        "moon", "cord", "beep", "corn", "sword", "cheeks", "tongue", "kids",
        "ice", "board", "life", "one", "day", "tip", "heart", "ate", "month",
        "death", "tea", "out", "three", "two", "soul", "age", "mouth", "dog",
        "cat", "net", "earth", "near", "ace", "ring", "man", "go", "tree", "end",
        "time", "sing", "song", "foot", "hand", "feet", "toe", "north", "live",
        "lamb", "green", "old", "hard", "high", "down", "bad", "sick", "far",
        "full", "dry", "odd"];

    const twoSyllableWords = ["happy", "perfect", "joyful", "thirsty", "awkward",
        "tender", "heavy", "standard", "thankful", "common ", "donate", "picture", "bottle",
        "wonder", "forward", "distance", "mirror", "party", "journey", "market", "fashion",
        "champion", "water", "future", "basket", "picnic", "sugar", "office", "challenge",
        "river", "circus", "apple", "auto", "lizard", "baseball", "helmet", "decode", "april",
        "feather", "cookies", "classroom", "father", "yellow", "power", "hero", "pirate", "ally",
        "nothing", "forty", "ally", "open", "monkey", "system", "secret", "mountain", "lemon",
        "morning", "anime", "baby", "story", "blanket", "wonder", "number", "wonder", "service",
        "allow", "cricket", "poison", "caution", "rocket", "habit", "total", "battle", "weekend",
        "ticket", "struggle", "fancy", "figure", "chamber", "jingle", "solve", "sorrow", "motion",
        "believe", "solar", "polar", "broken", "away", "open", "evil", "joyful", "sorry", "better",
        "alive", "simple", "union", "strange", "human", "stupid", "lucky", "public", "pregnant",
        "mindless", "linear", "noble", "active", "wasted", "present", "older", "insane", "absent",
        "genuine", "aware", "worthy", "feline", "mental"];

    const threeSyllableWords = ["careful", "adopted", "bottomless", "limited", "elastic ",
        "insecure", "athletic ", "circular ", "potential ", "complete", "permanent", "impressive",
        "celebrate", "revenge", "remember", "discipline", "separate", "consummate", "emanate",
        "encounter", "surrender", "duplicate", "audition", "family", "happiness", "piano",
        "animal", "energy", "syllable", "pollution", "basketball", "calendar", "mystery",
        "perfection", "buffalo", "dinosaur", "octopus", "crocodile", "tomato", "elephant", "banana",
        "envelope", "chimpanzee", "celery", "​vitamin", "tomorrow", "diamond", "memory", "musical",
        "melody", "mercury", "volcano", "copyright", "medical", "difficult", "feminine", "masculine",
        "dangerous", "healthy", "internal", "radio", "uniform", "electric", "tropical", "united",
        "opposite", "chemical", "accurate", "serious", "curious", "difficult", "radical", "biblical",
        "abdicate", "companion", "character", "uniform", "abolish", "article", "graduate", "average",
        "discover", "exercise", "ornament", "resolve", "ambition", "history", "camera", "holiday"];

    const fourSyllableWords = ["ordinary", "intelligent", "responsible", "disposable",
        "ambitious", "infectious", "approachable", "accessible", "unbreakable", "dependable",
        "predictable", "organized", "pessimistic", "experience", "literature", "community",
        "television", "constellation", "revolution", "insulation", "territory", "calamity",
        "mechanism", "admiration", "audacity", "procrastinate", "collaborate", "abbreviate",
        "exfoliate", "procrastinate", "accommodate", "eliminate", "evacuate", "contaminate",
        "accompany  ", "accelerate", "insinuate", "caterpillar", "relaxation", "psychology",
        "degenerate", "incubator", "kindergarten", "tribalism", "complexity", "matrimony",
        "anatomy", "presidential", "helicopter", "perimeter", "architecture", "ecosystem",
        "transportation", "generator", "equality", "organism", "celebrity", "automatic",
        "anaconda", "dismantle", "activities", "compatible", "intervene", "encapsulate",
        "predominate", "legitimate", "enumerate", "dissociate", "incorporate", "legitimate",
        "overpower", "rationalize", "internalize", "stereotype", "elaborate", "emasculate",
        "maleficent", "professional", "independent", "infinitive", "appetizing", "ambitious",
        "material", "alcoholic", "infectious", "educated", "emotional", "illegible", "desirable",
        "conservative", "familiar", "believable", "unfortunate", "sanitary"];

    switch (i) {
        case 1:
            return oneSyllableWords;
            break;
        case 2:
            return twoSyllableWords;
            break;
        case 3:
            return threeSyllableWords;
            break;
        case 4:
            return fourSyllableWords;
            break;
        default:
            console.log("Error returning word list");

    }
}