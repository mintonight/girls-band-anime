/* ============================================================
   data.js — 三部作品的资料与角色立绘数据
   立绘来自各作品官方网站公开角色页（见 img/CREDITS.md）
   ============================================================ */

const BANDS = {

  /* ---------------- 01 孤独摇滚 ---------------- */
  bocchi: {
    id: "bocchi",
    name: "孤独摇滚！",
    jp: "ぼっち・ざ・ろっく！",
    en: "BOCCHI THE ROCK!",
    c1: "#f7b733",
    c2: "#ff5f95",
    lyrics: ["青春コンプレックス", "ギターと孤独と蒼い惑星"],
    live: "STARRY · 下北泽 · live simulation",
    members: [
      {
        name: "后藤一里", jp: "後藤ひとり", nick: "ぼっち / 波奇",
        role: "吉他 · 作词", inst: "Fender Jazzmaster",
        tag: "GUITAR", color: "#f7b733", img: "img/bocchi-hitori.png",
        desc: "粉色长发、降噪耳机、总在角落里的吉他手。只有抱起琴的时候，才会变成另一个人。",
        cv: "青山吉能"
      },
      {
        name: "伊地知虹夏", jp: "伊地知虹夏", nick: "にじか",
        role: "鼓 · 队长", inst: "架子鼓",
        tag: "DRUMS", color: "#ff8a4c", img: "img/bocchi-nijika.png",
        desc: "结束乐队的召集人，STARRY 店长的妹妹。永远在照顾别人，也偶尔被照顾。",
        cv: "鈴代紗弓"
      },
      {
        name: "山田凉", jp: "山田リョウ", nick: "リョウ",
        role: "贝斯 · 作曲", inst: "贝斯",
        tag: "BASS", color: "#5b8def", img: "img/bocchi-ryo.png",
        desc: "话很少、很有钱过、也很懂得怎么把借来的钱变成贝斯。真正的音乐上的定海神针。",
        cv: "水野朔"
      },
      {
        name: "喜多郁代", jp: "喜多郁代", nick: "きた",
        role: "吉他 · 主唱", inst: "吉他 · 主唱",
        tag: "VOCAL", color: "#ff5f95", img: "img/bocchi-ikuyo.png",
        desc: "一开始是「为了追凉」才加入的，后来成了乐队里最亮的那个声音。",
        cv: "長谷川育美"
      }
    ],
    songs: [
      { name: "青春コンプレックス", cn: "青春情节", use: "OP", year: "2022" },
      { name: "ギターと孤独と蒼い惑星", cn: "吉他与孤独与蓝色星球", use: "第 4 话", year: "2022" },
      { name: "あのバンド", cn: "那个乐队", use: "剧中曲", year: "2022" },
      { name: "星座になれたら", cn: "若能成为星座", use: "剧中曲", year: "2022" },
      { name: "転がる岩、君に朝が降る", cn: "翻滚的石头，晨光落在你身上", use: "ED", year: "2022" },
      { name: "Distortion!!", cn: "失真", use: "剧中曲", year: "2022" }
    ]
  },

  /* ---------------- 02 MyGO!!!!! ---------------- */
  mygo: {
    id: "mygo",
    name: "It's MyGO!!!!!",
    jp: "BanG Dream! It's MyGO!!!!!",
    en: "IT'S MYGO!!!!!",
    c1: "#8b7cf6",
    c2: "#ff5f95",
    lyrics: ["詩超絆", "春日影", "迷星叫"],
    live: "live house · 五个人的舞台",
    members: [
      {
        name: "高松灯", jp: "高松燈", nick: "灯",
        role: "主唱 · 作词", inst: "主唱",
        tag: "VOCAL", color: "#8b7cf6", img: "img/mygo-tomori.png",
        desc: "只写得出歌词的女孩。她的话都藏在笔记本里，只有唱出来才有人接住。",
        cv: "羊宮妃那"
      },
      {
        name: "千早爱音", jp: "千早愛音", nick: "あのん",
        role: "吉他", inst: "吉他",
        tag: "GUITAR", color: "#ff5f95", img: "img/mygo-anon.png",
        desc: "想在高中重新做一次「受欢迎的自己」。她拉起了这支乐队，也在其中重新认识自己。",
        cv: "立石凛"
      },
      {
        name: "长崎そよ", jp: "長崎そよ", nick: "そよ",
        role: "贝斯", inst: "贝斯",
        tag: "BASS", color: "#28b0d6", img: "img/mygo-soyo.png",
        desc: "温柔得体，永远笑着，心里装着一段回不去的乐队。",
        cv: "小日向美香"
      },
      {
        name: "椎名立希", jp: "椎名立希", nick: "りき",
        role: "鼓", inst: "架子鼓",
        tag: "DRUMS", color: "#f7b733", img: "img/mygo-taki.png",
        desc: "能写出最好的曲、说出最狠的话。她比谁都不想让这支乐队散掉。",
        cv: "林鼓子"
      },
      {
        name: "要楽奈", jp: "要楽奈", nick: "らな",
        role: "吉他", inst: "吉他",
        tag: "GUITAR", color: "#2fbf9b", img: "img/mygo-rana.png",
        desc: "世界级的吉他少女，凭「有趣」两个字行动。她是最自由的那个，也最容易被留下。",
        cv: "青木陽菜"
      }
    ],
    songs: [
      { name: "詩超絆", cn: "诗超绊", use: "第 10 话", year: "2023" },
      { name: "春日影", cn: "春日影", use: "剧中曲", year: "2023" },
      { name: "迷星叫", cn: "迷星叫", use: "剧中曲", year: "2023" },
      { name: "壱雫空", cn: "一雫空", use: "OP", year: "2023" },
      { name: "栞", cn: "书签", use: "ED", year: "2023" },
      { name: "焚音打", cn: "焚音打", use: "剧中曲", year: "2023" }
    ]
  },

  /* ---------------- 03 GIRLS BAND CRY ---------------- */
  gbc: {
    id: "gbc",
    name: "GIRLS BAND CRY",
    jp: "ガールズバンドクライ",
    en: "GIRLS BAND CRY",
    c1: "#28b0d6",
    c2: "#ff7a59",
    lyrics: ["名もなき何もかも", "視界の隅", "空の箱"],
    live: "KAWASAKI · live house · 3DCG stage",
    members: [
      {
        name: "井芹仁菜", jp: "井芹仁菜", nick: "にな",
        role: "主唱", inst: "主唱",
        tag: "VOCAL", color: "#28b0d6", img: "img/gbc-nina.png",
        desc: "退学、上京、不服气。她的愤怒不是演出，是她活着的证据。",
        cv: "理名"
      },
      {
        name: "河原木桃香", jp: "河原木桃香", nick: "ももか",
        role: "吉他", inst: "吉他",
        tag: "GUITAR", color: "#ff7a59", img: "img/gbc-momoka.png",
        desc: "在一支没能走下去的乐队里弹过吉他。她比谁都清楚「靠自己」有多难。",
        cv: "夕莉"
      },
      {
        name: "安和すばる", jp: "安和すばる", nick: "すばる",
        role: "鼓", inst: "架子鼓",
        tag: "DRUMS", color: "#8b7cf6", img: "img/gbc-subaru.png",
        desc: "看起来很随和，其实一直在让步，也一直在忍耐。",
        cv: "美怜"
      },
      {
        name: "海老塚智", jp: "海老塚智", nick: "とも",
        role: "键盘", inst: "键盘",
        tag: "KEYS", color: "#f7b733", img: "img/gbc-tomo.png",
        desc: "现实主义的那个。她会算钱、会谈判，也会在你撑不住时把人拽回来。",
        cv: "凪都"
      },
      {
        name: "海老塚ルパ", jp: "海老塚ルパ", nick: "ルパ",
        role: "贝斯", inst: "贝斯",
        tag: "BASS", color: "#2fbf9b", img: "img/gbc-rupa.png",
        desc: "最年轻的那个，也是最不服输的那个。她的贝斯永远顶着拍子往前推。",
        cv: "朱李"
      }
    ],
    songs: [
      { name: "名もなき何もかも", cn: "无名的一切", use: "剧中曲", year: "2024" },
      { name: "視界の隅 朽ちる音", cn: "视野一角腐朽的声音", use: "主题歌", year: "2024" },
      { name: "空の箱", cn: "空之箱", use: "剧中曲", year: "2024" },
      { name: "運命に賭けたい論理", cn: "想赌上命运的逻辑", use: "剧中曲", year: "2024" },
      { name: "気鬱、白濁す", cn: "忧郁、白浊", use: "剧中曲", year: "2024" },
      { name: "ETERNAL FLAME", cn: "永恒之火", use: "剧中曲", year: "2024" }
    ]
  }
};

