// 用于存储从文件加载的游戏资产
let gameAssets = {};

// 用于存储玩家信息
let playerInfo = {
  playerId: '',
  nickname: '',
  gameHistory: []
};

// 异步加载游戏资产
async function loadGameAssets() {
  try {
    const response = await fetch('game.assets.txt');
    const data = await response.text();
    const lines = data.split('\n');
    lines.forEach(line => {
      const [key, value] = line.split(': ');
      gameAssets[key] = value;
    });
  } catch (error) {
    console.error('Error loading game assets:', error);
  }
}

// 从Web Storage加载玩家信息
function loadPlayerInfo() {
  const storedPlayerInfo = localStorage.getItem('playerInfo');
  if (storedPlayerInfo) {
    playerInfo = JSON.parse(storedPlayerInfo);
  }
}

// 保存玩家信息到Web Storage
function savePlayerInfo() {
  localStorage.setItem('playerInfo', JSON.stringify(playerInfo));
}

// 确保在页面加载时加载游戏资产和玩家信息
document.addEventListener('DOMContentLoaded', () => {
  loadGameAssets();
  loadPlayerInfo();
});


// 确保在页面加载时加载游戏资产
document.addEventListener('DOMContentLoaded', loadGameAssets);

class TreasureMap {
  static getInitialClue() {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(gameAssets.library);
      }, 1000);
    });
  }

  static decodeAncientScript(clue) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (!clue) {
          reject(gameAssets.error);
        }
        resolve(gameAssets.temple);
      }, 1500);
    });
  }

  static searchTemple() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const random = Math.random();
        if (random < 0.5) {
          reject(gameAssets.guard);
        }
        resolve(gameAssets.box);
      }, 2000);
    });
  }

  static openTreasureBox() {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(gameAssets.treasure);
      }, 1000);
    });
  }
}

// 初始化玩家信息
function initializePlayerInfo(playerId, nickname) {
  playerInfo.playerId = playerId;
  playerInfo.nickname = nickname;
  savePlayerInfo();
}

// 更新游戏历史
function updateGameHistory(step) {
  playerInfo.gameHistory.push(step);
  savePlayerInfo();
}


document.getElementById('book').addEventListener('click', async () => {
  const clue = await TreasureMap.getInitialClue();
  displayClue(clue, true, async () => {
    try {
      const decodedClue = await TreasureMap.decodeAncientScript(clue);
      displayClue(decodedClue, true, async () => {
        try {
          const templeResult = await TreasureMap.searchTemple();
          displayClue(templeResult, true, async () => {
            const treasureResult = await TreasureMap.openTreasureBox();
            displayClue(treasureResult, false);
          });
        } catch (error) {
          displayClue(error, false);
        }
      });
    } catch (error) {
      displayClue(error, false);
    }
  });
});


function displayClue(text, clickable = true, onNext = null) {
  const dialogueBox = document.getElementById('dialogue-box');
  const output = document.getElementById('output');
  const nextButton = document.getElementById('next-button');

  output.textContent = text;
  dialogueBox.style.display = 'block';

  if (clickable) {
    nextButton.style.display = 'block';
    nextButton.onclick = () => {
      dialogueBox.style.display = 'none';
      nextButton.style.display = 'none';
      if (onNext) {
        onNext();
      }
    };
  } else {
    nextButton.style.display = 'none';
    dialogueBox.onclick = null; // Remove the click event if not clickable
  }
}