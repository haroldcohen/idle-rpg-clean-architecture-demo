resource "scaleway_instance_security_group" "server_security_group" {
    name = "idle-rpg-clean-architecture-demo-${terraform.workspace}"
    inbound_default_policy  = "drop"
    outbound_default_policy = "accept"

    inbound_rule {
        action = "accept"
        port   = "22"
    }

    inbound_rule {
        action = "accept"
        port   = "80"
    }

    inbound_rule {
        action = "accept"
        port   = "443"
    }
}

resource "scaleway_instance_ip" "server_public_ip" {
}

resource "scaleway_instance_server" "server_compute" {
    type              = "DEV1-S"
    image             = "ubuntu-focal"
    name              = "idle-rpg-clean-architecture-demo-${terraform.workspace}"
    security_group_id = scaleway_instance_security_group.server_security_group.id
    ip_id             = scaleway_instance_ip.server_public_ip.id
    tags              = ["idle-rpg-clean-architecture-demo", terraform.workspace]
}
