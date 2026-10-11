## Audio Composition

for the midi compositor/compiler

```sh
sudo apt install lilypond
```

for the midi player

```sh
sudo apt install timidity
```

to compile the jingle

```sh
cd ./animations
lilypond ./boing.ly
```

to play the jingle

```sh
timidity ./boing.ly
```
> or just make sure that timidity is the default app to open midi files, then double click the file to open with the player

to compile and play the jingle

```sh
lilypond ./boing.ly && timidity ./boing.midi
```

dependencies to export the sound
```sh
sudo apt install fluidsynth fluid-soundfont-gm
```

to export the sound
```sh
fluidsynth -ni /usr/share/sounds/sf2/FluidR3_GM.sf2 boing.midi -F boing.wav -r 44100
```