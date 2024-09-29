let blocksContainer = document.querySelector(".memory-game-blocks");
let blocks = Array.from(blocksContainer.children);

document.querySelector(".game-controller span").onclick = function () {
    let yourName = prompt("Enter Your Name ?");

    if (yourName == null || yourName.trim() == "")
        yourName = "UnKnown";

    document.querySelector(".user-name > span").textContent = yourName;

    document.querySelector(".game-controller").remove()

    blocks.forEach((block) => {
        block.classList.add("is-fliped");
    })

    setTimeout(() => {
        blocks.forEach((block) => {
            block.classList.remove("is-fliped");
        })
    }, duration + 1000)

}

let duration = 1000;




let orderRange = [...Array(blocks.length).keys()];


function shuffle(array) {
    let current = array.length,
        random;
    while (current > 0) {
        random = Math.floor(Math.random() * current)
        current--;
        [array[current], array[random]] = [array[random], array[current]];
    }
    return array;
}

orderRange = shuffle(orderRange);

blocks.forEach((block, index) => {
    block.style.order = orderRange[index];

    block.addEventListener("click", () => {
        flipBlock(block)
    })
})

function flipBlock(selectedBlock) {
    selectedBlock.classList.add("is-fliped");

    let allFlipedBlocks = blocks.filter((block) => block.classList.contains("is-fliped"))

    if (allFlipedBlocks.length === 2) {

        // remove click event
        stopClicking();

        // check matching
        checkMatchedBlocks(allFlipedBlocks[0], allFlipedBlocks[1]);
    }
}

function stopClicking() {
    blocksContainer.classList.add("no-clicking");
    setTimeout(() => {
        blocksContainer.classList.remove("no-clicking")
    }, duration)
}

function checkMatchedBlocks(firstBlock, secondBlock) {
    let tries = document.querySelector(".tries > span")

    if (firstBlock.dataset.image === secondBlock.dataset.image) {
        firstBlock.classList.remove("is-fliped");
        secondBlock.classList.remove("is-fliped");

        firstBlock.classList.add("is-matched");
        secondBlock.classList.add("is-matched");

        document.querySelector("#succes").play();
    } else {
        tries.textContent = parseInt(tries.textContent) + 1;
        document.querySelector("#failed").play();
        setTimeout(() => {
            firstBlock.classList.remove("is-fliped");
            secondBlock.classList.remove("is-fliped");
        }, duration)
    }
}