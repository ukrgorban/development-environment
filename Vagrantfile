Vagrant.configure("2") do |config|
	(1..1).each do |i|
	  config.vm.define "node#{i}" do |web|
		web.vm.box = "ubuntu/focal64"
		web.vm.network "forwarded_port", id: "ssh", host: 1110 + i, guest: 22
		web.vm.network "forwarded_port", id: "nodejs", host: 3000, guest: 3000
		web.vm.network "forwarded_port", id: "pgAdmin", host: 5050, guest: 5050
		web.vm.network "private_network", ip: "10.11.10.#{i}", virtualbox__intnet: true
		web.vm.hostname = "node#{i}"
  
		# Підготовка середовища
		web.vm.provision "shell" do |s|
		  ssh_pub_key = File.readlines("#{Dir.home}/.ssh/id_rsa.pub").first.strip
		  s.inline = <<-SHELL
			echo #{ssh_pub_key} >> /home/vagrant/.ssh/authorized_keys
			echo #{ssh_pub_key} >> /root/.ssh/authorized_keys
  
			# Встановлення Docker
			apt-get update
			apt-get install -y docker.io
  
			# Додавання користувача vagrant до групи docker
			usermod -aG docker vagrant
  
			# Встановлення Docker Compose
			apt-get install -y docker-compose
  
			# Встановлення Git
			apt-get install -y git
		  SHELL
		end
  
		# Перенесення файлів
		web.vm.provision "file", source: "./docker-compose.yml", destination: "/home/vagrant/docker-compose.yml"
		web.vm.provision "file", source: "./app/index.js", destination: "/home/vagrant/app/index.js"
		web.vm.provision "file", source: "./app/package.json", destination: "/home/vagrant/app/package.json"

		# Запуск docker-compose
		web.vm.provision "shell" do |s|
		  s.inline = <<-SHELL
			cd /home/vagrant && docker-compose up
		  SHELL
		end
  
		web.vm.provider "virtualbox" do |v|
		  v.name = "node#{i}"
		  v.memory = 2048
		  v.cpus = 1
		end
	  end
	end
  end
  