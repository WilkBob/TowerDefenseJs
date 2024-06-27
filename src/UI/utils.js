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
