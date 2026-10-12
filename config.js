/*
 * ─────────────────────────────────────────────────────────────
 *  GOLDEN VELO — CONFIGURAÇÃO
 *  Este é o único ficheiro que precisas de editar.
 *  Tudo o que está "enabled: false" fica escondido até confirmares que é verdade.
 *  Para ver os itens escondidos na página, abre o site com ?preview=1 no fim do link.
 * ─────────────────────────────────────────────────────────────
 */
window.GV = {
  // Link principal do OnlyFans
  ofUrl: "https://onlyfans.com/goldenvelo",

  // Preço (só texto — o preço real é sempre o que está definido no OnlyFans)
  price: "$14.99",

  // Links de rastreio do OnlyFans (OnlyFans → Statements/Tracking links → criar um por rede).
  // Cola aqui o link exato. Vazio = usa o link principal.
  // Nos bios usa: o-teu-site/?src=instagram , ?src=tiktok , ?src=x
  trackingLinks: {
    instagram: "",
    tiktok: "",
    x: "",
  },

  // Promoção / teste grátis REAL criado no OnlyFans. Desligado por defeito.
  // Ex.: { enabled: true, label: "Free for 7 days", url: "https://onlyfans.com/goldenvelo/trial/xxxx" }
  promo: { enabled: false, label: "", url: "" },

  // Vantagens extra — liga só as que forem verdade.
  extraPerks: [
    { enabled: false, title: "Golden-hour sets", body: "Warm light, nothing to hide. Just for subscribers." },
    { enabled: false, title: "Direct messages", body: "Say hi. I read and reply to my messages." },
    { enabled: false, title: "New posts every week", body: "Fresh content every week while you're subscribed." },
  ],

  // Redes do Golden Velo (só aparecem se preencheres). Não ponhas as contas de treinador aqui.
  socials: {
    instagram: "",
    tiktok: "",
    x: "",
  },

  // Para onde vai quem carrega em "Leave" na verificação de idade
  leaveUrl: "https://www.google.com",
};
