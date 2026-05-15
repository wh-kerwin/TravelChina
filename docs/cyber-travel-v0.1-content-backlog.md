# 赛博旅游 App V0.1 内容清单

## 1. 版本范围

- 版本：V0.1 MVP
- 城市数：3
- 景点数：9（每城 3 个）
- 3D 景点目标：3-5 个

## 2. 城市与景点清单

## 2.1 北京

| ID | 景点名称 | 优先级 | 3D 优先级 | 状态 |
| --- | --- | --- | --- | --- |
| bj_gugong | 故宫 | P0 | 高 | 待制作 |
| bj_tiananmen | 天安门 | P0 | 中 | 待制作 |
| bj_tiantan | 天坛 | P1 | 低 | 待制作 |

## 2.2 上海

| ID | 景点名称 | 优先级 | 3D 优先级 | 状态 |
| --- | --- | --- | --- | --- |
| sh_dongfangmingzhu | 东方明珠 | P0 | 高 | 待制作 |
| sh_waitan | 外滩 | P0 | 中 | 待制作 |
| sh_yuyuan | 豫园 | P1 | 低 | 待制作 |

## 2.3 西安

| ID | 景点名称 | 优先级 | 3D 优先级 | 状态 |
| --- | --- | --- | --- | --- |
| xa_bingmayong | 兵马俑 | P0 | 高 | 待制作 |
| xa_dayanta | 大雁塔 | P1 | 中 | 待制作 |
| xa_zhonglou | 钟楼 | P1 | 低 | 待制作 |

## 3. 首批 3D 制作建议名单

建议先做以下 4 个：

1. 故宫（`bj_gugong`）
2. 东方明珠（`sh_dongfangmingzhu`）
3. 兵马俑（`xa_bingmayong`）
4. 天安门（`bj_tiananmen`）

说明：

- 这 4 个景点识别度高，首版展示价值最大
- 外观特征强，适合先做低模验证
- 能覆盖古建、现代地标、历史遗址三类内容

## 4. 每个景点必须交付的内容资产

每个景点都要有：

- 卡通封面图（必需）
- 简介文案（必需）
- 标签（必需，如历史、建筑、文化）

仅 3D 名单需要：

- 3D 低模文件
- 贴图文件
- 模型预览图
- 交互参数（初始角度、缩放范围）

## 5. 内容制作状态字段

建议统一以下状态值：

- `todo`：待开始
- `in_progress`：制作中
- `review`：待审核
- `done`：已完成
- `blocked`：阻塞

## 6. 资产命名规范

### 6.1 图片命名

`{cityId}_{spotId}_cover_v{n}.png`

示例：

- `bj_bj_gugong_cover_v1.png`
- `sh_sh_dongfangmingzhu_cover_v1.png`

### 6.2 3D 命名

`{cityId}_{spotId}_model_v{n}.glb`

示例：

- `bj_bj_gugong_model_v1.glb`
- `xa_xa_bingmayong_model_v1.glb`

## 7. V0.1 内容验收标准

- 9 个景点全部具备封面图和简介
- 至少 4 个景点具备可用 3D
- 景点命名、标签、简介字段完整
- 全部资源可通过 ID 正确加载
