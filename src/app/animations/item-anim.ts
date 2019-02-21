import { trigger, transition, state, style, animate, keyframes } from '@angular/animations';

export const itemAnims = trigger("card",[
    state("out",style({"transform":"scale(1)","box-shadow":"none"})),
    state("in",style({"transform":"scale(1.1)","box-shadow":"2px 2px 8px 2px black"})),
    transition("out => in",animate(".2s ease-in")),
    transition("in => out",animate(".2s ease-out"))
])