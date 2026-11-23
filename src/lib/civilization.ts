/** Derived HISTORIA progression. XP is always the sum of activity_log.points. */
export const ERA_COUNT=12, LEVELS_PER_ERA=5, MAX_LEVEL=60;
export const CURVE={linear:19,power:5.5,exponent:1.6,scale:0.5} as const;
export type EraId="bato"|"tribo"|"sinaunang"|"klasikal"|"medyebal"|"renaissance"|"industriyal"|"makabago"|"digital"|"futuristiko"|"abante"|"kosmiko";
export type EraEffects="none"|"subtle"|"warm"|"glow"|"holo"|"cosmic";
export type EraTheme={mode:"light"|"dark";bg:string;surface:string;ink:string;accent:string;accent2:string};
export type Era={id:EraId;order:number;nameFil:string;nameEn:string;tagline:string;firstLevel:number;lastLevel:number;material:string;effects:EraEffects;theme:EraTheme;frame:{id:string;name:string};background:{id:string;name:string};title:string};
type Seed=Omit<Era,"order"|"firstLevel"|"lastLevel">;
const seeds:Seed[]=[
{id:"bato",nameFil:"Panahon ng Bato",nameEn:"Stone Age",tagline:"Ang unang apoy at ang unang kuwento.",material:"Bato, uling, at ukit sa yungib",effects:"none",theme:{mode:"light",bg:"#E6DCCB",surface:"#F2EADC",ink:"#2B2118",accent:"#7A5C3A",accent2:"#5E5348"},frame:{id:"frame-bato",name:"Balangkas na Bato"},background:{id:"bg-bato",name:"Yungib ng mga Ukit"},title:"Tagapag-apoy"},
{id:"tribo",nameFil:"Panahon ng Tribo",nameEn:"Tribal Era",tagline:"Sama-samang nabubuhay sa lupa at sa dagat.",material:"Kahoy, rattan, at hinabing hibla",effects:"none",theme:{mode:"light",bg:"#E8DAC0",surface:"#F5EAD3",ink:"#2E2013",accent:"#9A4A26",accent2:"#566535"},frame:{id:"frame-tribo",name:"Balangkas na Kahoy at Rattan"},background:{id:"bg-tribo",name:"Nayon sa Gilid ng Palayan"},title:"Kasapi ng Tribo"},
{id:"sinaunang",nameFil:"Sinaunang Kabihasnan",nameEn:"Ancient Civilization",tagline:"Mga barangay, kalakalan, at hagdan-hagdang palayan.",material:"Tanso, palayok, at ginto",effects:"subtle",theme:{mode:"light",bg:"#EDE0BC",surface:"#F9F0D3",ink:"#2A2210",accent:"#8E6418",accent2:"#2A6262"},frame:{id:"frame-sinaunang",name:"Balangkas na Tanso"},background:{id:"bg-sinaunang",name:"Hagdan-hagdang Palayan"},title:"Pinuno ng Barangay"},
{id:"klasikal",nameFil:"Klasikal na Kabihasnan",nameEn:"Classical Civilization",tagline:"Sining, batas, at ugnayan sa mga karatig-bayan.",material:"Marmol, bakal, at pinintahang seramika",effects:"subtle",theme:{mode:"light",bg:"#EFEBE2",surface:"#FAF8F2",ink:"#1F2430",accent:"#7A1F2B",accent2:"#8A6A1F"},frame:{id:"frame-klasikal",name:"Balangkas na Haligi"},background:{id:"bg-klasikal",name:"Daungan ng Kalakalan"},title:"Iskolar ng Kalakalan"},
{id:"medyebal",nameFil:"Panahong Medyebal",nameEn:"Medieval Era",tagline:"Mga kuta, simbahan, at matibay na pananampalataya.",material:"Batong kuta, bakal, at tapiserya",effects:"warm",theme:{mode:"light",bg:"#E3DFE6",surface:"#F0EDF3",ink:"#1E1A2B",accent:"#4A2B6B",accent2:"#80631F"},frame:{id:"frame-medyebal",name:"Balangkas na Kuta"},background:{id:"bg-medyebal",name:"Pader at Tore"},title:"Tagapagbantay ng Kuta"},
{id:"renaissance",nameFil:"Muling Pagsilang",nameEn:"Renaissance",tagline:"Sining, agham, at karunungang muling umusbong.",material:"Pergamino, ginintuang ukit, at pintura",effects:"warm",theme:{mode:"light",bg:"#EEE5D4",surface:"#FAF4E8",ink:"#261A14",accent:"#8C2F1B",accent2:"#7A5C12"},frame:{id:"frame-renaissance",name:"Balangkas na Ginintuang Ukit"},background:{id:"bg-renaissance",name:"Aklatan at Palasyo"},title:"Iskolar ng Muling Pagsilang"},
{id:"industriyal",nameFil:"Panahong Industriyal",nameEn:"Industrial Era",tagline:"Makina, riles, at pabrika ang humubog sa bayan.",material:"Bakal, tanso, at gear",effects:"subtle",theme:{mode:"light",bg:"#D9DBDD",surface:"#ECEDEE",ink:"#1A1D21",accent:"#A84A12",accent2:"#3A5062"},frame:{id:"frame-industriyal",name:"Balangkas na Gear"},background:{id:"bg-industriyal",name:"Estasyon ng Riles"},title:"Inhinyero ng Riles"},
{id:"makabago",nameFil:"Makabagong Panahon",nameEn:"Modern Era",tagline:"Mga lungsod, kuryente, at paglaya.",material:"Salamin, kongkreto, at bakal",effects:"subtle",theme:{mode:"light",bg:"#EBEFF3",surface:"#FFFFFF",ink:"#14202B",accent:"#1F5FA8",accent2:"#A8610F"},frame:{id:"frame-makabago",name:"Balangkas na Salamin at Bakal"},background:{id:"bg-makabago",name:"Skyline ng Lungsod"},title:"Mamamayan ng Lungsod"},
{id:"digital",nameFil:"Panahong Digital",nameEn:"Digital Era",tagline:"Ang impormasyon ay nasa dulo ng daliri.",material:"Silicon, ilaw, at circuit",effects:"glow",theme:{mode:"dark",bg:"#0F1720",surface:"#17212D",ink:"#E6EDF5",accent:"#2FB8C9",accent2:"#8A98F8"},frame:{id:"frame-digital",name:"Balangkas na Circuit"},background:{id:"bg-digital",name:"Network ng Impormasyon"},title:"Tagapag-ugnay Digital"},
{id:"futuristiko",nameFil:"Panahong Futuristiko",nameEn:"Futuristic Era",tagline:"Matatalinong lungsod at malinis na enerhiya.",material:"Hologram, composite, at malinis na enerhiya",effects:"holo",theme:{mode:"dark",bg:"#0B1220",surface:"#121B2C",ink:"#E8F0FF",accent:"#3EC9B8",accent2:"#9A8CFF"},frame:{id:"frame-futuristiko",name:"Balangkas na Hologram"},background:{id:"bg-futuristiko",name:"Lungsod na Lumulutang"},title:"Arkitekto ng Bukas"},
{id:"abante",nameFil:"Abanteng Kabihasnan",nameEn:"Advanced Civilization",tagline:"Kabihasnang may malasakit sa daigdig at sa kapwa.",material:"Kristal, buhay na materyales, at orbital na hardin",effects:"holo",theme:{mode:"dark",bg:"#0A0F1E",surface:"#111A30",ink:"#EAF2FF",accent:"#6FD6F2",accent2:"#C4A6FF"},frame:{id:"frame-abante",name:"Balangkas na Kristal"},background:{id:"bg-abante",name:"Mga Hardin sa Orbit"},title:"Tagapangalaga ng Daigdig"},
{id:"kosmiko",nameFil:"Kabihasnang Kosmiko",nameEn:"Cosmic Civilization",tagline:"Mula sa Pilipinas, abot ang mga bituin.",material:"Liwanag ng bituin, nebula, at konstelasyon",effects:"cosmic",theme:{mode:"dark",bg:"#070817",surface:"#0F1030",ink:"#F1F0FF",accent:"#FFD27A",accent2:"#A596FF"},frame:{id:"frame-kosmiko",name:"Balangkas na Konstelasyon"},background:{id:"bg-kosmiko",name:"Himpapawid ng mga Bituin"},title:"Tagapagtala ng mga Bituin"}
];
export const ERAS:readonly Era[]=seeds.map((s,i)=>({...s,order:i+1,firstLevel:i*5+1,lastLevel:(i+1)*5}));
const sanitizeXp=(xp:number)=>(Number.isFinite(xp)&&xp>0?Math.floor(xp):0);
export function xpForLevel(level:number){const l=Math.min(MAX_LEVEL,Math.max(1,Math.floor(level)))-1;return l===0?0:Math.round(CURVE.scale*(CURVE.linear*l+CURVE.power*Math.pow(l,CURVE.exponent)));}
export const LEVEL_THRESHOLDS:readonly number[]=Array.from({length:MAX_LEVEL},(_,i)=>xpForLevel(i+1));
export function levelFromXp(xp:number){const x=sanitizeXp(xp);for(let l=MAX_LEVEL;l>=1;l--)if(x>=(LEVEL_THRESHOLDS[l-1]??0))return l;return 1;}
export function eraForLevel(level:number){const idx=Math.min(ERA_COUNT,Math.max(1,Math.ceil(Math.min(MAX_LEVEL,Math.max(1,level))/LEVELS_PER_ERA)))-1;return ERAS[idx]??ERAS[0]!;}
export type CivProgress={xp:number;level:number;isMaxLevel:boolean;era:Era;xpIntoLevel:number;xpToNextLevel:number|null;levelPercent:number;nextEra:Era|null;xpToNextEra:number|null;eraPercent:number};
export function progressFor(xpInput:number):CivProgress{
 const xp=sanitizeXp(xpInput),level=levelFromXp(xp),era=eraForLevel(level),isMaxLevel=level>=MAX_LEVEL;
 const floor=xpForLevel(level),ceil=isMaxLevel?null:xpForLevel(level+1),nextEra=era.order<ERA_COUNT?(ERAS[era.order]??null):null;
 const eraStart=xpForLevel(era.firstLevel),eraEnd=nextEra?xpForLevel(nextEra.firstLevel):null;
 const pct=(n:number,d:number)=>Math.max(0,Math.min(100,Math.round(n/d*100)));
 return {xp,level,isMaxLevel,era,xpIntoLevel:xp-floor,xpToNextLevel:ceil===null?null:ceil-xp,levelPercent:ceil===null?100:pct(xp-floor,ceil-floor),nextEra,xpToNextEra:eraEnd===null?null:Math.max(0,eraEnd-xp),eraPercent:eraEnd===null?100:pct(xp-eraStart,eraEnd-eraStart)};
}
export type CosmeticKind="frame"|"title"|"background";
export type Cosmetic={id:string;kind:CosmeticKind;eraId:EraId;name:string;unlockLevel:number};
export const COSMETICS:readonly Cosmetic[]=ERAS.flatMap(e=>[
 {id:e.frame.id,kind:"frame" as const,eraId:e.id,name:e.frame.name,unlockLevel:e.firstLevel},
 {id:`title-${e.id}`,kind:"title" as const,eraId:e.id,name:e.title,unlockLevel:e.firstLevel+2},
 {id:e.background.id,kind:"background" as const,eraId:e.id,name:e.background.name,unlockLevel:e.firstLevel+4}
]);
export const unlockedCosmetics=(level:number)=>COSMETICS.filter(c=>c.unlockLevel<=level);
export const isCosmeticUnlocked=(id:string,level:number)=>COSMETICS.some(c=>c.id===id&&c.unlockLevel<=level);
export type ProgressDiff={gained:number;leveledUp:boolean;levelsGained:number;newLevel:number;eraAdvanced:boolean;newEra:Era|null;newlyUnlocked:Cosmetic[]};
export function diffProgress(prevXp:number,nextXp:number):ProgressDiff{
 const a=sanitizeXp(prevXp),b=Math.max(a,sanitizeXp(nextXp)),la=levelFromXp(a),lb=levelFromXp(b),ea=eraForLevel(la),eb=eraForLevel(lb);
 return {gained:b-a,leveledUp:lb>la,levelsGained:lb-la,newLevel:lb,eraAdvanced:eb.order>ea.order,newEra:eb.order>ea.order?eb:null,newlyUnlocked:COSMETICS.filter(c=>c.unlockLevel>la&&c.unlockLevel<=lb)};
}
export function eraCssVars(era:Era):Record<string,string>{const t=era.theme;return {"--era-bg":t.bg,"--era-surface":t.surface,"--era-ink":t.ink,"--era-accent":t.accent,"--era-accent-2":t.accent2};}
