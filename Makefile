setup:
	docker-compose build
	docker-compose up -d
	docker exec -it hacku_react_1 /bin/ash
