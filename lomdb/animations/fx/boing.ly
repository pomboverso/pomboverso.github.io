\version "2.24.2"

\header {
  title = "Boing"
  subtitle = "Bouncing Letters"
  composer = "Pombo"
}

\score {
  \new Staff {
    \clef treble
    \key c \major
    \time 4/4
    \tempo 4 = 80
    \set Staff.midiInstrument = #"orchestral harp"
    % orchestral harp, sitar, marimba, kalimba

    e''8
    c''8
    g'8
    c''8
    e''8.
  }
  \layout { }
  \midi { }
}
