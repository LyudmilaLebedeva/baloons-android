cc.Class({
    extends: cc.Component,

    properties: {
        bumpAudio: {
            default: null,
            type: cc.AudioClip
        },
    },

    moving() {
        cc.tween(this.node)
            .to(3, { position: cc.v2(this.node.x, 480) })
            .call(() => {
                this.node.dispatchEvent(new cc.Event.EventCustom('gameOver', true));
            })
            .start();
    },

    getStartPosition() {
        const randX = Math.random() * 640 - 320;
        return cc.v2(randX, -480);
    },

    burstBaloonHandler() {
        cc.audioEngine.playEffect(this.bumpAudio, false);
        this.game.incrementScores();
        this.node.destroy();
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        this.node.setPosition(this.getStartPosition());
        this.node.on(cc.Node.EventType.MOUSE_DOWN, this.burstBaloonHandler, this);
        this.node.on(cc.Node.EventType.TOUCH_START, this.burstBaloonHandler, this);
        this.moving();
    },

    // start () {},

    update(dt) {
        if (this.game.state === 'over') {
            this.node.destroy();
        }
    },
});
