# terraform_setup.tf

provider "google" {
  credentials = file("path/to/your-service-account-file.json")
  project     = "your-project-id"
  region      = "us-central1"
}

resource "google_compute_instance" "default" {
  name         = "example-instance"
  machine_type = "n1-standard-1"
  zone         = "us-central1-a"

  boot_disk {
    initialize_params {
      image = "debian-cloud/debian-9"
    }
  }

  network_interface {
    network = "default"

    access_config {
    }
  }
}

# Add more resources for multi-region setup