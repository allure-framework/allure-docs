pipeline {
    environment {
        SITE_DIRECTORY = 'build/docs/html5'
    }
    agent {
        label 'java'
    }
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
            when {
                branch "master"
            }
            environment {
                DEPLOY_DIRECTORY = 'build/gh-pages'
                DEPLOY_BRANCH = 'gh-pages'
            }
            steps {
                sh "git worktree add -B ${env.DEPLOY_BRANCH} ${env.DEPLOY_DIRECTORY} origin/${env.DEPLOY_BRANCH}"
                sh "rm -rf ${env.DEPLOY_DIRECTORY}/*"
                sh "cp -rf ${env.SITE_DIRECTORY}/* ${env.DEPLOY_DIRECTORY}"

                dir(env.DEPLOY_DIRECTORY) {
                    sh 'git add --all && git commit -m "Publishing to gh-pages" && git push'
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
