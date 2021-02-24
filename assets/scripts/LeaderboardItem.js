cc.Class({
    extends: cc.Component,

    properties: {
        label: cc.Label,
    },

    render(str) {
        this.label.string = str;
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    // start () {},

    // update (dt) {},
});
