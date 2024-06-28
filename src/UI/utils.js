import { towerDefinitions } from "../definitions/towers";
import { global } from "../../main.js";

export const createUIContainer = function() {
    const UIContainer = document.createElement('div');
    UIContainer.id = 'UIContainer';
    return UIContainer;
}


export const createStartMenu = function() {
    const startMenu = document.createElement('div');
    const title = createTitle();
    startMenu.appendChild(title);
    startMenu.id = 'startMenu';
return startMenu;
}

export const createStartButton = function() {
    const startButton = document.createElement('button');
    startButton.id = 'startButton';
    startButton.textContent = 'Start Game';
    return startButton;
}

export const createLevelSelectButton = function() {
    const levelSelectButton = document.createElement('button');
    levelSelectButton.id = 'levelSelectButton';
    levelSelectButton.textContent = 'Select Level';
    return levelSelectButton;
}

const createTitle = function() {
    const title = document.createElement('h1');
    title.id = 'title';
    title.textContent = 'Towers.js';
    return title;
}

export const createPauseButton = function() {
    const pauseButton = document.createElement('button');
    pauseButton.id = 'pauseButton';
    pauseButton.textContent = 'Pause Game';
    return pauseButton;
}



export const createTowerSelector = function() {
    const towerSelector = document.createElement('div');
    towerSelector.id = 'towerSelector';
    Object.values(towerDefinitions).forEach(tower => {
        // Create card container
        const towerCard = document.createElement('div');
        towerCard.classList.add('towerCard');

        // Create and append image to card
        const towerImg = document.createElement('img');
        towerImg.src = tower.icon;
        towerImg.classList.add('towerIcon');
        towerCard.appendChild(towerImg);

        // Create and append text to card
        const towerName = document.createElement('p');
        towerName.textContent = tower.name;
        towerCard.appendChild(towerName);

        const towerCost = document.createElement('p');
        towerCost.textContent = `$${tower.cost}`;
        towerCard.appendChild(towerCost);


        // Set card id
        towerCard.id = tower.name;

        // Add click event listener to card
        towerCard.addEventListener('click', () => {
            global.game.selectedTower = tower.key;
            // Remove 'active' class from all cards
            document.querySelectorAll('.towerCard').forEach(card => card.classList.remove('active'));
            // Add 'active' class to the clicked card
            towerCard.classList.add('active');
        });

        // Append card to towerSelector
        towerSelector.appendChild(towerCard);
    });
    return towerSelector;
}


export const createLevelSelectScreen = function() {
    const levelSelectScreen = document.createElement('div');
    levelSelectScreen.id = 'levelSelectScreen';
    const backButton = createLevelSelectBackButton();
    levelSelectScreen.appendChild(backButton);
    Object.values(global.levelDefinitions).forEach(level => {
        const levelCard = createLevelCard(level);
        levelSelectScreen.appendChild(levelCard);
    });
    
    return levelSelectScreen;
}


const createLevelCard = function(level) {
    const levelCard = document.createElement('div');
    levelCard.classList.add('levelCard');
    levelCard.id = level.name;
    const levelName = document.createElement('p');
    levelName.textContent = level.name;
    levelCard.appendChild(levelName);
    levelCard.addEventListener('click', () => {
        global.game.loadLevel(level.key);
    });
    return levelCard;
}

const createLevelSelectBackButton = function() {
    const backButton = document.createElement('button');
    backButton.className = 'backButton';
    backButton.textContent = 'Back';
    backButton.addEventListener('click', () => {
        global.game.ui.startMenu.show();
        global.game.ui.levelSelectScreen.hide();
    });
    return backButton;
}