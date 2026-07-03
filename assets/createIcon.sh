sizes=(
  16   # favicon
  24
  32   # favicon
  48   # favicon / Windows
  64   # generic
  128  # generic
  180  # Apple touch icon
  192  # PWA / Android
  256  # high DPI
  512  # PWA
  1024 # master source
)
files=("icon")

for f in "${files[@]}"; do
  for s in "${sizes[@]}"; do
    convert \
      -background none \
      -alpha on \
      "${f}.svg" \
      -resize "${s}x${s}" \
      "${f}_${s}x${s}.png"
  done
done
