# Golden Velo — landing page (18+)

Página de conversão para o OnlyFans **Golden Velo** (https://onlyfans.com/goldenvelo), em inglês.
Site estático: HTML + CSS + um pouco de JavaScript, sem framework e sem build. Carrega em ~1,6 s no telemóvel
(Lighthouse 100 em performance, acessibilidade e boas práticas).

## O que tem

- Verificação de idade (18+) antes de mostrar a página, lembrada só enquanto o separador estiver aberto
- Topo com foto, preço ($14.99/mês) e botão "Subscribe on OnlyFans" visível logo no primeiro ecrã
- Secções: apresentação, o que inclui, pré-visualizações (uma pública + duas trancadas), preço,
  perguntas frequentes e chamada final
- Barra fixa "Subscribe" no telemóvel depois de passares o primeiro botão
- Aviso para quem abre dentro do Instagram/TikTok ("abre no browser") com botão para copiar o link
- Sem nudez nem texto explícito na página (o conteúdo explícito fica só no OnlyFans)
- Sem cookies e sem rastreadores; `noindex` (não aparece no Google — a página é para os links das bios)

## Editar (só o ficheiro `config.js`)

| Campo | Para quê |
| --- | --- |
| `price` | Texto do preço em toda a página |
| `trackingLinks` | Links de rastreio do OnlyFans por rede (ver abaixo) |
| `promo` | Promoção ou teste grátis **real** criado no OnlyFans (desligado por defeito) |
| `altLinks` | Outras plataformas (ex.: Unlockt). Aparece um botão secundário por baixo dos botões do OnlyFans |
| `extraPerks` | Vantagens extra — liga (`enabled: true`) só as que forem verdade |
| `socials` | Contas do Golden Velo (a secção "Follow" só aparece se preencheres) |

Abre o site com `?preview=1` no fim do link para veres as vantagens que ainda estão desligadas.

## Links nas bios e rastreio

Usa um link diferente em cada rede:

- Instagram: `https://golden-velo.netlify.app/?src=instagram`
- TikTok: `https://golden-velo.netlify.app/?src=tiktok`
- X: `https://golden-velo.netlify.app/?src=x`

No OnlyFans, cria um **tracking link** para cada rede e cola-o em `trackingLinks` no `config.js`.
Os botões passam a usar o link da rede de onde a pessoa veio, e no painel do OnlyFans vês quantos subscritores
vieram de cada uma. Por segurança, só são aceites links que comecem por `https://onlyfans.com/`.

## Publicar na Netlify

Este repositório (`golden-velo-`) está ligado à Netlify:

1. Netlify → **Add new project → Import an existing project → GitHub** → `golden-velo-`
2. **Branch to deploy:** `main` · não há comando de build (o `netlify.toml` já trata de tudo)
3. **Project name:** `golden-velo` → o link fica `https://golden-velo.netlify.app`

Cada alteração enviada para o `main` é publicada automaticamente.
Se usares outro nome de projeto/domínio, troca `https://golden-velo.netlify.app` em `index.html` (meta `og:image`).

## Trocar as fotos (sem mexer no código)

A página procura estas 4 fotos na pasta `img/`. Basta carregá-las no GitHub com **exatamente** estes nomes
(GitHub → `img` → **Add file → Upload files**). A Netlify redimensiona e otimiza cada foto sozinha.
Enquanto uma foto não existir, a página mostra a anterior.

| Nome do ficheiro | Onde aparece |
| --- | --- |
| `img/hero.jpg` | Foto grande do topo |
| `img/me.jpg` | Secção "01 · Me" |
| `img/preview.jpg` | Pré-visualização pública (secção "03 · Previews") |
| `img/finish.jpg` | Fundo da chamada final |

⚠️ **Antes de carregar, tira a localização das fotos** (no iPhone: Partilhar → Opções → desligar Localização).
O ficheiro original fica acessível publicamente.

## Ficheiros

```
index.html     página (estilos incluídos)
config.js      ⇐ o que editas
app.js         comportamento (idade, links, barra fixa, aviso in-app)
img/           fotos otimizadas (AVIF/WebP/JPG, sem metadados) + og.jpg (pré-visualização ao partilhar)
fonts/         Instrument Serif (SIL Open Font License)
favicon.svg    ícone "GV"
netlify.toml   configuração da Netlify (cabeçalhos, cache, noindex)
robots.txt
```

## Notas importantes

- A página não tem nudez de propósito: o Instagram e o TikTok penalizam contas que ligam a páginas com nudez.
- Mantém o link visível e honesto (sem esconder que leva ao OnlyFans) — esconder links viola as regras das redes.
- As fotos não contêm metadados (localização, datas, telemóvel).
- Golden Velo não é afiliado ao OnlyFans; a página diz isso no rodapé.
