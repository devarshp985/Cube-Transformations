import { context } from 'react-three-fiber';
import { createMachine, assign } from 'xstate';
import { send } from 'xstate';
import { raise } from 'xstate/lib/actions';

const cubeMachine = createMachine(
  {
    id: 'cube',
    predictableActionArguments: true,
    initial: 'idle',
    context: {
      goalPosition: {
        x: 0,
        y: 0,
        z: 0,
      },
      goalRotation: {
        x: 0,
        y: 0,
        z: 0,
      },
      currentPosition: {
        x: 0,
        y: 0,
        z: 0,
      },
      currentRotation: {
        x: 0,
        y: 0,
        z: 0,
      },
      startPosition: {
        x: 0,
        y: 0,
        z: 0,
      },
      startRotation: {
        x: 0,
        y: 0,
        z: 0,
      },
      schedule: {
        cards: [],
      },
      scheduleRunning: false,
    },
    states: {
      idle: {
        entry: ['setScheduleRunning', send({ type: 'SCHEDULERUNNING' })],
        on: {
          SCHEDULERUNNING: [
            {
              target: 'waiting',
              cond: (context, event) => {
                if (context.scheduleRunning) {
                  return true;
                } else {
                  return false;
                }
              },
            },
          ],
          UPDATESCHEDULE: {
            actions: assign((context, event) => {
              var { scheduleCards } = event;
              return {
                schedule: {
                  cards: scheduleCards,
                },
              };
            }),
          },
          SETPOS: {
            actions: assign((context, event) => {
              var { x, y, z } = event;
              return {
                goalPosition: {
                  x: x !== undefined ? x : context.goalPosition.x,
                  y: y !== undefined ? y : context.goalPosition.y,
                  z: z !== undefined ? z : context.goalPosition.z,
                },
                goalRotation: context.goalRotation,
              };
            }),
          },
          SETROT: {
            actions: assign((context, event) => {
              var { x, y, z } = event;
              return {
                goalPosition: context.goalPosition,
                goalRotation: {
                  x: x !== undefined ? x : context.goalRotation.x,
                  y: y !== undefined ? y : context.goalRotation.y,
                  z: z !== undefined ? z : context.goalRotation.z,
                },
              };
            }),
          },
          RUNSCHEDULE: {
            actions: assign((context, event) => {
              var { run } = event;
              return {
                scheduleRunning: run,
              };
            }),
            target: 'waiting',
            internal: false,
          },
          EXECUTE: {
            target: 'inProgress',
          },
        },
      },
      inProgress: {
        entry: console.log('In progress state'),
        on: {
          UPDATESCHEDULE: {
            actions: assign((context, event) => {
              var { scheduleCards } = event;
              return {
                schedule: {
                  cards: scheduleCards,
                },
              };
            }),
          },
          MOVING: {
            actions: assign((context, event) => {
              var { x, y, z } = event;
              return {
                currentPosition: {
                  x: x !== undefined ? x : context.currentPosition.x,
                  y: y !== undefined ? y : context.currentPosition.y,
                  z: z !== undefined ? z : context.currentPosition.z,
                },
                currentRotation: context.currentRotation,
              };
            }),
          },
          ROTATING: {
            actions: assign((context, event) => {
              var { x, y, z } = event;
              return {
                currentPosition: context.currentPosition,
                currentRotation: {
                  x: x !== undefined ? x : context.currentRotation.x,
                  y: y !== undefined ? y : context.currentRotation.y,
                  z: z !== undefined ? z : context.currentRotation.z,
                },
              };
            }),
          },
          SETSTARTROT: {
            actions: assign((context, event) => {
              var { x, y, z } = event;
              return {
                startPosition: context.startPosition,
                startRotation: {
                  x: x !== undefined ? x : context.startRotation.x,
                  y: y !== undefined ? y : context.startRotation.y,
                  z: z !== undefined ? z : context.startRotation.z,
                },
              };
            }),
          },
          SETSTARTPOS: {
            actions: assign((context, event) => {
              var { x, y, z } = event;
              return {
                startPosition: {
                  x: x !== undefined ? x : context.startPosition.x,
                  y: y !== undefined ? y : context.startPosition.y,
                  z: z !== undefined ? z : context.startPosition.z,
                },
                startRotation: context.startRotation,
              };
            }),
          },
          FINISHED: {
            target: 'idle',
          },
        },
      },
      waiting: {
        entry: [
          'updateNextPos',
          'updateNextRot',
          'updateSchedule',
          send({ type: 'RUNNEXT' }),
        ],
        on: {
          RUNNEXT: {
            target: 'inProgress',
          },
        },
      },
    },
  },
  {
    actions: {
      updateNextPos: assign((context, event) => {
        var x = context.startPosition.x + context.schedule.cards[0].px;
        var y = context.startPosition.y + context.schedule.cards[0].py;
        var z = context.startPosition.z + context.schedule.cards[0].pz;
        return {
          goalPosition: {
            x: x !== undefined ? x : context.goalPosition.x,
            y: y !== undefined ? y : context.goalPosition.y,
            z: z !== undefined ? z : context.goalPosition.z,
          },
        };
      }),
      updateNextRot: assign((context, event) => {
        var x = context.startRotation.x + context.schedule.cards[0].rx;
        var y = context.startRotation.y + context.schedule.cards[0].ry;
        var z = context.startRotation.z + context.schedule.cards[0].rz;
        return {
          goalRotation: {
            x: x !== undefined ? x : context.goalRotation.x,
            y: y !== undefined ? y : context.goalRotation.y,
            z: z !== undefined ? z : context.goalRotation.z,
          },
        };
      }),
      updateSchedule: assign((context, event) => {
        let newCards = context.schedule.cards;
        if (newCards.length === 1) {
          newCards = [];
        } else {
          newCards.shift();
        }
        return {
          schedule: {
            cards: newCards,
          },
        };
      }),
      setScheduleRunning: assign((context, event) => {
        if (context.schedule.cards.length === 0) {
          return {
            scheduleRunning: false,
          };
        }
      }),
    },
  }
);

export default cubeMachine;
