import intramuros from "@/assets/intramuros.jpg";
import revolution from "@/assets/revolution.jpg";
import commonwealth from "@/assets/commonwealth.jpg";
import precolonial from "@/assets/precolonial.jpg";
import terraces from "@/assets/terraces.jpg";
import community from "@/assets/community.jpg";
import citizens from "@/assets/citizens.jpg";
import timelineCallao from "@/assets/timeline-callao.jpg";
import timelineMactan from "@/assets/timeline-mactan.jpg";
import timelineDagohoy from "@/assets/timeline-dagohoy.jpg";
import timelineGomburza from "@/assets/timeline-gomburza.jpg";
import timelineKawit from "@/assets/timeline-kawit.jpg";
import timelineMalolos from "@/assets/timeline-malolos.jpg";
import timelineBantayog from "@/assets/timeline-bantayog.jpg";
import timelineConstitution from "@/assets/timeline-constitution.jpg";

export const images = { intramuros, revolution, commonwealth, precolonial, terraces, community, citizens };

export type Term = { id: number; name: string; title: string; weeks: number; image: string; blurb: string };

export const terms: Term[] = [
  { id: 1, name: "Unang Termino", title: "Kamalayang Pangkasaysayan", weeks: 10, image: terraces, blurb: "Pag-unawa sa kahulugan ng kamalayang pangkasaysayan at kung paano ito hinuhubog ng heograpiya, kultura, at mga paniniwala ng sinaunang lipunang Pilipino." },
  { id: 2, name: "Ikalawang Termino", title: "Pakikibaka at Kamalayang Pilipino", weeks: 10, image: revolution, blurb: "Pagsusuri sa kolektibong pakikibaka ng mga Pilipino — mula sa pag-aalsa laban sa dayuhan hanggang sa panahon ng pagsasarili — bilang salik ng kamalayang Pilipino." },
  { id: 3, name: "Ikatlong Termino", title: "Pagkamamamayan at Likas-Kayang Pag-unlad", weeks: 10, image: citizens, blurb: "Pag-aaral sa likas-kayang pag-unlad, katarungang panlipunan, at mga karapatan at tungkulin ng mamamayan tungo sa pambansang kaunlaran." },
];

export type Question = { q: string; choices: string[]; answer: number; explain: string };

export type Lesson = {
  id: string; term: number; week: number; weeks: string; title: string; topic: string;
  /** Weekly topic as listed in the DepEd Three-Term Budget of Work. */
  competency: string;
  keywords: string[]; image: string; caption: string;
  objectives: string[]; intro: string;
  sections: { heading: string; body: string }[];
  facts: string[];
  examples: { title: string; text: string }[];
  keyTerms: { term: string; def: string }[];
  summary: string;
  assessment: Question[];
};

