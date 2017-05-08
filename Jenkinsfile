pipeline {
    agent {
        label 'java'
    }
    stages {
        stage('Build') {
            steps {
                sh './gradlew build'
            }
        }
        stage('Deploy') {
            when {
                branch "master"
            }
            environment {
                DEPLOY_DIRECTORY = 'build/docs/html5'
                DEPLOY_BRANCH = 'gh-pages'
            }
            steps {
                sh "git worktree add -B ${env.DEPLOY_BRANCH} ${env.DEPLOY_DIRECTORY} origin/${env.DEPLOY_BRANCH}"
                sh "rm -rf ${env.DEPLOY_DIRECTORY}/*"

                dir(env.DEPLOY_DIRECTORY) {
                    sh 'git add --all && git commit -m "Publishing to gh-pages" && git push'
                }
            }
        }
    }
}