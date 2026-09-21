# -*- coding: utf-8 -*-
"""أيقونة التطبيق وشاشة الإقلاع من شعار «أولوية العناية» المتجه (PDF).
   المصدر متجه فتُستخرج بأي دقة — لا تكبير لصورة صغيرة."""
import os
import sys

import pymupdf
from PIL import Image

Image.MAX_IMAGE_PIXELS = None
sys.stdout.reconfigure(encoding='utf-8')

HERE = os.path.dirname(os.path.abspath(__file__))
OUT = os.path.join(HERE, 'resources')
PDF = os.path.join(OUT, 'logo-source.pdf')

doc = pymupdf.open(PDF)
page = doc[0]
side = max(page.rect.width, page.rect.height)


def render(px):
    """يرسم الشعار بمقاس px بكسل مع قناة شفافة."""
    m = pymupdf.Matrix(px / side, px / side)
    pix = page.get_pixmap(matrix=m, alpha=True)
    return Image.frombytes('RGBA', (pix.width, pix.height), pix.samples)


def trim(im):
    """يقصّ الفراغ الشفاف حول الشعار."""
    bb = im.split()[-1].getbbox()
    return im.crop(bb) if bb else im


# ---------- الأيقونة 1024 على أبيض ----------
S = 1024
art = trim(render(2048))
icon = Image.new('RGB', (S, S), (255, 255, 255))
fit = int(S * 0.82)
sc = min(fit / art.width, fit / art.height)
a = art.resize((max(1, int(art.width * sc)), max(1, int(art.height * sc))), Image.LANCZOS)
icon.paste(a, ((S - a.width) // 2, (S - a.height) // 2), a)
icon.save(os.path.join(OUT, 'icon.png'))
print('الأيقونة    :', icon.size, '| الشعار بعد القصّ:', art.size)

# ---------- شاشة الإقلاع 2732 على أبيض ----------
P = 2732
sp = Image.new('RGB', (P, P), (255, 255, 255))
big = trim(render(1600))
fit = int(P * 0.40)
sc = min(fit / big.width, fit / big.height)
c = big.resize((int(big.width * sc), int(big.height * sc)), Image.LANCZOS)
sp.paste(c, ((P - c.width) // 2, (P - c.height) // 2), c)
sp.save(os.path.join(OUT, 'splash.png'))
sp.save(os.path.join(OUT, 'splash-dark.png'))
print('شاشة الإقلاع:', sp.size)
