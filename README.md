# mono-pack

基于 **pnpm workspace + monorepo** 的前端私有库集合，包含组件库、工具库与组合式函数库，并附带文档站与 Playground。

## 仓库结构

| 包名 | 路径 | 说明 |
|------|------|------|
| `@gengjjjjj/component` | `packages/component` | Vue 3 组件库（ECharts、SvgIcon、Pagination、ToHtml 等） |
| `@gengjjjjj/utils` | `packages/utils` | 纯 TS 工具方法（validate、storage、debounce 等） |
| `@gengjjjjj/composables` | `packages/composables` | Vue 组合式函数（如 `useViewportScale`） |
| 文档 | `packages/doc` | VitePress 文档站 |
| Playground | `playground/x` | 本地校验组件与方法 |

依赖关系：`@gengjjjjj/composables` → `@gengjjjjj/utils`（`workspace:*`）。

---

## 环境要求

- Node.js `>= 18`
- pnpm（仓库已声明 `packageManager`，建议用 Corepack）
- 已注册 [npm](https://www.npmjs.com/) 账号，并对作用域 `@gengjjjjj` 有发布权限

```bash
# 启用 pnpm（可选）
corepack enable

# 安装依赖
pnpm install

# 登录 npm（首次发布前必须）
npm login
# 确认当前账号
npm whoami
```

`.npmrc` 中已将 `@gengjjjjj` 指向 `https://registry.npmjs.org`，发布到官方源即可。

---

## 本地开发

```bash
# Playground
pnpm dev

# 文档站
pnpm dev:docs

# 分别构建
pnpm build:utils
pnpm build:composables
pnpm build:components

# 构建文档
pnpm build:docs
```

消费方安装示例：

```bash
pnpm add @gengjjjjj/component @gengjjjjj/utils @gengjjjjj/composables
```

更多用法见各包 `readme.md` 与文档站：  
https://gengjjjjj.github.io/mono-pack/

---

## 发布教程（推荐：Changesets）

本仓库已接入 [@changesets/cli](https://github.com/changesets/changesets)，根目录脚本：

| 脚本 | 实际命令 | 作用 |
|------|----------|------|
| `pnpm ca` | `changeset add` | 记录本次改动（生成 changeset 文件，**不改版本号**） |
| `pnpm cv` | `changeset version` | 根据 changeset **自动 bump 版本号**并写 changelog |
| `pnpm cp` | `changeset publish` | 构建并发布所有「版本高于 npm 上已发布版本」的包 |

### 要不要先手动改版本号？

**不需要。** 走 Changesets 时不要手改 `package.json` 的 `version`。

正确顺序是：

1. 改代码并提交功能/修复 commit  
2. `pnpm ca` —— 只声明「哪个包、major/minor/patch」  
3. `pnpm cv` —— **这时才自动更新版本号**  
4. 把版本号变更再 commit  
5. `pnpm cp` —— 发布到 npm  

若你事先手改了版本号，又跑 `cv`，容易和 Changesets 状态不一致，不推荐。

### 版本类型怎么选？

| 类型 | 何时选 | 示例 |
|------|--------|------|
| **patch** | 修复缺陷、文档/内部优化，API 兼容 | `1.0.5` → `1.0.6` |
| **minor** | 新增能力，仍向后兼容 | `1.0.5` → `1.1.0` |
| **major** | 破坏性变更（改名、删 API、行为不兼容） | `1.0.5` → `2.0.0` |

### 完整发布流程（一次发多个包）

#### 1. 确保工作区干净、代码已测通

```bash
git status
pnpm build:utils
pnpm build:composables
pnpm build:components
pnpm dev   # 或在 playground 里点一遍关键路径
```

说明：

- `@gengjjjjj/utils`、`@gengjjjjj/composables` 配置了 `prepublishOnly` → `pnpm build`，发布时会再构建一次。  
- `@gengjjjjj/component` **没有** `prepublishOnly`，发布前请务必先执行 `pnpm build:components`。

#### 2. 添加 Changeset（声明要发哪些包）

```bash
pnpm ca
```

交互大致如下：

1. 用空格勾选要发布的包（可多选：`component` / `utils` / `composables`）  
2. 选择 bump 类型：`major` / `minor` / `patch`  
3. 填写一句变更说明（会进 changelog）

完成后会在 `.changeset/` 下生成一个 markdown 文件（例如 `.changeset/fuzzy-cats-sing.md`）。  
**此时各包 `version` 尚未变化。**

把该文件一并提交：

```bash
git add .changeset
git commit -m "chore: add changeset"
```

#### 3. 应用版本号（自动 bump）

```bash
pnpm cv
```

Changesets 会：

- 按你的选择更新对应包的 `package.json` → `version`  
- 生成/更新各包 `CHANGELOG.md`（若启用）  
- 删除已消费的 `.changeset/*.md`  
- 若 `composables` 依赖 `utils` 且 `utils` 升了版，会按配置 `updateInternalDependencies: "patch"` 处理内部依赖版本提示

然后提交版本变更：

```bash
git add .
git commit -m "chore: version packages"
```

可选打 tag / 推远程：

```bash
git push
# 如需 tag，可按各包版本自行打，例如：
# git tag @gengjjjjj/utils@1.1.2
# git push --tags
```

配置里 `baseBranch` 为 `dev`，请在对应分支上完成上述流程。

#### 4. 发布到 npm

```bash
# 确认已登录
npm whoami

# 发布所有待发布包
pnpm cp
```

`changeset publish` 会检查本地版本是否高于 registry，只发布需要发布的包。

发布成功后可在 npm 上核对：

- https://www.npmjs.com/package/@gengjjjjj/component  
- https://www.npmjs.com/package/@gengjjjjj/utils  
- https://www.npmjs.com/package/@gengjjjjj/composables  

---

### 只发布某一个包

仍建议用 Changesets，只是在 `pnpm ca` 时**只勾选那一个包**，再 `cv` → commit → `cp`。

根目录还有：

```bash
pnpm publish:components
pnpm publish:utils
pnpm publish:composables
```

它们本质是 `changeset publish` 的包装。更稳妥、语义清晰的做法是统一走：

```bash
pnpm ca   # 只选一个包
pnpm cv
git add . && git commit -m "chore: version xxx"
pnpm cp
```

若 Changesets 状态已就绪、只想用 pnpm 发单个包，也可以：

```bash
pnpm build:utils
pnpm --filter @gengjjjjj/utils publish --access public
```

注意：`composables` 依赖 `utils`。若本次 `utils` 也有行为变更，应**先发 utils，再发 composables**（或同一次 `cp` 一起发，Changesets 会按依赖关系处理）。

---

### 推荐清单（复制用）

```bash
# 0. 登录（首次）
npm login && npm whoami

# 1. 开发完成并自测
pnpm build:utils
pnpm build:composables
pnpm build:components

# 2. 记录变更（不改版本号）
pnpm ca
git add .changeset && git commit -m "chore: add changeset"

# 3. 自动 bump 版本号
pnpm cv
git add . && git commit -m "chore: version packages"
git push

# 4. 发布
pnpm cp
```

---

## 备选：bumpp（不推荐与 Changesets 混用）

仓库另有 `bumpp` 配置与 `scripts/release.ts`，用于**交互式统一改版本号**。

```bash
pnpm release   # 实际执行 bumpp
```

`bump.config.ts` 会匹配根目录与 `packages/*/package.json`。

**注意：**

- Changesets 与 bumpp 是两套版本策略，**同一次发布不要混用**。  
- 本仓库日常发布以 **Changesets（`ca` → `cv` → `cp`）为准**。  
- bumpp 更适合「全仓统一一个版本号」的模式；当前三个包版本彼此独立（如 `component@1.0.5`、`utils@1.1.1`），更适合 Changesets。

---

## 发布前检查清单

- [ ] 已 `npm login`，且对 `@gengjjjjj/*` 有权限  
- [ ] 功能在 Playground / 文档中验证通过  
- [ ] `component` 已执行 `pnpm build:components`  
- [ ] 未手改版本号（交给 `pnpm cv`）  
- [ ] 已执行 `pnpm ca` 并提交 `.changeset` 文件  
- [ ] 已执行 `pnpm cv` 并提交版本与 changelog  
- [ ] 破坏性变更选了 `major`，并在说明里写清楚  
- [ ] 若改了 `utils`，评估是否要同步发 `composables`  
- [ ] `dist` 已被 `.gitignore` 忽略，不把构建产物当源码提交（发布靠 `prepublishOnly` / 本地 build）

---

## 常见问题

### 1. `pnpm cp` 提示没有可发布的包？

常见原因：

- 忘记 `pnpm cv`，本地 `version` 与 npm 上相同  
- 未登录或没有该 scope 权限  
- changeset 文件还在，但没跑 `cv`  

先看各包 `package.json` 的 `version` 是否已高于 npm。

### 2. 发布失败：`403 Forbidden`？

检查：

```bash
npm whoami
npm access list packages
```

确认账号能发布 `@gengjjjjj/*`，且 `.npmrc` registry 指向官方源。

### 3. 第一次发布某个 scoped 包？

`publishConfig.access` 已为 `public`。若仍报错，可显式：

```bash
pnpm --filter @gengjjjjj/utils publish --access public
```

### 4. `composables` 装上后找不到 `utils`？

`composables` 的 `dependencies` 含 `@gengjjjjj/utils`。发布后由 npm 安装依赖；请保证 `utils` 已发布到 registry，且版本满足约束。

### 5. 只改了文档，要发版吗？

一般不强制。若希望 changelog 留下记录，可对相关包打一个 `patch` changeset 再发。

---

## 相关链接

- 文档：https://gengjjjjj.github.io/mono-pack/  
- 仓库：https://gitee.com/gengJJJJJ/mono-pack  
- Changesets 文档：https://github.com/changesets/changesets  
