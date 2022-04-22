# See https://developers.google.com/speed/webp/download.
# On Ubuntu, install the `webp` package.


all: spritesheet.png.webp

%.png.webp: %.png
	cwebp -short -z 9 $< -o $@

spritesheet.png: $(wildcard ../assets/*.png)
	node spritesmith.cjs $^ $@ > spritesheet.json
