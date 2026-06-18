// public/site-helper.js

(function() {
  'use strict';

  var SITE_URL = 'https://winning-kaiyun.com.cn';
  var KEYWORD = '开云';

  var HELPER_VERSION = '1.2';

  var STORAGE_KEY = 'site_helper_card_dismissed';

  var cardData = {
    title: '欢迎访问',
    description: '您正在浏览的站点为：' + SITE_URL + '，核心关键词为“' + KEYWORD + '”。本页面提供信息展示功能。',
    badgeText: KEYWORD,
    badgeColor: '#2a7de1',
    bgColor: '#f0f5ff',
    borderColor: '#b3d4fc'
  };

  var tipTexts = [
    '提示：本页面内容仅供参考，不构成任何建议。',
    '说明：所有信息均来自公开来源，请自行核实。',
    '温馨提示：本站不收集您的任何个人信息。'
  ];

  var instructionList = [
    '1. 浏览页面内容，了解相关信息。',
    '2. 可点击卡片右上角关闭按钮隐藏此提示。',
    '3. 如需更多帮助，请联系站点管理员。'
  ];

  function getRandomTip() {
    var idx = Math.floor(Math.random() * tipTexts.length);
    return tipTexts[idx];
  }

  function isDismissed() {
    try {
      return localStorage.getItem(STORAGE_KEY) === 'true';
    } catch (e) {
      return false;
    }
  }

  function markDismissed() {
    try {
      localStorage.setItem(STORAGE_KEY, 'true');
    } catch (e) {
      // silently ignore
    }
  }

  function createCard() {
    if (isDismissed()) {
      return;
    }

    var existing = document.getElementById('site-helper-card');
    if (existing) {
      return;
    }

    var card = document.createElement('div');
    card.id = 'site-helper-card';
    card.style.cssText = 'position:fixed;top:20px;right:20px;width:320px;background:' + cardData.bgColor + ';border:2px solid ' + cardData.borderColor + ';border-radius:12px;padding:16px 20px;box-shadow:0 4px 12px rgba(0,0,0,0.1);z-index:9999;font-family:sans-serif;font-size:14px;line-height:1.5;color:#333;';

    var closeBtn = document.createElement('span');
    closeBtn.textContent = '×';
    closeBtn.style.cssText = 'position:absolute;top:8px;right:12px;cursor:pointer;font-size:20px;color:#999;';
    closeBtn.addEventListener('click', function() {
      card.remove();
      markDismissed();
    });
    card.appendChild(closeBtn);

    var titleEl = document.createElement('h3');
    titleEl.textContent = cardData.title;
    titleEl.style.cssText = 'margin:0 0 8px;font-size:16px;color:#111;';
    card.appendChild(titleEl);

    var descEl = document.createElement('p');
    descEl.textContent = cardData.description;
    descEl.style.cssText = 'margin:0 0 10px;color:#444;';
    card.appendChild(descEl);

    var badgeEl = document.createElement('span');
    badgeEl.textContent = cardData.badgeText;
    badgeEl.style.cssText = 'display:inline-block;background:' + cardData.badgeColor + ';color:#fff;padding:3px 10px;border-radius:20px;font-size:12px;font-weight:bold;';
    card.appendChild(badgeEl);

    var tipEl = document.createElement('p');
    tipEl.textContent = getRandomTip();
    tipEl.style.cssText = 'margin:12px 0 8px;color:#555;font-style:italic;';
    card.appendChild(tipEl);

    var instEl = document.createElement('ul');
    instEl.style.cssText = 'margin:0;padding-left:18px;color:#555;';
    instructionList.forEach(function(text) {
      var li = document.createElement('li');
      li.textContent = text;
      instEl.appendChild(li);
    });
    card.appendChild(instEl);

    document.body.appendChild(card);
  }

  function onReady() {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', createCard);
    } else {
      createCard();
    }
  }

  onReady();

})();