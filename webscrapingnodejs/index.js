var express = require('express');
var app = express();
var path = require('path');
var request = require("request");
var cheerio = require("cheerio");
var fs = require('fs');
// const { url } = require('inspector');
// const url = require('url');

app.get('/scrape', (req, res) => {
    var url = "https://www.indeed.com/viewjob?cmp=Fuze-Lab&t=Entry+Junior+PHP+Jquery+MySQL+Coder+Team+Member&jk=01790db21236725e";

    request(url, function (err, response, body) {

        var $ = cheerio.load(body);
        var companyName = $(".icl-u-lg-mr--sm");
        var companyNameText = companyName.text();
        var JobTitle = $(".jobsearch-JobInfoHeader-title");
        var JobTitleText = JobTitle.text();
        var Summary = $("#jobDescriptionText");
        var SummaryText = Summary.text();

        // $('.icl-u-lg-mr--sm').filter(function () {
        //     var companyName = $(this);
        //     companyNameText = companyName.text();
        // })
        console.log("Company Name: ", companyNameText);
        console.log("JobTitle: ", JobTitleText);
        console.log("Summary: e", SummaryText);


    })
    res.send("Check your console");


})



app.listen(3005, () => {
    console.log("Server is running at 3005")
})