# Birthday Gift

这是一个纯前端模板。

## 使用方式

### 1) 放入你的素材

把你准备的图片放到下面目录：

- `assets/klee.png`（角色立绘）
- `assets/flower.png`（D 的小花图标）
- `assets/photo/`（A 的照片）
- `assets/gift/`（D 的礼物图片）

然后修改 `main.js` 的 `CONTENT` 指向你的文件路径与文案。

### 2) 本地运行

推荐用一个本地静态服务器打开：

```bash
cd /Users/xumingyue/12.31
python3 -m http.server 5173
```

然后浏览器打开：

- `http://localhost:5173`

### 3) 发布

- GitHub Pages：`Settings → Pages → Deploy from a branch → main / (root)`
- 注意：B 选项会动态加载 Monaco CDN，离线/网络限制时会自动降级，不影响其他页面。

## 你需要改哪些内容？

- A：`CONTENT.A.photos` / `CONTENT.A.messages`
- C：`CONTENT.C.letter`
- D：`CONTENT.D.giftWall.gifts`

## 自定义（可选）

- 你的回答内容：修改 `main.js` 里的 `CONTENT`
- UI 配色/泡泡样式：修改 `styles.css`

## OJ 版（二叉树遍历）

如果你想要一个**真正能在 Online Judge 上 stdin/stdout 跑的版本**，见 `oj/`（含 `oj/main.cpp` 和输入输出说明）。


