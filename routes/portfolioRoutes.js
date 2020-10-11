const express = require('express');
const portfolioController = require('../controller/portfolioController');
const router = express.Router()

// Need links and controllers for put/update and delete 

router.get('/', portfolioController.portfolio_index);
router.get('/analytics', portfolioController.portfolio_analytics);
router.get('/software', portfolioController.portfolio_software);
router.get('/publications', portfolioController.portfolio_publications);
router.get('/create', portfolioController.portfolio_dataEntry);
router.post('/create', portfolioController.portfolioItem_create);
router.get('/view/:id', portfolioController.portfolioItem_view);
router.get('/edit/:id', portfolioController.portfolioItem_edit);
router.post('/edit/:id', portfolioController.portfolioItem_update);
router.get('/delete/:id', portfolioController.portfolioItem_delete);

module.exports = router;