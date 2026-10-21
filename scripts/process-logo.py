"""Cut the white background out of the supplied logo and export web assets.

Usage: python3 -I scripts/process-logo.py <source-image> <output-dir>
"""
import sys
from collections import deque
from PIL import Image, ImageFilter

src, out = sys.argv[1], sys.argv[2]
img = Image.open(src).convert("RGBA")
w, h = img.size
px = img.load()

def whiteness(p):
    # Already-transparent pixels count as background too.
    return 255 if p[3] < 20 else min(p[0], p[1], p[2])

# Flood fill from the border through near-white pixels only.
bg = bytearray(w * h)
q = deque()
for x in range(w):
    q.append((x, 0)); q.append((x, h - 1))
for y in range(h):
    q.append((0, y)); q.append((w - 1, y))
TH = 228
while q:
    x, y = q.popleft()
    i = y * w + x
    if bg[i] or whiteness(px[x, y]) < TH:
        continue
    bg[i] = 1
    if x > 0: q.append((x - 1, y))
    if x < w - 1: q.append((x + 1, y))
    if y > 0: q.append((x, y - 1))
    if y < h - 1: q.append((x, y + 1))

mask = Image.frombytes("L", (w, h), bytes(0 if b else 255 for b in bg))
# Soften the cut edge slightly so it anti-aliases on dark backgrounds.
mask = mask.filter(ImageFilter.MinFilter(3)).filter(ImageFilter.GaussianBlur(0.8))
from PIL import ImageChops
img.putalpha(ImageChops.darker(img.getchannel("A"), mask))
img = img.crop(img.getbbox())

img.save(f"{out}/logo-full.png", optimize=True)
for width in (320, 640, 1200):
    r = img.resize((width, round(img.height * width / img.width)), Image.LANCZOS)
    r.save(f"{out}/logo-{width}.webp", quality=90, method=6)
    r.save(f"{out}/logo-{width}.png", optimize=True)
print("logo", img.size)

# Tighten the crop to visible pixels and derive icons + social preview.
alpha = img.getchannel("A").point(lambda a: 255 if a > 10 else 0)
img = img.crop(alpha.getbbox())
img.save(f"{out}/logo-full.png", optimize=True)

def square(size, pad=0.06, bg=(5, 5, 5, 255)):
    canvas = Image.new("RGBA", (size, size), bg)
    inner = int(size * (1 - 2 * pad))
    scale = inner / max(img.width, img.height)
    r = img.resize((round(img.width * scale), round(img.height * scale)), Image.LANCZOS)
    canvas.alpha_composite(r, ((size - r.width) // 2, (size - r.height) // 2))
    return canvas

app_dir = sys.argv[3] if len(sys.argv) > 3 else None
if app_dir:
    square(512, 0.03).save(f"{app_dir}/icon.png", optimize=True)
    square(180, 0.03).save(f"{app_dir}/apple-icon.png", optimize=True)
    square(48, 0.0).save(f"{app_dir}/favicon.ico", sizes=[(16, 16), (32, 32), (48, 48)])
    og = Image.new("RGBA", (1200, 630), (5, 5, 5, 255))
    glow = Image.new("RGBA", (1200, 630), (0, 0, 0, 0))
    from PIL import ImageDraw
    d = ImageDraw.Draw(glow)
    d.ellipse((250, 120, 950, 640), fill=(225, 6, 0, 90))
    glow = glow.filter(ImageFilter.GaussianBlur(120))
    og.alpha_composite(glow)
    scale = 560 / img.height
    r = img.resize((round(img.width * scale), 560), Image.LANCZOS)
    og.alpha_composite(r, ((1200 - r.width) // 2, 35))
    og.convert("RGB").save(f"{app_dir}/opengraph-image.jpg", quality=88)
