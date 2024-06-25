import zombie from '/images/sprites/zombie.png';
import zombieDeath from '/images/sprites/zombieDeath.png';

export const enemyDefinitions = {
    zombie: {
        name: 'Zombie',
        key: 'zombie',
        health: 30,
        damage: 10,
        speed: 2,
        reward: 30,
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
    }
}
