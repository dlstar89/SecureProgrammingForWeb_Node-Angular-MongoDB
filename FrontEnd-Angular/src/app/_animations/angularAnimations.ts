import {
  animate,
  animation,
  style,
  trigger,
  transition,
  query,
  stagger
} from '@angular/animations';

export const routeAnimation =
  trigger('routerAnimation', [
    transition('* <=> *', [
      // Initial state of new route
      query(':enter',
        style({
          position: 'fixed',
          width: '100%',
          transform: 'translate3d(-100%,0,0)'
        }),
        { optional: true }),

      // move page off screen right on leave
      query(':leave',
        animate('500ms ease',
          style({
            position: 'fixed',
            width: '100%',
            opacity: 0,
            transform: 'translate3d(100%,0,0)'
          })
        ),
        { optional: true }),

      // move page in screen from left to right
      query(':enter',
        animate('800ms ease',
          style({
            opacity: 1,
            transform: 'translate3d(0%,0,0)'
          })
        ),
        { optional: true }),
    ])
  ]);

export const cardFadeIn =
  trigger('cardFadeIn', [
    transition('* <=> *', [
      query(':enter', style({ opacity: 0 }), { optional: true }),
      query(':enter', stagger('100ms', [animate('1s', style({ opacity: 1 }))]), { optional: true })
    ])
  ]);

export const buttonAnimation =
  trigger('buttonAnimation', [
    transition(':enter', [
      query('*', style({ opacity: 0, transform: 'translate3d(100%,0,0)' }), { optional: true }),
      query('*',
        animate('1000ms ease',
          style({
            opacity: 1,
            transform: 'translate3d(0%,0,0)'
          })),
        { optional: true })
    ]),
    transition(':leave', [
      query('*', style({ opacity: 1 }), { optional: true }),
      query('*',
        animate('1000ms ease',
          style({
            opacity: 0,
            transform: 'translate3d(100%,0,0)'
          })),
        { optional: true })
    ])
  ]);
