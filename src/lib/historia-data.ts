import intramuros from "@/assets/intramuros.jpg";
import revolution from "@/assets/revolution.jpg";
import commonwealth from "@/assets/commonwealth.jpg";
import precolonial from "@/assets/precolonial.jpg";

export const images = { intramuros, revolution, commonwealth, precolonial };

export type Term = { id: number; name: string; title: string; period: string; image: string; blurb: string };

export const terms: Term[] = [
  { id: 1, name: "Unang Termino", title: "Mga Ugat ng Lipunang Pilipino", period: "Prehistory – 1521", image: precolonial, blurb: "The discipline of history and the societies of the archipelago before colonization." },
  { id: 2, name: "Ikalawang Termino", title: "Kolonyalismo at Himagsikan", period: "1521 – 1898", image: revolution, blurb: "Three centuries of Spanish rule, the rise of Filipino nationalism, and the Revolution." },
  { id: 3, name: "Ikatlong Termino", title: "Ang Modernong Bansa", period: "1899 – 1986", image: commonwealth, blurb: "American rule, the Commonwealth, war, independence and the restoration of democracy." },
];

export type Lesson = {
  id: string; term: number; week: number; title: string; english: string; topic: string;
  keywords: string[]; image: string; summary: string;
  sections: { heading: string; body: string }[]; source?: { quote: string; cite: string };
};

