<template>
    <canvas id="mainCanvas" ref="mainCanvas" width="1000" height="800"></canvas>
</template>
<script>
import GameImage from "../classes/GameImage";
import GamePlayer from "../classes/GamePlayer";
import KeyBoardPlayer from "../classes/KeyBoardPlayer";

export default {
    name: "GameCanvas",
    mounted() {
        this.mainCanvas = this.$refs.mainCanvas;
        this.ctx = this.mainCanvas.getContext('2d');
        this.keyBoardPlayer = new KeyBoardPlayer();
        this.gameImageData.map(({ role, src, alt, name, id, ...imageData }) => {
            const image = new Image();
            image.src = src;
            image.alt = alt;
            if (role === "player") {
                this.gameImages.push({ gamePlayer: new GamePlayer(name, id, image, ...Object.values(imageData)) });
            } else {
                this.gameImages.push({ gameImage: new GameImage(image, this.mainCanvas, ...Object.values(imageData)) });
            }
        })
        console.log(this.gameImages);
        this.refreshFrame()
    },
    data() {
        return {
            gameImageData: [
                {
                    role: "background",
                    src: "../assets/PC Computer - Among Us - Dropship Lobby.png",
                    alt: "ship background",
                    xSource: 10,
                    ySource: 15,
                    sourceWidth: 1220,
                    sourceHeight: 980,
                    xDest: 200,
                    yDest: 150,
                    destWidth: 1220 / 2,
                    destHeight: 980 / 2
                }
            ],
            gameImages: [],
            mainCanvas: null,
            ctx: null,
            keyBoardPlayer: null
        }
    },
    sockets: {
        connect() {
            console.log('socket connected')
        },
        newPlayer(data) {
            const newPlayerData = {
                ...data,
                role: "player",
                src: "../assets/Base/idle.png",
                alt: "player images",
                xSource: 10,
                ySource: 10,
                sourceWidth: 165,
                sourceHeight: 211,
                xDest: 400,
                yDest: 400,
                destWidth: 165 / 3.5,
                destHeight: 211 / 3.5
            };
            this.gameImageData.push(newPlayerData);
        }
    },
    methods: {
        addPlayer() {
        },
        displayGame() {

        },
        refreshFrame() {
            const frame = () => {
                this.ctx.clearRect(0, 0, this.mainCanvas.width, this.mainCanvas.height);
                this.ctx.fillStyle = "grey";
                this.ctx.font = "40px serif";
                this.ctx.fillText("Among uuuuuuuuuuuuuuuuus", 300, 100);
                this.keyBoardPlayer.keyPressEvent();
                this.gameImages.forEach((gameImage) => {
                    if (gameImage["gamePlayer"]) {
                        const { _initxDest, _inityDest } = gameImage.gamePlayer.getCoordDest();
                        this.ctx.fillStyle = "white";
                        this.ctx.font = "16px serif";
                        this.ctx.fillText(gameImage.gamePlayer._name, _initxDest + 10, _inityDest - 10);
                        gameImage.gamePlayer.move(this.keyBoardPlayer.keysPressed);
                    } else {
                        gameImage.gameImage.displayImage();
                    }
                });
                requestAnimationFrame(frame);
            }
            requestAnimationFrame(frame);
        }
    }
}
</script>
<style scoped>
#mainCanvas {
    border: 1px solid white;
}
</style>