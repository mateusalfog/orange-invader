import { PATH_INVADER_IMAGE } from "../utils/constants.js";
import Projectile from "./Projectile.js";

class Invader {
    constructor(position, velocity) {
        this.position = position;
        this.width = 48 * 0.7;
        this.height = 48 * 0.7;
        this.velocity = velocity;

        this.image = this.getImage(PATH_INVADER_IMAGE);
        this.imageLoaded = false;

        this.image.onload = () => {
            this.imageLoaded = true;
        };
    }

    getImage(path) {
        const image = new Image();
        image.src = path;
        return image;
    }

    moveLeft() {
        this.position.x -= this.velocity;
    }

    moveRight() {
        this.position.x += this.velocity;
    }

    moveDown() {
        this.position.y += this.height;
    }

    incrementVelocity(boost) {
        this.velocity += boost;
    }

    draw(ctx) {
        if (this.imageLoaded) {
            ctx.drawImage(
                this.image,
                this.position.x,
                this.position.y,
                this.width,
                this.height
            );
        }
    }

    shoot(projectiles) {
        const p = new Projectile(
            {
                x: this.position.x + this.width / 2 - 1,
                y: this.position.y + this.height,
            },
            10
        );

        projectiles.push(p);
    }

    hit(projectile) {
        return (
            projectile.position.x + projectile.width >= this.position.x &&
            projectile.position.x <= this.position.x + this.width &&
            projectile.position.y + projectile.height >= this.position.y &&
            projectile.position.y <= this.position.y + this.height
        );
    }
}

export default Invader;
