pipeline {
  agent none
  environment {
    IMAGE_NAME = 'akraminezarene/fullstack-app'
    IMAGE_TAG = "${IMAGE_NAME}:${BUILD_NUMBER}"
  }

  stages{
    stage('Checkout') {
      steps {
        checkout scm
      }
    }
    stage('code test using sonarqube') {
      agent any
      steps{
          withSonarQubeEnv('sonar') {
            sh'sonar-scanner -Dsonar.projectKey=fullstack-app'
          }
      }
    }

    stage('build & test') {
      agent {label 'VM3' } 
      steps {
        sh 'docker-compose -f docker-compose.yml build backend frontend'
        echo(build successful)
        sh'docker images'
      }
    }
  }
}