/* ---------------- 人物关系网络 ---------------- */
const BOND = {
  nodes: [
    { id: "b1", name: "后藤一里", short: "一里", band: "bocchi", r: 27, img: "img/bocchi-hitori.png" },
    { id: "b2", name: "伊地知虹夏", short: "虹夏", band: "bocchi", r: 23, img: "img/bocchi-nijika.png" },
    { id: "b3", name: "山田凉", short: "凉", band: "bocchi", r: 23, img: "img/bocchi-ryo.png" },
    { id: "b4", name: "喜多郁代", short: "喜多", band: "bocchi", r: 23, img: "img/bocchi-ikuyo.png" },
    { id: "m1", name: "高松灯", short: "灯", band: "mygo", r: 27, img: "img/mygo-tomori.png" },
    { id: "m2", name: "千早爱音", short: "爱音", band: "mygo", r: 23, img: "img/mygo-anon.png" },
    { id: "m3", name: "长崎そよ", short: "そよ", band: "mygo", r: 23, img: "img/mygo-soyo.png" },
    { id: "m4", name: "椎名立希", short: "立希", band: "mygo", r: 23, img: "img/mygo-taki.png" },
    { id: "m5", name: "要楽奈", short: "楽奈", band: "mygo", r: 23, img: "img/mygo-rana.png" },
    { id: "g1", name: "井芹仁菜", short: "仁菜", band: "gbc", r: 27, img: "img/gbc-nina.png" },
    { id: "g2", name: "河原木桃香", short: "桃香", band: "gbc", r: 23, img: "img/gbc-momoka.png" },
    { id: "g3", name: "安和すばる", short: "すばる", band: "gbc", r: 23, img: "img/gbc-subaru.png" },
    { id: "g4", name: "海老塚智", short: "智", band: "gbc", r: 23, img: "img/gbc-tomo.png" },
    { id: "g5", name: "海老塚ルパ", short: "ルパ", band: "gbc", r: 23, img: "img/gbc-rupa.png" }
  ],
  links: [
    { a: "b1", b: "b2", w: 3, label: "被捡回来的人" },
    { a: "b1", b: "b4", w: 2, label: "吉他搭档" },
    { a: "b2", b: "b3", w: 3, label: "青梅竹马" },
    { a: "b3", b: "b4", w: 1, label: "追着凉来的" },
    { a: "b1", b: "b3", w: 2, label: "贝斯与吉他" },
    { a: "b2", b: "b4", w: 1, label: "同班同学" },
    { a: "m1", b: "m4", w: 3, label: "作曲与作词" },
    { a: "m1", b: "m2", w: 3, label: "拉住她的人" },
    { a: "m2", b: "m3", w: 2, label: "旧乐队的影子" },
    { a: "m1", b: "m3", w: 2, label: "回不去的从前" },
    { a: "m4", b: "m5", w: 2, label: "鼓与吉他" },
    { a: "m1", b: "m5", w: 2, label: "第 10 话的舞台" },
    { a: "m2", b: "m4", w: 1, label: "互不顺眼" },
    { a: "g1", b: "g2", w: 3, label: "被那声吉他击中" },
    { a: "g1", b: "g5", w: 3, label: "最吵的一对" },
    { a: "g2", b: "g4", w: 2, label: "旧队友" },
    { a: "g3", b: "g4", w: 2, label: "现实与理想" },
    { a: "g4", b: "g5", w: 3, label: "姐妹" },
    { a: "g1", b: "g3", w: 1, label: "互相托底" },
    { a: "g2", b: "g5", w: 1, label: "贝斯与吉他" },
    { a: "b1", b: "m1", w: 1, label: "说不出口的人", cross: true },
    { a: "m1", b: "g1", w: 1, label: "把话唱出来", cross: true },
    { a: "b1", b: "g1", w: 1, label: "一个人练琴的人", cross: true }
  ]
};

/* ---------------- 雷达图维度（主观对照） ---------------- */
const RADAR = {
  axes: ["笑点密度", "情感浓度", "现实质感", "演奏表现", "角色群像"],
  series: [
    { key: "bocchi", label: "孤独摇滚", color: "#f7b733", values: [95, 78, 55, 88, 72] },
    { key: "mygo", label: "MyGO!!!!!", color: "#8b7cf6", values: [40, 96, 72, 90, 92] },
    { key: "gbc", label: "GIRLS BAND CRY", color: "#28b0d6", values: [52, 90, 92, 86, 80] }
  ]
};
