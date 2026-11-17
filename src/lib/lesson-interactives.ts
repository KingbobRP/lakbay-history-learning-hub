/** Lesson-specific interactive activities (HISTORIA supplementary material, not official DepEd statements). */
export type SortCard = { id: string; label: string; kind: "primarya" | "sekundarya"; why: string };
export type BiasSegment = string | { word: string; note: string };
export type LessonInteractives = {
  /** Section heading whose static body becomes the Salaysay + Saysay equation. */
  etymologyHeading?: string;
  sorter?: SortCard[];
  bias?: { exampleTitle: string; segments: BiasSegment[]; source: string; pantayo: string };
};

export const lessonInteractives: Record<string, LessonInteractives> = {
  "t1-w1": {
    etymologyHeading: "Kasaysayan: salaysay na may saysay",
    sorter: [
      { id: "liham", label: "Liham ni Rizal sa mga Kababaihan ng Malolos", kind: "primarya", why: "Isinulat mismo ni Rizal noong 1889, sa panahong nagaganap ang pangyayari." },
      { id: "dokumentaryo", label: "Dokumentaryo sa YouTube (2024)", kind: "sekundarya", why: "Ginawa makalipas ang maraming taon; interpretasyon ito batay sa ibang sanggunian." },
      { id: "litrato", label: "Lumang litrato noong EDSA 1986", kind: "primarya", why: "Kinunan sa mismong pangyayari, kaya tuwirang bakas ito ng nakaraan." },
      { id: "aklat", label: "Aklat-aralin sa Kasaysayan", kind: "sekundarya", why: "Pagbubuod at pagsusuri ng mga sanggunian ng mga may-akda sa ibang panahon." },
    ],
    bias: {
      exampleTitle: "Ang ulat ni Antonio Pigafetta (1521)",
      segments: [
        "Nang makita naming ",
        { word: "makatwiran", note: "Sinukat ni Pigafetta ang 'katwiran' ng mga katutubo ayon sa kahandaan nilang makipagkalakalan at makipagkaibigan sa mga Europeo — pamantayang Europeo, hindi pamantayan ng mga taga-Kabisayaan mismo." },
        " ang mga taong ito, nakipagkaibigan kami sa kanila. Ang mga taong ito ay ",
        { word: "pagano", note: "Para sa isang Kristiyanong Europeo, 'pagano' ang sinumang hindi Kristiyano. Hindi nito kinikilala na may sariling sistema ng paniniwala ang mga katutubo — mga anito, diwata, at mga babaylan na namumuno sa ritwal." },
        ". Halos hubad silang naglalakad, at ang kanilang katawan ay ",
        { word: "pininturahan", note: "Ang tinawag niyang 'pinta' ay batok o tato — tanda ng tapang, karanasan, at katayuan. Dahil dito tinawag ng mga Espanyol ang mga Bisaya na 'Pintados'. Nakita niya ang anyo, hindi ang kahulugan nito sa pamayanan." },
        ". Ang kanilang hari ang pinakamakisig na lalaking nakita namin; may suot siyang malalaking hikaw na ",
        { word: "ginto", note: "Layunin ng ekspedisyon na humanap ng pampalasa at kayamanan para sa Espanya, kaya laging napapansin ng sumulat ang ginto. Inilalantad nito ang interes ng sumulat, hindi lamang ang katangian ng inilalarawan." },
        ", at may ginto rin sa kanyang mga ngipin.",
      ],
      source: "Pinasimple at pinagsamang salin ng mga bahagi ng ulat ni Pigafetta tungkol sa mga taga-Kabisayaan (1521), batay sa salin sa Ingles ni James A. Robertson (1906). Hindi ito eksaktong sipi.",
      pantayo: "Ayon kay Zeus Salazar, ang mga tala ng dayuhan ay halimbawa ng pansilang pananaw — isinulat ng taga-labas tungkol sa 'sila' para sa sariling mambabasa. Hinihiling ng Pantayong Pananaw na unawain ang mga katutubo mula sa loob — sa sarili nilang wika, konsepto, at karanasan — habang ginagamit pa rin ang ulat bilang mahalagang ebidensiya.",
    },
  },
};
