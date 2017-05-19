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
                publishHTML([reportName  : 'Demo', reportDir: env.SITE_DIRECTORY, reportFiles: 'index.html',
                             reportTitles: '', allowMissing: false, alwaysLinkToLastBuild: false, keepAll: false])
            }
        }
        stage('Deploy') {
            when { branch "master" }
            steps {
                withCredentials([string(credentialsId: 'qameta-ci_github_token', variable: 'GRGIT_USER')]) {
                    sh './gradlew publishGhPages'
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
