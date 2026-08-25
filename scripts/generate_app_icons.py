from PIL import Image, ImageDraw
from pathlib import Path

src_path = Path(
    r"C:\Users\Shubham Pandey\.cursor\projects\c-Users-Shubham-Pandey-Desktop-GutenbergProject\assets\gutenberg-app-icon.png"
)
root = Path(r"C:\Users\Shubham Pandey\Desktop\GutenbergProject")
img = Image.open(src_path).convert("RGBA")

w, h = img.size
side = min(w, h)
left = (w - side) // 2
top = (h - side) // 2
img = img.crop((left, top, left + side, top + side))


def resize(size: int) -> Image.Image:
    return img.resize((size, size), Image.Resampling.LANCZOS)


def make_round(size: int) -> Image.Image:
    base = resize(size)
    mask = Image.new("L", (size, size), 0)
    draw = ImageDraw.Draw(mask)
    draw.ellipse((0, 0, size - 1, size - 1), fill=255)
    out = Image.new("RGBA", (size, size), (0, 0, 0, 0))
    out.paste(base, (0, 0), mask=mask)
    return out


android = {
    "mipmap-mdpi": 48,
    "mipmap-hdpi": 72,
    "mipmap-xhdpi": 96,
    "mipmap-xxhdpi": 144,
    "mipmap-xxxhdpi": 192,
}
res = root / "android" / "app" / "src" / "main" / "res"
for folder, size in android.items():
    d = res / folder
    d.mkdir(parents=True, exist_ok=True)
    resize(size).save(d / "ic_launcher.png", optimize=True)
    make_round(size).save(d / "ic_launcher_round.png", optimize=True)
    print(f"android {folder} {size}")

adaptive = res / "mipmap-anydpi-v26"
adaptive.mkdir(parents=True, exist_ok=True)
(adaptive / "ic_launcher.xml").write_text(
    """<?xml version="1.0" encoding="utf-8"?>
<adaptive-icon xmlns:android="http://schemas.android.com/apk/res/android">
    <background android:drawable="@color/ic_launcher_background"/>
    <foreground android:drawable="@mipmap/ic_launcher_foreground"/>
</adaptive-icon>
""",
    encoding="utf-8",
)
(adaptive / "ic_launcher_round.xml").write_text(
    """<?xml version="1.0" encoding="utf-8"?>
<adaptive-icon xmlns:android="http://schemas.android.com/apk/res/android">
    <background android:drawable="@color/ic_launcher_background"/>
    <foreground android:drawable="@mipmap/ic_launcher_foreground"/>
</adaptive-icon>
""",
    encoding="utf-8",
)

values = res / "values"
(values / "ic_launcher_background.xml").write_text(
    """<?xml version="1.0" encoding="utf-8"?>
<resources>
    <color name="ic_launcher_background">#F8F7FF</color>
</resources>
""",
    encoding="utf-8",
)

fg_sizes = {
    "mipmap-mdpi": 108,
    "mipmap-hdpi": 162,
    "mipmap-xhdpi": 216,
    "mipmap-xxhdpi": 324,
    "mipmap-xxxhdpi": 432,
}
for folder, size in fg_sizes.items():
    resize(size).save(res / folder / "ic_launcher_foreground.png", optimize=True)
    print(f"fg {folder} {size}")

ios_dir = root / "ios" / "GutenbergProject" / "Images.xcassets" / "AppIcon.appiconset"
ios_dir.mkdir(parents=True, exist_ok=True)
ios_icons = {
    "Icon-App-20x20@2x.png": 40,
    "Icon-App-20x20@3x.png": 60,
    "Icon-App-29x29@2x.png": 58,
    "Icon-App-29x29@3x.png": 87,
    "Icon-App-40x40@2x.png": 80,
    "Icon-App-40x40@3x.png": 120,
    "Icon-App-60x60@2x.png": 120,
    "Icon-App-60x60@3x.png": 180,
    "Icon-App-1024x1024@1x.png": 1024,
}
for name, size in ios_icons.items():
    resize(size).convert("RGB").save(ios_dir / name, format="PNG", optimize=True)
    print(f"ios {name}")

print("done")