export const lessons: Lesson[] = [
  { id: "t1-w1", term: 1, week: 1, title: "Kahulugan at Sanggunian ng Kasaysayan", english: "Meaning and Sources of History", topic: "Historiography", keywords: ["kasaysayan", "primary source", "secondary source", "historiography", "salaysay"], image: intramuros,
    summary: "History is not merely a list of dates but a disciplined inquiry into the past, built on evidence.",
    sections: [
      { heading: "Ano ang kasaysayan?", body: "The Filipino word kasaysayan comes from salaysay (narrative) and saysay (significance). History is therefore a meaningful narrative of the past — one that matters to the people who tell it." },
      { heading: "Primary and secondary sources", body: "Primary sources are produced at the time of the event: letters, diaries, photographs, government records and artifacts. Secondary sources interpret those materials later, such as textbooks and scholarly articles." },
      { heading: "Pantayong Pananaw", body: "Historian Zeus Salazar proposed pantayong pananaw — writing history from the perspective of Filipinos, for Filipinos, in Filipino — instead of relying only on foreign accounts." },
    ],
    source: { quote: "Ang hindi marunong lumingon sa pinanggalingan ay hindi makararating sa paroroonan.", cite: "Kasabihang Pilipino" } },
  { id: "t1-w2", term: 1, week: 2, title: "Ang mga Unang Tao sa Kapuluan", english: "The First Peoples of the Archipelago", topic: "Prehistory", keywords: ["Callao Man", "Tabon", "Austronesian", "Homo luzonensis", "archaeology"], image: precolonial,
    summary: "Archaeological finds in Cagayan and Palawan reveal human presence in the islands tens of thousands of years ago.",
    sections: [
      { heading: "Callao Cave and Homo luzonensis", body: "A foot bone found in Callao Cave, Cagayan, was dated to about 67,000 years ago. Further finds in 2019 led scientists to name a new species, Homo luzonensis." },
      { heading: "Tabon Cave", body: "In Palawan, the Tabon Caves yielded human remains around 47,000 years old and the Manunggul Jar, a secondary burial vessel showing belief in a journey of the soul." },
      { heading: "Austronesian migration", body: "Many scholars connect the ancestors of most Filipinos to Austronesian-speaking seafarers who spread across Island Southeast Asia and the Pacific." },
    ] },
  { id: "t1-w3", term: 1, week: 3, title: "Ang Lipunang Barangay", english: "Barangay Society", topic: "Pre-colonial society", keywords: ["barangay", "datu", "maharlika", "timawa", "alipin", "babaylan"], image: precolonial,
    summary: "The barangay was a self-governing community led by a datu, with a social order of nobles, freemen and dependents.",
    sections: [
      { heading: "Origin of the word", body: "Barangay derives from balangay, the plank boats used by early communities for travel and trade." },
      { heading: "Social classes", body: "Tagalog society recognized the maginoo (ruling nobility, including the datu), the maharlika (warrior class), the timawa (freemen) and the alipin — divided into namamahay and sagigilid." },
      { heading: "Women and the babaylan", body: "Women could own property, inherit and divorce. The babaylan, often women, served as spiritual leaders, healers and keepers of knowledge." },
    ] },
  { id: "t1-w4", term: 1, week: 4, title: "Kalakalan at Ugnayang Panlabas", english: "Trade and Foreign Contact", topic: "Pre-colonial trade", keywords: ["Laguna Copperplate", "Tondo", "trade", "China", "Islam", "baybayin"], image: precolonial,
    summary: "Long before 1521, island polities traded with China, the Malay world and beyond.",
    sections: [
      { heading: "Laguna Copperplate Inscription", body: "Dated 900 CE, it is the oldest known written document from the Philippines, recording the cancellation of a debt and mentioning Tondo." },
      { heading: "Networks of exchange", body: "Polities such as Tondo, Butuan, Cebu and Sulu exchanged gold, wax and forest products for porcelain, silk and metal goods." },
      { heading: "Arrival of Islam", body: "Islam reached Sulu by the 14th century; the Sultanate of Sulu was established around 1450 and later Maguindanao rose in Mindanao." },
    ] },
  { id: "t2-w1", term: 2, week: 1, title: "Magellan at ang Labanan sa Mactan", english: "Magellan and the Battle of Mactan", topic: "Spanish contact", keywords: ["Magellan", "Lapulapu", "Mactan", "1521", "Pigafetta", "Humabon"], image: intramuros,
    summary: "The Spanish expedition reached the islands in 1521 and met resistance at Mactan.",
    sections: [
      { heading: "The expedition", body: "Ferdinand Magellan, sailing for Spain, reached Homonhon in March 1521. Antonio Pigafetta's chronicle is our main primary account." },
      { heading: "Cebu and Humabon", body: "Rajah Humabon of Cebu allied with Magellan and was baptized, along with many of his people." },
      { heading: "Mactan, 27 April 1521", body: "Lapulapu, chief of Mactan, refused to submit. Magellan was killed in the battle — remembered today as the first recorded resistance against European colonizers." },
    ] },
  { id: "t2-w2", term: 2, week: 2, title: "Kolonyal na Pamahalaan at Simbahan", english: "Colonial Government and the Church", topic: "Spanish colonial rule", keywords: ["Legazpi", "Intramuros", "encomienda", "polo y servicio", "galleon", "frailocracy"], image: intramuros,
    summary: "Spain built a colonial state centered on Manila, sustained by tribute, forced labor and the friars.",
    sections: [
      { heading: "Legazpi and Manila", body: "Miguel López de Legazpi established the first Spanish settlement in Cebu in 1565 and founded Manila as the colonial capital in 1571." },
      { heading: "Tribute and forced labor", body: "The encomienda collected tribute, while polo y servicio required men aged 16 to 60 to render 40 days of labor a year." },
      { heading: "Galleon trade", body: "From 1565 to 1815 the Manila–Acapulco galleon linked Asia and the Americas, enriching a few while the islands' economy stagnated." },
    ] },
  { id: "t2-w3", term: 2, week: 3, title: "Ang Kilusang Propaganda", english: "The Propaganda Movement", topic: "Nationalism", keywords: ["Rizal", "Noli Me Tangere", "La Solidaridad", "Del Pilar", "GOMBURZA", "ilustrado"], image: intramuros,
    summary: "Educated Filipinos in Spain campaigned for reforms through writing.",
    sections: [
      { heading: "GOMBURZA, 1872", body: "The execution of priests Gómez, Burgos and Zamora after the Cavite Mutiny awakened a sense of shared injustice among Filipinos." },
      { heading: "The ilustrados", body: "José Rizal published Noli Me Tangere (1887) and El Filibusterismo (1891). Graciano López Jaena founded La Solidaridad in 1889; Marcelo H. del Pilar later edited it." },
      { heading: "Demands for reform", body: "The Propagandists sought representation in the Spanish Cortes, equality before the law, and secularization of parishes — reform, not yet independence." },
    ],
    source: { quote: "I die without seeing the dawn brighten over my native land.", cite: "José Rizal, Mi Último Adiós (1896)" } },
  { id: "t2-w4", term: 2, week: 4, title: "Katipunan at Himagsikang 1896", english: "The Katipunan and the 1896 Revolution", topic: "Revolution", keywords: ["Bonifacio", "Katipunan", "Aguinaldo", "1898", "Kawit", "Malolos"], image: revolution,
    summary: "When reform failed, the Katipunan chose armed revolution for independence.",
    sections: [
      { heading: "Founding of the Katipunan", body: "Andrés Bonifacio and companions founded the Katipunan on 7 July 1892, after Rizal's arrest and exile to Dapitan." },
      { heading: "The Cry, 1896", body: "Discovered in August 1896, Katipuneros tore their cedulas in defiance and began the revolution. Rizal was executed on 30 December 1896." },
      { heading: "Independence and Malolos", body: "Emilio Aguinaldo proclaimed independence in Kawit, Cavite on 12 June 1898. The Malolos Congress produced Asia's first republican constitution." },
    ] },
  { id: "t3-w1", term: 3, week: 1, title: "Digmaang Pilipino-Amerikano", english: "The Philippine-American War", topic: "American colonization", keywords: ["Treaty of Paris", "1899", "Mabini", "Benevolent Assimilation", "Balangiga"], image: revolution,
    summary: "The young republic fought a new colonizer after Spain ceded the islands to the United States.",
    sections: [
      { heading: "Treaty of Paris, 1898", body: "Spain ceded the Philippines to the United States for 20 million dollars, without Filipino participation." },
      { heading: "War, 1899", body: "Fighting broke out on 4 February 1899. Aguinaldo was captured in Palanan in 1901, though resistance continued for years." },
      { heading: "Colonial policy", body: "The US presented its rule as 'Benevolent Assimilation', introducing public schools taught by Thomasites while suppressing nationalist expression." },
    ] },
  { id: "t3-w2", term: 3, week: 2, title: "Ang Pamahalaang Komonwelt", english: "The Commonwealth Government", topic: "Commonwealth", keywords: ["Quezon", "Tydings-McDuffie", "1935", "Commonwealth", "Wikang Pambansa"], image: commonwealth,
    summary: "A transitional government prepared Filipinos for self-rule.",
    sections: [
      { heading: "Path to self-government", body: "The Tydings-McDuffie Act of 1934 promised independence after a ten-year transition period." },
      { heading: "Quezon's administration", body: "Manuel L. Quezon was inaugurated in November 1935. His government launched social justice programs and a national defense plan." },
      { heading: "A national language", body: "The Institute of National Language was created, and in 1937 Tagalog was chosen as the basis of the national language." },
    ] },
  { id: "t3-w3", term: 3, week: 3, title: "Ang Pananakop ng Hapon", english: "The Japanese Occupation", topic: "World War II", keywords: ["Bataan", "Death March", "Corregidor", "guerrilla", "Laurel", "1942"], image: commonwealth,
    summary: "War brought occupation, suffering and widespread resistance.",
    sections: [
      { heading: "Invasion", body: "Japan attacked on 8 December 1941. Bataan fell on 9 April 1942, followed by the Death March of Filipino and American prisoners." },
      { heading: "The Second Republic", body: "Under Japanese sponsorship, José P. Laurel led the Second Philippine Republic from 1943." },
      { heading: "Resistance and liberation", body: "Guerrilla groups, including the Hukbalahap, fought throughout the islands. The Battle of Manila in 1945 left the city devastated." },
    ] },
  { id: "t3-w4", term: 3, week: 4, title: "Mula Kalayaan Hanggang EDSA", english: "From Independence to EDSA", topic: "Republic", keywords: ["1946", "Roxas", "Martial Law", "Marcos", "EDSA", "People Power", "Aquino"], image: commonwealth,
    summary: "The Republic's journey from independence through dictatorship to People Power.",
    sections: [
      { heading: "Independence, 1946", body: "The United States recognized Philippine independence on 4 July 1946, with Manuel Roxas as president of the Third Republic." },
      { heading: "Martial Law, 1972", body: "Ferdinand Marcos declared Martial Law on 21 September 1972, suspending civil liberties. The assassination of Benigno Aquino Jr. in 1983 galvanized opposition." },
      { heading: "People Power, 1986", body: "In February 1986 millions gathered along EDSA in peaceful protest. Marcos fled, and Corazon Aquino became president." },
    ] },
];

