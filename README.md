# 把孤独变成声音 · 少女乐队动画三部曲
<img width="1146" height="717" alt="cover" src="https://github.com/user-attachments/assets/b3ac2131-28f2-452c-a239-4c28d8189b61" />


一个纯前端的长页动画作品，介绍三部重新定义「少女乐队」的动画。

| # | 作品 | 播出 | 制作 |
|---|------|------|------|
| 01 | 孤独摇滚！/ ぼっち・ざ・ろっく！ | 2022 秋 | CloverWorks |
| 02 | BanG Dream! It's MyGO!!!!! | 2023 夏 | サンジゲン（三次元） |
| 03 | GIRLS BAND CRY / ガールズバンドクライ | 2024 春 | 東映アニメーション |

## 打开方式

直接双击 `index.html`（纯静态，无构建、无依赖、可离线）。

## 音乐

「代表曲」列表的每一行都是一个指向 B站 的链接，点击（整行任意位置）会在新标签页打开对应的视频：

- 18 首曲目全部有对应 B站 视频，链接写在 `data.js` 每个曲目的 `bili` 字段（BV 号）
- 优先选择官方账号来源：MyGO!!!!! 与 GIRLS BAND CRY 的多首为官方 MV，其余为高播放量的完整版
- 页面本身不含任何音轨，不读取本地文件，也不发起跨域请求
- 要换视频，把 `data.js` 里对应的 `bili` 值改成新的 BV 号即可

## 技术栈

- **HTML5**：语义化结构，8 个章节 + 开场遮罩
- **CSS3**：自定义属性主题、径向渐变氛围层、3D 翻转卡（`transform-style: preserve-3d`）、`clip-path` 遮罩揭示、`mask-image` 渐隐与复合遮罩、`mix-blend-mode`、`color-mix()`、多组 `@keyframes`
- **原生 JS**：`IntersectionObserver` 进出场、SVG 动态生成（舞台 / 关系网络 / 雷达图）、Canvas 实时频谱、滚动进度与导航状态机
- **SVG**：舞台灯光 / 波形 / 飘音符、14 人羁绊网络（圆形立绘裁切）、五维雷达图

## 交互一览

- 开场遮罩：点击 / 滚动 / 2.6 秒后自动进入
- 右侧圆点导航 + 顶部渐变进度条
- 成员卡：悬停或点击 3D 翻转看背面设定
- 曲目行：整行是 B站 链接，点击在新标签页打开对应视频；悬停时波形起跳、圆钮高亮
- 羁绊网络：悬停人物高亮关联，底部显示关系描述
- 雷达图：进入视口时从中心生长
- 按 `Esc` 收起所有翻面卡

## 目录

```
band-anime/
├─ index.html      结构
├─ style.css       浅色主题 + 全部动效
├─ app.js          交互、SVG 生成、Canvas 频谱
├─ data.js         三部作品资料、角色、关系、雷达数据
└─ img/            官方立绘 14 张 + 官方剧照 / PV 缩略图 + CREDITS.md
```

## 图片来源

页面里的所有人物与剧照都来自各作品**官方网站公开素材**：

- 角色立绘：`bocchi.rocks/character/`、`anime.bang-dream.com/mygo/character/`、`girls-band-cry.com/character/`
- 剧情剧照：三个官网的 STORY 页（`/tv/story/?id=`、`/mygo/story/`、`/story/`）
- 主视觉与 PV 缩略图：官网 index 与官方 YouTube 频道缩略图

版权归原作者与制作委员会所有，本页仅作非商业介绍与学习演示。逐图来源见 `img/CREDITS.md`。
页面中的舞台 SVG、波形、雷达图、关系网络与全部代码为原创绘制。

## 兼容性

Chrome / Edge / Safari / Firefox 近两年版本。支持 `prefers-reduced-motion` 降级。
