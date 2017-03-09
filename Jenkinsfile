def publishDirectory = 'build/docs/html5'
def publishBranch = 'gh-pages'

pipeline {
    agent { label 'java' }
    stages {

        stage('Checkout gh-pages branch') {
            steps {
                sh "git worktree add -B ${publishBranch} ${publishDirectory} origin/${publishBranch}"
                sh "rm -rf ${publishDirectory}/*"
            }
        }

        stage('Build site') {
            steps {
                sh './gradlew build'
            }
        }
        stage('Publish site') {
            steps {
                dir(publishDirectory) {
                    sh 'git add --all && git commit -m "Publishing to gh-pages" && git push'
                }
            }
        }
    }
}