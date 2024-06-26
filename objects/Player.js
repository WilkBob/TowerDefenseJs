export class Player{
    constructor(playerDefinition){
        //check local storage for player data
        
        this.name = playerDefinition.name;
        this.maxHealth = playerDefinition.health;
        this.health = playerDefinition.health;
        this.money = playerDefinition.money;
        this.score = playerDefinition.score;
        this.progress = playerDefinition.progress;
        //{wave: int, level: int, highscore: int}
        
    }

        save(){
            const def = {
                name: this.name,
                health: this.maxHealth,
                money: this.money,
                score: this.score,
                progress: this.progress
            }
            window.localStorage.setItem('player', JSON.stringify(def));
        }

        load(){
            const def = JSON.parse(window.localStorage.getItem('player'));
            if(!def) return;
            this.name = def.name;
            this.health = def.health;
            this.money = def.money;
            this.score = def.score;
            this.progress = def.progress;
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