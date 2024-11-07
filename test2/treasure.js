class TreasureMap {
  static getInitialClue() {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve("在古老的图书馆里找到了第一个线索...");
      }, 1000);
    });
  }

  static decodeAncientScript(clue) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (!clue) {
          reject("没有线索可以解码!");
        }
        resolve("解码成功!宝藏在一座古老的神庙中...");
      }, 1500);
    });
  }

  static searchTemple() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const random = Math.random();
        if (random < 0.5) {
          reject("糟糕!遇到了神庙守卫!");
        }
        resolve("找到了一个神秘的箱子...");
      }, 2000);
    });
  }

  static openTreasureBox() {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve("恭喜!你找到了传说中的宝藏!");
      }, 1000);
    });
  }
}


document.getElementById('book').addEventListener('click', async () => {
  const clue = await TreasureMap.getInitialClue();
  displayClue(clue, true, async () => {
    const decodedClue = await TreasureMap.decodeAncientScript(clue);
    displayClue(decodedClue, false);
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