class Sonic {
    constructor(game, x, y) {
        Object.assign(this, { game, x, y });
        this.game.mainCharacter = this;
        this.spritesheet = ASSET_MANAGER.getAsset("./resource/sonic_sprite.png");
        this.height = 120;
        this.width = 120;

        this.animations = new Animator(this.spritesheet, 30, 700, this.width, this.height, 4, 0.08, 18, false, true);

        //Speed for x axis
        this.dx = 600;
        //Speed for the y axis
        this.dy = 550;
        this.speed = Math.sqrt(this.dx ** 2 + this.dy ** 2);
        this.BC = new BoundingCircle(x, y, this.height / 2);
    }
    /** Updates this character's bounding circle to reflect its current position */
    updateBoundingCircle = () => {
        this.BC = new BoundingCircle(this.x, this.y, this.height / 2);
    };

    updateMovingDirection = (ndx, ndy) => {
        this.dx *= -1;
        this.dy *= -1;
        this.speed = Math.sqrt(this.dx ** 2 + this.dy ** 2);
    }

    update() {
        //Update movement
        this.x += this.dx * this.game.clockTick;
        this.y += this.dy * this.game.clockTick;

        //Check Out of bounds
        if (this.x + this.width >= params.CANVAS_SIZE || this.x < 0){
            this.dx *= -1;
           
        }

        if (this.y + this.height >= params.CANVAS_SIZE || this.y < 0){
            this.dy *= -1;   
            
        }
        this.speed = Math.sqrt(this.dx ** 2 + this.dy ** 2);
        
        //Always keep object in frame
        this.x = Math.min(params.CANVAS_SIZE - this.width, this.x);
        this.x = Math.max(0, this.x);

        this.y = Math.min(params.CANVAS_SIZE - this.height, this.y);
        this.y = Math.max(0, this.y);

        this.updateBoundingCircle();
        
    }


    draw(ctx) {
        //ctx.drawImage(this.spritesheet, this.x, this. y);
        this.animations.drawFrame(this.game.clockTick, ctx, this.x, this.y, 1);
    }
}