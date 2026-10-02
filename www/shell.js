/* قشرة تطبيق «أولوية العناية» — تُحقَن داخل صفحات careksa.com (متجر سلة)
   عند فتحها من التطبيق فقط. تضيف: شريط تنقّل سفلي، ورقة أقسام، شارة السلة،
   شاشة انقطاع الاتصال، السحب للتحديث، المشاركة الأصلية، وفتح نافذة دخول سلة. */
(function () {
  'use strict';
  if (window.__careShell) return;
  try { if (window.top !== window.self) return; } catch (e) { return; }   // الإطار الرئيسي فقط
  window.__careShell = true;

  var BRAND = '#d4768f';   // وردي العلامة
  var CATS = [
    { t: 'المكياج', u: '/المكياج/c66485730', i: 'lips' },
    { t: 'الوجه', u: '/الوجه/c1556659871', i: 'face' },
    { t: 'العين', u: '/العين/c606354075', i: 'eye' },
    { t: 'الحواجب', u: '/الحواجب/c2038881005', i: 'brow' },
    { t: 'منتجات الترند', u: '/منتجات-الترند/c1230794814', i: 'spark' },
    { t: 'التخفيضات', u: '/offers', i: 'tag' }
  ];
  var TABS = [
    { id: 'home', t: 'الرئيسية', u: '/', m: /^\/$/ },
    { id: 'cats', t: 'الأقسام', sheet: true, m: /\/c\d|^\/offers/ },
    { id: 'cart', t: 'السلة', u: '/cart', m: /^\/cart/, badge: true },
    { id: 'fav', t: 'المفضلة', u: '/wishlist', m: /^\/wishlist/ },
    { id: 'me', t: 'حسابي', account: true, m: /^\/(profile|orders)/ }
  ];
  var ICONS = {
    home: '<path d="M3 10.6 12 3l9 7.6"/><path d="M5.5 9.4V20h13V9.4"/><path d="M9.8 20v-5.4h4.4V20"/>',
    cats: '<rect x="3" y="3" width="7.4" height="7.4" rx="2"/><rect x="13.6" y="3" width="7.4" height="7.4" rx="2"/><rect x="3" y="13.6" width="7.4" height="7.4" rx="2"/><rect x="13.6" y="13.6" width="7.4" height="7.4" rx="2"/>',
    cart: '<path d="M2.5 3h2.7l2.3 11.2h9.8l2.2-8.3H6"/><circle cx="9.5" cy="19.5" r="1.6"/><circle cx="17" cy="19.5" r="1.6"/>',
    fav: '<path d="M12 20.3 4.6 13a4.6 4.6 0 0 1 6.5-6.5l.9.9.9-.9A4.6 4.6 0 1 1 19.4 13z"/>',
    me: '<circle cx="12" cy="8" r="4"/><path d="M4.5 20.5a7.5 7.5 0 0 1 15 0"/>',
    lips: '<path d="M12 8.6c1.6-2 3.4-3 5-3 2 0 3.4 1.3 3.4 3 0 3.6-4 8.8-8.4 8.8S3.6 12.2 3.6 8.6c0-1.7 1.4-3 3.4-3 1.6 0 3.4 1 5 3z"/>',
    face: '<circle cx="12" cy="12" r="9"/><path d="M8.6 10h.01M15.4 10h.01"/><path d="M8.8 15a4.4 4.4 0 0 0 6.4 0"/>',
    eye: '<path d="M2.5 12S6 5.8 12 5.8 21.5 12 21.5 12 18 18.2 12 18.2 2.5 12 2.5 12z"/><circle cx="12" cy="12" r="3"/>',
    brow: '<path d="M3.6 12.4c2.4-3.6 5.6-5.4 9.6-5.4 2.8 0 5.2.8 7.2 2.4"/><path d="M5 15.6c2-2.4 4.4-3.6 7.2-3.6 2 0 3.8.5 5.4 1.5"/>',
    spark: '<path d="M12 2.8l2 5.4 5.4 2-5.4 2-2 5.4-2-5.4-5.4-2 5.4-2z"/><path d="M18.6 16.4l.8 2.2 2.2.8-2.2.8-.8 2.2-.8-2.2-2.2-.8 2.2-.8z"/>',
    tag: '<path d="M20.6 12.6 12.6 20.6a2 2 0 0 1-2.8 0l-6.4-6.4a2 2 0 0 1-.6-1.4V4.6a2 2 0 0 1 2-2h8.2a2 2 0 0 1 1.4.6l6.2 6.2a2 2 0 0 1 0 2.8z"/><circle cx="7.6" cy="7.6" r="1.4"/>',
    share: '<circle cx="18" cy="5.5" r="2.6"/><circle cx="6" cy="12" r="2.6"/><circle cx="18" cy="18.5" r="2.6"/><path d="M8.3 10.8 15.7 6.8M8.3 13.2l7.4 4"/>',
    wifi: '<path d="M2 8.8a15 15 0 0 1 20 0"/><path d="M5.5 12.6a10 10 0 0 1 13 0"/><path d="M9 16.3a5 5 0 0 1 6 0"/><circle cx="12" cy="20" r="1.1"/>',
    back: '<path d="M15 5l-7 7 7 7"/>',
    x: '<path d="M6 6l12 12M18 6 6 18"/>',
    hair: '<path d="M7 21c-1-5 0-9 1.5-12S12 3 12 3s2 3 3.5 6S18 16 17 21"/><path d="M10 21c-.4-3 .3-6 2-9 1.7 3 2.4 6 2 9"/>',
    drop: '<path d="M12 3.2s6 6.6 6 11a6 6 0 0 1-12 0c0-4.4 6-11 6-11z"/><path d="M9.4 14.6a2.8 2.8 0 0 0 2.8 2.8"/>',
    smoke: '<path d="M8 21h8"/><path d="M9.5 21l1-6h3l1 6"/><path d="M12 12c-2-1.6-2-3.4 0-5s2-3.4 0-5"/><path d="M15.4 11c-1.3-1-1.3-2.2 0-3.3"/>',
    gift: '<rect x="3.5" y="8" width="17" height="4" rx="1"/><path d="M5 12v8h14v-8M12 8v12"/><path d="M12 8S10.5 3.5 8 4.2 8.6 8 12 8zM12 8s1.5-4.5 4-3.8S15.4 8 12 8z"/>',
    grid: '<rect x="3.5" y="3.5" width="7" height="7" rx="2"/><rect x="13.5" y="3.5" width="7" height="7" rx="2"/><rect x="3.5" y="13.5" width="7" height="7" rx="2"/><rect x="13.5" y="13.5" width="7" height="7" rx="2"/>'
  };
  var svg = function (k, w) {
    return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="' + (w || 1.7) +
      '" stroke-linecap="round" stroke-linejoin="round">' + (ICONS[k] || '') + '</svg>';
  };

  /* ---------- الجسر الأصلي ---------- */
  var C = function () { return window.Capacitor; };
  var native = function () { var c = C(); return !!(c && c.isNativePlatform && c.isNativePlatform()); };
  var plug = function (n) { var c = C(); return (c && c.Plugins && c.Plugins[n]) || null; };
  var tap = function (style) {
    var H = plug('Haptics');
    if (H) { try { H.impact({ style: style || 'LIGHT' }); } catch (e) { /* تجاهل */ } }
  };

  /* ---------- التنسيق ---------- */
  function styles() {
    var css = [
      ':root{--care:' + BRAND + '}',
      'html.care-app{-webkit-tap-highlight-color:transparent}',
      /* الشريط السفلي عائم، فنترك له مساحة أكبر */
      'html.care-app body{padding-bottom:calc(76px + var(--care-sab, env(safe-area-inset-bottom, 0px)))!important}',
      /* المنطقة الآمنة أعلى الشاشة فقط — رأس سلة يبقى في سياق الصفحة */
      'html.care-app body{padding-top:var(--care-sat, env(safe-area-inset-top, 0px))!important;background:#fff}',
      /* الثيم يترك الرأس يمرّ مع الصفحة أول ~100px فيختفي للأعلى، ثم يضيف لـ#mainnav
         fixed-pinned animated فيصير .header-inner ثابتاً وينزل بحركة ويُفرغ <header> فتقفز الصفحة.
         في التطبيق نثبّت <header> نفسه (sticky) من البداية ونُبطل تثبيت الثيم وحركته. */
      'html.care-app header.store-header{position:sticky!important;top:var(--care-sat, env(safe-area-inset-top, 0px))!important;z-index:99992!important}',
      'html.care-app #mainnav,html.care-app #mainnav .header-inner{position:static!important;top:auto!important;',
      'animation:none!important;transform:none!important;transition:none!important}',
      /* في الرئيسية .app-inner عليها overflow-x:hidden فتصير حاوية تمرير ويبطل sticky؛
         clip يقصّ الفائض الأفقي بالمثل دون أن يُنشئ حاوية تمرير */
      'html.care-app .app-inner{overflow:visible!important;overflow-x:clip!important}',
      'html.care-app .header-inner.inner{box-shadow:0 2px 14px rgba(0,0,0,.08);opacity:1!important}',   // الثيم يجعله 0.95 فتظهر المنتجات خلفه
      /* وشريط أبيض ثابت يغطي ما ينزلق تحت شريط الحالة عند التمرير */
      '#caretop{position:fixed;top:0;inset-inline:0;z-index:99998;height:var(--care-sat, env(safe-area-inset-top, 0px));',
      'background:#fff;pointer-events:none}',
      /* الشريط السفلي: عائم بحواف مقوّسة */
      '#carebar{position:fixed;inset-inline:14px;bottom:calc(9px + var(--care-sab, env(safe-area-inset-bottom, 0px)));z-index:99990;',
      'display:flex;border-radius:22px;padding:5px 5px 6px;',
      /* تمويه خفيف: 26px+saturate كان يُثقل التمرير على الآيفون */
      'background:rgba(20,25,31,.80);backdrop-filter:blur(12px);',
      '-webkit-backdrop-filter:blur(12px);',
      'border:1px solid rgba(255,255,255,.14);',
      'box-shadow:0 8px 26px rgba(0,0,0,.24),0 1px 3px rgba(0,0,0,.14);',
      'direction:rtl;font-family:inherit}',
      '#carebar button{flex:1;background:none;border:0;padding:6px 2px 5px;display:flex;flex-direction:column;',
      'align-items:center;gap:2px;color:#c9d2d9;font-family:inherit;font-weight:600;font-size:9.5px;line-height:1.15;cursor:pointer;',
      'letter-spacing:-.1px;position:relative;border-radius:16px;transition:color .12s,background .12s;touch-action:manipulation}',
      '#carebar button svg{width:19px;height:19px;stroke-width:1.6;transition:transform .18s}',
      '#carebar button:active svg{transform:scale(.86)}',
      '#carebar button.on{color:var(--care);background:rgba(232,145,42,.20)}',
      '#carebar .bdg{position:absolute;top:2px;inset-inline-end:calc(50% - 17px);min-width:15px;height:15px;',
      'border-radius:8px;background:var(--care);color:#10140f;font:700 9px/15px system-ui;text-align:center;padding:0 3px}',
      /* شريط التحميل: يظهر فور الضغط على تبويب حتى تُفتح الصفحة الجديدة */
      '#careload{position:fixed;top:var(--care-sat, env(safe-area-inset-top, 0px));inset-inline:0;height:3px;z-index:99999;',
      'pointer-events:none;opacity:0;background:var(--care);transform-origin:right;transform:scaleX(0)}',
      '#careload.on{opacity:1;animation:careld 2.4s cubic-bezier(.1,.7,.2,1) forwards}',
      '@keyframes careld{from{transform:scaleX(0)}to{transform:scaleX(.9)}}',
      /* ورقة الأقسام: شبكة بطاقات تصعد من الأسفل. الحركة transform/opacity فقط
         (تُرسم على كرت الشاشة)، والبطاقات تظهر متتابعة. */
      '#caresheet{position:fixed;inset:0;z-index:99995;display:none;direction:rtl}',
      '#caresheet.open{display:block}',
      '#caresheet .sc{position:absolute;inset:0;background:rgba(16,20,24,.42);opacity:0;transition:opacity .32s ease}',
      '#caresheet.in .sc{opacity:1}',
      '#caresheet .sp{position:absolute;inset-inline:0;bottom:0;background:#fff;border-radius:28px 28px 0 0;',
      'padding:8px 18px calc(22px + var(--care-sab, env(safe-area-inset-bottom, 0px)));',
      'box-shadow:0 -10px 40px rgba(16,20,24,.14);transform:translate3d(0,100%,0);will-change:transform;',
      'transition:transform .42s cubic-bezier(.22,1,.36,1);overscroll-behavior:contain}',
      '#caresheet.in .sp{transform:translate3d(0,0,0)}',
      '#caresheet.drag .sp{transition:none}',
      '#caresheet .gr{width:38px;height:5px;border-radius:3px;background:#e3e6ea;margin:0 auto 14px}',
      '#caresheet .hd{display:flex;align-items:center;justify-content:space-between;margin:0 2px 16px}',
      '#caresheet h3{margin:0;font-family:inherit;font-weight:800;font-size:19px;line-height:1.3;color:#101418}',
      '#caresheet .hd p{margin:3px 0 0;font-family:inherit;font-weight:500;font-size:12.5px;line-height:1.4;color:#8a939c}',
      '#caresheet .x{width:34px;height:34px;border-radius:50%;border:0;background:#f2f4f6;color:#5b646d;',
      'display:flex;align-items:center;justify-content:center;flex:none;touch-action:manipulation}',
      '#caresheet .x svg{width:16px;height:16px}',
      '#caresheet .gd{display:grid;grid-template-columns:repeat(3,1fr);gap:10px}',
      '#caresheet .gd a{position:relative;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:9px;',
      'min-height:104px;padding:14px 6px 12px;border-radius:20px;background:#fbf1f4;text-decoration:none;',
      'color:#101418;font-family:inherit;font-weight:700;font-size:12.5px;line-height:1.3;text-align:center;',
      'opacity:0;transform:translate3d(0,14px,0) scale(.96);',
      'transition:opacity .34s ease,transform .42s cubic-bezier(.22,1,.36,1),background .15s;touch-action:manipulation}',
      '#caresheet.in .gd a{opacity:1;transform:none}',
      '#caresheet .gd a:active{transform:scale(.95);background:#f6e2e8}',
      '#caresheet .gd a b{width:46px;height:46px;border-radius:15px;background:#fff;display:flex;align-items:center;',
      'justify-content:center;box-shadow:0 3px 10px rgba(212,118,143,.16)}',
      '#caresheet .gd a svg{width:23px;height:23px;color:var(--care)}',
      /* التخفيضات مميّزة بلون العلامة */
      '#caresheet .gd a.hot{background:var(--care);color:#fff}',
      '#caresheet .gd a.hot:active{background:#c7627d}',
      '#caresheet .gd a.hot b{background:rgba(255,255,255,.22);box-shadow:none}',
      '#caresheet .gd a.hot svg{color:#fff}',
      /* القسم الحالي */
      '#caresheet .gd a.cur{box-shadow:inset 0 0 0 2px var(--care)}',
      '#caresheet .gd a.cur:after{content:"";position:absolute;top:10px;inset-inline-start:10px;width:7px;height:7px;',
      'border-radius:50%;background:var(--care)}',
      /* لوحتان تنزلقان أفقياً: الأقسام الرئيسية ← فروع القسم */
      '#caresheet .vw{overflow:hidden;transition:height .38s cubic-bezier(.22,1,.36,1)}',
      '#caresheet .tr{display:flex;width:200%;transition:transform .38s cubic-bezier(.22,1,.36,1);will-change:transform}',
      '#caresheet .pn{width:50%;flex:none}',
      '#caresheet.sub .tr{transform:translate3d(50%,0,0)}',
      '#caresheet .pn2{max-height:62vh;overflow-y:auto;-webkit-overflow-scrolling:touch;overscroll-behavior:contain;',
      'padding-bottom:4px;scrollbar-width:none}',
      '#caresheet .pn2::-webkit-scrollbar{display:none}',
      '#caresheet .bk{display:flex;align-items:center;gap:6px;border:0;background:none;padding:0;color:var(--care);',
      'font-family:inherit;font-weight:700;font-size:14px;touch-action:manipulation}',
      '#caresheet .bk svg{width:18px;height:18px;transform:scaleX(-1)}',
      '#caresheet .all{display:flex;align-items:center;justify-content:space-between;margin:0 0 10px;padding:14px 16px;',
      'border-radius:16px;background:var(--care);color:#fff;text-decoration:none;font-family:inherit;font-weight:700;font-size:14.5px}',
      '#caresheet .all svg{width:18px;height:18px}',
      '#caresheet .rw{border-bottom:1px solid #f0f2f4;padding:4px 0}',
      '#caresheet .rw:last-child{border-bottom:0}',
      '#caresheet .rw>a{display:flex;align-items:center;justify-content:space-between;padding:12px 4px;',
      'color:#101418;text-decoration:none;font-family:inherit;font-weight:700;font-size:14.5px;border-radius:12px}',
      '#caresheet .rw>a:active{background:#f7f8f9}',
      '#caresheet .rw>a svg{width:16px;height:16px;color:#b7bfc7}',
      '#caresheet .ch{display:flex;flex-wrap:wrap;gap:7px;padding:0 4px 10px}',
      '#caresheet .ch a{padding:7px 12px;border-radius:999px;background:#fbf1f4;color:#7a3e50;text-decoration:none;',
      'font-family:inherit;font-weight:600;font-size:12.5px;line-height:1.3}',
      '#caresheet .ch a:active{background:#f3dbe3}',
      '#caresheet .gd a i{position:absolute;top:9px;inset-inline-end:10px;min-width:18px;height:18px;padding:0 5px;',
      'border-radius:9px;background:#fff;color:var(--care);font:700 10px/18px system-ui;font-style:normal}',
      '#caresheet .gd a.hot i{background:rgba(255,255,255,.25);color:#fff}',
      'html.care-sheet{overflow:hidden}',
      '@media (prefers-reduced-motion:reduce){#caresheet .sp,#caresheet .gd a,#caresheet .sc{transition:none}}',
      /* شاشة انقطاع الاتصال */
      '#careoff{position:fixed;inset:0;z-index:99999;display:none;flex-direction:column;align-items:center;',
      'justify-content:center;gap:14px;background:#101418;color:#eef2f6;text-align:center;padding:30px;direction:rtl}',
      '#careoff.on{display:flex}',
      '#careoff svg{width:62px;height:62px;color:var(--care)}',
      '#careoff h2{margin:0;font-family:inherit;font-weight:700;font-size:20px;line-height:1.4}',
      '#careoff p{margin:0;color:#98a2ad;font-family:inherit;font-weight:400;font-size:14.5px;line-height:1.7;max-width:300px}',
      '#careoff button{margin-top:6px;background:var(--care);color:#10140f;border:0;border-radius:12px;',
      'padding:12px 30px;font-family:inherit;font-weight:700;font-size:15px}',
      /* السحب للتحديث */
      '#carepull{position:fixed;top:0;inset-inline:0;z-index:99991;display:flex;justify-content:center;',
      'pointer-events:none;transition:opacity .2s}',
      '#carepull i{display:block;width:30px;height:30px;margin-top:8px;border-radius:50%;',
      'border:2.5px solid rgba(232,145,42,.25);border-top-color:var(--care)}',
      '#carepull.spin i{animation:caresp .7s linear infinite}',
      '@keyframes caresp{to{transform:rotate(360deg)}}',
      /* زر المشاركة */
      '#careshare{position:fixed;inset-inline-start:14px;bottom:calc(76px + var(--care-sab, env(safe-area-inset-bottom, 0px)));',
      'z-index:99989;width:46px;height:46px;border-radius:50%;border:0;display:none;align-items:center;',
      'justify-content:center;background:#fff;color:#101418;box-shadow:0 4px 16px rgba(0,0,0,.2)}',
      '#careshare.on{display:flex}',
      '#careshare svg{width:21px;height:21px}',
      /* بديل الصور المكسورة */
      'img.care-ph{object-fit:contain!important;background:#f4f6f8!important;padding:8%!important;opacity:.55}',
      /* أداة واتساب الخارجية تجلس بأعلى z-index ممكن وتغطي الشريط — نرفعها فوقه */
      'html.care-app [id^="gb-widget"],html.care-app #gb-waw-iframe,html.care-app iframe[id*="waw"],',
      'html.care-app .whatsapp_float,html.care-app [class*="whats"][class*="float"]',
      '{bottom:calc(82px + var(--care-sab, env(safe-area-inset-bottom, 0px)))!important}',
      /* بطاقة «الإجمالي + إتمام الطلب» في صفحة السلة مثبّتة أسفل الشاشة (z=1)، فكان شريط التطبيق
         يغطي زر «إتمام الطلب» كلياً. نمدّ حشوتها السفلية بارتفاع الشريط فيصعد الزر فوقه.
         ومثلها شريط «أضف للسلة» المثبّت في صفحة المنتج. */
      'html.care-app .s-cart-summary-card--mobile,html.care-app .sticky-product-bar{',
      'padding-bottom:calc(78px + var(--care-sab, env(safe-area-inset-bottom, 0px)))!important;z-index:99980!important}',
      /* صفحة الدفع: نخفي شريط التطبيق كلياً حتى لا يغطي زر تأكيد الطلب/الدفع في أي مرحلة.
         الرجوع متاح بشعار المتجر أعلى الصفحة وبالسحب من حافة الشاشة. */
      'html.care-checkout #carebar{display:none!important}',
      'html.care-checkout body{padding-bottom:var(--care-sab, env(safe-area-inset-bottom, 0px))!important}',
      /* زر المشاركة في صفحة المنتج: فوق شريط «أضف للسلة» وفي الجهة المقابلة لأداة واتساب */
      'html.care-prod #careshare{bottom:calc(196px + var(--care-sab, env(safe-area-inset-bottom, 0px)));',
      'inset-inline-start:auto;inset-inline-end:14px}',
      /* في السلة تغطي أداة واتساب مبلغ الإجمالي — نخفيها هناك فقط */
      'html.care-cart [id^="gb-widget"]{opacity:0!important;pointer-events:none!important}',
      /* زر «العودة للأعلى» في الموقع يجلس فوق الشريط ويغطي تبويب الرئيسية */
      'html.care-app #scrollUp,html.care-app [id*="scrollUp"],html.care-app [class*="scroll-top"],',
      'html.care-app [class*="scrollToTop"],html.care-app [class*="back-to-top"]',
      '{bottom:calc(156px + var(--care-sab, env(safe-area-inset-bottom, 0px)))!important}',
      /* عند فتح أي نافذة للموقع (الدخول، كود التحقق، السلة، القائمة) يختفي
         الشريط والأزرار العائمة — كانت تغطي حقل الجوال وكود التحقق */
      'html.care-modal #carebar,html.care-modal #careshare,html.care-modal [id^="gb-widget"],html.care-modal #gb-waw-iframe,',
      'html.care-modal iframe[id*="waw"],html.care-modal #scrollUp',
      '{opacity:0!important;pointer-events:none!important;transform:translateY(12px);',
      'transition:opacity .2s,transform .2s}',
      /* تختفي الأداة عند فتح ورقة الأقسام لأن z-index عندها أعلى من أي قيمة */
      'html.care-sheet [id^="gb-widget"],html.care-sheet #gb-waw-iframe,html.care-sheet iframe[id*="waw"],',
      'html.care-sheet #scrollUp,html.care-sheet [id*="scrollUp"],',
      'html.care-sheet .whatsapp_float,html.care-sheet [class*="whats"][class*="float"]',
      '{opacity:0!important;pointer-events:none!important;transition:opacity .2s}'
    ].join('');
    var s = document.createElement('style');
    s.id = 'care-style';
    s.textContent = css;
    (document.head || document.documentElement).appendChild(s);
  }

  /* ---------- أدوات ---------- */
  function go(u) { location.href = u.charAt(0) === '/' ? 'https://careksa.com' + u : u; }
  function path() { return location.pathname || '/'; }

  /* العدد في span.s-cart-summary-count داخل مكوّن سلة.
     تنبيه: نص المكوّن كله يحوي إجمالي السعر («cart 238») فلا يصلح مصدراً. */
  function cartCount() {
    var el = document.querySelector('.s-cart-summary-count, [class*="cart-summary-count"]');
    if (!el) return 0;
    var txt = (el.textContent || '')
      .replace(/[٠-٩]/g, function (d) { return '٠١٢٣٤٥٦٧٨٩'.indexOf(d); });
    var m = txt.match(/\d+/);
    return m ? parseInt(m[0], 10) : 0;
  }

  /* ---------- الشريط السفلي ---------- */
  function bar() {
    var el = document.createElement('nav');
    el.id = 'carebar';
    el.setAttribute('role', 'navigation');
    el.innerHTML = TABS.map(function (t) {
      return '<button data-id="' + t.id + '" aria-label="' + t.t + '">' + svg(t.id) +
        (t.badge ? '<span class="bdg" hidden></span>' : '') + '<span>' + t.t + '</span></button>';
    }).join('');
    document.body.appendChild(el);
    var ld = document.createElement('div');
    ld.id = 'careload';
    document.body.appendChild(ld);
    /* الانتقال بين التبويبات تحميل صفحة كاملة (١–٣ ث)، فنعطي إحساساً فورياً:
       التبويب يتلوّن والشريط يتحرك لحظة الضغط، لا بعد وصول الصفحة. */
    el.addEventListener('click', function (e) {
      var b = e.target.closest('button'); if (!b) return;
      var t = TABS.filter(function (x) { return x.id === b.dataset.id; })[0];
      tap('LIGHT');
      if (t.sheet) { sheet(true); return; }
      if (t.account || (t.id === 'fav' && !loggedIn())) { openAccount(); return; }   // الزائر: نافذة الدخول مباشرة
      if (t.m && t.m.test(path())) { window.scrollTo({ top: 0, behavior: 'smooth' }); return; }   // نفس الصفحة
      document.querySelectorAll('#carebar button').forEach(function (x) { x.classList.toggle('on', x === b); });
      ld.classList.add('on');
      go(t.u);
    });
    /* الرجوع من ذاكرة الصفحات (bfcache) يعيد الصفحة كما هي — نُطفئ الشريط */
    addEventListener('pageshow', function () { ld.classList.remove('on'); active(); });
    active(); badge();
  }
  function active() {
    var p = path();
    document.querySelectorAll('#carebar button').forEach(function (b) {
      var t = TABS.filter(function (x) { return x.id === b.dataset.id; })[0];
      b.classList.toggle('on', !!(t.m && t.m.test(p)));
    });
  }
  function badge() {
    var b = document.querySelector('#carebar .bdg'); if (!b) return;
    var n = cartCount();
    b.hidden = !n;
    b.textContent = n > 99 ? '99+' : n;
  }

  /* «حسابي»: نضغط زر الحساب في الموقع نفسه — فهو يعرف إن كان العميل داخلاً
     (يفتح حسابه) أو لا (يفتح نافذة الدخول). الرابط /user/sign-in صفحة 404. */
  /* «حسابي»: لو العميل داخل نذهب لحسابه، وإلا نفتح نافذة دخول سلة.
     الانتقال إلى /profile كزائر يعيدك للرئيسية، فلا نستخدمه للزائر. */
  function loggedIn() {
    try {
      var s = window.salla;
      if (s && s.config && typeof s.config.get === 'function') {
        /* الزائر له user.id أيضاً (type=guest) — فالنوع وحده هو الحكم،
           وإلا ذهب «حسابي» لـ/profile ثم أعادته سلة للرئيسية (تحميلان). */
        var t = s.config.get('user.type');
        if (t) return t !== 'guest';
      }
    } catch (e) { /* تابع */ }
    return /\/(profile|orders)/.test(location.pathname);
  }

  function openAccount() {
    if (loggedIn()) { go('/profile'); return; }
    // الأضمن: نضغط زر الحساب في رأس المتجر نفسه (أيقونة sicon-user)
    var ic = document.querySelector('i.sicon-user, .sicon-user, [class*="sicon-user"]');
    if (ic) {
      var t = ic.closest('a,button,[class*="header-btn"]') || ic.parentElement;
      if (t) { t.click(); return; }
    }
    // مكوّن سلة قد لا يكون مُهيّأً بعد، فنجرّبه ثانياً
    var m = document.querySelector('salla-login-modal');
    if (m && typeof m.open === 'function') {
      try { m.open(); return; } catch (e) { /* تابع */ }
    }
    try {
      var ev = window.salla && window.salla.event;
      if (ev && (ev.dispatch || ev.emit)) { (ev.dispatch || ev.emit).call(ev, 'login::open'); return; }
    } catch (e) { /* تابع */ }
    go('/profile');
  }

  /* ---------- ورقة الأقسام ---------- */
  /* الأقسام تُقرأ من قائمة المتجر نفسها (ul.main-menu الموجودة في كل صفحات سلة)،
     فأي قسم يُضاف أو يُحذف من لوحة سلة يظهر في التطبيق بلا تحديث.
     آخر نسخة تُحفظ احتياطاً، وCATS الثابتة هي الملاذ الأخير. */
  var MENU_KEY = 'care:menu:v1';
  function readMenu() {
    var ul = document.querySelector('ul.main-menu');
    if (!ul) return null;
    var walk = function (list, depth) {
      var out = [];
      [].forEach.call(list.children, function (li) {
        var a = li.querySelector(':scope > a[href]');
        if (!a || /display-all-category/.test(a.className)) return;
        var t = (a.getAttribute('aria-label') || a.textContent || '').trim().replace(/\s+/g, ' ');
        var h = a.getAttribute('href') || '';
        if (!t || !/^https?:\/\/(www\.)?careksa\.com\//.test(h)) return;
        var sub = li.querySelector(':scope > ul');
        out.push({ t: t, h: h, c: sub && depth < 2 ? walk(sub, depth + 1) : [] });
      });
      return out;
    };
    var m = walk(ul, 0);
    return m.length ? m : null;
  }
  function menu() {
    var m = readMenu();
    try {
      if (m) localStorage.setItem(MENU_KEY, JSON.stringify(m));
      else m = JSON.parse(localStorage.getItem(MENU_KEY) || 'null');
    } catch (e) { /* التخزين غير متاح */ }
    return m || CATS.map(function (c) { return { t: c.t, h: 'https://careksa.com' + encodeURI(c.u), c: [] }; });
  }
  /* أيقونة كل قسم من اسمه */
  function iconFor(t) {
    var rules = [[/تخفيض|عروض|خصم|تصفي/, 'tag'], [/ترند/, 'spark'], [/شعر/, 'hair'], [/بخور|عود|عطر/, 'smoke'],
      [/مجموع|هدي|بكج/, 'gift'], [/شفا|شفاه|تنت|توريد/, 'lips'], [/عين|ماسكرا|كحل/, 'eye'], [/حواجب/, 'brow'],
      [/مكياج/, 'lips'], [/وجه|بشرة/, 'face'], [/عناية|جسم|ترطيب/, 'drop']];
    for (var i = 0; i < rules.length; i++) if (rules[i][0].test(t)) return rules[i][1];
    return 'grid';
  }
  var esc = function (t) { return String(t).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); };

  var sheetTimer = 0;
  function sheet(open) {
    var s = document.getElementById('caresheet');
    if (!s) {
      s = document.createElement('div');
      s.id = 'caresheet';
      s.setAttribute('role', 'dialog');
      s.setAttribute('aria-label', 'الأقسام');
      s.innerHTML = '<div class="sc"></div><div class="sp"><div class="gr"></div><div class="vw"><div class="tr">' +
        '<div class="pn pn1"></div><div class="pn pn2"></div></div></div></div>';
      document.body.appendChild(s);
      s.querySelector('.sc').addEventListener('click', function () { sheet(false); });
      s.addEventListener('click', function (e) {
        if (e.target.closest('.x')) { tap('LIGHT'); sheet(false); return; }
        if (e.target.closest('.bk')) { tap('LIGHT'); level(s, null); return; }
        var a = e.target.closest('a[href]');
        if (!a) return;
        var k = a.getAttribute('data-k');
        if (k !== null && s._m[k] && s._m[k].c.length) {   // قسم له فروع: نعرض فروعه بدل الانتقال
          e.preventDefault(); tap('LIGHT'); level(s, s._m[k]); return;
        }
        tap('LIGHT');
        var ld = document.getElementById('careload');
        if (ld) ld.classList.add('on');
        setTimeout(function () { sheet(false); }, 160);   // تنزل الورقة والصفحة تُحمَّل خلفها
      });
      dragClose(s);
    }
    clearTimeout(sheetTimer);
    document.documentElement.classList.toggle('care-sheet', !!open);
    var sp = s.querySelector('.sp');
    if (open) {
      build(s);
      sp.style.transform = '';
      s.classList.add('open');
      void s.offsetHeight;   // نثبّت الحالة الأولى قبل الحركة، وإلا ظهرت الورقة فجأة بلا انزلاق
      s.classList.add('in');
      fit(s);
    } else {
      [].forEach.call(s.querySelectorAll('.gd a'), function (a) { a.style.transitionDelay = '0ms'; });   // تختفي معاً
      // بعد السحب تكمل الورقة نزولها من موضع الإصبع بدل أن تقفز للأعلى ثم تنزل
      if (sp.style.transform) sp.style.transform = 'translate3d(0,100%,0)';
      s.classList.remove('in');
      sheetTimer = setTimeout(function () { s.classList.remove('open'); sp.style.transform = ''; level(s, null, true); }, 420);
    }
  }

  function build(s) {
    var m = s._m = menu();
    var here = location.href.split('?')[0];
    s.querySelector('.pn1').innerHTML =
      '<div class="hd"><div><h3>الأقسام</h3><p>اختاري القسم اللي تبين تتصفحينه</p></div>' +
      '<button type="button" class="x" aria-label="إغلاق">' + svg('x', 2.2) + '</button></div><div class="gd">' +
      m.map(function (c, i) {
        var cls = (/تخفيض|offers/.test(c.t + c.h) ? 'hot' : '') + (here === c.h ? ' cur' : '');
        return '<a class="' + cls + '" data-k="' + i + '" style="transition-delay:' + (60 + i * 30) + 'ms" href="' + esc(c.h) + '">' +
          (c.c.length ? '<i>' + c.c.length + '</i>' : '') + '<b>' + svg(iconFor(c.t)) + '</b><span>' + esc(c.t) + '</span></a>';
      }).join('') + '</div>';
  }

  /* الانتقال بين اللوحتين. c=null يعود للأقسام الرئيسية */
  function level(s, c, instant) {
    var p2 = s.querySelector('.pn2');
    if (c) {
      p2.innerHTML = '<div class="hd"><button type="button" class="bk">' + svg('back', 2.2) + 'الأقسام</button>' +
        '<button type="button" class="x" aria-label="إغلاق">' + svg('x', 2.2) + '</button></div>' +
        '<a class="all" href="' + esc(c.h) + '"><span>كل ' + esc(c.t) + '</span>' + svg('back', 2.2) + '</a>' +
        c.c.map(function (x) {
          return '<div class="rw"><a href="' + esc(x.h) + '"><span>' + esc(x.t) + '</span>' + svg('back', 2) + '</a>' +
            (x.c.length ? '<div class="ch">' + x.c.map(function (y) {
              return '<a href="' + esc(y.h) + '">' + esc(y.t) + '</a>';
            }).join('') + '</div>' : '') + '</div>';
        }).join('');
      p2.scrollTop = 0;
      s.classList.add('sub');
    } else {
      s.classList.remove('sub');
    }
    var vw = s.querySelector('.vw');
    if (instant) { vw.style.height = ''; return; }
    fit(s);
  }
  /* ارتفاع الورقة يتبع اللوحة الظاهرة، فتكبر وتصغر بنعومة */
  function fit(s) {
    var vw = s.querySelector('.vw');
    var pn = s.querySelector(s.classList.contains('sub') ? '.pn2' : '.pn1');
    vw.style.height = pn.offsetHeight + 'px';
  }

  /* السحب لأسفل يغلق الورقة: تتبع الإصبع، وتُغلق إن تجاوزت ربعها أو كان السحب سريعاً */
  function dragClose(s) {
    var sp = s.querySelector('.sp'), y0 = null, t0 = 0, dy = 0;
    sp.addEventListener('touchstart', function (e) {
      if (e.touches.length !== 1) return;
      var list = e.target.closest('.pn2');
      if (list && list.scrollTop > 0) { y0 = null; return; }   // المستخدم يمرّر قائمة الفروع لا يسحب الورقة
      y0 = e.touches[0].clientY; t0 = Date.now(); dy = 0;
    }, { passive: true });
    sp.addEventListener('touchmove', function (e) {
      if (y0 === null) return;
      dy = Math.max(0, e.touches[0].clientY - y0);
      if (dy > 4) { s.classList.add('drag'); sp.style.transform = 'translate3d(0,' + dy + 'px,0)'; }
    }, { passive: true });
    sp.addEventListener('touchend', function () {
      if (y0 === null) return;
      var fast = dy > 40 && dy / Math.max(1, Date.now() - t0) > .5;
      s.classList.remove('drag');
      y0 = null;
      if (dy > sp.offsetHeight / 4 || fast) sheet(false);
      else sp.style.transform = '';
    }, { passive: true });
  }

  /* ---------- بديل الصور المكسورة ---------- */
  var PH = 'data:image/svg+xml;utf8,' + encodeURIComponent(
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120"><g fill="none" stroke="#9aa3ad" ' +
    'stroke-width="4" stroke-linecap="round" stroke-linejoin="round"><path d="M60 22s26 29 26 46a26 26 0 0 1-52 0c0-17 26-46 26-46z"/>' +
    '<path d="M52 70a9 9 0 0 0 9 9"/></g></svg>');
  function fixImages() {
    var swap = function (img) {
      if (img.dataset.carePh) return;
      img.dataset.carePh = '1';
      img.src = PH;
      img.classList.add('care-ph');
      img.removeAttribute('srcset');
    };
    document.addEventListener('error', function (e) {
      var t = e.target;
      if (t && t.tagName === 'IMG') swap(t);
    }, true);
    var scan = function () {
      var n = 0;
      [].forEach.call(document.images, function (i) {
        if (i.complete && i.naturalWidth === 0 && i.src && !i.dataset.carePh) { swap(i); n++; }
      });
      return n;
    };
    scan();
    setTimeout(scan, 2500);
    setTimeout(scan, 6000);
  }

  /* ---------- انقطاع الاتصال ---------- */
  function offline() {
    var o = document.createElement('div');
    o.id = 'careoff';
    o.innerHTML = svg('wifi') + '<h2>لا يوجد اتصال بالإنترنت</h2>' +
      '<p>تأكد من اتصالك بالشبكة ثم أعد المحاولة. متجر أولوية العناية يحتاج اتصالاً لعرض المنتجات وأسعارها المحدّثة.</p>' +
      '<button type="button">إعادة المحاولة</button>';
    document.body.appendChild(o);
    o.querySelector('button').addEventListener('click', function () { tap('MEDIUM'); location.reload(); });
    var show = function (on) { o.classList.toggle('on', !on); };
    var N = plug('Network');
    if (N) {
      N.getStatus().then(function (s) { show(s.connected); }).catch(function () { /* تجاهل */ });
      N.addListener('networkStatusChange', function (s) { show(s.connected); });
    }
    window.addEventListener('online', function () { show(true); });
    window.addEventListener('offline', function () { show(false); });
  }

  /* ---------- السحب للتحديث ---------- */
  function pull() {
    var p = document.createElement('div');
    p.id = 'carepull'; p.innerHTML = '<i></i>';
    p.style.opacity = '0';
    document.body.appendChild(p);
    var y0 = null, d = 0, busy = false;
    var top = function () { return (window.scrollY || document.documentElement.scrollTop || 0) <= 1; };
    addEventListener('touchstart', function (e) {
      if (!busy && top() && e.touches.length === 1) { y0 = e.touches[0].clientY; d = 0; }
    }, { passive: true });
    addEventListener('touchmove', function (e) {
      if (y0 === null || busy) return;
      d = e.touches[0].clientY - y0;
      if (d > 0 && top()) {
        var k = Math.min(d / 110, 1);
        p.style.opacity = k;
        p.style.transform = 'translateY(' + Math.min(d * .45, 52) + 'px)';
      }
    }, { passive: true });
    addEventListener('touchend', function () {
      if (y0 === null || busy) { y0 = null; return; }
      if (d > 105) {
        busy = true; tap('MEDIUM');
        p.classList.add('spin'); p.style.opacity = '1';
        setTimeout(function () { location.reload(); }, 180);
      } else {
        p.style.opacity = '0'; p.style.transform = '';
      }
      y0 = null; d = 0;
    }, { passive: true });
  }

  /* ---------- المشاركة الأصلية ---------- */
  function share() {
    var b = document.createElement('button');
    b.id = 'careshare'; b.type = 'button';
    b.setAttribute('aria-label', 'مشاركة المنتج');
    b.innerHTML = svg('share');
    document.body.appendChild(b);
    var isProduct = /\/p\d/.test(path());
    b.classList.toggle('on', isProduct);
    b.addEventListener('click', function () {
      tap('LIGHT');
      var S = plug('Share');
      var title = (document.querySelector('h1') || {}).textContent || document.title;
      var data = { title: title.trim(), text: title.trim() + ' — أولوية العناية', url: location.href, dialogTitle: 'مشاركة المنتج' };
      if (S) S.share(data).catch(function () { /* أُلغيت */ });
      else if (navigator.share) navigator.share(data).catch(function () { /* أُلغيت */ });
    });
  }

  /* ---------- الروابط الخارجية ---------- */
  function links() {
    document.addEventListener('click', function (e) {
      var a = e.target.closest('a[href]'); if (!a) return;
      var h = a.getAttribute('href') || '';
      if (/^(tel:|mailto:|sms:)/i.test(h)) return;                   // يتولاها النظام
      if (/^https?:\/\//i.test(h) && h.indexOf('careksa.com') === -1) {
        e.preventDefault();
        var B = plug('Browser');
        if (B) B.open({ url: h, presentationStyle: 'popover' });
        else window.open(h, '_blank');
      }
    }, true);
  }

  /* ---------- تذكير السلة ---------- */
  function cartReminder() {
    var LN = plug('LocalNotifications'), App = plug('App');
    if (!LN || !App) return;
    var ask = function () {
      LN.checkPermissions().then(function (r) {
        if (r.display === 'prompt') return LN.requestPermissions();
      }).catch(function () { /* تجاهل */ });
    };
    setTimeout(ask, 9000);
    App.addListener('appStateChange', function (s) {
      if (s.isActive) return;
      var n = cartCount();
      LN.cancel({ notifications: [{ id: 7301 }] }).catch(function () { /* تجاهل */ });
      if (!n) return;
      LN.schedule({
        notifications: [{
          id: 7301,
          title: 'سلّتك تنتظرك 💗',
          body: 'لديك ' + n + (n === 1 ? ' منتج' : ' منتجات') + ' في سلّة أولوية العناية — أكملي طلبك قبل نفاد الكمية.',
          schedule: { at: new Date(Date.now() + 6 * 3600 * 1000), allowWhileIdle: true },
          smallIcon: 'ic_stat_care'
        }]
      }).catch(function () { /* تجاهل */ });
    });
  }

  /* ---------- زر الرجوع في أندرويد ---------- */
  function backButton() {
    var App = plug('App'); if (!App) return;
    App.addListener('backButton', function () {
      var s = document.getElementById('caresheet');
      if (s && s.classList.contains('open')) return sheet(false);
      if (history.length > 1 && path() !== '/') history.back();
      else App.exitApp();
    });
  }

  /* ---------- شريط الحالة ---------- */
  function statusBar() {
    var SB = plug('StatusBar'); if (!SB) return;
    try { SB.setStyle({ style: 'LIGHT' }); SB.setBackgroundColor({ color: '#ffffff' }); } catch (e) { /* تجاهل */ }
  }

  /* المنطقة الآمنة: قيم env(safe-area-inset-*) تساوي صفراً ما لم يحتوِ
     وسم viewport على viewport-fit=cover — ومتجر careksa.com لا يحتويه،
     فنضيفه هنا وإلا اختفى شريط الحالة فوق رأس الموقع. */
  function viewportFit() {
    var m = document.querySelector('meta[name="viewport"]');
    if (!m) {
      m = document.createElement('meta');
      m.name = 'viewport';
      m.content = 'width=device-width, initial-scale=1';
      document.head.appendChild(m);
    }
    if (!/viewport-fit/.test(m.content)) m.content = m.content + ', viewport-fit=cover';
  }

  function safeTop() {
    if (document.getElementById('caretop')) return;
    var s = document.createElement('div');
    s.id = 'caretop';
    document.body.appendChild(s);
  }

  /* ---------- الإقلاع ---------- */
  function boot() {
    document.documentElement.classList.add('care-app');
    if (/^\/(cart|checkout)/.test(path())) document.documentElement.classList.add('care-cart');
    if (/\/p\d/.test(path())) document.documentElement.classList.add('care-prod');
    if (/^\/checkout/.test(path())) document.documentElement.classList.add('care-checkout');
    viewportFit();
    styles();
    safeTop();
    bar(); fixImages(); offline(); pull(); share(); links();
    statusBar(); backButton(); cartReminder(); watchModals();
    var SS = plug('SplashScreen');
    if (SS) setTimeout(function () { SS.hide().catch(function () { /* تجاهل */ }); }, 350);
    watchCart(); liftWidget();
  }

  /* أداة واتساب (GetButton) تكتب bottom:14px !important في style العنصر نفسه،
     فلا يغلبها أي CSS خارجي وتجلس فوق تبويب «الرئيسية». نرفعها من الكود بعد تحميلها المتأخر. */
  function liftWidget() {
    var n = 0;
    var lift = function () {
      var w = document.querySelector('[id^="gb-widget"]');
      if (w) {
        // في صفحة المنتج شريط «أضف للسلة» مثبّت فوق شريط التطبيق، فنرفع الأداة فوقه أيضاً
        var want = 'calc(' + (/\/p\d/.test(path()) ? 196 : 82) + 'px + var(--care-sab, env(safe-area-inset-bottom, 0px)))';
        var set = function () {
          if (w.style.getPropertyValue('bottom') !== want) w.style.setProperty('bottom', want, 'important');
        };
        set();
        // الأداة تعيد كتابة style عنصرها بعد التحميل فترجع لـ14px — نعيد الرفع كلما غيّرته
        if (window.MutationObserver) new MutationObserver(set).observe(w, { attributes: true, attributeFilter: ['style'] });
        return;
      }
      if (++n < 20) setTimeout(lift, 1000);
    };
    lift();
  }

  /* تحديث الشارة عند تغيّر السلة دون إعادة تحميل.
     نراقب رابط السلة وحده — مراقبة body كلّه تُغرق المعالج في صفحات فيها مئات الصور. */
  function watchCart() {
    var last = -1;
    var sync = function () { var n = cartCount(); if (n !== last) { last = n; badge(); } };
    sync();
    /* نراقب مكوّن سلة كله لأن العدّاد يُستبدل عند التحديث،
       ونستمع كذلك لحدث سلة إن توفّر. */
    var host = document.querySelector('salla-cart-summary') || document.body;
    if (window.MutationObserver) {
      var t = 0;
      new MutationObserver(function () {
        clearTimeout(t);
        t = setTimeout(sync, 250);
      }).observe(host, { childList: true, subtree: true, characterData: true });
    }
    try {
      var ev = window.salla && window.salla.event;
      if (ev && typeof ev.on === 'function') {
        ev.on('cart::updated', function () { setTimeout(sync, 300); });
        ev.on('cart::item.added', function () { setTimeout(sync, 300); });
      }
    } catch (e) { /* تجاهل */ }
    setInterval(sync, 3000);
  }

  /* نراقب نوافذ الموقع (Bootstrap) لنُخفي الشريط أثناء فتحها */
  function watchModals() {
    /* سلة تفتح نوافذها كمكوّنات ويب (salla-modal.s-modal) وتقفل تمرير الصفحة.
       نتحقق من ظهور فعلي لا مجرد وجود في الشجرة. */
    var shown = function (sel) {
      var els = document.querySelectorAll(sel);
      for (var i = 0; i < els.length; i++) {
        var e = els[i], r = e.getBoundingClientRect();
        if (r.height > 120 && r.width > 120 && getComputedStyle(e).visibility !== 'hidden') return true;
      }
      return false;
    };
    var apply = function () {
      var open = shown('salla-modal.s-modal, .s-modal-overlay, .s-modal-wrapper, [class*="modal"][class*="open"]')
        || getComputedStyle(document.body).overflow === 'hidden'
        || /modal-open|overflow-hidden/.test(document.body.className);
      document.documentElement.classList.toggle('care-modal', open);
    };
    apply();
    /* السلايدرات والصور الكسولة تغيّر كلاساتها باستمرار؛ كانت كل تغييرة تُطلق
       apply (قياس + getComputedStyle) فيثقل التمرير. نتجاهل ما لا يخص النوافذ. */
    var relevant = function (n) {
      if (n === document.body || n === document.documentElement) return true;
      var c = (typeof n.className === 'string' ? n.className : '') + ' ' + (n.tagName || '');
      return /modal/i.test(c);
    };
    if (window.MutationObserver) {
      var t = 0;
      new MutationObserver(function (list) {
        for (var i = 0; i < list.length; i++) {
          if (relevant(list[i].target)) { clearTimeout(t); t = setTimeout(apply, 60); return; }
        }
      }).observe(document.documentElement, { attributes: true, subtree: true, attributeFilter: ['class'] });
    }
    setInterval(apply, 2500);
  }

  /* هل نحن داخل التطبيق؟ نعتمد على وسم المتصفح أولاً لأنه يوجد دائماً،
     ولا ننتظر جسر Capacitor — فالإضافات وحدها هي التي تحتاجه. */
  function inApp() {
    return /CareApp/.test(navigator.userAgent) || native();
  }

  function start() {
    if (!inApp()) return;                        // في المتصفح العادي لا نغيّر شيئاً
    if (document.body) boot();
    else document.addEventListener('DOMContentLoaded', boot, { once: true });
  }

  start();
})();
