# -*- coding: utf-8 -*-
"""أيقونة التطبيق وشاشة الإقلاع من شعار «أولوية العناية».
   الشعار شريط عريض: اسم عربي + مربّع FC. المربّع وحده يصلح لأيقونة."""
import os
import sys

from PIL import Image, ImageDraw

sys.stdout.reconfigure(encoding='utf-8')

HERE = os.path.dirname(os.path.abspath(__file__))
SRC = os.path.join(HERE, 'resources', 'logo-source.jpg')
OUT = os.path.join(HERE, 'resources')

logo = Image.open(SRC).convert('RGB')
W, H = logo.size
print('الشعار الكامل:', logo.size)

# مربّع FC يقع في الطرف الأيمن من الشريط
sq = logo.crop((int(W * 0.645), 0, W, H))
# قصّ الهوامش البيضاء حوله
g = sq.convert('L').point(lambda v: 255 if v < 246 else 0)
box = g.getbbox()
if box:
    pad = 6
    sq = sq.crop((max(0, box[0] - pad), max(0, box[1] - pad),
                  min(sq.width, box[2] + pad), min(sq.height, box[3] + pad)))
print('مربّع FC بعد القصّ:', sq.size)

# ---------- الأيقونة 1024 على أبيض ----------
S = 1024
icon = Image.new('RGB', (S, S), (255, 255, 255))
d = ImageDraw.Draw(icon)
for y in range(S):                       # تدرّج أبيض خفيف جداً يعطي عمقاً
    v = int(255 - 6 * (y / S))
    d.line([(0, y), (S, y)], fill=(v, v, v))

fit = int(S * 0.70)
sc = min(fit / sq.width, fit / sq.height)
art = sq.resize((max(1, int(sq.width * sc)), max(1, int(sq.height * sc))), Image.LANCZOS)
icon.paste(art, ((S - art.width) // 2, (S - art.height) // 2))
icon.save(os.path.join(OUT, 'icon.png'))
print('الأيقونة   :', icon.size)

# ---------- شاشة الإقلاع: الشعار الكامل على أبيض ----------
P = 2732
sp = Image.new('RGB', (P, P), (255, 255, 255))
fit = int(P * 0.42)
sc = fit / logo.width
full = logo.resize((int(logo.width * sc), int(logo.height * sc)), Image.LANCZOS)
sp.paste(full, ((P - full.width) // 2, (P - full.height) // 2))
sp.save(os.path.join(OUT, 'splash.png'))
sp.save(os.path.join(OUT, 'splash-dark.png'))
print('شاشة الإقلاع:', sp.size)
