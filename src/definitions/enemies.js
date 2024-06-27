import zombie from '/images/sprites/zombie.png';
import zombieDeath from '/images/sprites/zombieDeath.png';
import roller from '/images/sprites/roller.png';
import rollerDeath from '/images/sprites/rollerDeath.png';

export const enemyDefinitions = {
    zombie: {
        name: 'Zombie',
        key: 'zombie',
        health: 45,
        damage: 10,
        speed: 2,
        reward: 40,
        size: 128,
        spritesheet: {
            src: '/images/sprites/zombie.png',
            image: zombie,
            size: 128,
            frames: 24,
            fac: 0.8
        },

        animations: {
            death: {
                src: '/images/sprites/zombieDeath.png',
                image: zombieDeath,
                size: 128,
                frames: 24,
                fac: 0.8
            }
        },

        messages: {
            death: ['braaii-aaagghh', 'ergghh', 'bleeeegh', '(Moans) Sarah... where...?', '(Whines)* Light... makes head hurt...', "The hunger... fades...", 'The light... it burns...', `I hate you... I hate you... I hate you`],
            hit: ['argh', 'ouch', 'oww'],
            spawn: ['braiinss', 'braaaiiinnnsss', 'Fresh meat... everywhere...', 'huuuungryyy'],
            confusion: [],
            taunt: ['You next... yummy brains...', 'Die living ones...', '(Reaching out)* "Come closer..."'],
            hitTower: ['GRAHAHAHA', 'Must break tower! Brains behind!', 'Brains... so close...']
          }
    },
    bigZombie: {
        name: 'Big Zombie',
        key: 'bigZombie',
        health: 200,
        damage: 20,
        speed: 1.5,
        reward: 100,
        size: 128,
        spritesheet: {
            src: '/images/sprites/zombie.png',
            image: zombie,
            size: 256,
            frames: 24,
            fac: 1.2
        },

        animations: {
            death: {
                src: '/images/sprites/zombieDeath.png',
                image: zombieDeath,
                size: 128,
                frames: 24,
                fac: 1.2
            }
        },

        messages: {
            death: [`thud...`, 'ugh... *BOOM*', ],
            hit: ['argh', 'ouch', 'oww'],
            spawn: ['braiinss', 'braaaiiinnnsss', 'Fresh meat... everywhere...', 'huuuungryyy'],
            confusion: [],
            taunt: ['You next... yummy brains...', 'Die living ones...', '(Reaching out)* "Come closer..."'],
            hitTower: ['CRUSH', `OBLITERATE`, `DESTROY`]
          }
    },

    roller: {
        name: 'Roller',
        key: 'roller',
        health: 100,
        damage: 50,
        speed: 3,
        reward: 150,
        size: 128,
        spritesheet: {
            src: '/images/sprites/roller.png',
            image: roller,
            size: 128,
            frames: 24,
            fac: 0.6
        },

        animations: {
            death: {
                src: '/images/sprites/rollerDeath.png',
                image: rollerDeath,
                size: 128,
                frames: 24,
                fac: 0.6
            }
        },

        messages: {
            death: [`thud...`, 'ugh... *BOOM*', ],
            hit: ['clink', 'clang', 'crash'],
            spawn: ['*rolling noises*', 'Rolling in...', '*ominous rolling*'],
            hitTower: ['*BOOM*', '*CRASH*', '*CRUNCH*']
        }
    }
}
