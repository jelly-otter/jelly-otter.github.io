document.addEventListener("DOMContentLoaded", () => {
    const passwordScreen = document.getElementById("password-screen");
    const passwordContainer = document.querySelector(".password-container");
    const passwordTitle = document.querySelector(".password-title");
    const dots = document.querySelectorAll(".dot");
    const keys = document.querySelectorAll(".key");
    const container = document.querySelector(".container");
    let config = null;
    let enteredPassword = "";

    // 添加 CDN 基础路径
    const CDN_BASE = 'https://cdn.jsdelivr.net/gh/MoLeft/JianyeWangAndJiaxinChen@main';

    // 处理图片路径的函数
    const getCDNImagePath = (path) => {
        if (!path) return null;
        // 移除开头的斜杠（如果有）
        const cleanPath = path.startsWith('/') ? path.substring(1) : path;
        // 确保路径不以斜杠结尾
        const finalPath = cleanPath.endsWith('/') ? cleanPath.slice(0, -1) : cleanPath;
        // 直接拼接，不需要额外的斜杠
        return CDN_BASE + '/' + finalPath;
    };

    // 检查是否在有效期内
    const checkPasswordExpiry = () => {
        const lastLogin = localStorage.getItem('lastLogin');
        if (lastLogin) {
            const now = new Date().getTime();
            const expiryTime = 30 * 60 * 1000; // 30分钟
            if (now - parseInt(lastLogin) < expiryTime) {
                // 在有效期内，直接显示内容
                passwordScreen.style.display = "none";
                container.style.display = "block";
                return true;
            }
        }
        return false;
    };

    // 禁止页面滚动
    document.body.style.overflow = 'hidden';
    document.documentElement.style.overflow = 'hidden';

    // 获取配置
    fetch("data/timeline.json")
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP错误! 状态码: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            config = data.config;
            
            // 如果密码有效，直接显示内容并恢复滚动
            if (checkPasswordExpiry()) {
                document.body.style.overflow = '';
                document.documentElement.style.overflow = '';
                return;
            }

            // 密码输入处理
            keys.forEach(key => {
                key.addEventListener("click", () => {
                    const value = key.dataset.value;
                    if (value === undefined) return; // 跳过空按钮

                    if (value === "delete") {
                        if (enteredPassword.length > 0) {
                            // 添加删除按钮的点击效果
                            key.classList.add("active");
                            setTimeout(() => key.classList.remove("active"), 200);
                            
                            // 先删除最后一个字符
                            enteredPassword = enteredPassword.slice(0, -1);
                            // 然后更新点的显示状态
                            dots.forEach((dot, index) => {
                                if (index < enteredPassword.length) {
                                    dot.classList.add("filled");
                                } else {
                                    dot.classList.remove("filled");
                                }
                            });
                        }
                    } else if (enteredPassword.length < 6) {
                        enteredPassword += value;
                        dots[enteredPassword.length - 1].classList.add("filled");

                        if (enteredPassword.length === 6) {
                            // 等待500毫秒后验证密码
                            setTimeout(verifyPassword, 200);
                        }
                    }
                });
            });

            // 验证密码
            function verifyPassword() {
                if (enteredPassword === config.password) {
                    // 密码正确，显示内容并恢复滚动
                    passwordScreen.style.display = "none";
                    container.style.display = "block";
                    document.body.style.overflow = '';
                    document.documentElement.style.overflow = '';
                    
                    // 记录登录时间
                    localStorage.setItem('lastLogin', new Date().getTime().toString());
                } else {
                    // 密码错误，清空输入并显示错误信息
                    enteredPassword = "";
                    dots.forEach(dot => dot.classList.remove("filled"));
                    passwordTitle.textContent = "密码错误";
                    passwordContainer.classList.add("error");
                    
                    // 2秒后恢复正常状态
                    setTimeout(() => {
                        passwordTitle.textContent = "请输入密码";
                        passwordContainer.classList.remove("error");
                    }, 1500);
                }
            }
        })
        .catch(error => {
            console.error("获取配置时出错:", error);
            passwordScreen.innerHTML = 
                '<p style="color: red;">无法加载配置。请检查 `data/timeline.json` 文件是否存在且格式正确。</p>';
        });

    const counterSection = document.querySelector(".counter-section"); // 获取计数器区域元素
    const counterTextElement = document.getElementById("counter-text");
    const counterDaysElement = document.getElementById("counter-days");
    const startDateElement = document.getElementById("start-date");
    const timelineSection = document.getElementById("timeline-section");
    const pageTitleElement = document.querySelector("title");
    const modal = document.getElementById("response-modal");
    const modalBody = document.getElementById("modal-body");
    const closeButton = document.querySelector(".close-button");
    const timeCounter = document.getElementById("time-counter");

    let timeCounterInterval;

    function updateTimeCounter(startDateTime) {
        const now = new Date();
        const diff = now - startDateTime;

        const years = Math.floor(diff / (1000 * 60 * 60 * 24 * 365.25));
        const months = Math.floor((diff % (1000 * 60 * 60 * 24 * 365.25)) / (1000 * 60 * 60 * 24 * 30.44));
        const days = Math.floor((diff % (1000 * 60 * 60 * 24 * 30.44)) / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);

        const timeUnits = timeCounter.querySelectorAll('.time-unit');
        timeUnits[0].textContent = years.toString().padStart(2, '0');
        timeUnits[1].textContent = months.toString().padStart(2, '0');
        timeUnits[2].textContent = days.toString().padStart(2, '0');
        timeUnits[3].textContent = hours.toString().padStart(2, '0');
        timeUnits[4].textContent = minutes.toString().padStart(2, '0');
        timeUnits[5].textContent = seconds.toString().padStart(2, '0');
    }

    fetch("data/timeline.json")
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP错误! 状态码: ${response.status}`);
            }
            // 确保响应被当作JSON处理
            return response.json(); 
        })
        .then(data => {
            const config = data.config;
            const timelineEvents = data.timeline;

            // --- 应用计数器背景设置 --- 
            if (config.counterBackground && counterSection) {
                const bgConfig = config.counterBackground;
                // 使用 CDN 路径处理背景图片
                const imageUrl = bgConfig.image ? `url('${getCDNImagePath(bgConfig.image)}')` : 'none'; 
                const blurAmount = bgConfig.blur || '0px';
                const opacityValue = bgConfig.opacity !== undefined ? bgConfig.opacity : 1;
                const overlayColor = bgConfig.colorOverlay || 'transparent';

                counterSection.style.setProperty('--bg-image', imageUrl);
                counterSection.style.setProperty('--bg-blur', blurAmount);
                counterSection.style.setProperty('--bg-opacity', opacityValue);
                counterSection.style.setProperty('--bg-overlay', overlayColor);
            }

            // --- 根据JSON配置更新计数器 --- 
            pageTitleElement.textContent = config.pageTitle || "我们的故事";
            const startDateTime = new Date(config.startDate + "T" + (config.startTime || "00:00:00"));
            const today = new Date();
            today.setHours(0, 0, 0, 0);

            const timeDiff = today.getTime() - startDateTime.getTime();
            const dayDiff = Math.abs(Math.floor(timeDiff / (1000 * 60 * 60 * 24)));

            let textToShow = "";
            let daysToShow = 0;

            if (timeDiff < 0) {
                textToShow = config.counterTextBefore || `距离和${config.partnerName}在一起还有`;
                daysToShow = dayDiff;
            } else {
                textToShow = config.counterTextAfter || `和${config.partnerName}在一起已经`;
                const oneDay = 24 * 60 * 60 * 1000;
                // 计算已过天数，确保同一天或之后至少为1天
                daysToShow = Math.max(1, Math.floor((today - startDateTime) / oneDay) + 1);
            }

            const options = { year: "numeric", month: "long", day: "numeric", weekday: "long" };
            const formattedStartDate = startDateTime.toLocaleDateString("zh-CN", options);

            counterTextElement.textContent = textToShow;
            startDateElement.textContent = `起始日: ${formattedStartDate}`;
            animateCounter(counterDaysElement, daysToShow);

            // 启动时间计数器
            updateTimeCounter(startDateTime);
            clearInterval(timeCounterInterval);
            timeCounterInterval = setInterval(() => updateTimeCounter(startDateTime), 1000);

            // --- 填充时间线（倒序）--- 
            // 确保timelineEvents是数组再进行排序
            if (Array.isArray(timelineEvents)) {
                // 首先分离置顶和非置顶的事件
                const pinnedEvents = timelineEvents.filter(event => event.top === true);
                const unpinnedEvents = timelineEvents.filter(event => !event.top);
                
                // 对非置顶事件按日期排序（最新的在前）
                unpinnedEvents.sort((a, b) => new Date(b.date) - new Date(a.date));
                
                // 合并数组，置顶事件在前
                const sortedEvents = [...pinnedEvents, ...unpinnedEvents];
                
                timelineSection.innerHTML = ''; // 清除之前的时间线项目
                sortedEvents.forEach(event => {
                    // 处理事件中的图片路径
                    if (event.image) {
                        event.image = getCDNImagePath(event.image);
                    }
                    // 处理交互选项中的图片路径
                    if (event.interaction && event.interaction.options) {
                        event.interaction.options.forEach(option => {
                            if (option.content && option.format === 'markdown') {
                                // 处理 Markdown 内容中的图片路径
                                option.content = option.content.replace(/!\[.*?\]\((.*?)\)/g, (match, path) => {
                                    return match.replace(path, getCDNImagePath(path));
                                });
                            }
                        });
                    }
                    const item = createTimelineItem(event);
                    timelineSection.appendChild(item);
                });
            } else {
                console.error("时间线数据不是数组:", timelineEvents);
                timelineSection.innerHTML = '<p style="color: red;">时间线数据格式错误。</p>';
            }
        })
        .catch(error => {
            console.error("获取或处理时间线数据时出错:", error);
            timelineSection.innerHTML = 
                '<p style="color: red;">无法加载时间线数据。请检查 `data/timeline.json` 文件是否存在且格式正确。</p>';
        });

    // --- 模态框事件监听器 --- 
    if (closeButton) {
        closeButton.onclick = function() {
            closeModal();
        }
    }
    window.onclick = function(event) {
        if (event.target == modal) {
            closeModal();
        }
    }
});

function animateCounter(element, targetValue) {
    let currentValue = 0;
    const duration = 1500;
    const stepTime = Math.max(10, targetValue > 0 ? duration / targetValue : duration);
    // 确保增量至少为1
    const increment = Math.max(1, targetValue > 0 ? Math.ceil(targetValue / (duration / stepTime)) : 0);

    element.textContent = 0;

    if (targetValue <= 0) {
        element.textContent = targetValue; // 如果目标值小于等于0，立即设置最终值
        return;
    }

    const timer = setInterval(() => {
        currentValue += increment;
        if (currentValue >= targetValue) {
            currentValue = targetValue;
            clearInterval(timer);
        }
        element.textContent = currentValue;
        // 可选的动画效果
        element.style.transform = "scale(1.05)";
        setTimeout(() => {
            element.style.transform = "scale(1)";
        }, stepTime / 2);
    }, stepTime);
}

function createTimelineItem(eventData) {
    const itemDiv = document.createElement("div");
    itemDiv.classList.add("timeline-item");
    
    // 如果是置顶项目，添加pinned类
    if (eventData.top) {
        itemDiv.classList.add("pinned");
    }

    const dateOptions = { year: "numeric", month: "long", day: "numeric" };
    // 添加无效日期的错误处理
    let eventDateStr = "无效日期";
    let daysDiff = 0;
    try {
        const eventDate = new Date(eventData.date + "T00:00:00");
        if (!isNaN(eventDate)) {
            // 格式化日期为 yyddMMss 形式
            const year = eventDate.getFullYear();
            const month = String(eventDate.getMonth() + 1).padStart(2, '0');
            const day = String(eventDate.getDate()).padStart(2, '0');
            eventDateStr = `${year}年${month}月${day}日`;
            
            // 计算距离今天的天数
            const today = new Date();
            today.setHours(0, 0, 0, 0);
            const timeDiff = today.getTime() - eventDate.getTime();
            daysDiff = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
        }
    } catch (e) {
        console.error("时间线事件中的日期格式无效:", eventData.date);
    }

    let contentHTML = `
        <div class="timeline-date">${eventDateStr}</div>
        <h3>${eventData.title || ''}</h3>
        <p>${eventData.description || ''}</p>
    `;

    if (eventData.image) {
        contentHTML += `<img src="${eventData.image}" alt="${eventData.title || '时间线图片'}" style="max-width: 100%; border-radius: 8px; margin-top: 12px;" onerror="this.style.display='none'; console.warn('图片未找到: ${eventData.image}')">`;
    }

    // 只有当 interaction 存在时才添加交互部分
    if (eventData.interaction) {
        contentHTML += `<div class="interaction-section">
            <p class="interaction-prompt"><strong>${eventData.interaction.prompt || ''}</strong></p>
            <div class="interaction-buttons">
        `;

        if (eventData.interaction.type === "memory" && eventData.interaction.feedback) {
            const feedbackId = `feedback-${eventData.date.replace(/\W/g, '-')}-${Math.random().toString(36).substring(2, 7)}`;
            contentHTML += `<button class="interaction-button" onclick="showFeedback('${feedbackId}')">${eventData.interaction.feedback.title || '回忆一下'} <span class="days-ago">(${daysDiff}天前)</span></button>`;
            contentHTML += `<div id="${feedbackId}" class="feedback-content" style="display: none;">${eventData.interaction.feedback.default || ''}</div>`;
        } else if (eventData.interaction.type === "choice" && Array.isArray(eventData.interaction.options)) {
            eventData.interaction.options.forEach((option) => {
                if (option && option.title) {
                    // 转义内容以用于onclick属性字符串
                    const escapedContent = escapeForJsStringLiteral(option.content || '');
                    contentHTML += `<button class="interaction-button" onclick="openModal('${escapedContent}', '${option.format || 'markdown'}')">${option.title} <span class="days-ago">(${daysDiff}天前)</span></button>`;
                }
            });
        }
        contentHTML += `</div></div>`;
    }

    itemDiv.innerHTML = contentHTML;
    return itemDiv;
}

// --- 交互处理函数 --- 
function showFeedback(elementId) {
    const feedbackElement = document.getElementById(elementId);
    if (feedbackElement) {
        feedbackElement.style.display = feedbackElement.style.display === "none" ? "block" : "none"; // 切换显示状态
    }
}

// --- 模态框函数 --- 
function openModal(content, format = 'markdown') {
    const modal = document.getElementById("response-modal");
    const modalBody = document.getElementById("modal-body");
    if (!modal || !modalBody) {
        console.error("未找到模态框元素!");
        return;
    }
    try {
        if (format === 'markdown' && typeof marked !== 'undefined') {
            const rawHtml = marked.parse(content);
            // 基本清理（移除script标签）- 生产环境建议使用DOMPurify等专业库
            const sanitizedHtml = rawHtml.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');
            modalBody.innerHTML = sanitizedHtml;
        } else if (format === 'html') {
            // For HTML content, we still want to sanitize it
            const sanitizedHtml = content.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');
            modalBody.innerHTML = sanitizedHtml;
        } else {
            console.warn("Unsupported format or marked.js not loaded. Displaying raw text.");
            modalBody.textContent = content; // Fallback to plain text
        }
    } catch (e) {
        console.error("Error processing modal content:", e);
        modalBody.textContent = content;
    }
    modal.style.display = "block";
}

function closeModal() {
    const modal = document.getElementById("response-modal");
    const modalBody = document.getElementById("modal-body");
    if (modal) {
        modal.style.display = "none";
    }
    if (modalBody) {
        modalBody.innerHTML = ''; // Clear content when closing
    }
}

// --- Helper Functions for String Literals --- 

// Escapes characters for use within a single-quoted JavaScript string literal (e.g., in onclick='...')
// User provided fix:
function escapeForJsStringLiteral(str) {
    if (typeof str !== 'string') return '';
    return str.replace(/\\/g, '\\\\') // 1. Escape backslash FIRST
              .replace(/'/g, "\\'")  // 2. Escape single quote
              .replace(/\n/g, '\\n') // 3. Escape newline
              .replace(/\r/g, '\\r') // 4. Escape carriage return
              .replace(/\t/g, '\\t'); // 5. Escape tab
}

// Unescapes characters previously escaped by escapeForJsStringLiteral
function unescapeFromJsStringLiteral(str) {
    if (typeof str !== 'string') return '';
    // Order matters: unescape literal representations first, then quote, then backslash
    return str.replace(/\\t/g, '\t')
              .replace(/\\r/g, '\r')
              .replace(/\\n/g, '\n')
              .replace(/\\'/g, "'")
              .replace(/\\\\/g, '\\'); // Unescape backslash
}

