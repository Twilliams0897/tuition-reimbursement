import Express from 'express';
import logger from '../log';
import claimsService from './claims.service'

const router = Express.Router();

router.get('/', function(req, res, next) {
    logger.debug('Attemping to get claims list');
    claimsService.getClaims().then((claims) => {
        res.send(JSON.stringify(claims));
    });
});

router.get('/:id', function(req, res, next) {
    logger.debug('Attempting to retrieve claim');
    //logger.debug('Searching for claim with id: '+req.params.id);
    claimsService.getClaimById(req.params.id).then((claims) => {
        res.send(JSON.stringify(claims));
    });
});

router.post('/', function(req, res, next) {
    logger.debug('Attempting to add new request');
    //logger.debug('Adding claim as follows: ' + req.params);
    claimsService.addClaim(req.body).then((data) => {
        logger.debug(data);
        res.sendStatus(201);
    }).catch((err) => {
        logger.error(err);
        res.sendStatus(500);
    });
});

router.delete('/:id', function (req, res, next) {
    logger.debug(req.body);
    claimsService.deleteClaim(req.params.id).then((data)=> {
        logger.debug(data);
        res.sendStatus(200); // Created
    }).catch((err) => {
        logger.error(err);
        res.sendStatus(500); // Server error, sorry
    })
});

router.put('/', function(req, res, next) {
    logger.debug('Attemping to update existing request');
    logger.debug(req.body);
    claimsService.updateClaim(req.body).then((data) => {
        res.sendStatus(200);
    }).catch((err) => {
        res.sendStatus(500);
    })
})

export default router;
