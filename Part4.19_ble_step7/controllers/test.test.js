const { json } = require("express")

pipeline {
    agent any 

    envinronment {
        def myString = "Hello World"
        def myNumber = 10
        def myBool = true
    }

    stages{
        stage("Demo") {
            steps {
