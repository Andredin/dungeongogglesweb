const uuid = require('uuid/v4');
const db = require('./db');

exports.create = async (req, res) => {
    const url = req.body.url;
    if (!url) {
        res.status(500).send("missing url");
        return;
    }

    try {
        const dmId = uuid();
        const document = db.doc(`maps/map-${dmId}`);
    
        await document.set({
            dmId: dmId,
            playerId: uuid(),
            url
        });

        res.send({ dmId });
    } catch (error) {
        res.status(500).send("error creating map");
    }
}