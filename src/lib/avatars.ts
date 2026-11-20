import babae1 from "@/assets/avatars/babae-1.jpg";
import babae2 from "@/assets/avatars/babae-2.jpg";
import babae3 from "@/assets/avatars/babae-3.jpg";
import babae4 from "@/assets/avatars/babae-4.jpg";
import babae5 from "@/assets/avatars/babae-5.jpg";
import lalaki1 from "@/assets/avatars/lalaki-1.jpg";
import lalaki2 from "@/assets/avatars/lalaki-2.jpg";
import lalaki3 from "@/assets/avatars/lalaki-3.jpg";
import lalaki4 from "@/assets/avatars/lalaki-4.jpg";
import lalaki5 from "@/assets/avatars/lalaki-5.jpg";

/** Ten selectable Spanish-colonial-era avatars; any student may pick any of them. */
export const avatars = [
  { id: "babae-1", name: "Clara", src: babae1, desc: "Baro't saya na may pañuelo" },
  { id: "babae-2", name: "Luisa", src: babae2, desc: "Rosas na baro, nakatirintas" },
  { id: "babae-3", name: "Paz", src: babae3, desc: "Traje de mestiza na may abaniko" },
  { id: "babae-4", name: "Sisa", src: babae4, desc: "May sampagita sa buhok" },
  { id: "babae-5", name: "Teodora", src: babae5, desc: "Gintong saya na may rosaryo" },
  { id: "lalaki-1", name: "Andres", src: lalaki1, desc: "Barong Tagalog na piña" },
  { id: "lalaki-2", name: "Jose", src: lalaki2, desc: "Ilustradong may kurbata" },
  { id: "lalaki-3", name: "Tomas", src: lalaki3, desc: "Magsasakang may salakot" },
  { id: "lalaki-4", name: "Emilio", src: lalaki4, desc: "Kamisang linen at salakot" },
  { id: "lalaki-5", name: "Juan", src: lalaki5, desc: "Barong na may tsaleko at aklat" },
] as const;
export const avatarSrc = (id?: string | null) => avatars.find((a) => a.id === id)?.src;
