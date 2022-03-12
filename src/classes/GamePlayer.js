let _initxDest = 400;
let _inityDest = 400;
const dirPath = "../assets/Base/walk/";
import GameImage from "./GameImage";
export default class GamePlayer extends GameImage {
    constructor(name, id, img, xSource, ySource, sourceWidth, sourceHeight, xDest, yDest, destWidth, destHeight) {
        super(img, xSource, ySource, sourceWidth, sourceHeight, _initxDest, _inityDest, destWidth, destHeight)
        this._speed = 3;
        this._name = name;
        this._id = id;
        this._walkSprites = [
            `${dirPath}Walk0001.png`,
            `${dirPath}Walk0002.png`,
            `${dirPath}Walk0003.png`,
            `${dirPath}Walk0004.png`,
            `${dirPath}Walk0005.png`,
            `${dirPath}Walk0006.png`,
            `${dirPath}Walk0007.png`,
            `${dirPath}Walk0008.png`,
            `${dirPath}Walk0009.png`,
            `${dirPath}Walk0010.png`,
            `${dirPath}Walk0011.png`,
            `${dirPath}Walk0012.png`,
        ];
    }
    move(keysPressed) {
        if (keysPressed.includes("ArrowUp")) {
            if (keysPressed.includes("ArrowRight")) {
                _initxDest += this._speed / 2.5;

            } else if (keysPressed.includes("ArrowLeft")) {
                _initxDest -= this._speed / 2.5;
            }
            _inityDest -= this._speed;
        }
        if (keysPressed.includes("ArrowDown")) {
            if (keysPressed.includes("ArrowRight")) {
                _initxDest += this._speed / 2.5;

            } else if (keysPressed.includes("ArrowLeft")) {
                _initxDest -= this._speed / 2.5;
            }
            _inityDest += this._speed;
        }

        if (keysPressed.includes("ArrowLeft")) {
            if (keysPressed.includes("ArrowDown")) {
                _inityDest += this._speed / 2.5;

            } else if (keysPressed.includes("ArrowUp")) {
                _inityDest -= this._speed / 2.5;
            }
            _initxDest -= this._speed;
        }

        if (keysPressed.includes("ArrowRight")) {
            if (keysPressed.includes("ArrowDown")) {
                _inityDest += this._speed / 2.5;

            } else if (keysPressed.includes("ArrowUp")) {
                _inityDest -= this._speed / 2.5;
            }
            _initxDest += this._speed;
        }
        const isPressed = keysPressed.includes("ArrowUp")
            || keysPressed.includes("ArrowDown")
            || keysPressed.includes("ArrowLeft")
            || keysPressed.includes("ArrowRight");
        if (!isPressed) {
            console.log("isNotPressed");
            this.displayImage(_initxDest, _inityDest);
        } else {
            console.log("isPressed");
            this.displayMove(_initxDest, _inityDest)
        }
    }

    displayMove(newDestX, newDestY) {
        this._walkSprites.forEach(spriteUrl => {
            const sprite = new Image();
            sprite.src = spriteUrl;
            sprite.alt = "sprite walk";
            this._ctx.drawImage(sprite, this._xSource, this._ySource, this._sourceWidth, this._sourceHeight, newDestX, newDestY, this._destWidth, this._destHeight);
        });
    }

    getCoordDest() {
        return { _initxDest, _inityDest };
    }
}
