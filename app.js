const cities = [
  {
    id: "beijing",
    name: "北京",
    slug: "beijing",
    region: "华北",
    mapPosition: { x: 52, y: 23 },
    tagline: "古都中轴，千年气象",
    heroLine: "把历史感做成可浏览的城市体验。",
    accent: "crimson",
    available: true,
    stats: ["3 景点", "1 核心 3D", "历史城市"],
    roadmap: "先验证古建类景点的图转 3D 价值。",
    spots: [
      {
        id: "bj_gugong",
        name: "故宫",
        summary: "明清两代皇家宫殿建筑群，代表中轴对称、等级秩序和古代建筑审美。",
        tags: ["历史", "古建", "文化"],
        status: "done",
        model: true,
        priority: "P0",
      },
      {
        id: "bj_tiananmen",
        name: "天安门",
        summary: "北京中轴线上的标志性地标，适合作为城市入口的第一视觉锚点。",
        tags: ["地标", "城市入口"],
        status: "in_progress",
        model: true,
        priority: "P0",
      },
      {
        id: "bj_tiantan",
        name: "天坛",
        summary: "古代祭祀建筑群，适合做轻量景观化展示与历史讲解预留。",
        tags: ["祭祀", "古建"],
        status: "todo",
        model: false,
        priority: "P1",
      },
    ],
  },
  {
    id: "shanghai",
    name: "上海",
    slug: "shanghai",
    region: "华东",
    mapPosition: { x: 63, y: 43 },
    tagline: "现代天际线，夜色更鲜明",
    heroLine: "把国际化城市做成夜景感强的浏览体验。",
    accent: "teal",
    available: true,
    stats: ["3 景点", "1 核心 3D", "都市地标"],
    roadmap: "优先做外滩和东方明珠的轮廓识别。",
    spots: [
      {
        id: "sh_dongfangmingzhu",
        name: "东方明珠",
        summary: "上海最具识别度的现代地标之一，适合优先制作 3D 模型和夜景主题。",
        tags: ["地标", "现代", "夜景"],
        status: "done",
        model: true,
        priority: "P0",
      },
      {
        id: "sh_waitan",
        name: "外滩",
        summary: "展示城市天际线和江景关系的最佳入口，可作为上海总览页的主视觉。",
        tags: ["滨江", "城市景观"],
        status: "in_progress",
        model: true,
        priority: "P0",
      },
      {
        id: "sh_yuyuan",
        name: "豫园",
        summary: "古典园林与城市商业氛围的结合点，适合做反差型内容。",
        tags: ["园林", "古风"],
        status: "todo",
        model: false,
        priority: "P1",
      },
    ],
  },
  {
    id: "xian",
    name: "西安",
    slug: "xian",
    region: "西北",
    mapPosition: { x: 38, y: 41 },
    tagline: "古城遗址，厚重叙事",
    heroLine: "把历史遗址、古城墙和讲解内容做成一个文化场景。",
    accent: "amber",
    available: true,
    stats: ["3 景点", "1 核心 3D", "遗址文化"],
    roadmap: "优先做兵马俑的展陈感与入口仪式感。",
    spots: [
      {
        id: "xa_bingmayong",
        name: "兵马俑",
        summary: "中国最具辨识度的历史遗址之一，适合做首批高优先级 3D 景点。",
        tags: ["历史", "遗址", "国宝"],
        status: "done",
        model: true,
        priority: "P0",
      },
      {
        id: "xa_dayanta",
        name: "大雁塔",
        summary: "唐风城市名片之一，适合做古都主题页中的视觉锚点。",
        tags: ["唐风", "古塔"],
        status: "todo",
        model: false,
        priority: "P1",
      },
      {
        id: "xa_zhonglou",
        name: "钟楼",
        summary: "古城中轴的代表节点，适合作为城市页的过渡性景点。",
        tags: ["城楼", "中轴"],
        status: "todo",
        model: false,
        priority: "P1",
      },
    ],
  },
];

const roadmap = [
  {
    title: "V0.1",
    body: "3 城 9 景点，先验证地图点击、城市聚合和少量 3D。",
  },
  {
    title: "V0.5",
    body: "加入收藏、最近浏览和文字讲解，验证用户是否连续浏览。",
  },
  {
    title: "V1.0",
    body: "扩到 8-10 城，补足语音讲解和更多可用的景点内容。",
  },
];

const app = document.querySelector("#app");

