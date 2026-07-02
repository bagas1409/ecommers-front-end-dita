import { UsersRound, IdCard, Cross, HandHelping } from "lucide-react";

interface ExternalWebsiteItem {
  title?: string;
  url?: string;
  icon?: any;
}

export const ExternalWebsite: Record<string, ExternalWebsiteItem[]> = {
  dukcapil: [
    {
      title: "Layanan Dukcapil",
      icon: UsersRound,
      url: "https://dukcapil.kemendagri.go.id/?from=appagg.com",
    },
  ],
  PBB: [
    {
      title: "Info Pajak PBB",
      icon: IdCard,
      url: "https://klikpajak.id/blog/pengertian-pbb-dan-cara-mengecek-secara-online/",
    },
  ],
  BPJS: [
    {
      title: "BPJS Kesehatan",
      icon: Cross,
      url: "https://bpjs-kesehatan.go.id/#/",
    },
  ],

  Bansos: [
    {
      title: "Info Bantuan Sosial",
      icon: HandHelping,
      url: "https://cekbansos.kemensos.go.id/",
    },
  ],
};
