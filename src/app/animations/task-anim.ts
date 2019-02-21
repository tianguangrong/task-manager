import { trigger, stagger, state, style, animate, keyframes, transition } from '@angular/animations';

export const taskAnims = trigger("itemState",[
    state("hover",style({"border-left-width":"5px"})),
    state("out",style({"border-left-width":"3px"})),
    transition("hover => out",animate(".01s ease-in")),
    transition("out => hover",animate(".01s ease-out"))
])