function getHashRoute() {
  const hash = window.location.hash.replace(/^#/, "");
  const [type, value] = hash.split("/");

  if (type === "spot" && value) {
    return { type: "spot", value };
  }

  if (type === "city" && value) {
    return { type: "city", value };
  }

  return { type: "home" };
}

function findCityBySlug(slug) {
  return cities.find((city) => city.slug === slug);
}

function findSpotById(id) {
  for (const city of cities) {
    const spot = city.spots.find((item) => item.id === id);
    if (spot) return { city, spot };
  }
  return null;
}

function setHash(path) {
  window.location.hash = path;
}

function tagClass(status) {
  if (status === "done") return "tag";
  if (status === "in_progress") return "tag warn";
  return "tag dim";
}

function renderTopbar(routeLabel) {
  return `
    <div class="topbar">
      <div class="brand">
        <div class="brand-mark">T</div>
        <div class="brand-copy">
          <h1>TravelChina</h1>
          <p>赛博旅游中国 · 地图到景点的首版原型</p>
        </div>
      </div>
      <div class="status">${routeLabel}</div>
    </div>
  `;
}

function renderHome() {
  return `
    <div class="shell">
      ${renderTopbar("V0.1 / 全国地图入口")}

      <div class="view">
        <section class="hero">
          <div class="hero-card">
            <span class="eyebrow">Cyber Atlas / MVP</span>
            <h2 class="hero-title">把中国景点做成可浏览的赛博地图。</h2>
            <p class="hero-lead">
              这是一版先跑通体验链路的原型：用户先点全国地图，再进城市总览，最后进入景点详情。
              首版只做 3 个城市、9 个景点和少量 3D，先证明“愿意逛”和“愿意停留”。
            </p>
            <div class="stats">
              <div class="stat"><strong>3</strong><span>首发城市</span></div>
              <div class="stat"><strong>9</strong><span>首发景点</span></div>
              <div class="stat"><strong>3-5</strong><span>核心 3D</span></div>
            </div>
          </div>

          <div class="hero-aside">
            <div class="mini-panel">
              <h2>一期节奏</h2>
              <div class="roadmap">
                ${roadmap
                  .map(
                    (item) => `
                      <div class="roadmap-card">
                        <b>${item.title}</b>
                        <p>${item.body}</p>
                      </div>
                    `,
                  )
                  .join("")}
              </div>
            </div>
            <div class="mini-panel">
              <h2>当前选择</h2>
              <div class="empty">
                先从地图点开一个城市。推荐先看北京、上海或西安。
              </div>
            </div>
          </div>
        </section>

        <section class="atlas-grid">
          <div class="atlas">
            <div class="atlas-header">
              <h2>全国地图</h2>
              <p>点击已开放城市，进入城市景点总览。</p>
            </div>
            ${cities
              .map(
                (city) => `
                  <button
                    class="pin ${city.available ? "" : "hidden"}"
                    style="left:${city.mapPosition.x}%; top:${city.mapPosition.y}%"
                    data-city="${city.slug}"
                    aria-label="进入${city.name}"
                  >
                    <span class="pin-dot"></span>
                    <span class="pin-label">${city.name}</span>
                  </button>
                `,
              )
              .join("")}
          </div>

          <aside class="selection">
            <div class="selection-head">
              <div>
                <h2>首批开放城市</h2>
                <p>每个城市先做 3 个代表景点，优先保证城市气质清晰、景点识别度高。</p>
              </div>
              <span class="pill">MVP Scope Locked</span>
            </div>

            <div class="pill-row">
              <span class="pill">地图首页</span>
              <span class="pill">城市总览</span>
              <span class="pill">景点详情</span>
              <span class="pill">少量 3D</span>
            </div>

            <div class="grid cities" style="margin-top: 18px">
              ${cities
                .map(
                  (city) => `
                    <button class="city-card" data-city="${city.slug}">
                      <h3 class="name">${city.name}</h3>
                      <p>${city.tagline}</p>
                      <div class="meta">
                        <span class="tag">${city.region}</span>
                        <span class="tag warn">${city.stats[0]}</span>
                        <span class="tag dim">${city.available ? "已开放" : "未开放"}</span>
                      </div>
                    </button>
                  `,
                )
                .join("")}
            </div>
          </aside>
        </section>
      </div>
    </div>
  `;
}

function renderCity(city) {
  const firstSpot = city.spots[0];
  return `
    <div class="shell">
      ${renderTopbar(`${city.name} / 城市总览`)}
      <div class="view">
        <section class="hero">
          <div class="hero-card">
            <span class="eyebrow">${city.region}</span>
            <h2 class="hero-title">${city.name}</h2>
            <p class="hero-lead">${city.heroLine}</p>
            <div class="stats">
              <div class="stat"><strong>${city.spots.length}</strong><span>代表景点</span></div>
              <div class="stat"><strong>${city.spots.filter((spot) => spot.model).length}</strong><span>3D 目标</span></div>
              <div class="stat"><strong>${city.spots[0].priority}</strong><span>首发优先级</span></div>
            </div>
          </div>

          <div class="hero-aside">
            <div class="mini-panel">
              <h2>城市说明</h2>
              <p style="margin: 0; color: var(--muted); line-height: 1.8">
                ${city.roadmap}
              </p>
            </div>
            <div class="mini-panel">
              <h2>推荐进入</h2>
              <div class="empty">
                先点第一个景点，快速进入详情页，验证卡片到详情的跳转。
              </div>
            </div>
          </div>
        </section>

        <section class="atlas-grid">
          <div class="panel">
            <a class="back-link" href="#/">返回全国地图</a>
            <div class="section-title">
              <h2>${city.name}景点总览</h2>
              <small>点击景点卡片，进入详情页</small>
            </div>
            <div class="grid spots" style="margin-top: 18px">
              ${city.spots
                .map(
                  (spot) => `
                    <button class="spot-card" data-spot="${spot.id}">
                      <h3 class="name">${spot.name}</h3>
                      <p>${spot.summary}</p>
                      <div class="meta">
                        <span class="${tagClass(spot.status)}">${spot.status}</span>
                        <span class="tag warn">${spot.priority}</span>
                        <span class="tag dim">${spot.model ? "3D 预留" : "静态先行"}</span>
                      </div>
                    </button>
                  `,
                )
                .join("")}
            </div>
          </div>

          <aside class="detail-block">
            <div class="detail-title">
              <div>
                <h2>${firstSpot.name}</h2>
                <p>${firstSpot.summary}</p>
              </div>
            </div>

            <div class="stage" style="margin-top: 18px">
              <div class="artifact" aria-hidden="true"></div>
              <div class="stage-label">
                <div>
                  <strong>${firstSpot.model ? "3D 模型预览位" : "静态封面位"}</strong>
                  <div><span>首版优先做可识别的轮廓展示</span></div>
                </div>
                <div style="text-align: right">
                  <strong>${firstSpot.tags.join(" / ")}</strong>
                  <div><span>当前城市第一推荐景点</span></div>
                </div>
              </div>
            </div>

            <div class="cta-row">
              <button class="cta" data-spot="${firstSpot.id}">进入景点详情</button>
              <button class="cta secondary" data-city="${city.slug}">继续浏览城市</button>
            </div>
          </aside>
        </section>
      </div>
    </div>
  `;
}

function renderSpot(city, spot) {
  return `
    <div class="shell">
      ${renderTopbar(`${city.name} / ${spot.name}`)}
      <div class="view">
        <section class="detail-layout">
          <div class="detail-block">
            <a class="back-link" href="#city/${city.slug}">返回${city.name}总览</a>
            <div class="detail-title">
              <div>
                <span class="eyebrow">${city.region} / ${city.name}</span>
                <h2 style="margin-top: 12px">${spot.name}</h2>
                <p>${spot.summary}</p>
              </div>
            </div>

            <div class="meta" style="margin-top: 18px">
              ${spot.tags.map((tag) => `<span class="tag">${tag}</span>`).join("")}
              <span class="tag warn">${spot.priority}</span>
              <span class="tag dim">${spot.model ? "支持 3D" : "暂未制作 3D"}</span>
            </div>

            <div class="stage" style="margin-top: 18px">
              <div class="artifact" aria-hidden="true"></div>
              <div class="stage-label">
                <div>
                  <strong>${spot.model ? "3D 浏览区" : "封面展示区"}</strong>
                  <div><span>后续这里接入真实模型和热点讲解</span></div>
                </div>
                <div style="text-align: right">
                  <strong>${spot.status}</strong>
                  <div><span>当前内容状态</span></div>
                </div>
              </div>
            </div>

            <div class="footer-note">
              一期这里先保留图文 + 3D 占位，后续再接入语音讲解、内部浏览和热点点位。
            </div>
          </div>

          <aside class="detail-block">
            <h2>内容卡</h2>
            <div class="roadmap">
              <div class="roadmap-card">
                <b>景点标签</b>
                <p>${spot.tags.join(" / ")}</p>
              </div>
              <div class="roadmap-card">
                <b>3D 策略</b>
                <p>${spot.model ? "首批进入 3D 制作名单。" : "先做静态封面，后续视优先级补 3D。"}</p>
              </div>
              <div class="roadmap-card">
                <b>下一步</b>
                <p>继续补页面原型、数据表和真实内容资源。</p>
              </div>
            </div>
          </aside>
        </section>
      </div>
    </div>
  `;
}

function render() {
  const route = getHashRoute();

  if (route.type === "city") {
    const city = findCityBySlug(route.value);
    if (!city) {
      window.location.hash = "#/";
      return;
    }

    app.innerHTML = renderCity(city);
    return;
  }

  if (route.type === "spot") {
    const resolved = findSpotById(route.value);
    if (!resolved) {
      window.location.hash = "#/";
      return;
    }

    app.innerHTML = renderSpot(resolved.city, resolved.spot);
    return;
  }

  app.innerHTML = renderHome();
}

document.addEventListener("click", (event) => {
  const cityButton = event.target.closest("[data-city]");
  const spotButton = event.target.closest("[data-spot]");

  if (spotButton) {
    event.preventDefault();
    setHash(`spot/${spotButton.dataset.spot}`);
    return;
  }

  if (cityButton) {
    event.preventDefault();
    setHash(`city/${cityButton.dataset.city}`);
  }
});

window.addEventListener("hashchange", render);
window.addEventListener("DOMContentLoaded", () => {
  if (!window.location.hash) {
    window.location.hash = "#/";
  }
  render();
});
