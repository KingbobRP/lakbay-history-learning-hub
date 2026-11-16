import bulul from '@/assets/ifugao-bulul.png.asset.json';
import urn from '@/assets/kulaman-urn.png.asset.json';
import quran from '@/assets/quran-museum.png.asset.json';
import { quizzes } from './historia-data';

export type Difficulty = 'easy' | 'medium' | 'hard';
export type GameId = 'timeline' | 'who' | 'detective' | 'fact' | 'map' | 'complete' | 'artifact' | 'millionaire';
export type Question = { prompt: string; choices: string[]; answer: number; explain: string; hint?: string; clues?: string[]; accepted?: string[]; image?: string; source?: string };
export const difficulties: { id: Difficulty; label: string }[] = [{ id: 'easy', label: 'Madali' }, { id: 'medium', label: 'Katamtaman' }, { id: 'hard', label: 'Mahirap' }];
export const gameCatalog: { id: GameId; title: string; category: string; description: string; instructions: string; icon: string }[] = [
  { id: 'timeline', title: 'Timeline Challenge', category: 'Panahon', description: 'Ayusin ang mga pangyayaring humubog sa ating bansa.', instructions: 'Gamitin ang pataas at pababang arrow upang ayusin ang mga pangyayari mula pinakamaaga hanggang pinakahuli. Bawat pangyayaring nasa tamang puwesto ay may puntos.', icon: 'timeline' },
  { id: 'who', title: 'Who Am I?', category: 'Mga personalidad', description: 'Kilalanin ang Pilipinong nasa likod ng mga pahiwatig.', instructions: 'Basahin ang mga pahiwatig at piliin ang personalidad. Maaari kang humingi ng isang dagdag na pahiwatig bawat tanong; kalahati ang puntos kapag ginamit ito.', icon: 'who' },
  { id: 'detective', title: 'History Detective', category: 'Ebidensiya', description: 'Suriin ang mga bakas. Tuklasin ang kasaysayan.', instructions: 'Buksan ang bawat ebidensiya bago magbigay ng konklusyon. Tatlong yugto ang bawat misyon. Piliin ang sagot na sinusuportahan ng mga dokumento at detalye.', icon: 'detective' },
  { id: 'fact', title: 'Fact or Fake?', category: 'Mapanuring pag-iisip', description: 'Ihiwalay ang katotohanan sa maling pahayag.', instructions: 'Basahin ang pahayag at piliin ang TRUE o FALSE. Makikita ang paliwanag kaagad pagkatapos ng bawat sagot.', icon: 'fact' },
  { id: 'map', title: 'History Map Quest', category: 'Heograpiya', description: 'Hanapin ang mga lugar na saksi sa ating nakaraan.', instructions: 'Piliin ang numero sa mapa o ang katumbas nitong lugar sa talaan. Ang mga marker ay tunay na lokasyon; inilalarawan ang mapa sa antas ng buong bansa.', icon: 'map' },
  { id: 'complete', title: 'Complete the History', category: 'Mga pangalan at petsa', description: 'Buuin ang nawawalang bahagi ng ating kuwento.', instructions: 'I-type ang pangalan, petsa, o salitang nawawala. Hindi mahalaga ang malaki o maliit na titik; tinatanggap din ang nakalistang karaniwang alternatibong pangalan.', icon: 'complete' },
  { id: 'artifact', title: 'Artifact Explorer', category: 'Pamana at kultura', description: 'Basahin ang kasaysayang nakatago sa mga bagay.', instructions: 'Suriin ang tunay na larawan mula sa National Museum at tukuyin ang bagay o ang kabuluhan nito. May tatlong artifact; nagbabago ang tanong ayon sa antas.', icon: 'artifact' },
  { id: 'millionaire', title: 'History Millionaire', category: 'Pangwakas na hamon', description: 'Umakyat sa siyam na antas ng kaalaman.', instructions: 'Sagutin ang siyam na tanong na pataas ang hirap at puntos. May tig-isang 50:50, pahiwatig, at skip. Ang maling sagot ay nagtatapos sa laro; ang skip ay walang puntos.', icon: 'millionaire' },
];

