const pdf = require('html-pdf');
const pdfTemplate = require('../documents');


const createPdf =  (req, res) => {
    pdf.create(pdfTemplate(req.body), {}).toFile('result.pdf', (err) => {
        if(err) {
            res.send(Promise.reject());
        }

        res.send(Promise.resolve());
    });
}

const getPdf = (req, res) => {
    res.sendFile(`/Users/thilakvoruganti/Desktop/Flights-app/result.pdf`)
}

module.exports = {createPdf,getPdf}