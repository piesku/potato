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

spritesheet.png: \
garnek11.png garnek12.png garnek13.png garnek14.png \
garnek21.png garnek22.png garnek23.png garnek24.png \
ziemniak_surowy.png ziemniak_obrany.png \
sloik.png
	montage -mode Concatenate -background transparent -tile 4x $+ $@