export const lessons: Lesson[] = [
  // ───────── UNANG TERMINO ─────────
  {
    id: "t1-w1", term: 1, week: 1, weeks: "1–2", topic: "Kamalayang pangkasaysayan",
    title: "Ang Kahulugan at Katuturan ng Kamalayang Pangkasaysayan",
    competency: "Kahulugan at katuturan ng kamalayang pangkasaysayan.",
    keywords: ["kamalayang pangkasaysayan", "kasaysayan", "salaysay", "saysay", "primaryang sanggunian", "pantayong pananaw"],
    image: intramuros, caption: "Mga pader ng Intramuros, Maynila — saksi sa maraming yugto ng kasaysayan.",
    objectives: ["Matukoy ang kahulugan ng kamalayang pangkasaysayan.", "Maipaliwanag ang katuturan nito sa buhay ng mag-aaral at ng bayan.", "Makilala ang pagkakaiba ng primarya at sekundaryang sanggunian."],
    intro: "Bakit kailangang alalahanin ang nakaraan? Ang kamalayang pangkasaysayan ay ang kakayahang makita ang sarili bilang bahagi ng mas malawak na kuwento ng bayan — isang kuwentong may simula, pagbabago, at pagpapatuloy.",
    sections: [
      { heading: "Kasaysayan: salaysay na may saysay", body: "Ang salitang kasaysayan ay nagmula sa salaysay (kuwento) at saysay (kabuluhan). Kaya ang kasaysayan ay hindi lamang listahan ng petsa at pangalan; ito ay makabuluhang salaysay tungkol sa nakaraan na may kinalaman sa mga taong nagsasalaysay nito." },
      { heading: "Ano ang kamalayang pangkasaysayan?", body: "Ito ay ang pagkaunawa na ang ating kasalukuyan ay bunga ng nakaraan, at ang ating mga desisyon ngayon ay huhubog sa hinaharap. Ang taong may kamalayang pangkasaysayan ay marunong magtanong: Saan ito nagmula? Bakit ito nangyari? Sino ang nakinabang at sino ang naapektuhan?" },
      { heading: "Mga sanggunian ng kasaysayan", body: "Ang primaryang sanggunian ay nalikha sa mismong panahon ng pangyayari, gaya ng liham, talaarawan, larawan, at artepakto. Ang sekundaryang sanggunian naman ay pagsusuri o interpretasyon ng mga ito sa ibang panahon, gaya ng aklat-aralin at artikulong pampananaliksik." },
    ],
    facts: ["Iminungkahi ni Zeus Salazar ang Pantayong Pananaw — pagsulat ng kasaysayan mula sa pananaw ng Pilipino, para sa Pilipino, sa wikang Filipino.", "Maraming naunang tala tungkol sa kapuluan ay isinulat ng mga dayuhan, kaya mahalagang suriin ang pananaw ng sumulat."],
    examples: [
      { title: "Ang ulat ni Antonio Pigafetta (1521)", text: "Primaryang sanggunian tungkol sa pagdating ng ekspedisyon ni Magallanes. Mahalaga ito, ngunit dapat basahin nang kritikal dahil isinulat ito ng isang Europeo." },
      { title: "Lumang larawan ng pamilya", text: "Kahit ang mga larawan at kuwento ng ating mga lolo at lola ay maaaring maging primaryang sanggunian ng kasaysayang lokal." },
    ],
    keyTerms: [
      { term: "Kamalayang pangkasaysayan", def: "Pagkaunawa sa ugnayan ng nakaraan, kasalukuyan, at hinaharap ng sarili at ng lipunan." },
      { term: "Primaryang sanggunian", def: "Ebidensiyang nalikha sa panahon ng pangyayari." },
      { term: "Sekundaryang sanggunian", def: "Interpretasyon o pagsusuri ng nakaraan batay sa ibang sanggunian." },
      { term: "Pantayong Pananaw", def: "Pananaw sa kasaysayan na nakaugat sa sariling wika at karanasan ng Pilipino." },
    ],
    summary: "Ang kasaysayan ay makabuluhang salaysay ng nakaraan. Ang kamalayang pangkasaysayan ay nagbibigay-daan upang maunawaan natin ang ating sarili bilang bahagi ng bayan at maging kritikal sa mga sangguniang ating binabasa.",
    assessment: [
      { q: "Saang dalawang salita nagmula ang salitang 'kasaysayan'?", choices: ["Saysay at salaysay", "Sanay at saysay", "Salita at buhay", "Sanggunian at saysay"], answer: 0, explain: "Pinagsama ang salaysay (kuwento) at saysay (kabuluhan)." },
      { q: "Alin ang halimbawa ng primaryang sanggunian?", choices: ["Aklat-aralin sa Araling Panlipunan", "Talaarawan ng isang sundalo noong 1898", "Dokumentaryo noong 2020", "Artikulo sa ensiklopedya"], answer: 1, explain: "Nalikha ang talaarawan sa mismong panahon ng pangyayari." },
      { q: "Sino ang nagmungkahi ng Pantayong Pananaw?", choices: ["Teodoro Agoncillo", "Renato Constantino", "Zeus Salazar", "Jose Rizal"], answer: 2, explain: "Si Zeus Salazar ang pangunahing tagapagtaguyod nito." },
    ],
  },
  {
    id: "t1-w3", term: 1, week: 3, weeks: "3–4", topic: "Heograpiya at kultura",
    title: "Ugnayan ng Heograpiya at Kultura sa Kamalayang Pangkasaysayan",
    competency: "Ugnayan ng heograpiya at kultura sa kamalayang pangkasaysayan gamit ang piling pamayanan.",
    keywords: ["heograpiya", "kultura", "Ifugao", "hagdan-hagdang palayan", "Badjao", "kapuluan", "pamayanan"],
    image: terraces, caption: "Hagdan-hagdang palayan ng Ifugao sa Kordilyera.",
    objectives: ["Maipaliwanag kung paano hinuhubog ng kapaligiran ang kultura ng isang pamayanan.", "Masuri ang piling pamayanan bilang halimbawa ng ugnayan ng heograpiya at kultura.", "Mapahalagahan ang pagkakaiba-iba ng kultura sa kapuluan."],
    intro: "Ang Pilipinas ay binubuo ng mahigit 7,600 pulo. Kabundukan, kapatagan, baybayin, at karagatan ang humubog sa kabuhayan, pananamit, pagkain, at paniniwala ng iba't ibang pangkat.",
    sections: [
      { heading: "Kapaligiran bilang guro", body: "Natututo ang tao na umangkop sa kanyang kapaligiran. Ang mga nakatira sa bundok ay bumuo ng paraan ng pagsasaka sa matatarik na dalisdis; ang mga nasa baybayin ay naging mahuhusay na mangingisda at manlalayag." },
      { heading: "Pamayanan sa kabundukan: Ifugao", body: "Ang hagdan-hagdang palayan ng Ifugao ay patunay ng malalim na kaalaman sa irigasyon at pagtutulungan. Kasama ng pagsasaka ang mga ritwal at awit (gaya ng Hudhud) na nagpapasa ng kaalaman sa susunod na henerasyon." },
      { heading: "Pamayanan sa karagatan: Sama-Badjao", body: "Sa Timog Mindanao at Sulu, ang Sama-Badjao ay tradisyonal na naninirahan sa bangka at bahay na nakatayo sa tubig. Ang dagat ang kanilang kabuhayan, daanan, at pinagmumulan ng pagkakakilanlan." },
    ],
    facts: ["Kinilala ng UNESCO ang Hagdan-hagdang Palayan ng Kordilyera ng Pilipinas bilang Pandaigdigang Pamanang Pook noong 1995.", "Ang Hudhud ng Ifugao ay kinilala ng UNESCO bilang Obra Maestra ng Pasalita at Di-Materyal na Pamana ng Sangkatauhan noong 2001."],
    examples: [
      { title: "Bahay kubo at bahay na bato", text: "Ang mataas na sahig at bubong na pawid ng bahay kubo ay tugon sa init, ulan, at baha ng tropikong klima." },
      { title: "Paglalayag ng balangay", text: "Ang mga balangay na nahukay sa Butuan ay nagpapakita na ang karagatan ay nag-ugnay, hindi naghiwalay, sa mga sinaunang pamayanan." },
    ],
    keyTerms: [
      { term: "Heograpiya", def: "Pag-aaral ng katangiang pisikal ng daigdig at ugnayan nito sa tao." },
      { term: "Kultura", def: "Kabuuang paraan ng pamumuhay ng isang pangkat: wika, paniniwala, kaugalian, at kagamitan." },
      { term: "Adaptasyon", def: "Pag-angkop ng tao sa kanyang kapaligiran." },
      { term: "Pamayanan", def: "Pangkat ng taong naninirahan sa iisang lugar at may iisang kabuhayan at kultura." },
    ],
    summary: "Ang heograpiya ay may malaking papel sa paghubog ng kultura. Sa pag-aaral ng piling pamayanan gaya ng Ifugao at Sama-Badjao, nauunawaan natin na ang pagkakaiba-iba ng kultura ay bunga ng matalinong pag-angkop sa kapaligiran.",
    assessment: [
      { q: "Ano ang pangunahing ipinakikita ng hagdan-hagdang palayan ng Ifugao?", choices: ["Impluwensiyang Espanyol", "Pag-angkop sa bulubunduking kapaligiran", "Kalakalan sa Tsina", "Modernong teknolohiya"], answer: 1, explain: "Inangkop ng Ifugao ang pagsasaka sa matatarik na bundok." },
      { q: "Saan tradisyonal na naninirahan ang Sama-Badjao?", choices: ["Kordilyera", "Gitnang Luzon", "Baybayin at karagatan ng Sulu", "Kabundukan ng Bukidnon"], answer: 2, explain: "Ang dagat ang sentro ng kanilang pamumuhay." },
      { q: "Ano ang tawag sa pag-angkop ng tao sa kapaligiran?", choices: ["Asimilasyon", "Adaptasyon", "Kolonisasyon", "Migrasyon"], answer: 1, explain: "Adaptasyon ang pag-angkop sa kapaligiran." },
    ],
  },
  {
    id: "t1-w5", term: 1, week: 5, weeks: "5–6", topic: "Kultura at sariling karanasan",
    title: "Kultura at Kamalayang Pangkasaysayan sa Sariling Konteksto",
    competency: "Pag-uugnay ng kultura at kamalayang pangkasaysayan sa sariling konteksto at karanasan.",
    keywords: ["sariling konteksto", "kasaysayang lokal", "pamilya", "pista", "pagkakakilanlan", "pasalitang kasaysayan"],
    image: community, caption: "Sama-samang pagtatanim — isang larawan ng bayanihan sa lalawigan.",
    objectives: ["Maiugnay ang sariling karanasan sa kultura at kasaysayan ng pamayanan.", "Makapagsagawa ng simpleng panayam bilang paraan ng pagtuklas ng kasaysayang lokal.", "Mapahalagahan ang sariling pagkakakilanlan bilang Pilipino."],
    intro: "Hindi lamang sa mga bayani at malalaking digmaan matatagpuan ang kasaysayan. Nasa mga kuwento rin ito ng ating pamilya, sa pista ng ating barangay, at sa mga kaugaliang minana natin.",
    sections: [
      { heading: "Ang sarili bilang bahagi ng kasaysayan", body: "Ang ating pangalan, wika, pagkain, at paniniwala ay may pinagmulan. Kapag tinanong natin kung bakit ganito ang ating kaugalian, nagsisimula tayong bumuo ng kamalayang pangkasaysayan." },
      { heading: "Kasaysayang lokal at pasalitang kasaysayan", body: "Ang pasalitang kasaysayan ay pagtitipon ng alaala sa pamamagitan ng panayam. Mahalaga ito lalo na sa mga pamayanang kakaunti ang nakasulat na tala." },
      { heading: "Kultura bilang buhay na pamana", body: "Patuloy na nagbabago ang kultura. Ang bayanihan, pagmamano, at pagdiriwang ng pista ay may anyo ngayon na iba sa nakaraan, ngunit dala pa rin nito ang diwa ng pagtutulungan at paggalang." },
    ],
    facts: ["Itinatag ang Pambansang Komisyong Pangkasaysayan ng Pilipinas (NHCP) upang pangalagaan at itaguyod ang kasaysayan, kabilang ang mga panandang pangkasaysayan sa mga bayan.", "Maraming bayan ang may sariling museo o aklatang pangkasaysayan na bukas sa mag-aaral."],
    examples: [
      { title: "Panayam sa nakatatanda", text: "Ang pagtatanong sa lolo o lola tungkol sa buhay noong kanilang kabataan ay paraan ng pagkuha ng primaryang sanggunian." },
      { title: "Pinagmulan ng pangalan ng bayan", text: "Maraming bayan ang may alamat o kasaysayan sa likod ng pangalan nito na nagpapakita ng heograpiya o pangyayaring lokal." },
    ],
    keyTerms: [
      { term: "Kasaysayang lokal", def: "Kasaysayan ng isang tiyak na pook, gaya ng bayan o barangay." },
      { term: "Pasalitang kasaysayan", def: "Kasaysayang tinipon mula sa alaala at salaysay ng mga tao." },
      { term: "Pagkakakilanlan", def: "Mga katangiang nagbibigay ng kahulugan kung sino ang isang tao o pangkat." },
      { term: "Pamana", def: "Kultura at bagay na minana mula sa nakaraang henerasyon." },
    ],
    summary: "Ang kamalayang pangkasaysayan ay nagsisimula sa sarili at sa sariling pamayanan. Sa pagtuklas ng kasaysayang lokal, mas nauunawaan natin ang ugnayan ng ating karanasan sa kasaysayan ng bayan.",
    assessment: [
      { q: "Ano ang pasalitang kasaysayan?", choices: ["Kasaysayang nasa aklat", "Kasaysayang tinipon mula sa panayam at alaala", "Kasaysayan ng ibang bansa", "Kathang-isip na kuwento"], answer: 1, explain: "Ito ay pagtitipon ng alaala sa pamamagitan ng panayam." },
      { q: "Alin ang halimbawa ng pag-uugnay ng kultura sa sariling karanasan?", choices: ["Pagsasaulo ng petsa", "Pag-alam sa pinagmulan ng pista sa sariling barangay", "Paglalakbay sa ibang bansa", "Panonood ng pelikulang dayuhan"], answer: 1, explain: "Ito ay pagtuklas ng kasaysayang lokal na may kinalaman sa sarili." },
      { q: "Bakit mahalaga ang kasaysayang lokal?", choices: ["Dahil ito lamang ang totoo", "Dahil ipinapakita nito ang karanasan ng karaniwang tao at pamayanan", "Dahil mas maikli ito", "Dahil hindi ito kailangang suriin"], answer: 1, explain: "Pinalalawak nito ang larawan ng kasaysayan ng bayan." },
    ],
  },
  {
    id: "t1-w7", term: 1, week: 7, weeks: "7–8", topic: "Sinaunang paniniwala",
    title: "Paniniwala at Pananampalataya ng Sinaunang Lipunang Barangay",
    competency: "Mga paniniwala at pananampalataya ng sinaunang kulturang Pilipino mula sa lipunang barangay.",
    keywords: ["barangay", "babaylan", "anito", "Bathala", "Manunggul", "datu", "animismo", "katalonan"],
    image: precolonial, caption: "Mga sinaunang kagamitan at palayok mula sa panahong prekolonyal.",
    objectives: ["Mailarawan ang mga paniniwala at pananampalataya sa lipunang barangay.", "Maipaliwanag ang papel ng babaylan sa sinaunang lipunan.", "Masuri ang ebidensiyang arkeolohikal ng paniniwala sa kabilang-buhay."],
    intro: "Bago dumating ang mga Espanyol, may sariling sistema na ng paniniwala ang mga pamayanan sa kapuluan. Nakaugat ito sa kalikasan, sa mga ninuno, at sa ugnayan ng tao sa daigdig ng espiritu.",
    sections: [
      { heading: "Ang lipunang barangay", body: "Ang barangay ay pamayanang pinamumunuan ng datu. Binubuo ito ng maharlika, timawa, at alipin. Ang pangalan nito ay nagmula sa balangay, ang bangkang ginamit sa paglalayag." },
      { heading: "Bathala, anito, at kalikasan", body: "Naniniwala ang mga Tagalog kay Bathala bilang pinakamataas na diyos, at sa mga anito o espiritu ng ninuno at kalikasan. Iginagalang ang mga puno, ilog, at bundok bilang tahanan ng mga espiritu." },
      { heading: "Ang babaylan", body: "Ang babaylan (o katalonan sa Tagalog) ay karaniwang babae na nagsisilbing manggagamot, tagapamagitan sa mga espiritu, at tagapag-ingat ng kaalaman ng pamayanan. Mataas ang kanilang katayuan sa lipunan." },
    ],
    facts: ["Ang Manunggul Jar mula sa Tabon Caves, Palawan, ay banga ng ikalawang libing na may takip na naglalarawan ng dalawang kaluluwang naglalayag sa bangka patungo sa kabilang-buhay.", "Ang Manunggul Jar ay itinuturing na Pambansang Kayamanang Pangkultura."],
    examples: [
      { title: "Pag-aalay sa anito", text: "Nag-aalay ng pagkain at inumin ang mga sinaunang Pilipino bago magtanim, maglayag, o magdiwang upang humingi ng biyaya at proteksiyon." },
      { title: "Pasintabi sa nuno", text: "Ang pagsasabi ng 'tabi-tabi po' ay bakas ng sinaunang paggalang sa mga espiritu ng kalikasan." },
    ],
    keyTerms: [
      { term: "Babaylan", def: "Pinunong espirituwal at manggagamot sa sinaunang lipunan." },
      { term: "Anito", def: "Espiritu ng ninuno o kalikasan na iginagalang at pinag-aalayan." },
      { term: "Animismo", def: "Paniniwalang may espiritu ang mga bagay sa kalikasan." },
      { term: "Datu", def: "Pinuno ng barangay." },
    ],
    summary: "May mayaman at organisadong sistema ng paniniwala ang lipunang barangay. Ang babaylan, ang pagsamba sa anito, at ang paniniwala sa kabilang-buhay ay bahagi ng kamalayang Pilipino na may bakas pa rin hanggang ngayon.",
    assessment: [
      { q: "Sino ang nagsilbing manggagamot at tagapamagitan sa mga espiritu?", choices: ["Datu", "Timawa", "Babaylan", "Alipin"], answer: 2, explain: "Ang babaylan ang pinunong espirituwal." },
      { q: "Ano ang ipinakikita ng Manunggul Jar?", choices: ["Kalakalan sa Tsina", "Paniniwala sa paglalakbay ng kaluluwa", "Digmaan ng mga barangay", "Pagdating ng Islam"], answer: 1, explain: "Ang takip nito ay naglalarawan ng kaluluwang naglalayag." },
      { q: "Ano ang tawag sa paniniwalang may espiritu ang kalikasan?", choices: ["Animismo", "Monoteismo", "Ateismo", "Kolonyalismo"], answer: 0, explain: "Animismo ang tawag dito." },
    ],
  },
  {
    id: "t1-w9", term: 1, week: 9, weeks: "9–10", topic: "Personal at panlipunang paniniwala",
    title: "Personal at Panlipunang Paniniwala sa Kamalayang Pangkasaysayan",
    competency: "Personal at panlipunang paniniwala at pananampalataya sa kamalayang pangkasaysayan.",
    keywords: ["pananampalataya", "sinkretismo", "Santo Niño", "Islam", "Sinulog", "pagpaparaya", "paniniwala"],
    image: intramuros, caption: "Simbahan sa loob ng Intramuros — tanda ng pagdating ng Kristiyanismo.",
    objectives: ["Maipaliwanag ang ugnayan ng personal at panlipunang paniniwala.", "Masuri kung paano naghalo ang katutubo at dayuhang pananampalataya.", "Maipakita ang paggalang sa pagkakaiba-iba ng paniniwala."],
    intro: "Ang ating paniniwala ay personal, ngunit hinuhubog din ito ng lipunan at ng kasaysayan. Sa Pilipinas, makikita ang paghahalo ng katutubong paniniwala, Islam, at Kristiyanismo.",
    sections: [
      { heading: "Pagdating ng Islam", body: "Bago pa ang mga Espanyol, lumaganap na ang Islam sa Sulu at Mindanao sa pamamagitan ng mga mangangalakal at misyonero. Itinatag ang mga sultanato na may sariling pamahalaan at batas." },
      { heading: "Kristiyanismo at sinkretismo", body: "Ipinakilala ng mga Espanyol ang Kristiyanismo. Hindi tuluyang nawala ang katutubong paniniwala; naghalo ito sa bagong relihiyon. Tinatawag itong sinkretismo, makikita sa mga pista at ritwal na may halong katutubong elemento." },
      { heading: "Paniniwala at pagkakaisa", body: "Ang paniniwala ay maaaring maging puwersa ng pagkakaisa at pakikibaka — gaya ng Cofradía de San José ni Hermano Pule — ngunit nangangailangan din ito ng paggalang sa iba sa isang lipunang may iba't ibang pananampalataya." },
    ],
    facts: ["Ang imahen ng Santo Niño na iniregalo ni Magallanes noong 1521 ay itinuturing na isa sa pinakamatandang relikyang Kristiyano sa bansa.", "Itinatag ang Sultanato ng Sulu noong ika-15 siglo."],
    examples: [
      { title: "Sinulog ng Cebu", text: "Pagdiriwang para sa Santo Niño na may sayaw na pinaniniwalaang may ugat sa katutubong ritwal." },
      { title: "Cofradía de San José (1832–1841)", text: "Samahang panrelihiyon na itinatag ni Apolinario de la Cruz (Hermano Pule) nang hindi tanggapin ang mga Indio sa mga samahang Espanyol." },
    ],
    keyTerms: [
      { term: "Sinkretismo", def: "Paghahalo ng iba't ibang paniniwala o relihiyon." },
      { term: "Sultanato", def: "Pamahalaang Islamiko na pinamumunuan ng sultan." },
      { term: "Pagpaparaya", def: "Paggalang at pagtanggap sa paniniwalang iba sa sarili." },
      { term: "Pananampalataya", def: "Matibay na paniniwala sa isang diyos o espirituwal na katotohanan." },
    ],
    summary: "Ang pananampalataya ng Pilipino ay bunga ng mahabang kasaysayan ng pagtatagpo ng katutubo, Islamiko, at Kristiyanong paniniwala. Bahagi ng kamalayang pangkasaysayan ang paggalang sa pagkakaibang ito.",
    assessment: [
      { q: "Ano ang sinkretismo?", choices: ["Pagtanggi sa relihiyon", "Paghahalo ng iba't ibang paniniwala", "Pagsamba sa iisang diyos", "Pagbabawal ng relihiyon"], answer: 1, explain: "Ito ang paghahalo ng paniniwala." },
      { q: "Saan unang lumaganap ang Islam sa Pilipinas?", choices: ["Ilocos", "Bicol", "Sulu at Mindanao", "Cebu"], answer: 2, explain: "Sa Sulu at Mindanao sa pamamagitan ng kalakalan." },
      { q: "Sino ang nagtatag ng Cofradía de San José?", choices: ["Andres Bonifacio", "Apolinario de la Cruz", "Diego Silang", "Francisco Dagohoy"], answer: 1, explain: "Si Apolinario de la Cruz o Hermano Pule." },
    ],
  },

  // ───────── IKALAWANG TERMINO ─────────
  {
    id: "t2-w1", term: 2, week: 1, weeks: "1", topic: "Kahulugan ng pakikibaka",
    title: "Ang Pakikibaka bilang Salik ng Kamalayang Pilipino",
    competency: "Kahulugan at katuturan ng pakikibaka bilang salik sa pag-usbong ng kamalayang Pilipino.",
    keywords: ["pakikibaka", "kamalayang Pilipino", "nasyonalismo", "paglaban", "kalayaan"],
    image: revolution, caption: "Mga rebolusyonaryong Pilipino sa huling bahagi ng ika-19 na siglo.",
    objectives: ["Matukoy ang kahulugan ng pakikibaka.", "Maipaliwanag kung paano umusbong ang kamalayang Pilipino mula sa pakikibaka.", "Makilala ang iba't ibang anyo ng pakikibaka."],
    intro: "Ang pagiging 'Pilipino' bilang iisang bayan ay hindi agad umiral. Ito ay nabuo sa paglipas ng panahon, lalo na sa sama-samang karanasan ng paglaban sa pang-aapi.",
    sections: [
      { heading: "Ano ang pakikibaka?", body: "Ang pakikibaka ay sama-samang pagsisikap na labanan ang kawalang-katarungan at makamit ang kalayaan, karapatan, o kaunlaran. Hindi ito laging armado; maaari itong maging pagsulat, pag-oorganisa, o mapayapang pagkilos." },
      { heading: "Mula pamayanan tungo sa bayan", body: "Noong una, lokal ang mga pag-aalsa at nakatuon sa tiyak na hinaing. Sa paglipas ng panahon, nakita ng mga tao mula sa iba't ibang rehiyon na iisa ang kanilang karanasan. Dito umusbong ang kamalayang Pilipino." },
      { heading: "Mga anyo ng pakikibaka", body: "May armadong pag-aalsa, kilusang repormista sa pamamagitan ng pahayagan, rebolusyon, at mapayapang pagkilos ng mamamayan gaya ng Lakas ng Bayan sa EDSA." },
    ],
    facts: ["Noong panahon ng Espanyol, ang terminong 'Filipino' ay unang tumukoy sa mga Espanyol na isinilang sa kapuluan.", "Sa huling bahagi ng ika-19 na siglo, ginamit na ito ng mga propagandista para sa lahat ng katutubo ng bansa."],
    examples: [
      { title: "Pag-aalsa ni Dagohoy (1744–1829)", text: "Pinakamahabang pag-aalsa sa panahon ng Espanyol, na nagsimula sa Bohol dahil sa hindi pagbibigay ng marangal na libing sa kapatid ni Dagohoy." },
      { title: "Kilusang Propaganda", text: "Mapayapang pakikibaka sa pamamagitan ng panulat upang humingi ng reporma." },
    ],
    keyTerms: [
      { term: "Pakikibaka", def: "Sama-samang paglaban para sa katarungan at kalayaan." },
      { term: "Nasyonalismo", def: "Pagmamahal at katapatan sa bayan at pagnanais ng sariling pamamahala." },
      { term: "Pag-aalsa", def: "Paglaban ng isang pangkat laban sa namumuno." },
      { term: "Kamalayang Pilipino", def: "Pagkilala sa sarili bilang bahagi ng iisang bayang Pilipino." },
    ],
    summary: "Ang pakikibaka ay hindi lamang paglaban; ito ang naging daan upang mabuo ang pagkakakilanlang Pilipino. Sa sama-samang karanasan, natutunan ng mga tao na sila ay iisang bayan.",
    assessment: [
      { q: "Alin ang pinakamahusay na kahulugan ng pakikibaka?", choices: ["Pansariling away", "Sama-samang paglaban para sa katarungan", "Pagsunod sa namumuno", "Paglalakbay"], answer: 1, explain: "Ito ay sama-samang paglaban para sa katarungan at kalayaan." },
      { q: "Sino ang namuno sa pinakamahabang pag-aalsa noong panahon ng Espanyol?", choices: ["Diego Silang", "Francisco Dagohoy", "Lapu-Lapu", "Hermano Pule"], answer: 1, explain: "Tumagal nang 85 taon ang pag-aalsa ni Dagohoy." },
      { q: "Alin ang HINDI armadong anyo ng pakikibaka?", choices: ["Rebolusyon ng 1896", "Pag-aalsa ni Dagohoy", "Kilusang Propaganda", "Digmaang Pilipino-Amerikano"], answer: 2, explain: "Gumamit ng panulat ang Kilusang Propaganda." },
    ],
  },
  {
    id: "t2-w2", term: 2, week: 2, weeks: "2–3", topic: "Pakikibaka laban sa dayuhan",
    title: "Kolektibong Karanasan ng Pakikibaka Laban sa mga Dayuhan",
    competency: "Kolektibong karanasan ng pakikibaka laban sa mga dayuhan gamit ang piling kaso sa kasaysayan.",
    keywords: ["Lapu-Lapu", "Mactan", "Diego Silang", "Gabriela Silang", "polo y servicio", "tributo", "pag-aalsa"],
    image: intramuros, caption: "Intramuros, sentro ng kapangyarihang kolonyal ng Espanya.",
    objectives: ["Masuri ang piling kaso ng paglaban sa mga dayuhan.", "Matukoy ang mga sanhi ng pag-aalsa.", "Maipaliwanag kung bakit nabigo o nagtagumpay ang mga ito."],
    intro: "Sa loob ng mahigit tatlong siglo, maraming pag-aalsa ang naganap sa iba't ibang bahagi ng kapuluan. Bawat isa ay may sariling hinaing, ngunit lahat ay nagpapakita ng pagnanais na lumaya sa pang-aapi.",
    sections: [
      { heading: "Labanan sa Mactan (1521)", body: "Tinanggihan ni Lapu-Lapu, pinuno ng Mactan, ang paghingi ng tributo ni Fernando Magallanes. Napatay si Magallanes sa labanan noong Abril 27, 1521. Itinuturing itong unang naitalang paglaban sa mananakop na Europeo." },
      { heading: "Mga sanhi ng pag-aalsa", body: "Kabilang sa karaniwang sanhi ang mabigat na tributo, sapilitang paggawa (polo y servicio), pang-aabuso ng ilang prayle at opisyal, pagkawala ng lupa, at pagnanais na manumbalik ang katutubong paniniwala." },
      { heading: "Ang mga Silang ng Ilocos", body: "Noong 1762–1763, pinamunuan ni Diego Silang ang pag-aalsa sa Ilocos. Nang siya ay mapaslang, ipinagpatuloy ito ng kanyang asawang si Gabriela Silang — isa sa mga kinikilalang babaeng lider ng paglaban." },
    ],
    facts: ["Sa ilalim ng polo y servicio, ang mga lalaking 16 hanggang 60 taong gulang ay kinakailangang magtrabaho nang 40 araw bawat taon.", "Isang dahilan ng pagkabigo ng maraming pag-aalsa ang kawalan ng pagkakaisa at ang paggamit ng mga Espanyol ng sundalo mula sa ibang rehiyon."],
    examples: [
      { title: "Pag-aalsa ni Sumuroy (1649–1650)", text: "Nagsimula sa Samar bilang pagtutol sa pagpapadala ng mga manggagawa sa Cavite para sa paggawa ng barko." },
      { title: "Pag-aalsa ni Tamblot (1621–1622)", text: "Pag-aalsa sa Bohol na naglalayong ibalik ang katutubong pananampalataya." },
    ],
    keyTerms: [
      { term: "Tributo", def: "Buwis na ibinabayad ng katutubo sa pamahalaang kolonyal." },
      { term: "Polo y servicio", def: "Sapilitang paggawa sa ilalim ng Espanya." },
      { term: "Hatiin at sakupin", def: "Patakarang 'hatiin at pamunuan' upang hindi magkaisa ang nasasakupan." },
      { term: "Kolonyalismo", def: "Pagsakop at pamamahala ng isang bansa sa ibang lupain." },
    ],
    summary: "Ang mga pag-aalsa laban sa mga dayuhan ay bunga ng tunay na hinaing ng mamamayan. Bagaman marami ang nabigo dahil sa kawalan ng pagkakaisa, inihanda nila ang daan para sa mas malawak na kilusang makabayan.",
    assessment: [
      { q: "Sino ang pinuno ng Mactan na lumaban kay Magallanes?", choices: ["Rajah Humabon", "Lapu-Lapu", "Rajah Sulayman", "Datu Puti"], answer: 1, explain: "Si Lapu-Lapu ang tumanggi sa paghingi ng tributo." },
      { q: "Ano ang polo y servicio?", choices: ["Buwis sa lupa", "Sapilitang paggawa", "Kalakalang galyon", "Paaralan"], answer: 1, explain: "Sapilitang paggawa ito sa ilalim ng Espanya." },
      { q: "Sino ang nagpatuloy ng pag-aalsa sa Ilocos matapos mapaslang ang kanyang asawa?", choices: ["Melchora Aquino", "Gabriela Silang", "Teresa Magbanua", "Gregoria de Jesus"], answer: 1, explain: "Ipinagpatuloy ni Gabriela Silang ang laban." },
    ],
  },
  {
    id: "t2-w4", term: 2, week: 4, weeks: "4–5", topic: "Kilusang panlipunan",
    title: "Mga Sanhi ng Kilusang Agraryo, Propaganda, at Himagsikan",
    competency: "Mga sanhi ng kilusang panlipunan tulad ng kilusang agraryo, propaganda, at himagsikan.",
    keywords: ["Rizal", "Propaganda", "La Solidaridad", "Katipunan", "Bonifacio", "GomBurZa", "agraryo", "hacienda", "Noli Me Tangere"],
    image: revolution, caption: "Mga kasapi ng kilusang rebolusyonaryo.",
    objectives: ["Matukoy ang mga sanhi ng kilusang agraryo, Propaganda, at Himagsikan.", "Maihambing ang layunin at paraan ng Propaganda at Katipunan.", "Maipaliwanag ang ugnayan ng mga suliraning panlipunan at pag-usbong ng kilusan."],
    intro: "Noong ika-19 na siglo, nagbago ang lipunan: lumawak ang kalakalan, umusbong ang mga ilustrado, at lumala ang suliranin sa lupa. Ang mga pagbabagong ito ang nagbunsod ng iba't ibang kilusang panlipunan.",
    sections: [
      { heading: "Suliraning agraryo", body: "Maraming lupain ang napasakamay ng mga prayle at may-ari ng hacienda. Ang mga magsasaka ay naging kasama o inquilino na nagbabayad ng mataas na upa. Ang alitan sa lupa sa Calamba, Laguna — kabilang ang pamilya Rizal — ay isang halimbawa." },
      { heading: "Kilusang Propaganda (1880–1895)", body: "Pinamunuan ng mga ilustradong gaya nina Jose Rizal, Marcelo H. del Pilar, at Graciano Lopez Jaena. Humingi sila ng reporma: representasyon sa Cortes ng Espanya, pagkakapantay sa batas, at kalayaan sa pamamahayag, sa pamamagitan ng La Solidaridad at mga nobela ni Rizal." },
      { heading: "Katipunan at Himagsikan (1892–1898)", body: "Nang hindi pakinggan ang reporma at ipatapon si Rizal sa Dapitan, itinatag ni Andres Bonifacio ang Katipunan noong Hulyo 7, 1892. Layunin nitong makamit ang kalayaan sa pamamagitan ng armadong himagsikan, na sumiklab noong Agosto 1896." },
    ],
    facts: ["Ang pagbitay sa GomBurZa (Gomez, Burgos, Zamora) noong Pebrero 17, 1872 ay nagpaalab ng damdaming makabayan.", "Inilathala ang Noli Me Tangere noong 1887 at El Filibusterismo noong 1891.", "Binaril si Rizal sa Bagumbayan noong Disyembre 30, 1896."],
    examples: [
      { title: "La Liga Filipina (1892)", text: "Samahang itinatag ni Rizal para sa pagtutulungan at reporma; nabuwag nang siya ay arestuhin." },
      { title: "Sigaw sa Pugad Lawin", text: "Pinunit ng mga Katipunero ang kanilang sedula bilang hudyat ng himagsikan noong Agosto 1896." },
    ],
    keyTerms: [
      { term: "Ilustrado", def: "Mga Pilipinong nakapag-aral, kadalasan sa Europa." },
      { term: "Reporma", def: "Pagbabago sa loob ng umiiral na sistema." },
      { term: "Himagsikan", def: "Rebolusyon; armadong paglaban upang palitan ang pamahalaan." },
      { term: "Inquilino", def: "Umuupa ng lupa ng hacienda o prayle." },
    ],
    summary: "Ang suliraning agraryo, diskriminasyon, at kawalan ng katarungan ang nagbunsod ng Kilusang Propaganda at ng Katipunan. Nang mabigo ang reporma, pinili ng mamamayan ang himagsikan.",
    assessment: [
      { q: "Ano ang pangunahing layunin ng Kilusang Propaganda?", choices: ["Ganap na kalayaan sa armas", "Reporma sa pamamagitan ng mapayapang paraan", "Pagbabalik ng sultanato", "Kalakalang galyon"], answer: 1, explain: "Humingi ng reporma ang mga propagandista." },
      { q: "Sino ang nagtatag ng Katipunan?", choices: ["Jose Rizal", "Emilio Aguinaldo", "Andres Bonifacio", "Apolinario Mabini"], answer: 2, explain: "Itinatag ito ni Bonifacio noong 1892." },
      { q: "Anong pangyayari noong 1872 ang nagpaalab ng nasyonalismo?", choices: ["Pagbitay sa GomBurZa", "Pagbubukas ng Kanal Suez lamang", "Labanan sa Mactan", "Kasunduan sa Paris"], answer: 0, explain: "Ang pagbitay sa tatlong pari ay pumukaw sa damdamin ng mga Pilipino." },
    ],
  },
  {
    id: "t2-w6", term: 2, week: 6, weeks: "6–7", topic: "Pakikibaka sa pagsasarili",
    title: "Pakikibaka sa Panahon ng Pagsasarili",
    competency: "Kolektibong karanasan ng pakikibaka sa panahon ng pagsasarili gamit ang piling kaso.",
    keywords: ["Hukbalahap", "Batas Militar", "EDSA", "Lakas ng Bayan sa EDSA", "1986", "Ninoy Aquino", "Kalayaan 1946", "repormang agraryo"],
    image: commonwealth, caption: "Maynila sa panahon ng Komonwelt at pagsasarili.",
    objectives: ["Masuri ang piling kaso ng pakikibaka matapos makamit ang kalayaan noong 1946.", "Maipaliwanag ang mga sanhi at bunga ng Batas Militar at EDSA.", "Mapahalagahan ang mapayapang pakikibaka para sa demokrasya."],
    intro: "Nakamit ng Pilipinas ang kalayaan mula sa Estados Unidos noong Hulyo 4, 1946. Ngunit hindi natapos ang pakikibaka — nagpatuloy ito laban sa kahirapan, kawalang-katarungan, at diktadura.",
    sections: [
      { heading: "Ang Hukbalahap at suliranin sa lupa", body: "Nabuo ang Hukbalahap noong Ikalawang Digmaang Pandaigdig upang labanan ang mga Hapon. Pagkatapos ng digmaan, nagpatuloy ang kilusan sa Gitnang Luzon dahil sa hinaing ng mga magsasaka tungkol sa lupa." },
      { heading: "Batas Militar (1972–1981)", body: "Idineklara ni Pangulong Ferdinand Marcos ang Batas Militar noong Setyembre 21, 1972. Naisara ang Kongreso at maraming pahayagan, at maraming mamamayan ang inaresto at nilabag ang karapatang pantao." },
      { heading: "Lakas ng Bayan sa EDSA (1986)", body: "Matapos ang pagpaslang kay Benigno 'Ninoy' Aquino Jr. noong 1983 at ang pinagtatalunang biglaang halalan, milyon-milyong Pilipino ang nagtipon sa EDSA noong Pebrero 22–25, 1986. Mapayapang napatalsik ang rehimen at naibalik ang demokrasya." },
    ],
    facts: ["Batay sa Batas Republika Blg. 10368 (2013), kinilala ng estado ang mga biktima ng paglabag sa karapatang pantao noong Batas Militar.", "Ang Saligang Batas ng 1987 ay binuo matapos ang EDSA upang ibalik ang demokratikong institusyon."],
    examples: [
      { title: "Kalayaan noong 1946", text: "Ipinahayag ang Republika ng Pilipinas noong Hulyo 4, 1946; mula 1962, ginugunita ang Araw ng Kalayaan tuwing Hunyo 12." },
      { title: "Papel ng radyo at simbahan sa EDSA", text: "Nanawagan ang Radio Veritas at si Kardinal Sin sa mamamayan na pumunta sa EDSA upang protektahan ang mga sundalong kumalas sa rehimen." },
    ],
    keyTerms: [
      { term: "Batas Militar", def: "Pamamahala ng militar na sinususpinde ang ilang karapatang sibil." },
      { term: "Lakas ng Bayan sa EDSA", def: "Mapayapang sama-samang pagkilos ng mamamayan." },
      { term: "Diktadura", def: "Pamahalaang ang kapangyarihan ay nasa iisang tao nang walang tunay na pananagutan." },
      { term: "Karapatang pantao", def: "Mga karapatang likas sa bawat tao." },
    ],
    summary: "Kahit malaya na, nagpatuloy ang pakikibaka ng mga Pilipino para sa lupa, katarungan, at demokrasya. Ang EDSA 1986 ay nagpakita sa mundo ng lakas ng mapayapang sama-samang pagkilos.",
    assessment: [
      { q: "Kailan idineklara ang Batas Militar?", choices: ["1946", "1965", "1972", "1986"], answer: 2, explain: "Idineklara ito noong Setyembre 1972." },
      { q: "Ano ang pangunahing katangian ng Lakas ng Bayan sa EDSA?", choices: ["Armadong digmaan", "Mapayapang pagkilos ng mamamayan", "Pananakop ng dayuhan", "Halalang lokal"], answer: 1, explain: "Mapayapa ang pagkilos sa EDSA." },
      { q: "Saang rehiyon pinakamalakas ang Hukbalahap?", choices: ["Gitnang Luzon", "Mindanao", "Visayas", "Kordilyera"], answer: 0, explain: "Sa Gitnang Luzon, kung saan matindi ang suliranin sa lupa." },
    ],
  },
  {
    id: "t2-w8", term: 2, week: 8, weeks: "8–9", topic: "Ambag ng pakikibaka",
    title: "Mga Ambag ng Pakikibaka sa Pagsulong ng Kamalayang Pilipino",
    competency: "Mga ambag ng pakikibaka ng mga Pilipino sa pagsulong ng kamalayang Pilipino.",
    keywords: ["Malolos", "Saligang Batas", "Unang Republika", "1898", "kalayaan", "demokrasya", "wikang pambansa"],
    image: revolution, caption: "Ang himagsikan bilang ugat ng Unang Republika.",
    objectives: ["Matukoy ang mga konkretong ambag ng pakikibaka sa bansa.", "Maipaliwanag ang kahalagahan ng Unang Republika at Saligang Batas.", "Mapahalagahan ang pamana ng mga nakibaka."],
    intro: "Ano ang iniwan sa atin ng mga nakibaka? Bukod sa kalayaan, nag-iwan sila ng mga institusyon, simbolo, at pagpapahalaga na bumubuo sa ating pagkakakilanlan.",
    sections: [
      { heading: "Kalayaan at ang Unang Republika", body: "Ipinahayag ang kalayaan sa Kawit, Cavite noong Hunyo 12, 1898. Pinagtibay ang Saligang Batas ng Malolos at pinasinayaan ang Unang Republika noong Enero 23, 1899 — isa sa mga unang republika sa Asya." },
      { heading: "Mga simbolo ng bansa", body: "Ang watawat at pambansang awit ay nabuo sa panahon ng himagsikan. Ang mga simbolong ito ay nagpapaalala ng sakripisyo at ng iisang pagkakakilanlan." },
      { heading: "Mga pagpapahalaga at karapatan", body: "Mula sa pakikibaka ay nagmula ang pagpapahalaga sa demokrasya, karapatang pantao, at kalayaan sa pamamahayag na nakasaad ngayon sa Saligang Batas ng 1987." },
    ],
    facts: ["Ang Kartilya ng Katipunan ni Emilio Jacinto ay naglalaman ng mga aral sa wastong asal at pagkakapantay-pantay.", "Si Apolinario Mabini, ang 'Utak ng Rebolusyon', ay sumulat ng El Verdadero Decálogo."],
    examples: [
      { title: "Saligang Batas ng Malolos", text: "Nagtakda ng hiwalay na simbahan at estado at ng mga karapatan ng mamamayan." },
      { title: "Araw ng mga Bayani", text: "Ginugunita tuwing huling Lunes ng Agosto bilang pagkilala sa lahat ng nakibaka para sa bayan." },
    ],
    keyTerms: [
      { term: "Republika", def: "Pamahalaang ang kapangyarihan ay nagmumula sa mamamayan." },
      { term: "Saligang Batas", def: "Pinakamataas na batas ng isang bansa." },
      { term: "Kartilya", def: "Aklat ng mga aral at alituntunin ng Katipunan." },
      { term: "Pamana", def: "Bagay o pagpapahalagang iniwan para sa susunod na salinlahi." },
    ],
    summary: "Ang pakikibaka ng mga Pilipino ay nag-iwan ng kalayaan, republika, mga simbolo, at mga pagpapahalagang demokratiko. Ang mga ito ang pundasyon ng kamalayang Pilipino ngayon.",
    assessment: [
      { q: "Saan ipinahayag ang kalayaan noong 1898?", choices: ["Malolos", "Kawit, Cavite", "Maynila", "Biak-na-Bato"], answer: 1, explain: "Sa tahanan ni Aguinaldo sa Kawit, Cavite." },
      { q: "Sino ang tinaguriang 'Utak ng Rebolusyon'?", choices: ["Emilio Jacinto", "Apolinario Mabini", "Antonio Luna", "Marcelo del Pilar"], answer: 1, explain: "Si Mabini ay pangunahing tagapayo ng Unang Republika." },
      { q: "Kailan pinasinayaan ang Unang Republika?", choices: ["Hunyo 12, 1898", "Enero 23, 1899", "Hulyo 4, 1946", "Pebrero 25, 1986"], answer: 1, explain: "Pinasinayaan ito sa Malolos noong Enero 23, 1899." },
    ],
  },
  {
    id: "t2-w10", term: 2, week: 10, weeks: "10", topic: "Personal na karanasan at pakikiangkop",
    title: "Personal na Karanasan at ang Pangkalahatang Pakikibaka",
    competency: "Pag-uugnay ng personal na karanasan sa pangkalahatang karanasan ng pakikibaka at pakikiangkóp.",
    keywords: ["pakikiangkop", "personal na karanasan", "OFW", "bayanihan", "katatagan", "migrasyon"],
    image: community, caption: "Pagtutulungan ng mga magsasaka — anyo ng araw-araw na pakikibaka.",
    objectives: ["Maiugnay ang sariling karanasan sa kasaysayan ng pakikibaka ng bayan.", "Maipaliwanag ang konsepto ng pakikiangkop.", "Makabuo ng repleksiyon tungkol sa sariling papel sa bayan."],
    intro: "Ang pakikibaka ay hindi lamang nangyayari sa larangan ng digmaan. Nararanasan ito ng karaniwang pamilya sa pagharap sa kahirapan, kalamidad, at pagbabago.",
    sections: [
      { heading: "Pakikiangkop", body: "Ang pakikiangkop ay ang kakayahang umangkop sa nagbabagong kalagayan habang pinananatili ang sariling pagkakakilanlan at pagpapahalaga. Makikita ito sa kung paano bumabangon ang mga pamayanan matapos ang bagyo o lindol." },
      { heading: "Ang karanasan ng migranteng Pilipino", body: "Milyon-milyong Pilipino ang nagtatrabaho sa ibang bansa upang suportahan ang pamilya. Ang kanilang sakripisyo ay isang makabagong anyo ng pakikibaka para sa mas maayos na buhay." },
      { heading: "Ang aking kuwento bilang bahagi ng kasaysayan", body: "Kapag naiuugnay natin ang karanasan ng ating pamilya — paglipat ng tirahan, pagharap sa kalamidad, pag-aaral sa gitna ng hirap — sa mas malawak na kasaysayan, mas nauunawaan natin ang ating papel bilang mamamayan." },
    ],
    facts: ["Ang Bagyong Yolanda (Haiyan) noong Nobyembre 2013 ay isa sa pinakamalakas na bagyong tumama sa bansa; nagpakita ito ng katatagan at bayanihan ng mga pamayanan.", "Itinuturing na mahalagang bahagi ng ekonomiya ang remitans ng mga Pilipino sa ibang bansa."],
    examples: [
      { title: "Bayanihan sa panahon ng kalamidad", text: "Pagtutulungan ng mga kapitbahay sa paglilinis at muling pagtatayo matapos ang bagyo." },
      { title: "Liham ng isang OFW", text: "Ang mga liham at mensahe ng migranteng manggagawa ay maaaring maging primaryang sanggunian ng makabagong kasaysayan." },
    ],
    keyTerms: [
      { term: "Pakikiangkop", def: "Pag-angkop sa pagbabago habang pinananatili ang sariling pagkakakilanlan." },
      { term: "Katatagan (resilience)", def: "Kakayahang bumangon mula sa pagsubok." },
      { term: "Migrasyon", def: "Paglipat ng tao mula sa isang lugar patungo sa iba." },
      { term: "Repleksiyon", def: "Malalim na pagninilay tungkol sa karanasan." },
    ],
    summary: "Ang ating personal na karanasan ng pagsubok at pag-angkop ay bahagi ng mahabang kasaysayan ng pakikibaka ng mga Pilipino. Sa pagkilala rito, nagiging mas makabuluhan ang ating pagiging mamamayan.",
    assessment: [
      { q: "Ano ang pakikiangkop?", choices: ["Pagtalikod sa sariling kultura", "Pag-angkop sa pagbabago habang pinananatili ang pagkakakilanlan", "Pag-iwas sa problema", "Paglaban sa lahat ng pagbabago"], answer: 1, explain: "Pinananatili ang pagkakakilanlan habang umaangkop." },
      { q: "Alin ang halimbawa ng makabagong anyo ng pakikibaka?", choices: ["Labanan sa Mactan", "Sakripisyo ng mga OFW para sa pamilya", "Pag-aalsa ni Dagohoy", "Sigaw sa Pugad Lawin"], answer: 1, explain: "Ang pagtatrabaho sa ibang bansa ay makabagong anyo ng pakikibaka." },
      { q: "Ano ang ibig sabihin ng katatagan?", choices: ["Kakayahang bumangon mula sa pagsubok", "Pagiging mayaman", "Pagsunod sa uso", "Pag-alis sa bansa"], answer: 0, explain: "Ito ay kakayahang bumangon." },
    ],
  },

  // ───────── IKATLONG TERMINO ─────────
  {
    id: "t3-w1", term: 3, week: 1, weeks: "1", topic: "Konsepto ng likas-kayang pag-unlad",
    title: "Likas-Kayang Pag-unlad at Pagkakakilanlang Pilipino",
    competency: "Mga konseptong kaugnay ng likas-kayang pag-unlad at pagkakakilanlang Pilipino.",
    keywords: ["likas-kayang pag-unlad", "likas-kayang kaunlaran", "Brundtland", "kapaligiran", "ekonomiya", "lipunan"],
    image: terraces, caption: "Ang hagdan-hagdang palayan bilang halimbawa ng katutubong pangangalaga sa kalikasan.",
    objectives: ["Matukoy ang kahulugan ng likas-kayang pag-unlad.", "Maipaliwanag ang tatlong haligi nito.", "Maiugnay ang likas-kayang pag-unlad sa pagkakakilanlang Pilipino."],
    intro: "Paano tayo uunlad nang hindi inuubos ang yaman na kakailanganin ng susunod na henerasyon? Ito ang pangunahing tanong ng likas-kayang pag-unlad.",
    sections: [
      { heading: "Kahulugan", body: "Ayon sa ulat na 'Ating Iisang Kinabukasan' (Ulat Brundtland, 1987), ang likas-kayang pag-unlad ay pag-unlad na tumutugon sa pangangailangan ng kasalukuyan nang hindi isinasakripisyo ang kakayahan ng susunod na henerasyon na tugunan ang kanilang sariling pangangailangan." },
      { heading: "Tatlong haligi", body: "Binubuo ito ng pag-unlad na pang-ekonomiya, pagkakapantay-pantay sa lipunan, at pangangalaga sa kapaligiran. Kailangang balanse ang tatlo; hindi tunay na pag-unlad ang paglago ng ekonomiya kung nasisira ang kalikasan o naiiwan ang mahihirap." },
      { heading: "Ugnayan sa pagkakakilanlang Pilipino", body: "Maraming katutubong kaugalian ang likas-kaya: ang pangangalaga ng Ifugao sa kagubatan (muyong) na nagbibigay-tubig sa palayan, at ang bayanihan na nagpapalakas sa pamayanan." },
    ],
    facts: ["Noong 2015, pinagtibay ng mga bansang kasapi ng Nagkakaisang mga Bansa (UN), kabilang ang Pilipinas, ang 17 Layunin para sa Likas-Kayang Pag-unlad (SDGs) para sa taong 2030."],
    examples: [
      { title: "Muyong ng Ifugao", text: "Pribadong kagubatang pinangangalagaan ng pamilya na nagsisilbing pinagmumulan ng tubig ng palayan." },
      { title: "Pagre-recycle sa barangay", text: "Paghihiwalay ng basura bilang simpleng ambag sa pangangalaga sa kapaligiran." },
    ],
    keyTerms: [
      { term: "Likas-kayang pag-unlad", def: "Pag-unlad na hindi isinasakripisyo ang susunod na henerasyon." },
      { term: "SDGs", def: "17 pandaigdigang layunin para sa likas-kayang pag-unlad pagsapit ng 2030." },
      { term: "Kapaligiran", def: "Kalikasan at likas na yaman na nakapaligid sa tao." },
      { term: "Pagkakapantay-pantay", def: "Patas na pagkakataon at pakinabang para sa lahat." },
    ],
    summary: "Ang likas-kayang pag-unlad ay balanse ng ekonomiya, lipunan, at kapaligiran. May ugat ito sa mga katutubong kaugaliang Pilipino na nagpapahalaga sa kalikasan at pamayanan.",
    assessment: [
      { q: "Anong ulat ang nagbigay ng kilalang kahulugan ng likas-kayang pag-unlad?", choices: ["Ulat Brundtland", "Saligang Batas ng Malolos", "Kartilya", "Noli Me Tangere"], answer: 0, explain: "Ang 'Ating Iisang Kinabukasan' (1987) o Ulat Brundtland." },
      { q: "Ilan ang Layunin para sa Likas-Kayang Pag-unlad (SDGs)?", choices: ["8", "10", "17", "25"], answer: 2, explain: "May 17 SDGs." },
      { q: "Alin ang HINDI kabilang sa tatlong haligi?", choices: ["Ekonomiya", "Lipunan", "Kapaligiran", "Militar"], answer: 3, explain: "Ekonomiya, lipunan, at kapaligiran ang tatlong haligi." },
    ],
  },
  {
    id: "t3-w2", term: 3, week: 2, weeks: "2", topic: "Opisyal na dokumento",
    title: "Mga Opisyal na Dokumentong Nagsusulong ng Likas-Kayang Pag-unlad",
    competency: "Mga opisyal na dokumentong nagsusulong ng likas-kayang pag-unlad.",
    keywords: ["Saligang Batas 1987", "RA 9003", "Batas sa Malinis na Hangin", "Planong Pangkaunlaran ng Pilipinas", "Ambisyon Natin 2040", "SDGs"],
    image: citizens, caption: "Pagtitipon ng mamamayan sa harap ng gusaling pampamahalaan.",
    objectives: ["Matukoy ang mga pangunahing dokumentong nagsusulong ng likas-kayang pag-unlad.", "Maipaliwanag ang nilalaman at layunin ng bawat dokumento.", "Masuri ang papel ng batas sa pangangalaga ng kapaligiran."],
    intro: "Ang mga pangarap para sa likas-kayang pag-unlad ay isinasalin sa batas at plano. Mahalagang malaman ng mamamayan ang mga dokumentong ito upang mapanagot ang pamahalaan at makilahok.",
    sections: [
      { heading: "Saligang Batas ng 1987", body: "Itinatakda ng Artikulo II, Seksiyon 16 na dapat protektahan at isulong ng Estado ang karapatan ng mamamayan sa balanse at malusog na ekolohiya. Ang Artikulo XII naman ay tungkol sa pambansang ekonomiya at patrimonya." },
      { heading: "Mga batas pangkapaligiran", body: "Kabilang dito ang RA 8749 (Batas sa Malinis na Hangin, 1999), RA 9003 (Batas sa Ekolohikal na Pamamahala ng Solidong Basura, 2000), at RA 9275 (Batas sa Malinis na Tubig, 2004)." },
      { heading: "Mga pambansang plano", body: "Ang AmBisyon Natin 2040 ay pangmatagalang bisyon ng mga Pilipino para sa isang matatag, maginhawa, at panatag na buhay. Ang Planong Pangkaunlaran ng Pilipinas ay isinasagawa bawat administrasyon upang isakatuparan ito." },
    ],
    facts: ["Sa kasong Oposa v. Factoran (1993), kinilala ng Korte Suprema ang karapatan ng mga kabataan na kumatawan sa susunod na henerasyon sa usaping pangkapaligiran — tinatawag na pananagutang pang-henerasyon."],
    examples: [
      { title: "Pasilidad sa Pagbawi ng mga Materyales (MRF)", text: "Iniaatas ng RA 9003 sa mga barangay ang pagkakaroon ng pasilidad para sa paghihiwalay at muling pagproseso ng basura." },
      { title: "Oposa v. Factoran", text: "Mga batang nagdemanda upang ipatigil ang labis na pagtotroso para sa kapakanan ng susunod na henerasyon." },
    ],
    keyTerms: [
      { term: "Batas Republika (RA)", def: "Batas na pinagtibay ng Kongreso." },
      { term: "AmBisyon Natin 2040", def: "Pangmatagalang bisyon ng bansa para sa kaunlaran." },
      { term: "Pananagutang pang-henerasyon", def: "Pananagutan ng kasalukuyan sa susunod na henerasyon." },
      { term: "Ekolohiya", def: "Ugnayan ng mga buhay na nilalang at kapaligiran." },
    ],
    summary: "Ang Saligang Batas, mga batas pangkapaligiran, at pambansang plano ay nagbibigay ng ligal na batayan para sa likas-kayang pag-unlad. Ang kaalaman dito ay daan sa responsableng pakikilahok.",
    assessment: [
      { q: "Anong batas ang tungkol sa pamamahala ng solidong basura?", choices: ["RA 8749", "RA 9003", "RA 9275", "RA 10368"], answer: 1, explain: "RA 9003 ang Batas sa Ekolohikal na Pamamahala ng Solidong Basura." },
      { q: "Anong kaso ang kumilala sa karapatan ng susunod na henerasyon?", choices: ["Oposa v. Factoran", "Marbury v. Madison", "Tañada v. Tuvera", "Rizal v. Espanya"], answer: 0, explain: "Oposa v. Factoran (1993)." },
      { q: "Ano ang AmBisyon Natin 2040?", choices: ["Isang batas sa buwis", "Pangmatagalang bisyon ng kaunlaran ng bansa", "Isang kasunduang militar", "Programa sa palakasan"], answer: 1, explain: "Ito ang pangmatagalang bisyon ng mga Pilipino." },
    ],
  },
  {
    id: "t3-w3", term: 3, week: 3, weeks: "3", topic: "Programang panlipunan",
    title: "Mga Programang Panlipunang Nagsusulong ng Likas-Kayang Pag-unlad",
    competency: "Mga piling programang panlipunang nagsusulong ng likas-kayang pag-unlad.",
    keywords: ["4Ps", "Pantawid Pamilya", "Pambansang Programa sa Pagpapaluntian (NGP)", "PhilHealth", "programang panlipunan", "CARP"],
    image: community, caption: "Mga magsasaka — kabilang sa pangunahing tinutulungan ng mga programang panlipunan.",
    objectives: ["Matukoy ang piling programang panlipunan ng pamahalaan.", "Masuri ang layunin at kinalabasan ng mga ito.", "Makabuo ng mungkahi upang mapabuti ang isang programa."],
    intro: "Ang mga programang panlipunan ay paraan ng pamahalaan upang tulungan ang mga mamamayang nangangailangan at isulong ang pag-unlad na walang naiiwan.",
    sections: [
      { heading: "Programang Pantawid Pamilyang Pilipino (4Ps)", body: "Isang programang may kondisyong paglilipat ng salapi na ginawang batas sa RA 11310 (2019). Nagbibigay ito ng tulong-pinansiyal sa mahihirap na pamilya kapalit ng pagtupad sa kondisyon gaya ng pagpapaaral sa anak at palagiang pagpapatingin sa sentrong pangkalusugan." },
      { heading: "Pambansang Programa sa Pagpapaluntian (NGP)", body: "Programa ng DENR na nagsimula noong 2011 upang magtanim ng puno sa malawak na lupain, mabawasan ang kahirapan sa kanayunan, at mapangalagaan ang kagubatan." },
      { heading: "Komprehensibong Programa sa Repormang Agraryo (CARP)", body: "Batay sa RA 6657 (1988), layunin nitong ipamahagi ang lupa sa mga magsasakang walang sariling lupa — kaugnay ng mahabang kasaysayan ng suliraning agraryo." },
    ],
    facts: ["Ang Batas sa Pangkalahatang Pangangalagang Pangkalusugan (RA 11223, 2019) ay naglalayong bigyan ang lahat ng Pilipino ng akses sa serbisyong pangkalusugan."],
    examples: [
      { title: "Kondisyon ng 4Ps", text: "Kailangang pumasok sa paaralan ang mga bata sa takdang porsiyento ng araw upang manatili sa programa." },
      { title: "Pagtatanim ng bakawan", text: "Bahagi ng pagpapanumbalik ng baybayin na nagsisilbing proteksiyon laban sa daluyong." },
    ],
    keyTerms: [
      { term: "Programang panlipunan", def: "Programa ng pamahalaan para sa kapakanan ng mamamayan." },
      { term: "May kondisyong paglilipat ng salapi", def: "Tulong-pinansiyal na may kapalit na kondisyon." },
      { term: "Repormang agraryo", def: "Muling pamamahagi ng lupa sa mga magsasaka." },
      { term: "Benepisyaryo", def: "Taong nakikinabang sa programa." },
    ],
    summary: "Ang 4Ps, Pambansang Programa sa Pagpapaluntian (NGP), at CARP ay ilan sa mga programang naglalayong isulong ang likas-kayang pag-unlad. Mahalaga ang mapanuring pagsusuri upang matiyak na tunay silang nakatutulong.",
    assessment: [
      { q: "Anong uri ng programa ang 4Ps?", choices: ["Pautang", "May kondisyong paglilipat ng salapi", "Pabahay", "Buwis"], answer: 1, explain: "Ito ay may kondisyong paglilipat ng salapi." },
      { q: "Anong ahensiya ang namamahala sa Pambansang Programa sa Pagpapaluntian (NGP)?", choices: ["DepEd", "DOH", "DENR", "DPWH"], answer: 2, explain: "Ang DENR ang namamahala nito." },
      { q: "Ano ang layunin ng CARP?", choices: ["Pamamahagi ng lupa sa magsasaka", "Pagtatayo ng kalsada", "Pagbibigay ng iskolarsip", "Pagbabawas ng buwis"], answer: 0, explain: "Layunin nitong ipamahagi ang lupa." },
    ],
  },
  {
    id: "t3-w4", term: 3, week: 4, weeks: "4", topic: "Katarungang panlipunan",
    title: "Likas-Kayang Pag-unlad bilang Pundasyon ng Katarungang Panlipunan",
    competency: "Likas-kayang pag-unlad bilang pundasyon ng katarungang panlipunan.",
    keywords: ["katarungang panlipunan", "katarungang panlipunan", "Artikulo XIII", "kahirapan", "pagkakapantay-pantay", "marhinalisado"],
    image: citizens, caption: "Mamamayang nagtitipon para sa usaping panlipunan.",
    objectives: ["Maipaliwanag ang kahulugan ng katarungang panlipunan.", "Masuri ang ugnayan ng likas-kayang pag-unlad at katarungang panlipunan.", "Matukoy ang mga sektor na marhinalisado."],
    intro: "Hindi tunay ang pag-unlad kung iilan lamang ang nakikinabang. Ang katarungang panlipunan ay tinitiyak na ang bunga ng kaunlaran ay napupunta sa lahat, lalo na sa mahihirap.",
    sections: [
      { heading: "Kahulugan ng katarungang panlipunan", body: "Ito ay ang patas na pamamahagi ng yaman, pagkakataon, at pribilehiyo sa lipunan. Sa Saligang Batas ng 1987, buong Artikulo XIII ang nakalaan sa Katarungang Panlipunan at Karapatang Pantao." },
      { heading: "Ugnayan sa likas-kayang pag-unlad", body: "Ang pagkasira ng kapaligiran ay kadalasang pinakamatinding tumatama sa mahihirap — mga mangingisda, magsasaka, at naninirahan sa tabing-dagat. Kaya ang pangangalaga sa kalikasan ay usapin din ng katarungan." },
      { heading: "Mga marhinalisadong sektor", body: "Kabilang dito ang mga katutubo, magsasaka, mangingisda, maralitang tagalungsod, kababaihan, at may kapansanan. Ang likas-kayang pag-unlad ay nangangailangan ng kanilang tinig at pakikilahok." },
    ],
    facts: ["Ang Batas sa mga Karapatan ng mga Katutubo (IPRA, RA 8371, 1997) ay kumikilala sa karapatan ng mga katutubo sa kanilang lupaing ninuno."],
    examples: [
      { title: "Lupaing ninuno", text: "Pagkilala sa karapatan ng mga katutubo sa lupang kanilang tinitirhan mula pa noong unang panahon." },
      { title: "Pangisdaang munisipal", text: "Paglalaan ng karagatang malapit sa baybayin para sa maliliit na mangingisda." },
    ],
    keyTerms: [
      { term: "Katarungang panlipunan", def: "Patas na pamamahagi ng yaman at pagkakataon." },
      { term: "Marhinalisado", def: "Sektor na naisasantabi sa lipunan." },
      { term: "Lupaing ninuno", def: "Lupang tradisyonal na tinitirhan ng katutubong pamayanan." },
      { term: "Inklusibong pag-unlad", def: "Pag-unlad na walang naiiwan." },
    ],
    summary: "Ang likas-kayang pag-unlad ay hindi maihihiwalay sa katarungang panlipunan. Tunay na pag-unlad ang tinatamasa ng lahat, lalo na ng mga sektor na matagal nang naisasantabi.",
    assessment: [
      { q: "Anong artikulo ng Saligang Batas 1987 ang tungkol sa katarungang panlipunan?", choices: ["Artikulo II", "Artikulo VI", "Artikulo XIII", "Artikulo XVIII"], answer: 2, explain: "Artikulo XIII: Katarungang Panlipunan at Karapatang Pantao." },
      { q: "Anong batas ang kumikilala sa karapatan ng mga katutubo?", choices: ["RA 8371", "RA 9003", "RA 11310", "RA 6657"], answer: 0, explain: "RA 8371 o IPRA." },
      { q: "Bakit usapin ng katarungan ang pagkasira ng kapaligiran?", choices: ["Dahil walang epekto ito", "Dahil pinakamatinding tinatamaan ang mahihirap", "Dahil mayayaman lamang ang apektado", "Dahil ito ay usaping pandayuhan lamang"], answer: 1, explain: "Ang mahihirap ang pinakaapektado." },
    ],
  },
  {
    id: "t3-w5", term: 3, week: 5, weeks: "5–6", topic: "Pagkamamamayan",
    title: "Mga Kaisipang Kaugnay ng Pagkamamamayan",
    competency: "Mga kaisipang kaugnay ng pagkamamamayan.",
    keywords: ["pagkamamamayan", "citizenship", "jus sanguinis", "Artikulo IV", "naturalisasyon", "aktibong mamamayan"],
    image: citizens, caption: "Mamamayang Pilipino sa isang pampublikong pagtitipon.",
    objectives: ["Maipaliwanag ang ligal at lumawak na kahulugan ng pagkamamamayan.", "Matukoy kung sino ang mamamayang Pilipino ayon sa Saligang Batas.", "Mailarawan ang katangian ng aktibong mamamayan."],
    intro: "Ang pagiging mamamayan ay higit pa sa pagkakaroon ng pasaporte. Ito ay ugnayan ng tao at ng estado na may kaakibat na karapatan, tungkulin, at pakikilahok.",
    sections: [
      { heading: "Ligal na kahulugan", body: "Ayon sa Artikulo IV ng Saligang Batas 1987, mamamayang Pilipino ang mga mamamayan na noong pinagtibay ito, ang mga ama o ina ay Pilipino, ang mga ipinanganak bago 1973 sa inang Pilipino na pumili ng pagkamamamayang Pilipino, at ang mga naging mamamayan sa pamamagitan ng naturalisasyon." },
      { heading: "Jus sanguinis at jus soli", body: "Sinusunod ng Pilipinas ang jus sanguinis — ang pagkamamamayan ay batay sa dugo o magulang. Ang jus soli naman, na sinusunod ng ibang bansa, ay batay sa lugar ng kapanganakan." },
      { heading: "Lumawak na pananaw", body: "Sa makabagong pananaw, ang mabuting mamamayan ay aktibong nakikilahok sa pamayanan: bumoboto, nagtatanong, tumutulong, at nagtataguyod ng kabutihang panlahat." },
    ],
    facts: ["Pinapayagan ng RA 9225 (Batas sa Pagpapanatili at Muling Pagkamit ng Pagkamamamayan, 2003) ang dalawahang pagkamamamayan para sa mga likas na ipinanganak na Pilipinong naging mamamayan ng ibang bansa."],
    examples: [
      { title: "Paglahok sa SK", text: "Ang pagboto at pagtakbo sa Sangguniang Kabataan ay paraan ng aktibong pagkamamamayan ng kabataan." },
      { title: "Boluntaryong gawain", text: "Paglahok sa paglilinis ng pamayanan o pamamahagi ng tulong." },
    ],
    keyTerms: [
      { term: "Pagkamamamayan", def: "Ligal at moral na ugnayan ng tao sa estado." },
      { term: "Jus sanguinis", def: "Pagkamamamayan batay sa magulang." },
      { term: "Jus soli", def: "Pagkamamamayan batay sa lugar ng kapanganakan." },
      { term: "Naturalisasyon", def: "Ligal na proseso ng pagiging mamamayan ng isang dayuhan." },
    ],
    summary: "Ang pagkamamamayan ay may ligal na batayan sa Artikulo IV ng Saligang Batas, ngunit sa mas malawak na pananaw, ito ay aktibong pakikilahok sa kabutihan ng bayan.",
    assessment: [
      { q: "Anong prinsipyo ng pagkamamamayan ang sinusunod ng Pilipinas?", choices: ["Jus soli", "Jus sanguinis", "Naturalisasyon lamang", "Wala"], answer: 1, explain: "Jus sanguinis — batay sa magulang." },
      { q: "Anong artikulo ng Saligang Batas ang tungkol sa pagkamamamayan?", choices: ["Artikulo II", "Artikulo III", "Artikulo IV", "Artikulo XIII"], answer: 2, explain: "Artikulo IV ang tungkol sa pagkamamamayan." },
      { q: "Alin ang halimbawa ng aktibong pagkamamamayan?", choices: ["Pagwawalang-bahala sa halalan", "Paglahok sa paglilinis ng pamayanan", "Pagtapon ng basura kahit saan", "Pag-iwas sa pagbabayad ng buwis"], answer: 1, explain: "Ang paglahok sa gawaing pampamayanan ay aktibong pagkamamamayan." },
    ],
  },
  {
    id: "t3-w7", term: 3, week: 7, weeks: "7–8", topic: "Karapatan at tungkulin",
    title: "Karapatan at Tungkulin ng Mamamayan sa Pambansang Kaunlaran",
    competency: "Pangkalahatang karapatan at tungkulin ng mamamayan sa pagtatamo ng pambansang kaunlaran.",
    keywords: ["Katipunan ng mga Karapatan", "Artikulo III", "karapatan", "tungkulin", "pagboto", "buwis", "karapatang pantao"],
    image: citizens, caption: "Pagtitipon ng mamamayan — paggamit ng karapatang magpulong nang mapayapa.",
    objectives: ["Matukoy ang mga karapatan sa Katipunan ng mga Karapatan.", "Maipaliwanag ang mga tungkulin ng mamamayan.", "Maiugnay ang karapatan at tungkulin sa pambansang kaunlaran."],
    intro: "Bawat karapatan ay may kaakibat na tungkulin. Kapag ginagamit nang responsable ng mamamayan ang kanyang karapatan at tinutupad ang tungkulin, umuunlad ang bansa.",
    sections: [
      { heading: "Katipunan ng mga Karapatan", body: "Nakasaad sa Artikulo III ng Saligang Batas 1987 ang mga karapatan gaya ng karapatan sa buhay, kalayaan, at ari-arian; kalayaan sa pananalita at pamamahayag; kalayaan sa relihiyon; at karapatang magpulong nang mapayapa." },
      { heading: "Mga tungkulin ng mamamayan", body: "Kabilang sa tungkulin ang paggalang sa batas, pagbabayad ng buwis, matalinong pagboto, pangangalaga sa kapaligiran, at paggalang sa karapatan ng iba. Ang Artikulo V ay tungkol sa karapatan sa pagboto." },
      { heading: "Karapatan, tungkulin, at kaunlaran", body: "Ang edukadong mamamayan na nagbabayad ng buwis, bumoboto nang matalino, at nagbabantay sa pamahalaan ay nakatutulong sa matatag na institusyon at pag-unlad ng bansa." },
    ],
    facts: ["Ang Pandaigdigang Pahayag ng mga Karapatang Pantao ay pinagtibay ng UN noong Disyembre 10, 1948; ang Pilipinas ay isa sa mga lumagda.", "Itinatag ng Saligang Batas 1987 ang Komisyon sa Karapatang Pantao."],
    examples: [
      { title: "Pagboto", text: "Ang mga Pilipinong 18 taong gulang pataas na rehistrado ay may karapatang bumoto." },
      { title: "Pagbabayad ng buwis", text: "Ang buwis ang pinagmumulan ng pondo para sa paaralan, ospital, at kalsada." },
    ],
    keyTerms: [
      { term: "Katipunan ng mga Karapatan", def: "Katipunan ng mga karapatan sa Artikulo III." },
      { term: "Karapatan", def: "Kapangyarihang moral o ligal na taglay ng tao." },
      { term: "Tungkulin", def: "Obligasyong dapat gampanan." },
      { term: "Komisyon sa Karapatang Pantao", def: "Ahensiyang nag-iimbestiga sa paglabag sa karapatang pantao." },
    ],
    summary: "Ang mga karapatan sa Artikulo III ay may kaakibat na tungkulin. Ang responsableng paggamit ng karapatan at pagtupad ng tungkulin ay pundasyon ng pambansang kaunlaran.",
    assessment: [
      { q: "Saang artikulo matatagpuan ang Katipunan ng mga Karapatan?", choices: ["Artikulo II", "Artikulo III", "Artikulo IV", "Artikulo V"], answer: 1, explain: "Artikulo III ang Katipunan ng mga Karapatan." },
      { q: "Ilang taon ang pinakamababang edad para makaboto sa pambansang halalan?", choices: ["15", "16", "18", "21"], answer: 2, explain: "18 taong gulang pataas." },
      { q: "Alin ang tungkulin ng mamamayan?", choices: ["Pag-iwas sa buwis", "Pagbabayad ng buwis", "Paglabag sa batas", "Pagtanggi sa pagboto"], answer: 1, explain: "Ang pagbabayad ng buwis ay tungkulin." },
    ],
  },
  {
    id: "t3-w9", term: 3, week: 9, weeks: "9", topic: "Pakikiisa",
    title: "Mga Hakbang ng Pakikiisa Tungo sa Pambansang Kaunlaran",
    competency: "Mga hakbang ng pakikiisa tungo sa pambansang kaunlaran.",
    keywords: ["pakikiisa", "bayanihan", "lipunang sibil", "NGO", "boluntaryo", "pakikilahok", "paminggalan ng pamayanan"],
    image: community, caption: "Sama-samang paggawa — diwa ng bayanihan.",
    objectives: ["Matukoy ang iba't ibang paraan ng pakikiisa.", "Maipaliwanag ang papel ng lipunang sibil at NGO.", "Makabuo ng plano ng pakikiisa sa sariling pamayanan."],
    intro: "Walang bansang uunlad kung ang pamahalaan lamang ang kumikilos. Ang pakikiisa ng mamamayan ang nagbibigay-buhay sa mga programa at nagbabantay sa kapangyarihan.",
    sections: [
      { heading: "Mga antas ng pakikiisa", body: "Maaaring makiisa sa antas ng pamilya (pagtitipid, muling pagproseso), paaralan (organisasyon ng mag-aaral), pamayanan (asamblea ng barangay, SK), at bansa (halalan, konsultasyong pampubliko)." },
      { heading: "Lipunang sibil at NGO", body: "Ang mga samahang di-pampamahalaan (NGO), kooperatiba, at samahang sibiko ay katuwang ng pamahalaan sa paghahatid ng serbisyo at pagtataguyod ng mga adbokasiya." },
      { heading: "Bayanihan sa makabagong panahon", body: "Ang diwa ng bayanihan ay nananatili sa mga gawaing gaya ng paminggalan ng pamayanan, pamamahagi ng tulong, at pagtitipon ng tulong sa internet." },
    ],
    facts: ["Kinikilala ng Kodigo ng Pamahalaang Lokal ng 1991 (RA 7160) ang pakikilahok ng mga NGO at samahan ng mamamayan sa lokal na pamamahala."],
    examples: [
      { title: "Paminggalan ng pamayanan (2021)", text: "Kusang-loob na pagbibigay at pagkuha ng pagkain ayon sa pangangailangan noong pandemya." },
      { title: "Asamblea ng barangay", text: "Pagtitipon kung saan maaaring magtanong at magmungkahi ang mamamayan sa kanilang lokal na pamahalaan." },
    ],
    keyTerms: [
      { term: "Pakikiisa", def: "Pakikilahok sa sama-samang gawain para sa kabutihang panlahat." },
      { term: "Lipunang sibil", def: "Mga organisasyon ng mamamayan na hiwalay sa pamahalaan at negosyo." },
      { term: "NGO", def: "Samahang di-pampamahalaan; samahang hindi bahagi ng pamahalaan." },
      { term: "Kooperatiba", def: "Samahang pinagmamay-arian at pinamamahalaan ng mga kasapi." },
    ],
    summary: "Maraming paraan ng pakikiisa — mula sa tahanan hanggang sa pambansang antas. Ang aktibong pakikilahok ng mamamayan at lipunang sibil ay mahalaga sa pambansang kaunlaran.",
    assessment: [
      { q: "Anong batas ang kumikilala sa papel ng NGO sa lokal na pamamahala?", choices: ["RA 7160", "RA 9003", "RA 8371", "RA 11310"], answer: 0, explain: "Ang Kodigo ng Pamahalaang Lokal ng 1991." },
      { q: "Alin ang halimbawa ng makabagong bayanihan?", choices: ["Paminggalan ng pamayanan", "Polo y servicio", "Tributo", "Batas Militar"], answer: 0, explain: "Ang paminggalan ng pamayanan ay kusang-loob na pagtutulungan." },
      { q: "Ano ang lipunang sibil?", choices: ["Sangay ng pamahalaan", "Mga organisasyon ng mamamayan na hiwalay sa pamahalaan", "Isang korporasyon", "Hukbong sandatahan"], answer: 1, explain: "Ito ay mga organisasyon ng mamamayan." },
    ],
  },
  {
    id: "t3-w10", term: 3, week: 10, weeks: "10", topic: "Papel ng mamamayan",
    title: "Ang Papel ng Bawat Mamamayan sa Pambansang Kaunlaran",
    competency: "Papel ng bawat mamamayan sa pagtatamo ng pambansang kaunlaran.",
    keywords: ["papel ng mamamayan", "kabataan", "pambansang kaunlaran", "pananagutan", "adbokasiya", "Rizal"],
    image: citizens, caption: "Ang mamamayan bilang tagapagtaguyod ng kaunlaran.",
    objectives: ["Matukoy ang sariling papel sa pambansang kaunlaran.", "Maiugnay ang aral ng kasaysayan sa pagkamamamayan ngayon.", "Makabuo ng personal na pangako ng paglilingkod sa bayan."],
    intro: "Sa pagtatapos ng kurso, babalikan natin ang tanong: Ano ang magagawa ko para sa bayan? Ang kasaysayan ay nagtuturo na ang pagbabago ay nagsisimula sa karaniwang mamamayan.",
    sections: [
      { heading: "Kabataan bilang pag-asa", body: "Ang Saligang Batas (Artikulo II, Seksiyon 13) ay kumikilala sa mahalagang papel ng kabataan sa pagbuo ng bansa. Ang Batas sa Kabataan sa Pagbuo ng Bansa (RA 8044) ay nagtatag ng Pambansang Komisyon ng Kabataan (NYC)." },
      { heading: "Araw-araw na pananagutan", body: "Ang pag-aaral nang mabuti, pagiging tapat, paggalang sa kapwa, at pangangalaga sa kapaligiran ay pang-araw-araw na ambag sa kaunlaran." },
      { heading: "Mula kasaysayan tungo sa hinaharap", body: "Ang kamalayang pangkasaysayan (Unang Termino), ang aral ng pakikibaka (Ikalawang Termino), at ang pagkamamamayan (Ikatlong Termino) ay nagtatagpo: ang mamamayang may kamalayan ay kumikilos para sa makatarungan at likas-kayang kinabukasan." },
    ],
    facts: ["Ayon sa RA 8044, ang 'kabataan' ay tumutukoy sa mga Pilipinong may edad 15 hanggang 30."],
    examples: [
      { title: "Proyektong pampaaralan", text: "Pagbuo ng isang maliit na proyekto, gaya ng hardin ng gulay o kampanya sa pagbabasa, bilang tugon sa suliranin ng pamayanan." },
      { title: "Matalinong paggamit ng midyang panlipunan", text: "Pagbabahagi ng beripikadong impormasyon at paglaban sa maling balita." },
    ],
    keyTerms: [
      { term: "Pananagutan", def: "Pagtanggap sa tungkulin at sa bunga ng sariling kilos." },
      { term: "Adbokasiya", def: "Pagtataguyod ng isang layunin o usapin." },
      { term: "Pambansang kaunlaran", def: "Pagbuti ng kalagayan ng buhay ng buong bansa." },
      { term: "Pambansang Komisyon ng Kabataan", def: "Ahensiyang nangangasiwa sa programa para sa kabataan." },
    ],
    summary: "Bawat mamamayan, lalo na ang kabataan, ay may papel sa pambansang kaunlaran. Ang kamalayang pangkasaysayan ay nagiging makabuluhan kapag isinasalin sa makabayang pagkilos.",
    assessment: [
      { q: "Anong batas ang nagtatag ng Pambansang Komisyon ng Kabataan?", choices: ["RA 8044", "RA 7160", "RA 9225", "RA 9003"], answer: 0, explain: "RA 8044 o Batas sa Kabataan sa Pagbuo ng Bansa." },
      { q: "Ayon sa RA 8044, ano ang saklaw na edad ng kabataan?", choices: ["10–20", "13–25", "15–30", "18–35"], answer: 2, explain: "15 hanggang 30 taong gulang." },
      { q: "Alin ang pang-araw-araw na ambag sa kaunlaran?", choices: ["Pagkalat ng maling balita", "Pag-aaral nang mabuti at pagiging tapat", "Pag-aaksaya ng tubig", "Hindi pagboto"], answer: 1, explain: "Ang mabuting pag-uugali at pag-aaral ay ambag sa bayan." },
    ],
  },
];

