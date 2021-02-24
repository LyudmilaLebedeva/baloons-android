cc.Class({
    extends: cc.Component,

    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        this.node.on('editing-return', (input) => {
            this.game.userName = input.string || 'Noname';
            this.game.saveScore();
            this.node.destroy();
        }, this);
    },

    // start() {},

    // update (dt) {},
});
