pipeline {
  agent any
  environment {
    REGISTRY    = 'docker.io'
    IMAGE_NAME  = "${REGISTRY}/TON_USERNAME/fullstack-app"
  }

  stages {
    stage('Checkout') {
      steps { checkout scm }
    }

    stage('Build & Test') {
      steps {
        sh 'docker-compose -f docker-compose.yml build backend frontend'
      }
    }

    stage('SonarQube Analysis') {
      steps {
        withSonarQubeEnv('sonar') {
          sh 'sonar-scanner -Dsonar.projectKey=fullstack-app'
        }
      }
    }

    stage('Push Images') {
      steps {
        script {
          docker.withRegistry('', 'dockerhub-creds') {
            sh 'docker-compose push backend frontend'
          }
        }
      }
    }

    stage('Deploy via SSH') {
      steps {
        sshPublisher(publishers: [
          sshPublisherDesc(
            configName: 'ma-vm-ubuntu',
            transfers: [
              sshTransfer(
                sourceFiles: 'docker-compose.yml',
                removePrefix: '',
                execCommand: """
                  cd /home/ubuntu/fullstack-app
                  git pull origin main
                  docker-compose pull
                  docker-compose up -d --build
                """
              )
            ]
          )
        ])
      }
    }

    stage('Health Check') {
      steps {
        // Vérifie que l'API répond toujours 200
        httpRequest(
          httpMode: 'GET',
          url: 'http://MON_IP_VM/api/hello',
          validResponseCodes: '200'
        )
      }
    }
  }
}
