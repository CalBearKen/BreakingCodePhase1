# main.tf (Terraform configuration for AWS ECS with Fargate)

provider "aws" {
  region = "us-west-2"
}

resource "aws_ecs_cluster" "my_cluster" {
  name = "myEcsCluster"
}

resource "aws_ecs_task_definition" "my_task" {
  family                   = "myAppTaskDefinition"
  network_mode             = "awsvpc"
  requires_compatibilities = ["FARGATE"]
  cpu                      = "256"
  memory                   = "512"

  container_definitions = jsonencode([
    {
      name      = "ecommerce-app"
      image     = "your-dockerhub-username/ecommerce-app:latest"
      cpu       = 256
      memory    = 512
      essential = true
      portMappings = [
        {
          containerPort = 80
          hostPort      = 80
        }
      ]
    }
  ])
}

resource "aws_ecs_service" "my_service" {
  name            = "myEcsService"
  cluster         = aws_ecs_cluster.my_cluster.id
  task_definition = aws_ecs_task_definition.my_task.arn
  desired_count   = 1

  network_configuration {
    subnets         = ["subnet-xyz", "subnet-abc"]
    security_groups = ["sg-0123456789abcdef"]
    assign_public_ip = true
  }
}