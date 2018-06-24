BIN=$(shell pwd)/node_modules/.bin

develop:
	@clear
	@$(BIN)/gatsby develop

install:
	@npm install

post:
	@clear
	@echo 'Write your post below!'
	@node make-post.js

build:
	@$(BIN)/gatsby build

deploy:
	@$(MAKE) build
	@cd public && rm *.map
	@cd public && tar -cvf build.tar.gz *
	@scp public/build.tar.gz $(SERVER)
	@ssh $(SERVER) "cd $(SERVER) && tar -xvf build.tar.gz"