function q(prompt: string, choices: string[], answer: number, explain: string, hint?: string, clues?: string[], accepted?: string[]): Question { return { prompt, choices, answer, explain, hint, clues, accepted }; }
const who = [
 q('Ako ang sumulat ng Noli Me Tangere. Sino ako?', ['Jose Rizal', 'Andres Bonifacio', 'Emilio Aguinaldo', 'Apolinario Mabini'], 0, 'Inilathala ni Jose Rizal ang Noli Me Tangere noong 1887.', 'Isa rin akong manggagamot.'),
 q('Isa ako sa mga nagtatag ng Katipunan noong 1892. Sino ako?', ['Antonio Luna', 'Andres Bonifacio', 'Marcelo H. del Pilar', 'Manuel Quezon'], 1, 'Si Andres Bonifacio ay isa sa mga nagtatag ng Katipunan noong Hulyo 7, 1892.', 'Tinatawag akong Supremo.'),
 q('Pinamunuan ko ang paglaban sa Mactan noong 1521. Sino ako?', ['Rajah Humabon', 'Diego Silang', 'Lapu-Lapu', 'Francisco Dagohoy'], 2, 'Pinamunuan ni Lapu-Lapu ang mga mandirigma sa Mactan laban sa ekspedisyon ni Magallanes.', 'Ang labanan ay naganap noong Abril 27.'),
 q('Ako ang sumulat ng Kartilya ng Katipunan.', ['Emilio Jacinto', 'Jose Rizal', 'Juan Luna', 'Emilio Aguinaldo'], 0, 'Si Emilio Jacinto ang may-akda ng Kartilya, gabay sa mga prinsipyo ng Katipunan.', 'Tinatawag akong Utak ng Katipunan.'),
 q('Kilala ako bilang Dakilang Lumpo at tagapayo ni Aguinaldo.', ['Apolinario Mabini', 'Antonio Luna', 'Graciano Lopez Jaena', 'Pedro Paterno'], 0, 'Si Apolinario Mabini ay naging tagapayo ni Aguinaldo at mahalagang palaisip ng rebolusyon.', 'Hindi ako si Emilio Jacinto.'),
 q('Nagpatuloy ako sa pag-aalsa sa Ilocos matapos mamatay ang aking asawang si Diego.', ['Melchora Aquino', 'Gabriela Silang', 'Trinidad Tecson', 'Gregoria de Jesus'], 1, 'Ipinagpatuloy ni Gabriela Silang ang pag-aalsa noong 1763.', 'Silang ang aking apelyido.'),
 q('Del Pilar ang apelyido ko at Plaridel ang aking sagisag-panulat.', ['Gregorio del Pilar', 'Marcelo H. del Pilar', 'Jose Rizal', 'Juan Luna'], 1, 'Gumamit si Marcelo H. del Pilar ng pangalang Plaridel sa kanyang pagsusulat para sa reporma.', 'Isa akong pinuno ng Kilusang Propaganda.'),
 q('Isinulat ko ang salaysay ng ekspedisyon ni Magallanes.', ['Antonio Pigafetta', 'Miguel Lopez de Legazpi', 'Jose Rizal', 'Emilio Jacinto'], 0, 'Ang salaysay ni Antonio Pigafetta ay isang primaryang sanggunian sa paglalakbay noong 1521.', 'Italyano akong kasama sa ekspedisyon.'),
 q('Ako ang pintor ng Spoliarium, na nagkamit ng gintong medalya sa Madrid noong 1884.', ['Felix Resurreccion Hidalgo', 'Fernando Amorsolo', 'Juan Luna', 'Guillermo Tolentino'], 2, 'Ipininta ni Juan Luna ang Spoliarium. Ang tagumpay nito ay mahalaga sa kamalayang Pilipino.', 'Kapatid ko si Antonio Luna.'),
];
const fact = [
 q('Ipinahayag ang kalayaan sa Kawit noong Hunyo 12, 1898.', ['TRUE', 'FALSE'], 0, 'Naganap ang pagpapahayag sa bahay ni Emilio Aguinaldo sa Kawit, Cavite.'),
 q('Si Andres Bonifacio ang sumulat ng Noli Me Tangere.', ['TRUE', 'FALSE'], 1, 'Si Jose Rizal ang may-akda; inilathala ito noong 1887.'),
 q('Ang People Power sa EDSA ay naganap noong 1986.', ['TRUE', 'FALSE'], 0, 'Naganap ang EDSA People Power noong Pebrero 22–25, 1986.'),
 q('Ang Kartilya ay isinulat ni Emilio Jacinto.', ['TRUE', 'FALSE'], 0, 'Naglalaman ang Kartilya ng mga prinsipyong gagabay sa mga kasapi ng Katipunan.'),
 q('Sa Mactan napatay si Magallanes noong Abril 27, 1521.', ['TRUE', 'FALSE'], 0, 'Napatay si Magallanes sa labanan laban sa mga mandirigma ni Lapu-Lapu.'),
 q('Tanging armadong paglaban ang anyo ng pakikibaka.', ['TRUE', 'FALSE'], 1, 'Ang panulat, mapayapang protesta, at sama-samang pagkilos ay mga anyo rin ng pakikibaka.'),
 q('Pinasinayaan ang Unang Republika sa Malolos noong Enero 23, 1899.', ['TRUE', 'FALSE'], 0, 'Ang Malolos Republic ay pinasinayaan sa Simbahan ng Barasoain.'),
 q('Ang petsa ng lagda sa Proklamasyon 1081 at ang pampublikong pag-anunsiyo ng Batas Militar ay pareho.', ['TRUE', 'FALSE'], 1, 'May petsang Setyembre 21, 1972 ang Proklamasyon 1081; inanunsiyo ito sa publiko noong Setyembre 23.'),
 q('Ang likas-kayang pag-unlad ay tumutugon sa kasalukuyan nang hindi isinasakripisyo ang kakayahan ng susunod na henerasyon.', ['TRUE', 'FALSE'], 0, 'Ito ang pangunahing ideya ng sustainable development sa ulat na Our Common Future (1987).'),
];
const complete = [
 q('Ipinahayag ang kalayaan noong Hunyo 12, ____.', ['1898'], 0, 'Hunyo 12, 1898 ang petsa ng pagpapahayag sa Kawit.', undefined, undefined, ['1898']),
 q('Ang may-akda ng Noli Me Tangere ay si ____.', ['Jose Rizal'], 0, 'Si Jose Rizal ang sumulat ng nobela.', undefined, undefined, ['Jose Rizal', 'Rizal', 'Dr Jose Rizal']),
 q('Ang labanan noong Abril 27, 1521 ay naganap sa ____.', ['Mactan'], 0, 'Sa Mactan lumaban ang mga mandirigmang pinamunuan ni Lapu-Lapu.', undefined, undefined, ['Mactan', 'Mactan Cebu']),
 q('Ang may-akda ng Kartilya ay si ____.', ['Emilio Jacinto'], 0, 'Si Emilio Jacinto ang sumulat ng Kartilya.', undefined, undefined, ['Emilio Jacinto', 'Jacinto']),
 q('Ang samahang itinatag noong Hulyo 7, 1892 ay ang ____.', ['Katipunan'], 0, 'Itinatag ang Katipunan upang isulong ang kalayaan.', undefined, undefined, ['Katipunan', 'KKK']),
 q('Ang People Power sa EDSA ay naganap noong Pebrero 22–25, ____.', ['1986'], 0, 'Noong 1986 naganap ang EDSA People Power.', undefined, undefined, ['1986']),
 q('Ang Unang Republika ay pinasinayaan noong Enero 23, ____.', ['1899'], 0, 'Pinasinayaan ito sa Malolos noong Enero 23, 1899.', undefined, undefined, ['1899']),
 q('Ang nobelang karugtong ng Noli Me Tangere ay ____.', ['El Filibusterismo'], 0, 'Inilathala ang El Filibusterismo noong 1891.', undefined, undefined, ['El Filibusterismo', 'El Fili']),
 q('Ang sagisag-panulat ni Marcelo H. del Pilar ay ____.', ['Plaridel'], 0, 'Plaridel ang isa sa mga sagisag-panulat ni Marcelo H. del Pilar.', undefined, undefined, ['Plaridel']),
];
const detective = [
 q('Misyon: Tukuyin ang lugar ng pagpapahayag ng kalayaan.', ['Kawit', 'Malolos', 'Mactan', 'Dapitan'], 0, 'Ang petsa, lalawigan, at tahanan ay tumutukoy sa Kawit, Cavite.', undefined, ['Petsa sa dokumento: Hunyo 12, 1898.', 'Lalawigan: Cavite.', 'Lugar: tahanan ni Emilio Aguinaldo.']),
 q('Misyon: Kaninong akda ang nobelang nasa tala?', ['Jose Rizal', 'Emilio Jacinto', 'Andres Bonifacio', 'Juan Luna'], 0, 'Ang Noli Me Tangere ay inilathala ni Rizal sa Berlin noong 1887.', undefined, ['Pamagat: Noli Me Tangere.', 'Taon ng pagkalimbag: 1887.', 'Lugar ng pagkalimbag: Berlin.']),
 q('Misyon: Tukuyin ang pangyayaring inilalarawan.', ['EDSA People Power', 'Labanan sa Mactan', 'Himagsikan 1896', 'Pagbubukas ng Kongreso ng Malolos'], 0, 'Ang magkakaugnay na detalye ay tumutukoy sa EDSA People Power noong 1986.', undefined, ['Taon: 1986.', 'Mga sibilyan ang nagtipon sa isang pangunahing lansangan.', 'Kaugnay ng pagtatapos ng pamumuno ni Ferdinand Marcos Sr.']),
 q('Misyon: Aling samahan ang pinagmulan ng gabay?', ['Katipunan', 'La Liga Filipina', 'Kongreso ng Malolos', 'Hukbalahap'], 0, 'Ang Kartilya ni Jacinto ay gabay sa mga prinsipyo ng Katipunan.', undefined, ['May-akda: Emilio Jacinto.', 'Pamagat: Kartilya.', 'Nilalaman: mga prinsipyong moral para sa mga kasapi.']),
 q('Misyon: Aling kilusan ang inilalarawan?', ['Kilusang Propaganda', 'Hukbalahap', 'EDSA People Power', 'Pag-aalsa ni Dagohoy'], 0, 'Ang La Solidaridad ay mahalagang pahayagan ng Kilusang Propaganda.', undefined, ['Ginamit ang panulat para sa mga reporma.', 'Pahayagan: La Solidaridad.', 'Mga pangalan: del Pilar at Lopez Jaena.']),
 q('Misyon: Anong uri ng sanggunian ang salaysay?', ['Primaryang sanggunian', 'Makabagong nobela', 'Aklat-aralin lamang', 'Walang kabuluhang ebidensiya'], 0, 'Ang salaysay ng nakasaksi ay primaryang sanggunian, ngunit kailangang suriin ang pananaw at limitasyon nito.', undefined, ['Sumulat si Antonio Pigafetta tungkol sa ekspedisyon.', 'Kasama siya sa paglalakbay noong 1521.', 'Isinulat niya ang mga pangyayaring kanyang nasaksihan.']),
 q('Misyon: Aling institusyon ang pinasinayaan?', ['Unang Republika', 'Komonwelt', 'Katipunan', 'La Liga Filipina'], 0, 'Pinasinayaan ang Unang Republika sa Malolos noong Enero 23, 1899.', undefined, ['Petsa: Enero 23, 1899.', 'Lugar: Barasoain, Malolos.', 'Kaugnay ng Saligang Batas ng Malolos.']),
 q('Misyon: Bakit kailangang paghambingin ang dalawang petsa?', ['Magkaiba ang petsa ng dokumento at pag-anunsiyo', 'Walang Batas Militar noong 1972', 'Parehong petsa ang dalawang tala', 'Hindi dapat suriin ang dokumento'], 0, 'May petsang Setyembre 21 ang Proklamasyon 1081; Setyembre 23 ito inanunsiyo sa publiko.', undefined, ['Dokumento: Proklamasyon 1081.', 'Petsa ng dokumento: Setyembre 21, 1972.', 'Pag-anunsiyo sa publiko: Setyembre 23, 1972.']),
 q('Misyon: Aling prinsipyo ang sinusuportahan ng ebidensiya?', ['Likas-kayang pag-unlad', 'Walang limitasyong pagkuha ng yaman', 'Pag-unlad para sa iisang grupo', 'Pagwawalang-bahala sa kinabukasan'], 0, 'Ang pangangalaga sa susunod na henerasyon at kalikasan ay mahalaga sa likas-kayang pag-unlad.', undefined, ['Tinutugunan ang pangangailangan sa kasalukuyan.', 'Pinangangalagaan ang kakayahan ng susunod na henerasyon.', 'Pinagsasama ang usaping panlipunan, pang-ekonomiya, at pangkalikasan.']),
];
export const locations = [
 { name: 'Kawit', lon: 120.90, lat: 14.45 }, { name: 'Malolos', lon: 120.81, lat: 14.85 }, { name: 'Dapitan', lon: 123.42, lat: 8.65 }, { name: 'Mactan', lon: 123.97, lat: 10.30 }, { name: 'Vigan', lon: 120.39, lat: 17.57 }, { name: 'Maynila', lon: 120.98, lat: 14.60 }, { name: 'Banaue', lon: 121.06, lat: 16.92 }, { name: 'Palawan', lon: 118.74, lat: 9.84 }, { name: 'Jolo', lon: 121.00, lat: 6.05 },
];
const map = [
 q('Saan ipinahayag ang kalayaan noong Hunyo 12, 1898?', locations.map(l=>l.name), 0, 'Sa Kawit, Cavite ipinahayag ang kalayaan.'),
 q('Saan naganap ang labanan ni Lapu-Lapu noong 1521?', locations.map(l=>l.name), 3, 'Naganap ang labanan sa Mactan, Cebu.'),
 q('Saang lungsod matatagpuan ang Intramuros?', locations.map(l=>l.name), 5, 'Nasa Maynila ang makasaysayang Intramuros.'),
 q('Saan ipinatapon si Jose Rizal mula 1892 hanggang 1896?', locations.map(l=>l.name), 2, 'Ipinatapon si Rizal sa Dapitan, na ngayon ay nasa Zamboanga del Norte.'),
 q('Saan pinasinayaan ang Unang Republika?', locations.map(l=>l.name), 1, 'Sa Malolos, Bulacan pinasinayaan ang Unang Republika.'),
 q('Aling lungsod sa Ilocos Sur ang kilala sa makasaysayang sentro nitong UNESCO World Heritage Site?', locations.map(l=>l.name), 4, 'Ang Historic City of Vigan ay UNESCO World Heritage Site mula 1999.'),
 q('Alin ang nasa Ifugao at kilala sa hagdan-hagdang palayan?', locations.map(l=>l.name), 6, 'Ang Banaue ay munisipalidad sa Ifugao, sa Kordilyera.'),
 q('Saang lalawigan natagpuan ang Manunggul Jar?', locations.map(l=>l.name), 7, 'Natagpuan ang Manunggul Jar sa Manunggul Cave, Palawan.'),
 q('Aling lugar ang makasaysayang sentro ng Sultanato ng Sulu?', locations.map(l=>l.name), 8, 'Ang Jolo ay mahalagang sentro ng Sultanato ng Sulu.'),
];
const artifacts = [
 { image: bulul.url, name: 'Bulul', use: 'Ritwal na kaugnay ng palay', context: 'Kulturang Ifugao', explain: 'Ang bulul ay inukit na pigurang kahoy na mahalaga sa mga ritwal ng palay ng Ifugao.', source: 'https://www.nationalmuseum.gov.ph/our-collections/ethnology/ritual-objects/' },
 { image: urn.url, name: 'Kulaman limestone burial urn', use: 'Sisidlan para sa paglilibing', context: 'Tradisyon ng paglilibing', explain: 'Ang urnang limestone mula sa Kulaman ay bahagi ng koleksiyon ng mga sisidlang panlibing ng National Museum.', source: 'https://www.nationalmuseum.gov.ph/our-collections/archaeology/burial-jars/' },
 { image: quran.url, name: 'Quran', use: 'Banal na kasulatan ng Islam', context: 'Pananampalatayang Islam', explain: 'Ang Quran ay banal na kasulatan ng Islam. Ang larawang ito ay mula sa koleksiyong Ritual Objects ng National Museum.', source: 'https://www.nationalmuseum.gov.ph/our-collections/ethnology/ritual-objects/' },
];
export const events = [
 { title: 'Labanan sa Mactan', date: 'Abril 27, 1521', year: 1521 },
 { title: 'Pagbitay sa GomBurZa', date: 'Pebrero 17, 1872', year: 1872 },
 { title: 'Paglathala ng Noli Me Tangere', date: '1887', year: 1887 },
 { title: 'Paglathala ng El Filibusterismo', date: '1891', year: 1891 },
 { title: 'Pagtatag ng Katipunan', date: 'Hulyo 7, 1892', year: 1892 },
 { title: 'Pagbitay kay Jose Rizal', date: 'Disyembre 30, 1896', year: 1896 },
 { title: 'Pagpapahayag ng kalayaan sa Kawit', date: 'Hunyo 12, 1898', year: 1898 },
 { title: 'Pagpapasinaya ng Unang Republika', date: 'Enero 23, 1899', year: 1899 },
 { title: 'EDSA People Power', date: 'Pebrero 22–25, 1986', year: 1986 },
];
export function timelineRounds(difficulty: Difficulty) {
 const count = difficulty === 'easy' ? 3 : difficulty === 'medium' ? 4 : 5;
 return [0, 2, 4].map(start => events.slice(start, start + count));
}
export function questionsFor(id: GameId, difficulty: Difficulty): Question[] {
 const offset = difficulties.findIndex(d=>d.id===difficulty) * 3;
 if (id === 'millionaire') {
  const pool = [...(quizzes[1] ?? []), ...(quizzes[2] ?? []), ...(quizzes[3] ?? [])];
  const start = difficulties.findIndex(d=>d.id===difficulty);
  return Array.from({length: 9}, (_, i) => {
   const question = pool[Math.floor(i/3)*10 + (i%3)*2 + start];
   if (!question) throw new Error('Missing millionaire question');
   return q(question.q, question.choices, question.answer, question.explain, i < 3 ? 'Pag-isipan ang kamalayang pangkasaysayan at primaryang sanggunian.' : i < 6 ? 'Iugnay ang detalye sa mga pangyayari ng pakikibaka.' : 'Isaalang-alang ang katarungan, karapatan, at pangangalaga sa susunod na henerasyon.');
  });
 }
 if (id === 'artifact') return artifacts.map((a, i) => {
  const answers = difficulty === 'easy' ? artifacts.map(x=>x.name) : difficulty === 'medium' ? artifacts.map(x=>x.use) : artifacts.map(x=>x.context);
  return { prompt: difficulty === 'easy' ? 'Ano ang bagay na nasa larawan?' : difficulty === 'medium' ? 'Ano ang pangunahing kabuluhan ng bagay na ito?' : 'Aling konteksto ang pinakamalapit sa bagay na ito?', choices: answers, answer: i, explain: a.explain, image: a.image, source: a.source };
 });
 const banks: Partial<Record<GameId, Question[]>> = { who, fact, complete, detective, map };
 return (banks[id] ?? []).slice(offset, offset + 3);
}
export const normalizeAnswer = (value: string) => value.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().replace(/[^a-z0-9]/g, '');
export const validatesText = (value: string, question: Question) => (question.accepted ?? [question.choices[question.answer] ?? '']).some(a=>normalizeAnswer(a)===normalizeAnswer(value));
export const pointsFor = (difficulty: Difficulty, round: number, millionaire = false, hinted = false) => (millionaire ? [100,200,300,500,750,1000,1500,2000,3000][round] ?? 0 : ({ easy: 100, medium: 150, hard: 200 })[difficulty]) * (hinted ? 0.5 : 1);
export const correctPositions = (order: number[]) => order.filter((value, index)=>value===index).length;