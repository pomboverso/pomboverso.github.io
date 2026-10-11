\version "2.24.2"

\header {
  title = "Celestial Fade-out"
  subtitle = "Celestial Fade-out"
  composer = "Pombo"
}

\score {
  \new Staff {
    \clef treble
    \key c \major
    \time 4/4
    \tempo 4 = 60
    \set Staff.midiInstrument = #"choir aahs"

    c'4
  }
  \layout { }
  \midi { }
}