export type TimelineEvent = { year: string; title: string; text: string; image?: string; caption?: string; lesson?: string };

export const timeline: TimelineEvent[] = [
  { year: "c. 67,000 BP", title: "Callao Man", text: "Oldest human remains in the archipelago found in Callao Cave, Cagayan.", image: precolonial, caption: "Reconstruction of a museum display of pre-colonial artifacts.", lesson: "t1-w2" },
  { year: "900 CE", title: "Laguna Copperplate Inscription", text: "Earliest known written document in the Philippines, mentioning Tondo.", lesson: "t1-w4" },
  { year: "1521", title: "Battle of Mactan", text: "Lapulapu defeats Magellan's forces on 27 April.", lesson: "t2-w1" },
  { year: "1571", title: "Founding of Spanish Manila", text: "Legazpi makes Manila the capital of the colony.", image: intramuros, caption: "Intramuros, the walled city — archival-style image.", lesson: "t2-w2" },
  { year: "1872", title: "Execution of GOMBURZA", text: "Three Filipino priests are executed, stirring nationalist sentiment.", lesson: "t2-w3" },
  { year: "1892", title: "Katipunan founded", text: "Bonifacio establishes the secret revolutionary society on 7 July.", lesson: "t2-w4" },
  { year: "1896", title: "Revolution begins", text: "The Cry against Spain; Rizal is executed on 30 December.", image: revolution, caption: "Revolutionary soldiers — archival-style image.", lesson: "t2-w4" },
  { year: "1898", title: "Declaration of Independence", text: "Aguinaldo proclaims independence in Kawit, Cavite on 12 June.", lesson: "t2-w4" },
  { year: "1899", title: "Philippine-American War", text: "Hostilities begin on 4 February after the Treaty of Paris.", lesson: "t3-w1" },
  { year: "1935", title: "Commonwealth inaugurated", text: "Manuel L. Quezon becomes president of the Commonwealth.", image: commonwealth, caption: "Manila street in the Commonwealth era — archival-style image.", lesson: "t3-w2" },
  { year: "1942", title: "Fall of Bataan", text: "Surrender on 9 April, followed by the Death March.", lesson: "t3-w3" },
  { year: "1946", title: "Independence recognized", text: "The Third Republic is inaugurated on 4 July.", lesson: "t3-w4" },
  { year: "1972", title: "Martial Law", text: "Marcos places the country under Martial Law on 21 September.", lesson: "t3-w4" },
  { year: "1986", title: "EDSA People Power", text: "A peaceful revolution restores democracy in February.", lesson: "t3-w4" },
];

