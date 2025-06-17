pipeline {
  agent { label 'VM3-node' } 
  environment {
    IMAGE_NAME = 'akraminezarene/fullstack-app'
    IMAGE_TAG = "${IMAGE_NAME}:${BUILD_NUMBER}"
    SCANNER_HOME = tool 'sonar'
  }

  stages {
    stage('Checkout') {
      steps {
        checkout scm
      }
    }
    stage('code analysing using sonarqube') {
      agent any
      steps{
          withSonarQubeEnv(credentialsId: 'sonarqube-token', installationName: 'SonarQube') {
            sh '''
                  pwd
                  echo ${SCANNER_HOME}
                  ${SCANNER_HOME}/bin/sonar-scanner -Dsonar.projectKey=fullstack-app
                  '''
          }
      }
    }

    stage('build & test') {
      steps {
        sh 'docker-compose -f docker-compose.yml build backend frontend'
          echo 'build successful'
            sh'docker images'
            sh'docker-compose run --rm backend npm test'
            sh'docker-compose run --fontend npm test'
      }
    }
  }
}
