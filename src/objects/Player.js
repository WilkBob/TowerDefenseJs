export class Player{
    constructor(playerDefinition){
        //check local storage for player data
        
        this.name = playerDefinition.name;
        this.maxHealth = playerDefinition.health;
        this.health = playerDefinition.health;
        this.money = playerDefinition.money;
        this.startingMoney = playerDefinition.money;
        this.score = playerDefinition.score;
        this.progress = playerDefinition.progress;
        //{wave: int, level: int, highscore: int}

        console.log(this.progress);
        console.log('player created');
        
    }

        save(){
            const def = {
                name: this.name,
                health: this.maxHealth,
                progress: this.progress
            }
            window.localStorage.setItem('player', JSON.stringify(def));
        }

        load(){
            const def = JSON.parse(window.localStorage.getItem('player'));
            if(!def) return;
            this.name = def.name;
            if(this.name === 'Player' || this.name === 'player'){
                this.name = prompt('Enter your name');
                if(!this.name){
                    this.name = 'Player';
                }
                this.save();
            }
            this.score = def.score;
            this.progress = def.progress;

        }

        reset(){
            this.health = this.maxHealth;
            this.money = this.startingMoney;
            this.score = 0;
        }

        takeDamage(damage){
            this.health -= damage;
            if(this.health <= 0){
                this.health = 0;
                //game over
            }
        }

        heal(amount){
            if(!this.health >= this.maxHealth){
                this.health += amount;
            }
        }

        addMoney(amount){
            this.money += amount;
        }

        removeMoney(amount){
            this.money -= amount;
        }

        addScore(amount){
            this.score += amount;
        }

        setProgress(wave, level, highscore){
            this.progress.wave = wave;
            this.progress.level = level;
            this.progress.highscore = highscore;
        }
        

}