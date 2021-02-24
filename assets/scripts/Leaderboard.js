cc.Class({
    extends: cc.Component,

    properties: {
        scrollView: cc.ScrollView,
        itemPrefab: cc.Prefab,
    },

    createItem(dataItem, index) {
        const newItem = cc.instantiate(this.itemPrefab);
        newItem.getComponent('LeaderboardItem').render(`${index + 1}. ${dataItem[0]} - ${dataItem[1]}`);
        newItem.setPosition(cc.v2(-300, 0 + (-70) * index));
        return newItem;
    },

    render(arr) {
        this.scrollView.content.height = 0;
        arr.forEach((dataItem, index) => {
            this.scrollView.content.height += 85;
            this.scrollView.content.addChild(this.createItem(dataItem, index));
        });
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad() {},

    // start() {},

    // update (dt) {},
});
