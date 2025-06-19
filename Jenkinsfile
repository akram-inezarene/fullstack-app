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
                  rm -rf sonar-scanner
                  wget -q https://binaries.sonarsource.com/Distribution/sonar-scanner-cli/sonar-scanner-cli-5.0.1.3006-linux.zip
                  unzip -o -q sonar-scanner-cli-5.0.1.3006-linux.zip
                  mv sonar-scanner-5.0.1.3006-linux sonar-scanner
                  
                  ./sonar-scanner/bin/sonar-scanner \
                  -Dsonar.exclusions=**/sonar-scanner/**,**/*.zip
                  -Dsonar.projectKey=fullstack-app \
                  -Dsonar.sources=. \
                  -Dsonar.host.url=$SONAR_HOST_URL \
                  -Dsonar.login=$SONAR_AUTH_TOKEN
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
