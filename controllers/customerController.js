const express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const customer = mongoose.model('customer');

router.get('/', (req, res) => {
    res.render("customer/addOrEdit", {
        viewTitle: "Insert customer"
    });
});

router.post('/', (req, res) => {
    if (req.body._id == '')
        insertRecord(req, res);
        else
        updateRecord(req, res);
});


function insertRecord(req, res) {
    var customer = new customer();
    customer.fullName = req.body.fullName;
    customer.email = req.body.email;
    customer.mobile = req.body.mobile;
    customer.city = req.body.city;
    customer.save((err, doc) => {
        if (!err)
            res.redirect('customer/list');
        else {
            if (err.name == 'ValidationError') {
                handleValidationError(err, req.body);
                res.render("customer/addOrEdit", {
                    viewTitle: "Insert customer",
                    customer: req.body
                });
            }
            else
                console.log('Error during record insertion : ' + err);
        }
    });
}

function updateRecord(req, res) {
    customer.findOneAndUpdate({ _id: req.body._id }, req.body, { new: true }, (err, doc) => {
        if (!err) { res.redirect('customer/list'); }
        else {
            if (err.name == 'ValidationError') {
                handleValidationError(err, req.body);
                res.render("customer/addOrEdit", {
                    viewTitle: 'Update customer',
                    customer: req.body
                });
            }
            else
                console.log('Error during record update : ' + err);
        }
    });
}


router.get('/list', (req, res) => {
    customer.find((err, docs) => {
        if (!err) {
            res.render("customer/list", {
                list: docs
            });
        }
        else {
            console.log('Error in retrieving customer list :' + err);
        }
    });
});


function handleValidationError(err, body) {
    for (field in err.errors) {
        switch (err.errors[field].path) {
            case 'fullName':
                body['fullNameError'] = err.errors[field].message;
                break;
            case 'email':
                body['emailError'] = err.errors[field].message;
                break;
            default:
                break;
        }
    }
}

router.get('/:id', (req, res) => {
    customer.findById(req.params.id, (err, doc) => {
        if (!err) {
            res.render("customer/addOrEdit", {
                viewTitle: "Update customer",
                customer: doc
            });
        }
    });
});

router.get('/delete/:id', (req, res) => {
    customer.findByIdAndRemove(req.params.id, (err, doc) => {
        if (!err) {
            res.redirect('/customer/list');
        }
        else { console.log('Error in customer delete :' + err); }
    });
});

module.exports = router;