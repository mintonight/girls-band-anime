# 把孤独变成声音 · 少女乐队动画三部曲

一个纯前端的长页动画作品，介绍三部重新定义「少女乐队」的动画。

| # | 作品 | 播出 | 制作 |
|---|------|------|------|
| 01 | 孤独摇滚！/ ぼっち・ざ・ろっく！ | 2022 秋 | CloverWorks |
| 02 | BanG Dream! It's MyGO!!!!! | 2023 夏 | サンジゲン（三次元） |
| 03 | GIRLS BAND CRY / ガールズバンドクライ | 2024 春 | 東映アニメーション |

## 打开方式

直接双击 `index.html`（纯静态，无构建、无依赖、可离线）。

## 音频

「代表曲」列表接入了本地音乐库，点击即真实播放：

- 目录：`E:\Music\music`（可在 `audio.js` 里改 `AUDIO_BASE`）
- 共 45 首：結束バンド 9 首、MYGO!!!!! 14 首、トゲナシトゲアリ 22 首
- 格式：FLAC / MP3，Chrome 直接用 `file://` 读取，不经过任何服务器
- 播放器支持：播放 / 暂停、上一首 / 下一首、点击进度条跳转、自动连播

清单由一次 `ffprobe` 扫描生成（文件名 + 真实时长），写在 `audio.js` 里。
如果音乐库换位置，改 `AUDIO_BASE` 一行即可；缺失的曲目会自动回退成「无音轨示意」条目。

## 技术栈

- **HTML5**：语义化结构，8 个章节 + 开场遮罩 + 假播放器
- **CSS3**：自定义属性主题、径向渐变氛围层、3D 翻转卡（`transform-style: preserve-3d`）、`clip-path` 遮罩揭示、`mask-image` 渐隐与复合遮罩、`mix-blend-mode`、`color-mix()`、多组 `@keyframes`
- **原生 JS**：`IntersectionObserver` 进出场、SVG 动态生成（舞台 / 关系网络 / 雷达图）、Canvas 实时频谱、滚动进度与导航状态机
- **SVG**：舞台灯光 / 波形 / 飘音符、14 人羁绊网络（圆形立绘裁切）、五维雷达图

## 交互一览

- 开场遮罩：点击 / 滚动 / 2.6 秒后自动进入
- 右侧圆点导航 + 顶部渐变进度条
- 成员卡：悬停或点击 3D 翻转看背面设定
- 曲目行：点击「播放」触发底部播放器与频谱增强（纯视觉，无音轨）
- 羁绊网络：悬停人物高亮关联，底部显示关系描述
- 雷达图：进入视口时从中心生长
- 按 `Esc` 收起播放器与所有翻面卡

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