export type Question = { q: string; choices: string[]; answer: number; explain: string };

export const quizzes: Record<number, Question[]> = {
  1: [
    { q: "The word 'kasaysayan' is rooted in which two ideas?", choices: ["Salaysay and saysay", "Bayan and lahi", "Sinaunang and bago", "Datu and barangay"], answer: 0, explain: "Kasaysayan joins salaysay (narrative) and saysay (significance)." },
    { q: "Which is a primary source?", choices: ["A Grade 11 textbook", "A diary written during the Revolution", "A documentary made in 2020", "An encyclopedia entry"], answer: 1, explain: "Primary sources are created at the time of the events they describe." },
    { q: "Who proposed pantayong pananaw?", choices: ["Teodoro Agoncillo", "Renato Constantino", "Zeus Salazar", "José Rizal"], answer: 2, explain: "Zeus Salazar advocated history from a Filipino perspective, in Filipino." },
    { q: "Homo luzonensis was identified from remains found in:", choices: ["Tabon Cave", "Callao Cave", "Banaue", "Butuan"], answer: 1, explain: "Fossils from Callao Cave, Cagayan led to the naming of Homo luzonensis in 2019." },
    { q: "The Manunggul Jar is evidence of:", choices: ["Pre-colonial trade with Spain", "Belief in the afterlife", "Written laws", "Rice terracing"], answer: 1, explain: "This burial jar depicts souls journeying by boat to the afterlife." },
    { q: "The word 'barangay' comes from:", choices: ["A Spanish term for village", "Balangay, a type of boat", "A Chinese word for family", "The name of a datu"], answer: 1, explain: "Early communities were linked to the balangay boats they arrived and traded in." },
    { q: "In Tagalog society, the timawa were:", choices: ["Slaves", "Freemen", "Priests", "Royalty"], answer: 1, explain: "The timawa were free commoners, between the nobility and the alipin." },
    { q: "Who served as spiritual leaders and healers?", choices: ["Babaylan", "Maharlika", "Sagigilid", "Encomendero"], answer: 0, explain: "The babaylan, often women, led rituals and healing." },
    { q: "The Laguna Copperplate Inscription is dated to:", choices: ["1521 CE", "1300 CE", "900 CE", "500 BCE"], answer: 2, explain: "It dates to 900 CE and is the oldest known Philippine document." },
    { q: "Islam first became established in which area?", choices: ["Ilocos", "Sulu", "Bicol", "Pampanga"], answer: 1, explain: "Islam reached Sulu by the 14th century; a sultanate formed around 1450." },
  ],
  2: [
    { q: "Where did Magellan's expedition first land in March 1521?", choices: ["Cebu", "Homonhon", "Mactan", "Manila"], answer: 1, explain: "The expedition first landed at Homonhon island." },
    { q: "Who wrote the main eyewitness account of Magellan's voyage?", choices: ["Legazpi", "Pigafetta", "Urdaneta", "Morga"], answer: 1, explain: "Antonio Pigafetta chronicled the voyage." },
    { q: "Who defeated Magellan at Mactan?", choices: ["Humabon", "Lapulapu", "Soliman", "Kudarat"], answer: 1, explain: "Lapulapu led the resistance on 27 April 1521." },
    { q: "Manila became the colonial capital in:", choices: ["1521", "1565", "1571", "1600"], answer: 2, explain: "Legazpi founded Spanish Manila in 1571." },
    { q: "Polo y servicio refers to:", choices: ["Tribute in gold", "Forced labor", "Church tithes", "Galleon trade"], answer: 1, explain: "Men were required to render 40 days of labor yearly." },
    { q: "The galleon trade connected Manila with:", choices: ["Lisbon", "Acapulco", "Batavia", "Seville"], answer: 1, explain: "The Manila–Acapulco galleon ran from 1565 to 1815." },
    { q: "GOMBURZA were executed after the:", choices: ["Cavite Mutiny of 1872", "Battle of Mactan", "Cry of 1896", "Treaty of Paris"], answer: 0, explain: "They were implicated in the 1872 Cavite Mutiny." },
    { q: "Who founded La Solidaridad in 1889?", choices: ["José Rizal", "Graciano López Jaena", "Andrés Bonifacio", "Apolinario Mabini"], answer: 1, explain: "López Jaena founded it; Del Pilar later edited it." },
    { q: "The Katipunan was founded on:", choices: ["7 July 1892", "30 December 1896", "12 June 1898", "4 July 1946"], answer: 0, explain: "Bonifacio founded the Katipunan on 7 July 1892." },
    { q: "Philippine independence was declared in:", choices: ["Malolos", "Kawit, Cavite", "Biak-na-Bato", "Tondo"], answer: 1, explain: "Aguinaldo proclaimed independence in Kawit on 12 June 1898." },
  ],
  3: [
    { q: "The Treaty of Paris (1898) transferred the Philippines to the US for:", choices: ["$5 million", "$20 million", "$50 million", "Nothing"], answer: 1, explain: "Spain ceded the islands for 20 million dollars." },
    { q: "The Philippine-American War began on:", choices: ["4 February 1899", "12 June 1898", "8 December 1941", "21 September 1972"], answer: 0, explain: "Hostilities broke out on 4 February 1899." },
    { q: "Aguinaldo was captured in 1901 at:", choices: ["Kawit", "Palanan", "Malolos", "Tirad Pass"], answer: 1, explain: "He was captured in Palanan, Isabela." },
    { q: "American teachers who arrived in 1901 were called:", choices: ["Ilustrados", "Thomasites", "Propagandists", "Encomenderos"], answer: 1, explain: "They came aboard the USAT Thomas." },
    { q: "Which law promised independence after ten years?", choices: ["Jones Law", "Tydings-McDuffie Act", "Bell Trade Act", "Philippine Bill of 1902"], answer: 1, explain: "The Tydings-McDuffie Act of 1934 set the transition." },
    { q: "Who was President of the Commonwealth in 1935?", choices: ["Sergio Osmeña", "Manuel Roxas", "Manuel L. Quezon", "José P. Laurel"], answer: 2, explain: "Quezon was inaugurated in November 1935." },
    { q: "Bataan fell to Japanese forces on:", choices: ["9 April 1942", "8 December 1941", "6 May 1942", "20 October 1944"], answer: 0, explain: "Its surrender was followed by the Death March." },
    { q: "Who led the Japanese-sponsored Second Republic?", choices: ["José P. Laurel", "Elpidio Quirino", "Benigno Aquino Sr.", "Emilio Aguinaldo"], answer: 0, explain: "Laurel headed the Second Republic from 1943." },
    { q: "The US recognized Philippine independence on:", choices: ["12 June 1898", "4 July 1946", "15 November 1935", "25 February 1986"], answer: 1, explain: "The Third Republic began on 4 July 1946." },
    { q: "Martial Law was declared in:", choices: ["1965", "1972", "1983", "1986"], answer: 1, explain: "Marcos declared Martial Law on 21 September 1972." },
  ],
};
