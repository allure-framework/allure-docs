pipeline {
    environment {
        SITE_DIRECTORY = 'build/docs/html5'
    }
    agent { label 'java' }
    stages {
        stage('Build') {
            steps {
                sh './gradlew build'
            }
        }
        stage('Demo') {
            steps {
                publishHTML([reportName  : 'Allure1', reportDir: env.SITE_DIRECTORY, reportFiles: '1.5/index.html',
                             reportTitles: '', allowMissing: false, alwaysLinkToLastBuild: false, keepAll: false])
                publishHTML([reportName  : 'Allure2', reportDir: env.SITE_DIRECTORY, reportFiles: '2.0/index.html',
                             reportTitles: '', allowMissing: false, alwaysLinkToLastBuild: false, keepAll: false])
            }
        }
        stage('Deploy') {
            when { branch "master" }
            steps {
                withCredentials([string(credentialsId: 'qameta-ci_github_token', variable: 'GRGIT_USER')]) {
                    sh './gradlew gitPublishPush'
                }
            }
        }
    }
    post {
        always {
            deleteDir()
        }
        failure {
            slackSend message: "${env.JOB_NAME} - #${env.BUILD_NUMBER} failed (<${env.BUILD_URL}|Open>)",
                    color: 'danger', teamDomain: 'qameta', channel: 'allure', tokenCredentialId: 'allure-channel'
        }
    }
}