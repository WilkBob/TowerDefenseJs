# Tower Defense JS 🏰

Tower Defense JS is a browser-based game developed using Vite and Vanilla JavaScript. This project is structured to provide a clear separation of concerns, making it easier to understand and extend.
To play, go here: https://wilkbob.github.io/TowerDefenseJs/
Currently, the level system is incomplete. Press l, k, and j to spawn enemies, and m to add money!

## Project Structure 📂

The project is organized into several key directories:

- `src/definitions/`: Contains the definitions for enemies, towers, levels, and the player. These definitions are crucial for setting up the game's entities and their behaviors.

  - `colors.js`: Defines the color palette used throughout the game. 🎨
  - `enemies.js`: Contains the definitions for enemy types. 👾
  - `levels.js`: Holds the configurations for different game levels. 📊
  - `newplayer.js`: Specifies the properties of the player. 🧍
  - `towers.js`: Defines the types of towers available for defense. 🗼

- `src/objects/`: Houses the classes that represent the game's objects, including the player, enemies, and towers. These classes are responsible for the dynamic aspects of the game.

  - `Bullet.js`: Represents the bullets shot by towers. 🚀
  - `Clickmask.js`: Handles click interactions. 🖱️
  - `Enemy.js`: The class for enemy entities. 👹
  - `Game.js`: Contains the main game logic and orchestrates the game's flow. 🕹️
  - `Player.js`: Represents the player character. 🧑‍🚀
  - `SpriteSheet.js`: Manages sprite sheets for animations. 🎞️
  - `Tower.js`: The class for tower entities. 🏹

- `src/UI/`: Contains UI components like health bars, buttons, and menus, which include a mix of DOM and canvas elements. 🖼️

- `main.js`: The entry point of the application. It initializes the game and ties together the various components. 🚀

## Built With 🛠️

- **Vite**: Utilized for its fast build times and out-of-the-box support for modern JavaScript features, making development smoother and more efficient. ⚡
- **Vanilla JavaScript**: Keeps the project lightweight and straightforward, focusing on the core gameplay mechanics without the overhead of additional frameworks. 🍦

## Running the Game 🎮

To run Tower Defense JS, you need to have Node.js installed. After cloning the repository, navigate to the project directory and run the following commands:

```sh
npm install
npm run dev
```
