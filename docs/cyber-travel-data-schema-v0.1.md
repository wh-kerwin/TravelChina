# 赛博旅游 App V0.1 数据字段表

## 1. 目标

定义 V0.1 版本的最小可用数据结构，支持以下页面链路：

- 地图页 -> 城市页 -> 景点详情页

并为后续语音讲解、热点导览、内部漫游预留扩展字段。

## 2. 城市对象 `City`

```json
{
  "id": "string",
  "name": "string",
  "slug": "string",
  "region": "string",
  "mapPosition": {
    "x": 0,
    "y": 0
  },
  "heroImage": "string",
  "tagline": "string",
  "isAvailable": true,
  "sortOrder": 0,
  "spotIds": ["string"]
}
```

字段说明：

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| id | string | 是 | 城市唯一 ID，例如 `beijing` |
| name | string | 是 | 城市名称 |
| slug | string | 是 | URL 或路由标识 |
| region | string | 否 | 大区，例如华北、华东 |
| mapPosition.x | number | 是 | 地图点击点 X 坐标 |
| mapPosition.y | number | 是 | 地图点击点 Y 坐标 |
| heroImage | string | 是 | 城市头图地址 |
| tagline | string | 是 | 城市一句话标签 |
| isAvailable | boolean | 是 | 是否开放 |
| sortOrder | number | 是 | 城市排序 |
| spotIds | string[] | 是 | 城市下景点 ID 列表 |

## 3. 景点对象 `Spot`

```json
{
  "id": "string",
  "cityId": "string",
  "name": "string",
  "slug": "string",
  "coverImage": "string",
  "summary": "string",
  "tags": ["string"],
  "hasModel3D": false,
  "model3D": {
    "fileUrl": "string",
    "posterImage": "string",
    "initialRotation": { "x": 0, "y": 0, "z": 0 },
    "initialZoom": 1,
    "minZoom": 0.8,
    "maxZoom": 2
  },
  "contentStatus": "todo",
  "priority": "P0",
  "sortOrder": 0
}
```

字段说明：

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| id | string | 是 | 景点唯一 ID |
| cityId | string | 是 | 所属城市 ID |
| name | string | 是 | 景点名称 |
| slug | string | 是 | 路由标识 |
| coverImage | string | 是 | 景点封面图 |
| summary | string | 是 | 80-120 字简介 |
| tags | string[] | 是 | 标签 |
| hasModel3D | boolean | 是 | 是否有 3D |
| model3D.fileUrl | string | 否 | 3D 文件地址（有 3D 时必填） |
| model3D.posterImage | string | 否 | 模型加载前预览图 |
| model3D.initialRotation | object | 否 | 初始旋转 |
| model3D.initialZoom | number | 否 | 初始缩放 |
| model3D.minZoom | number | 否 | 最小缩放 |
| model3D.maxZoom | number | 否 | 最大缩放 |
| contentStatus | enum | 是 | `todo/in_progress/review/done/blocked` |
| priority | enum | 是 | `P0/P1/P2` |
| sortOrder | number | 是 | 景点排序 |

## 4. 用户收藏对象 `Favorite`（可选）

```json
{
  "userId": "string",
  "spotIds": ["string"],
  "updatedAt": "2026-05-15T00:00:00Z"
}
```

说明：

- V0.1 可以不落库，先本地存储
- V0.5 再接服务端

## 5. 浏览记录对象 `RecentVisit`（可选）

```json
{
  "userId": "string",
  "items": [
    {
      "spotId": "string",
      "visitedAt": "2026-05-15T00:00:00Z"
    }
  ]
}
```

说明：

- 建议只保留最近 20 条

## 6. 推荐目录结构

```text
data/
  cities.json
  spots.json
assets/
  city/
  spot/
  model3d/
```

## 7. 示例数据（V0.1）

### 7.1 城市示例

```json
{
  "id": "beijing",
  "name": "北京",
  "slug": "beijing",
  "region": "华北",
  "mapPosition": { "x": 420, "y": 210 },
  "heroImage": "/assets/city/beijing_hero.png",
  "tagline": "古都中轴，千年气象",
  "isAvailable": true,
  "sortOrder": 1,
  "spotIds": ["bj_gugong", "bj_tiananmen", "bj_tiantan"]
}
```

### 7.2 景点示例

```json
{
  "id": "bj_gugong",
  "cityId": "beijing",
  "name": "故宫",
  "slug": "gugong",
  "coverImage": "/assets/spot/bj_gugong_cover_v1.png",
  "summary": "明清两代皇家宫殿建筑群，展现中轴对称与古代宫廷建筑美学。",
  "tags": ["历史", "古建", "文化"],
  "hasModel3D": true,
  "model3D": {
    "fileUrl": "/assets/model3d/bj_bj_gugong_model_v1.glb",
    "posterImage": "/assets/spot/bj_gugong_model_poster_v1.png",
    "initialRotation": { "x": 0, "y": 15, "z": 0 },
    "initialZoom": 1,
    "minZoom": 0.8,
    "maxZoom": 2
  },
  "contentStatus": "done",
  "priority": "P0",
  "sortOrder": 1
}
```

## 8. 后续扩展字段预留

建议预留但 V0.1 不启用：

- `audioGuideUrl`：语音讲解音频
- `hotspots`：热点讲解点位
- `insideScenes`：内部漫游场景
- `recommendedSpotIds`：关联推荐

这样能保证后续升级不需要重构主数据模型。
