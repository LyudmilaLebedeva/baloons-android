cc.Class({
    extends: cc.Component,

    properties: {
        baloonPrefab: {
            default: null,
            type: cc.Prefab
        },

        inputPrefab: {
            default: null,
            type: cc.Prefab
        },

        scoreDisplay: {
            default: null,
            type: cc.Label
        },

        restartButtonPrefab: {
            default: null,
            type: cc.Prefab
        },

        gameOverAudio: {
            default: null,
            type: cc.AudioClip
        },

        leaderboardPrefab: cc.Prefab,
    },

    createBaloon() {
        const thisGame = this;
        const baloon = cc.instantiate(thisGame.baloonPrefab);

        baloon.getComponent('Baloon').game = thisGame;
        thisGame.node.addChild(baloon);
    },

    createBaloons() {
        this.createBaloon();
        this.timeout = setTimeout(this.createBaloons.bind(this), 700);
    },

    incrementScores() {
        ++this.score;
        this.scoreDisplay.string = 'Score: ' + this.score;
    },

    gameOver() {
        clearTimeout(this.timeout);
        cc.audioEngine.playEffect(this.gameOverAudio, false);
        this.state = 'over';
        const nameInput = cc.instantiate(this.inputPrefab);
        nameInput.setPosition(cc.v2(0, 300));
        nameInput.getComponent('NameInput').game = this;
        this.node.addChild(nameInput);
    },

    saveScore() {
        const leaderboardArr = JSON.parse(cc.sys.localStorage.getItem('leaderboard') || '[]');
        leaderboardArr.push([this.userName, this.score]);
        leaderboardArr.sort((a, b) => (b[1] - a[1]));
        cc.sys.localStorage.setItem('leaderboard', JSON.stringify(leaderboardArr));

        const leaderboard = cc.instantiate(this.leaderboardPrefab);
        leaderboard.getComponent('Leaderboard').render(JSON.parse(cc.sys.localStorage.getItem('leaderboard') || '[]'));

        const button = cc.instantiate(this.restartButtonPrefab);
        button.on('click', this.restartGame, this);

        this.node.addChild(leaderboard);
        this.node.addChild(button);
    },

    restartGame() {
        this.node.stopAllActions();
        cc.director.loadScene("game");
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        this.score = 0;
        this.node.on('gameOver', this.gameOver, this);
        this.createBaloons();
    },

    // start() {},

    // update(dt) {},
});
