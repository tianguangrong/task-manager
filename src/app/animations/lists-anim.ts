import { trigger, transition, style, keyframes, state, query, stagger, animate } from '@angular/animations';

export const listAnim = trigger("list",[
    transition("* => *",[
        query(":enter",style({"opacity":"0"}),{optional:true}),
        query(":enter",stagger(100,[
            animate(".5s ease-in",style({"opacity":"1"}))
        ]),{optional:true}),
        query(":leave",style({"opacity":"1"}),{optional:true}),
        query(":leave",stagger(100,[
            animate(".5s ease-in-out",style({"opacity":"0"}))
        ]),{optional:true})
    ])
])