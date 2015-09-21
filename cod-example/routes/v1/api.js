var express = require('express');
var router = express.Router();

router.get('/ping', function(req, res) {
    res.json({ data: 'pong' });
});

router.get('/providers', function(req, res) {
    var provider = req.query.provider || 'auto';
    res.json([
        {
            name: 'Auto Generated Feed',
            slug: 'auto',
            defaultProvider: provider === 'auto',
            refreshIntervals: [ 1000, 5000, 100000 ],
            refreshInfo: null,
            supportedBaseCurrency: [ 'EUR', 'USD', 'RUB' ],
            supportedTargetCurrency: [ 'EUR', 'USD', 'RUB' ]
        },
        {
            name: 'European Central Bank Feed',
            slug: 'ebank',
            defaultProvider: provider === 'ebank',
            refreshIntervals: null,
            refreshInfo: 'The reference rates are usually updated by 15:00 CET on every working day, except on TARGET closing days. They are based on a regular daily concertation procedure between central banks across Europe and worldwide, which normally takes place at 14:15 CET.',
            supportedBaseCurrency: [ 'EUR' ],
            supportedTargetCurrency: [
                'USD','JPY','BGN','CZK','DKK','GBP','HUF','PLN','RON','SEK','CHF','NOK','HRK','RUB','TRY','AUD','BRL','CAD','CNY','HKD','IDR','ILS','INR','KRW','MXN','MYR','NZD','PHP','SGD','THB','ZAR', 'EUR'
            ]
        }
    ]);
});


router.get('/rates/:provider', function(req, res) {
    var provider = req.params.provider;

    if (provider === 'auto') {

        res.json({
            lastRequest: new Date().toLocaleTimeString(),
            items: getAllCombinations(
                [ 'EUR', 'USD', 'RUB' ],
                [ 'EUR', 'USD', 'RUB' ]
            ).map(function(item){
                    return {
                        type: item,
                        ask: getRandomRate(),
                        bid: getRandomRate()
                    }
                }
            )
        });

    } else if (provider === 'ebank') {

        res.json({
            lastRequest: new Date().toLocaleTimeString(),
            items: getAllCombinations(
                [ 'EUR' ],
                [
                    'USD','JPY','BGN','CZK','DKK','GBP','HUF','PLN','RON','SEK','CHF','NOK','HRK','RUB','TRY','AUD','BRL','CAD','CNY','HKD','IDR','ILS','INR','KRW','MXN','MYR','NZD','PHP','SGD','THB','ZAR', 'EUR'
                ]
            ).map(function(item){
                    return {
                        type: item,
                        ask: getRandomRate(),
                        bid: getRandomRate()
                    }
                }
            )
        });

    } else {
        res.status(404).send('Not found');
    }

});

function getAllCombinations(a, b) {
    var r = [];
    for (var i = 0; i < a.length; i++) {
        for (var j = 0; j < b.length; j++) {
            if (a[i] === b[j]) continue;
            r.push(a[i] + b[j]);
        }
    }
    return r;
}

function getRandomRate() {
    var n = Math.random();
    return +n.toFixed(2);
}

module.exports = router;
