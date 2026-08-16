#!/usr/bin/env python3
"""Build OG image, favicon, and app icons from the brand logo."""
from pathlib import Path

from PIL import Image, ImageDraw, ImageFont

ROOT = Path(__file__).resolve().parents[1]
BRAND = ROOT / "public" / "brand"
PUBLIC = ROOT / "public"
APP = ROOT / "app"

NAVY = (0, 32, 80, 255)
ORANGE = (248, 96, 0, 255)
PAPER = (247, 243, 236, 255)
TAGLINE = "Povezana platforma za hrvatsko ugostiteljstvo."


def load_logo() -> Image.Image:
    for name in ("tablio-logo-on-dark.png", "tablio-logo.png"):
        path = BRAND / name
        if path.exists():
            return Image.open(path).convert("RGBA")
    raise SystemExit("brand logo not found")


def fit_width(image: Image.Image, width: int) -> Image.Image:
    ratio = width / image.width
    size = (width, max(1, round(image.height * ratio)))
    return image.resize(size, Image.Resampling.LANCZOS)


def crop_mark(logo: Image.Image) -> Image.Image:
    alpha = logo.split()[-1]
    cols = [x for x in range(logo.width) if alpha.crop((x, 0, x + 1, logo.height)).getextrema()[1] > 0]
    gap_start = cols[0]
    prev = cols[0]
    for x in cols:
        if x - prev > 20:
            gap_start = prev
            break
        prev = x
    mark = logo.crop((0, 0, gap_start + 8, logo.height))
    bbox = mark.getbbox()
    if bbox:
        mark = mark.crop(bbox)
    side = max(mark.size)
    square = Image.new("RGBA", (side, side), (0, 0, 0, 0))
    square.paste(mark, ((side - mark.width) // 2, (side - mark.height) // 2), mark)
    return square


def font(size: int) -> ImageFont.FreeTypeFont | ImageFont.ImageFont:
    for path in (
        "/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf",
        "/usr/share/fonts/truetype/liberation/LiberationSans-Regular.ttf",
    ):
        if Path(path).exists():
            return ImageFont.truetype(path, size)
    return ImageFont.load_default()


def write_og(logo: Image.Image) -> None:
    canvas = Image.new("RGBA", (1200, 630), NAVY)
    draw = ImageDraw.Draw(canvas)
    draw.rectangle((0, 0, 1200, 10), fill=ORANGE)
    wordmark = fit_width(logo, 720)
    x = (1200 - wordmark.width) // 2
    y = 170
    canvas.paste(wordmark, (x, y), wordmark)
    text_font = font(28)
    bbox = draw.textbbox((0, 0), TAGLINE, font=text_font)
    text_w = bbox[2] - bbox[0]
    draw.text(((1200 - text_w) // 2, y + wordmark.height + 36), TAGLINE, font=text_font, fill=PAPER)
    canvas.convert("RGB").save(PUBLIC / "og.png", "PNG", optimize=True)


def write_icons(mark: Image.Image) -> None:
    padded = Image.new("RGBA", (mark.width + 48, mark.height + 48), (0, 0, 0, 0))
    padded.paste(mark, (24, 24), mark)
    ico_sizes = [(16, 16), (32, 32), (48, 48)]
    ico_images = [padded.resize(size, Image.Resampling.LANCZOS) for size in ico_sizes]
    ico_images[0].save(PUBLIC / "favicon.ico", format="ICO", sizes=ico_sizes, append_images=ico_images[1:])
    APP.mkdir(exist_ok=True)
    padded.resize((32, 32), Image.Resampling.LANCZOS).save(APP / "icon.png", "PNG", optimize=True)
    padded.resize((180, 180), Image.Resampling.LANCZOS).save(APP / "apple-icon.png", "PNG", optimize=True)


def main() -> None:
    logo = load_logo()
    write_og(logo)
    write_icons(crop_mark(logo))
    print("wrote public/og.png public/favicon.ico app/icon.png app/apple-icon.png")


if __name__ == "__main__":
    main()
