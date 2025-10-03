# LoveDiary-Timeline 恋爱日记时间线

> **📢 项目来源说明**  
> 本项目 fork 自 [MoLeft/LoveDiary-Timeline](https://github.com/MoLeft/LoveDiary-Timeline)，基于原项目进行个人定制和修改。  
> 感谢原作者 [@MoLeft](https://github.com/MoLeft) 的开源贡献！🙏

这是一个用于记录和展示恋爱日记的响应式时间线网站。网站包含密码保护、时间线展示、互动功能、自适应暗色模式等特性。

TIPS：原项目是一个完全由 [**Cursor**](https://www.cursor.com/) 开发的项目

## 功能特点

- 🔒 密码保护功能
- 📅 恋爱计时器（精确到秒）
- 📝 时间线展示
- 🖼️ 图片懒加载
- 💝 互动功能（回忆和选择）
- 📱 响应式设计
- 🌙 支持暗色模式

## 项目结构

```
├── index.html         # 主页面
├── css/               # 样式文件
│   └── style.css      # 主样式文件
├── js/                # JavaScript文件
│   └── script.js      # 主脚本文件
├── data/              # 数据文件
│   └── timeline.json  # 时间线配置文件
├── images/            # 图片资源
└── fonts/             # 字体文件
```

## 配置说明

### timeline.json 配置模板

```json
{
  "config": {
    "pageTitle": "我们的故事",
    "password": "123456",
    "partnerName": "Ta的名字",
    "startDate": "2024-01-01",
    "startTime": "00:00:00",
    "counterTextBefore": "距离和Ta在一起还有",
    "counterTextAfter": "和Ta在一起已经",
    "counterBackground": {
      "image": "images/background.jpg",
      "blur": "5px",
      "opacity": 0.8,
      "colorOverlay": "rgba(0, 0, 0, 0.3)"
    }
  },
  "timeline": [
    {
      "date": "2024-01-01",
      "title": "我们的第一次相遇",
      "description": "这是一个特别的日子...",
      "image": "images/first-meet.jpg",
      "top": true,
      "interaction": {
        "type": "memory",
        "prompt": "还记得我们第一次见面时的场景吗？",
        "feedback": {
          "title": "点击查看回忆",
          "default": "那天的阳光很好..."
        }
      }
    },
    {
      "date": "2024-01-15",
      "title": "第一次约会",
      "description": "我们一起去看了电影...",
      "image": "images/first-date.jpg",
      "interaction": {
        "type": "choice",
        "prompt": "选择你想回忆的场景：",
        "options": [
          {
            "title": "电影院的场景",
            "content": "![电影院](images/cinema.jpg)\n\n那天的电影很好看...",
            "format": "markdown"
          },
          {
            "title": "晚餐的场景",
            "content": "![晚餐](images/dinner.jpg)\n\n我们去了那家餐厅...",
            "format": "markdown"
          }
        ]
      }
    }
  ]
}
```

### 配置项说明

#### config 配置项

- `pageTitle`: 网站标题
- `password`: 访问密码
- `partnerName`: 伴侣名字
- `startDate`: 恋爱开始日期（YYYY-MM-DD格式）
- `startTime`: 恋爱开始时间（HH:MM:SS格式）
- `counterTextBefore`: 倒计时文本
- `counterTextAfter`: 正计时文本
- `counterBackground`: 计数器背景配置
  - `image`: 背景图片路径
  - `blur`: 模糊程度
  - `opacity`: 透明度
  - `colorOverlay`: 颜色遮罩

#### timeline 配置项

每个时间线项目包含以下属性：

- `date`: 事件日期（YYYY-MM-DD格式）
- `title`: 事件标题
- `description`: 事件描述
- `image`: 事件图片路径
- `top`: 是否置顶（可选）
- `interaction`: 互动配置
  - `type`: 互动类型（"memory" 或 "choice"）
  - `prompt`: 互动提示文本
  - `feedback`: 回忆反馈（type为"memory"时使用）
  - `options`: 选择选项（type为"choice"时使用）

## 使用说明

1. 克隆项目到本地
2. 修改 `data/timeline.json` 配置文件
3. 将图片资源放入 `images` 目录
4. 使用 Web 服务器（如 Nginx、Apache）部署项目

## 注意事项

- 所有图片路径建议使用相对路径
- 图片建议进行适当压缩以提高加载速度
- 确保服务器支持 JSON 文件的 MIME 类型
- 建议使用 HTTPS 协议部署以保护数据安全

## 技术栈

- HTML5
- CSS3
- JavaScript (ES6+)
- Marked.js (用于 Markdown 渲染)

## 许可证

本项目采用 MIT License 开源许可证。

原项目和修改版本均遵循 MIT License，详见 [LICENSE](LICENSE) 文件。

## 致谢与声明

本项目完全基于 [MoLeft/LoveDiary-Timeline](https://github.com/MoLeft/LoveDiary-Timeline) 项目，在原项目的基础上进行个人定制和修改。

**原作者**: [@MoLeft](https://github.com/MoLeft)  
**原项目地址**: https://github.com/MoLeft/LoveDiary-Timeline  
**许可证**: MIT License

感谢原作者的精彩创意和无私分享！❤️
