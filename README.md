# 我们的故事 - H5 时间线使用说明

这是一个用于展示恋爱时间线的H5页面项目。

## 项目结构

```
love-timeline/
├── css/
│   └── style.css       # 页面样式文件
├── data/
│   └── timeline.json   # 时间线数据和配置
├── images/             # 存放时间线事件相关图片
├── js/
│   └── script.js       # 页面交互和逻辑脚本
└── index.html          # H5页面主文件
```

## 如何自定义

1.  **修改基本信息和时间线事件**:
    *   打开 `data/timeline.json` 文件。
    *   **配置 (`config`)**: 
        *   `startDate`: 修改为您们在一起的日期 (格式: YYYY-MM-DD)。
        *   `partnerName`: 修改为您女朋友的名字或昵称。
        *   `pageTitle`: 修改为您想在浏览器标签页显示的标题。
        *   `counterTextBefore`: 修改在一起之前显示的文字。
        *   `counterTextAfter`: 修改在一起之后显示的文字。
    *   **时间线 (`timeline`)**: 这是一个包含多个事件对象的数组。
        *   每个事件对象包含:
            *   `date`: 事件发生的日期 (格式: YYYY-MM-DD)。
            *   `title`: 事件的标题。
            *   `description`: 事件的描述文字。
            *   `image`: 事件相关的图片路径 (相对于`index.html`，例如 `images/your_image.jpg`)。请将您的图片放入 `images` 文件夹，并在此处填写正确的路径。如果不需要图片，可以将值设为 `null` 或空字符串 `""`。
            *   `interaction`: 交互设置 (如果不需要交互，设为 `null`)。
                *   `type`: 交互类型，目前支持 `memory` (回忆) 和 `choice` (选择)。
                *   `prompt`: 显示给用户的交互提示文字。
                *   `feedback` (用于 `memory` 类型): 包含 `default` 字段，显示点击按钮后的反馈文字。
                *   `options` (用于 `choice` 类型): 一个包含多个选项对象的数组，每个对象包含 `text` (按钮文字) 和 `response` (点击按钮后显示的反馈文字)。
    *   **注意**: JSON 文件不支持注释，请确保移除所有 `//` 样式的注释。

2.  **添加图片**:
    *   将您想要在时间线中展示的图片放入 `images` 文件夹。
    *   在 `data/timeline.json` 中对应事件的 `image` 字段填写正确的图片路径 (例如: `images/first_date.png`)。

3.  **修改样式 (可选)**:
    *   您可以修改 `css/style.css` 文件来调整页面的颜色、字体、布局等视觉效果。

## 如何预览和部署

*   **本地预览**: 由于浏览器安全限制，直接打开 `index.html` 可能无法加载 `timeline.json` 数据。您需要在一个本地服务器环境中预览。最简单的方式是在 `love-timeline` 目录下打开终端或命令行，运行 `python3 -m http.server` (如果安装了 Python 3)，然后在浏览器中访问 `http://localhost:8000`。
*   **部署**: 这是一个纯静态的H5项目，您可以将 `love-timeline` 文件夹内的所有文件上传到任何支持静态网站托管的平台，例如 GitHub Pages, Netlify, Vercel, 或您自己的服务器。

祝您使用愉快！
