export const config = { runtime: "edge" };

const FEED_PROXY = "https://api.rss2json.com/v1/api.json?rss_url=";

const FEEDS = {
  "beneficios":        ["https://rss.shrm.org/","https://feeds.feedburner.com/harvardbusiness"],
  "marca-empleadora":  ["https://employerbrandinternational.com/feed/","https://rss.shrm.org/"],
  "people-experience": ["https://feeds.feedburner.com/harvardbusiness","https://rss.shrm.org/"],
  "compensaciones":    ["https://rss.shrm.org/","https://feeds.feedburner.com/harvardbusiness"],
  "payroll":           ["https://rss.shrm.org/","https://feeds.feedburner.com/harvardbusiness"],
  "desarrollo":        ["https://feeds.feedburner.com/harvardbusiness","https://sloanreview.mit.edu/feed/"],
  "cultura":           ["https://www.gallup.com/rss/en_us/poll.aspx","https://feeds.feedburner.com/harvardbusiness"],
  "talent":            ["https://rss.shrm.org/","https://feeds.feedburner.com/harvardbusiness"],
  "indicadores":       ["https://feeds.feedburner.com/harvardbusiness","https://sloanreview.mit.edu/feed/"],
  "hr-tech":           ["https://feeds.feedburner.com/harvardbusiness","https://joshbersin.com/feed/"],
  "change-management": ["https://feeds.feedburner.com/harvardbusiness","https://sloanreview.mit.edu/feed/"],
  "prompts-hr":        ["https://www.aihr.com/blog/feed/","https://rss.shrm.org/"]
};

const KEYWORDS = {
  "beneficios":        ["benefit","benefits","wellbeing","wellness","perks","employee benefits","total rewards"],
  "marca-empleadora":  ["employer brand","employer branding","EVP","employee value proposition","talent attraction"],
  "people-experience": ["employee experience","people experience","onboarding","offboarding","engagement","workplace"],
  "compensaciones":    ["compensation","salary","pay equity","pay transparency","total rewards","remuneration"],
  "payroll":           ["payroll","wages","pay","salary","compensation"],
  "desarrollo":        ["learning","development","training","upskilling","reskilling","career","leadership"],
  "cultura":           ["culture","organizational culture","diversity","inclusion","DEI","psychological safety"],
  "talent":            ["talent","recruitment","hiring","acquisition","candidate","selection","recruiting"],
  "indicadores":       ["analytics","metrics","KPI","dashboard","data","people analytics","workforce"],
  "hr-tech":           ["HR technology","HRIS","AI","artificial intelligence","automation","HCM","HR tech"],
  "change-management": ["change management","transformation","organizational change","restructuring","change"],
  "prompts-hr":        ["AI","ChatGPT","prompt","generative AI","HR automation","artificial intelligence"]
};

const SOURCE_NAMES = {
  "rss.shrm.org":                  { name:"SHRM",                         url:"https://www.shrm.org" },
  "feedburner.com/harvardbusiness":{ name:"Harvard Business Review",      url:"https://hbr.org" },
  "gallup.com":                    { name:"Gallup Workplace",             url:"https://www.gallup.com/workplace" },
  "sloanreview.mit.edu":           { name:"MIT Sloan Management Review",  url:"https://sloanreview.mit.edu" },
  "joshbersin.com":                { name:"Josh Bersin",                  url:"https://joshbersin.com" },
  "aihr.com":                      { name:"AIHR",                         url:"https://www.aihr.com" },
  "employerbrandinternational.com":{ name:"Employer Brand International", url:"https://employerbrandinternational.com" },
};

function getSource(feedUrl) {
  for (const [key, val] of Object.entries(SOURCE_NAMES)) {
    if (feedUrl.includes(key)) return val;
  }
  return { name:"HR News", url:"#" };
}

function scoreItem(item, keywords) {
  const text = `${item.title} ${item.description}`.toLowerCase();
  return keywords.reduce((s, kw) => s + (text.includes(kw.toLowerCase()) ? 2 : 0), 0);
}

function cleanHtml(str) {
  return (str || "")
    .replace(/<[^>]+>/g, "")
    .replace(/&nbsp;/g," ")
    .replace(/&amp;/g,"&")
    .replace(/&lt;/g,"<")
    .replace(/&gt;/g,">")
    .replace(/&quot;/g,'"')
    .trim()
    .slice(0, 500);
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
          const proxyUrl = `${FEED_PROXY}${encodeURIComponent(feedUrl)}&count=10`;
          const res = await fetch(proxyUrl);
          if (!res.ok) return;
          const data = await res.json();
          if (data.status !== "ok" || !data.items) return;
          const src = getSource(feedUrl);
          data.items.forEach(item => {
            allItems.push({
              title: item.title || "",
              link: item.link || item.guid || "#",
              description: cleanHtml(item.description || item.content || ""),
              pubDate: item.pubDate || "",
              feedSource: src.name,
              feedUrl: src.url,
            });
          });
        } catch (e) {}
      })
    );

    const scored = allItems
      .map(item => ({ ...item, score: scoreItem(item, keywords) }))
      .sort((a, b) => b.score - a.score)
      .slice(0, 5);

    if (scored.length === 0) {
      return new Response(
        JSON.stringify({ success: false, news: [], error: "No articles found" }),
        { headers, status: 404 }
      );
    }

    const news = scored.map((item, i) => ({
      id: `live-${category}-${i}`,
      rank: i + 1,
      title: item.title,
      summary: item.description || "Haz clic en Ver noticia completa para leer el articulo.",
      source: item.feedSource,
      url: item.link,
      sourceUrl: item.feedUrl,
      date: item.pubDate
        ? new Date(item.pubDate).toISOString().split("T")[0]
        : new Date().toISOString().split("T")[0],
      isLive: true
    }));

    return new Response(JSON.stringify({ success: true, news, category }), { headers });

  } catch (err) {
    return new Response(
      JSON.stringify({ success: false, error: err.message, news: [] }),
      { headers, status: 500 }
    );
  }
}
