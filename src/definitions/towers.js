import tower from "@images/sprites/tower.png";
import towerIcon from "@images/sprites/tower_icon.png";
import tower2 from "@images/sprites/tower2.png";
import tower2Icon from "@images/sprites/tower2_icon.png";

export const towerDefinitions = {
    "shooter": {
        "name": "Shooter",
        "key": "shooter",
        "cost": 350,
        "damage": 30,
        "fireRate": 1000,
        "range": .24,
        "size": 128,
        "spritesheet": {
            "src": "@images/sprites/tower.png",
            "image": tower,
            "size": 128,
            "frames": 24,
            "fac": 1.8
        },
        "icon": towerIcon,
    },
    "sprayer": {
        "name": "Sprayer",
        "key": "sprayer",
        "cost": 600,
        "damage": 2,
        "fireRate": 125,
        "range": .3,
        "size": 128,
        "spritesheet": {
            "src": "@images/sprites/tower2.png",
            "image": tower2,
            "size": 128,
            "frames": 24,
            "fac": 1.8
        },
        "icon": tower2Icon,
    }
} 