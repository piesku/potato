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

spritesheet.png: ziemniak_surowy.png ziemniak_obrany.png ziemniak_gibs.png
	montage -background transparent -tile 8x8 -geometry 32x32+0+0 $+ $@
