export const config = { runtime: "edge" };

const FEEDS = {
  "beneficios": [
    "https://rss.shrm.org/",
    "https://feeds.feedburner.com/harvardbusiness"
  ],
  "marca-empleadora": [
    "https://employerbrandinternational.com/feed/",
    "https://rss.shrm.org/"
  ],
  "people-experience": [
    "https://feeds.feedburner.com/harvardbusiness",
    "https://rss.shrm.org/"
  ],
  "compensaciones": [
    "https://rss.shrm.org/",
    "https://feeds.feedburner.com/harvardbusiness"
  ],
  "payroll": [
    "https://rss.shrm.org/",
    "https://feeds.feedburner.com/harvardbusiness"
  ],
  "desarrollo": [
    "https://feeds.feedburner.com/harvardbusiness",
    "https://sloanreview.mit.edu/feed/"
  ],
  "cultura": [
    "https://www.gallup.com/rss/",
    "https://feeds.feedburner.com/harvardbusiness"
  ],
  "talent": [
    "https://rss.shrm.org/",
    "https://feeds.feedburner.com/harvardbusiness"
  ],
  "indicadores": [
    "https://feeds.feedburner.com/harvardbusiness",
    "https://sloanreview.mit.edu/feed/"
  ],
  "hr-tech": [
    "https://feeds.feedburner.com/harvardbusiness",
    "https://joshbersin.com/feed/"
  ],
  "change-management": [
    "https://feeds.feedburner.com/harvardbusiness",
    "https://sloanreview.mit.edu/feed/"
  ],
  "prompts-hr": [
    "https://www.aihr.com/blog/feed/",
    "https://rss.shrm.org/"
  ]
};

const KEYWORDS = {
  "beneficios": ["benefit","benefits","wellbeing","wellness","perks","compensation package","employee benefits"],
  "marca-empleadora": ["employer brand","employer branding","EVP","employee value proposition","talent attraction","company culture"],
  "people-experience": ["employee experience","people experience","onboarding","offboarding","engagement","workplace"],
  "compensaciones": ["compensation","salary","pay equity","pay transparency","total rewards","remuneration"],
  "payroll": ["payroll","salary","wages","pay","compensation","nómina","liquidación"],
  "desarrollo": ["learning","development","training","upskilling","reskilling","career","leadership development"],
  "cultura": ["culture","organizational culture","diversity","inclusion","DEI","psychological safety","values"],
  "talent": ["talent","recruitment","hiring","acquisition","candidate","reclutamiento","selection"],
  "indicadores": ["analytics","metrics","KPI","dashboard","data","people analytics","workforce data"],
  "hr-tech": ["HR technology","HRIS","AI","artificial intelligence","automation","HCM","HR tech"],
  "change-management": ["change management","transformation","organizational change","change","restructuring"],
  "prompts-hr": ["AI","ChatGPT","Claude","prompt","generative AI","HR automation","artificial intelligence"]
};

function parseRSS(xml) {
  const items = [];
  const itemRegex = /<item>([\s\S]*?)<\/item>/g;
  let match;
  while ((match = itemRegex.exec(xml)) !== null) {
    const itemXml = match[1];
    const getTag = (tag) => {
      const m = itemXml.match(new RegExp(`<${tag}[^>]*><!\\[CDATA\\[([\\s\\S]*?)\\]\\]><\\/${tag}>|<${tag}[^>]*>([\\s\\S]*?)<\\/${tag}>`));
      return m ? (m[1] || m[2] || "").trim() : "";
    };
    const title = getTag("title");
    const link = getTag("link") || itemXml.match(/<link>([^<]+)<\/link>/)?.[1] || "";
    const description = getTag("description").replace(/<[^>]+>/g, "").slice(0, 400);
    const pubDate = getTag("pubDate");
    const source = getTag("source") || "";
    if (title && link) {
      items.push({ title, link, description, pubDate, source });
    }
  }
  return items;
}

function scoreItem(item, keywords) {
  const text = `${item.title} ${item.description}`.toLowerCase();
  return keywords.reduce((score, kw) => score + (text.includes(kw.toLowerCase()) ? 2 : 0), 0);
}

function getFeedSource(url) {
  if (url.includes("shrm")) return { name: "SHRM", url: "https://www.shrm.org" };
  if (url.includes("harvard") || url.includes("hbr")) return { name: "Harvard Business Review", url: "https://hbr.org" };
  if (url.includes("gallup")) return { name: "Gallup Workplace", url: "https://www.gallup.com/workplace" };
  if (url.includes("sloan") || url.includes("mit")) return { name: "MIT Sloan Management Review", url: "https://sloanreview.mit.edu" };
  if (url.includes("bersin")) return { name: "Josh Bersin", url: "https://joshbersin.com" };
  if (url.includes("aihr")) return { name: "AIHR", url: "https://www.aihr.com" };
  if (url.includes("employerbrand")) return { name: "Employer Brand International", url: "https://employerbrandinternational.com" };
  return { name: "HR News", url: "#" };
}

export default async function handler(req) {
  const url = new URL(req.url);
  const category = url.searchParams.get("category") || "beneficios";
  const feeds = FEEDS[category] || FEEDS["beneficios"];
  const keywords = KEYWORDS[category] || [];

  const headers = {
    "Access-Control-Allow-Origin": "*",
    "Content-Type": "application/json",
    "Cache-Control": "s-maxage=3600, stale-while-revalidate=7200"
  };

  try {
    const allItems = [];

    await Promise.allSettled(
      feeds.map(async (feedUrl) => {
        try {
          const res = await fetch(feedUrl, {
            headers: { "User-Agent": "Mozilla/5.0 (compatible; HRPlus/1.0)" }
          });
          if (!res.ok) return;
          const xml = await res.text();
          const items = parseRSS(xml);
          const src = getFeedSource(feedUrl);
          items.forEach(item => {
            allItems.push({ ...item, feedSource: src.name, feedUrl: src.url });
          });
        } catch (e) {}
      })
    );

    const scored = allItems
      .map(item => ({ ...item, score: scoreItem(item, keywords) }))
      .filter(item => item.score > 0 || allItems.length < 5)
      .sort((a, b) => b.score - a.score)
      .slice(0, 5);

    const news = scored.map((item, i) => ({
      id: `live-${category}-${i}`,
      rank: i + 1,
      title: item.title,
      summary: item.description || "Haz clic en Ver noticia completa para leer el articulo.",
      source: item.feedSource,
      url: item.link,
      sourceUrl: item.feedUrl,
      date: item.pubDate ? new Date(item.pubDate).toISOString().split("T")[0] : new Date().toISOString().split("T")[0],
      isLive: true
    }));

    return new Response(JSON.stringify({ success: true, news, category }), { headers });

  } catch (err) {
    return new Response(JSON.stringify({ success: false, error: err.message, news: [] }), { headers, status: 500 });
  }
}
