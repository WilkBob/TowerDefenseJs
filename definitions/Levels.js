export  const levelDefinitions = {
    level1: {
        name: 'Level 1',
        reward: 1000,
        path1: 
            [
                {
                    "x": 0,
                    "y": 0.4560546875
                },
                {
                    "x": 0.3330078125,
                    "y": 0.4541015625
                },
                {
                    "x": 0.3271484375,
                    "y": 0.1416015625
                },
                {
                    "x": 0.7080078125,
                    "y": 0.142578125
                },
                {
                    "x": 0.7119140625,
                    "y": 0.64453125
                },
                {
                    "x": 1,
                    "y": 0.64453125
                }
            ],
        
        path2: [
            {
                "x": 0.767578125,
                "y": 0.0048828125
            },
            {
                "x": 0.7705078125,
                "y": 0.1435546875
            },
            {
                "x": 0.33203125,
                "y": 0.14453125
            },
            {
                "x": 0.3359375,
                "y": 0.453125
            },
            {
                "x": 0.2353515625,
                "y": 0.455078125
            },
            {
                "x": 0.234375,
                "y": 0.830078125
            },
            {
                "x": 0.70703125,
                "y": 0.8251953125
            },
            {
                "x": 0.703125,
                "y": 0.64453125
            },
            {
                "x": 0.998046875,
                "y": 0.6435546875
            }
        ],

        waves: [
            {
                path1: [
                    { enemy: 'zombie', count: 10, interval: 1000 }
                ],
                path2: [
                    
                ]
            },
            {
                path1: [
                    
                ],
                path2: [
                    { enemy: 'zombie', count: 10, interval: 800 }
                ]
            },
            {
                path1: [
                    { enemy: 'zombie', count: 10, interval: 800 }
                ],
                path2: [
                    { enemy: 'zombie', count: 5, interval: 500 }
                ]
            },
            {
                path1: [
                    { enemy: 'bigZombie', count: 1, interval: 1000 }
                ],
                path2: [
                    { enemy: 'zombie', count: 10, interval: 800}
                ]
            },
            {
                path1: [
                    { enemy: 'zombie', count: 10, interval: 500 },
                    { enemy: 'bigZombie', count: 1, interval: 1000}
                ],
                path2: [
                    { enemy: 'zombie', count: 10, interval: 500 },
                    { enemy: 'bigZombie', count: 1, interval: 1000 }
                ]
            },
            {
                path1: [
                    { enemy: 'zombie', count: 20, interval: 200 }
                ],
                path2: [
                    { enemy: 'zombie', count: 20, interval: 200 }
                ]
            }
        ]
    }
}