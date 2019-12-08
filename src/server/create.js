const uuid = require('uuid/v4');
const db = require('./db');
const { Firestore } = require('@google-cloud/firestore');

exports.create = async (req, res) => {
    const url = req.body.url;
    if (!url) {
        res.status(500).send("missing url");
        return;
    }

    try {
        const dmId = uuid();
        console.log(Firestore)
        const now = new Date();
        const document = db.doc(`maps/map-${now.getTime()}-${dmId}`);
    
        await document.set({
            dmId: dmId,
            playerId: uuid(),
            url,
            created: Firestore.Timestamp.fromDate(now)
        });

        res.send({ dmId });
    } catch (error) {
        res.status(500).send("error creating map");
    }
}