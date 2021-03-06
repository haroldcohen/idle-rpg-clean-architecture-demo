terraform {
    required_providers {
        scaleway = {
            source  = "scaleway/scaleway"
            version = "~> 2.0.0"
        }
    }

    backend "s3" {
        bucket                      = "thetribe-terraform-states"
        key                         = "idle-rpg-clean-architecture-demo.tfstate"
        region                      = "fr-par"
        endpoint                    = "https://s3.fr-par.scw.cloud"
        skip_credentials_validation = true
        skip_region_validation      = true
    }
}

variable "scw_access_key" {
    type      = string
}

variable "scw_secret_key" {
    type      = string
    sensitive = true
}

variable "scw_project_id" {
    type      = string
}

provider "scaleway" {
    zone       = "fr-par-1"
    region     = "fr-par"
    access_key = var.scw_access_key
    secret_key = var.scw_secret_key
    project_id = var.scw_project_id
}