export type TimelineEvent = { year: string; title: string; text: string; image?: string; caption?: string; lesson?: string };

export const timeline: TimelineEvent[] = [
  { year: "Mga 67,000 taon na ang nakalipas", title: "Mga labi sa Kuweba ng Callao", text: "Natagpuan sa Cagayan ang mga butong itinuring na ebidensiya ng Homo luzonensis — patunay ng napakatandang presensiya ng tao sa kapuluan.", image: timelineCallao, caption: "Loob ng Kuweba ng Callao, Peñablanca, Cagayan. Larawan: BiyaheNiDrik, CC BY-SA 4.0, Wikimedia Commons.", lesson: "t1-w3" },
  { year: "Mga 890–710 BK", title: "Manunggul Jar", text: "Banga ng ikalawang libing mula sa Tabon, Palawan, na nagpapakita ng paniniwala sa paglalakbay ng kaluluwa.", image: precolonial, caption: "Mga sinaunang palayok at kagamitan.", lesson: "t1-w7" },
  { year: "Mga 2,000 taon na ang nakalipas", title: "Hagdan-hagdang palayan", text: "Tinatayang panahon ng pagsisimula ng mga palayan sa Kordilyera, bagaman patuloy ang pagtatalo ng mga iskolar sa eksaktong petsa.", image: terraces, caption: "Hagdan-hagdang palayan ng Ifugao.", lesson: "t1-w3" },
  { year: "1521", title: "Labanan sa Mactan", text: "Tinalo ni Lapu-Lapu ang pwersa ni Magallanes — unang naitalang paglaban sa mananakop na Europeo.", image: timelineMactan, caption: "Bantayog sa Dambana ng Mactan, Lungsod ng Lapu-Lapu, Cebu. Larawan: Badz Patanag, CC BY-SA 3.0, Wikimedia Commons.", lesson: "t2-w2" },
  { year: "1571", title: "Maynila bilang kabisera", text: "Itinatag ni Miguel López de Legazpi ang Maynila bilang sentro ng pamahalaang kolonyal.", image: intramuros, caption: "Mga pader ng Intramuros.", lesson: "t1-w9" },
  { year: "1744", title: "Pag-aalsa ni Dagohoy", text: "Nagsimula sa Bohol ang pinakamahabang pag-aalsa sa panahon ng Espanyol, na tumagal hanggang 1829.", image: timelineDagohoy, caption: "Bantayog ni Francisco Dagohoy sa Danao, Bohol. Larawan: NHCP, pampublikong domeyn, Wikimedia Commons.", lesson: "t2-w1" },
  { year: "1872", title: "Pagbitay sa GomBurZa", text: "Ang pagbitay sa tatlong paring Pilipino ay nagpaalab sa damdaming makabayan.", image: timelineGomburza, caption: "Sina Padre Mariano Gomez, Jose Burgos, at Jacinto Zamora. Larawan mula sa ika-19 na siglo, pampublikong domeyn.", lesson: "t2-w4" },
  { year: "1892", title: "Pagtatatag ng Katipunan", text: "Itinatag ni Andres Bonifacio ang lihim na samahang naglalayong makamit ang kalayaan.", image: revolution, caption: "Mga rebolusyonaryong Pilipino.", lesson: "t2-w4" },
  { year: "1898", title: "Pagpapahayag ng Kalayaan", text: "Ipinahayag ang kalayaan sa Kawit, Cavite noong Hunyo 12.", image: timelineKawit, caption: "Ang tahanan ni Emilio Aguinaldo (Dambanang Aguinaldo) sa Kawit, Cavite. Larawan: Ralff Nestor Nacor, CC BY-SA 4.0, Wikimedia Commons.", lesson: "t2-w8" },
  { year: "1899", title: "Unang Republika", text: "Pinasinayaan ang Republika ng Malolos noong Enero 23.", image: timelineMalolos, caption: "Paglalarawan ng Kongreso ng Malolos sa sesyon sa Simbahan ng Barasoain. Larawan: Museo at Aklatang Pampanguluhan, pampublikong domeyn.", lesson: "t2-w8" },
  { year: "1946", title: "Kalayaan mula sa Estados Unidos", text: "Ipinahayag ang Republika ng Pilipinas noong Hulyo 4.", image: commonwealth, caption: "Maynila sa kalagitnaan ng ika-20 siglo.", lesson: "t2-w6" },
  { year: "1972", title: "Batas Militar", text: "Idineklara ni Ferdinand Marcos ang Batas Militar noong Setyembre.", image: timelineBantayog, caption: "Bantayog ng mga Bayani sa Lungsod Quezon, alaala ng mga lumaban sa Batas Militar. Larawan: Alternativity, CC BY-SA 4.0, Wikimedia Commons.", lesson: "t2-w6" },
  { year: "1986", title: "Lakas ng Bayan sa EDSA", text: "Mapayapang pagkilos ng milyon-milyong Pilipino ang nagpanumbalik ng demokrasya.", image: citizens, caption: "Mamamayan sa isang pampublikong pagtitipon.", lesson: "t2-w6" },
  { year: "1987", title: "Bagong Saligang Batas", text: "Pinagtibay ang Saligang Batas na may Artikulo XIII sa katarungang panlipunan at karapatan sa malusog na ekolohiya.", image: timelineConstitution, caption: "Ang orihinal na kopya ng Saligang Batas 1987 na may lagda ng mga komisyonado. Larawan: Korte Suprema ng Pilipinas, pampublikong domeyn.", lesson: "t3-w2" },
  { year: "2015", title: "Mga Layunin para sa Likas-Kayang Pag-unlad", text: "Pinagtibay ng Nagkakaisang mga Bansa (UN), kasama ang Pilipinas, ang 17 SDGs para sa 2030.", image: community, caption: "Pagtutulungan sa kanayunan.", lesson: "t3-w1" },
];

