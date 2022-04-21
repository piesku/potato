# See https://developers.google.com/speed/webp/download.
# On Ubuntu, install the `webp` package.

PNGS := $(wildcard *.png)
JPGS := $(wildcard *.jpg)
WEBPS := $(PNGS:%=%.webp) $(JPGS:%=%.webp)

all: spritesheet.png.webp

%.png.webp: %.png
	cwebp -short -z 9 $< -o $@

%.jpg.webp: %.jpg
	cwebp -short $< -o $@

spritesheet.png: $(PNGS)
	node spritesmith.cjs $^ $@ > spritesheet.json