/** Ten-question term quizzes built from the lesson assessments plus extra items. */
const extra: Record<number, Question> = {
  1: { q: "Alin ang pinakamahusay na naglalarawan sa taong may kamalayang pangkasaysayan?", choices: ["Nagsasaulo ng maraming petsa", "Nakauunawa sa ugnayan ng nakaraan at kasalukuyan", "Ayaw sa kasaysayan", "Nagbabasa lamang ng banyagang aklat"], answer: 1, explain: "Ang kamalayang pangkasaysayan ay pag-unawa sa ugnayan ng nakaraan, kasalukuyan, at hinaharap." },
  2: { q: "Bakit nabigo ang maraming naunang pag-aalsa laban sa Espanya?", choices: ["Kawalan ng pagkakaisa ng mga rehiyon", "Kakulangan ng pagkain lamang", "Walang dahilan", "Tinulungan ng ibang bansa"], answer: 0, explain: "Lokal at hiwa-hiwalay ang mga pag-aalsa, kaya nagamit ng Espanya ang taktikang hatiin at sakupin." },
  3: { q: "Ano ang pinakamalapit na kahulugan ng 'inklusibong pag-unlad'?", choices: ["Pag-unlad para sa iilan", "Pag-unlad na walang naiiwan", "Pag-unlad ng lungsod lamang", "Pag-unlad ng negosyo lamang"], answer: 1, explain: "Inklusibo ang pag-unlad kapag nakikinabang ang lahat." },
};

function buildQuiz(term: number): Question[] {
  const pool = lessons.filter((l) => l.term === term).flatMap((l) => l.assessment);
  const picked: Question[] = [];
  // round-robin so every lesson in the term is represented
  const byLesson = lessons.filter((l) => l.term === term).map((l) => [...l.assessment]);
  while (picked.length < 9 && byLesson.some((a) => a.length)) {
    for (const a of byLesson) { const q = a.shift(); if (q && picked.length < 9) picked.push(q); }
  }
  picked.push(extra[term]!);
  return picked.length === 10 ? picked : pool.slice(0, 10);
}

export const quizzes: Record<number, Question[]> = { 1: buildQuiz(1), 2: buildQuiz(2), 3: buildQuiz(3) };
